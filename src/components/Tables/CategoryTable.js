import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory_api,
  deleteCategory_api,
  getCategories_api,
} from "../../redux/actions/ActionsApi";
import { openDrawer } from "../../redux/actions/DrawerActions";
import { OPEN_DRAWER } from "../../redux/constants/DrawerConstants";
import FormAddCategory from "../Form/FormAddCategory";
import FormEditCategory from "../Form/FormEditCategory";
import { setEditCategory } from "../../redux/actions/NormalActions";

export default function CategoryTable(props) {
  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories_api());
  }, []);

  const deleteCategories = (id) => {
    dispatch(deleteCategory_api(id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
      width: "50%",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(
                openDrawer(OPEN_DRAWER, <FormEditCategory />, "Edit Category")
              );
              dispatch(setEditCategory(record.id, record.name));
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              // console.log(record);
              deleteCategories(record.id);
            }}
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="mb-3">
        <button
          onClick={() => {
            dispatch(
              openDrawer(OPEN_DRAWER, <FormAddCategory />, "Add Category")
            );
          }}
          className="btn btn-danger"
        >
          ADD CATEGORY
        </button>
      </div>
      <Table
        pagination={{ hideOnSinglePage: true }}
        rowKey={"id"}
        columns={columns}
        dataSource={arrCategories}
        scroll={{ y: "600px" }}
      />
    </div>
  );
}
