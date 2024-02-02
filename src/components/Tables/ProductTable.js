import React, { useEffect, useRef, useState } from "react";
import { Space, Table, Button, Input } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory_api,
  deleteProduct_api,
  getProductByCategory_api,
} from "../../redux/actions/ActionsApi";
import { openDrawer } from "../../redux/actions/DrawerActions";
import { OPEN_DRAWER } from "../../redux/constants/DrawerConstants";
import FormAddProduct from "../Form/FormAddProduct";
import { setEditProduct } from "../../redux/actions/NormalActions";
import FormEditProduct from "../Form/FormEditProduct";

export default function ProductTable(props) {
  const { productList, loading } = useSelector(
    (state) => state.ProductTableReducer
  );

  const dispatch = useDispatch();

  // load dữ liệu
  useEffect(() => {}, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Product's Category",
      dataIndex: "category_id",
      key: "category_id",
      ...getColumnSearchProps("category_id"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn btn-primary"
            onClick={() => {
              // record mang thông tin product
              // gọi api mở drawer
              dispatch(
                openDrawer(OPEN_DRAWER, <FormEditProduct />, "Edit Product")
              );
              // dispatch action set edit product
              dispatch(setEditProduct(record));
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(deleteProduct_api(record.id, record.category_id));
            }}
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];

  // return component
  return (
    <div style={{ maxHeight: "100vh" }}>
      <div className="mb-3">
        <button
          onClick={() => {
            dispatch(
              openDrawer(OPEN_DRAWER, <FormAddProduct />, "Add Product")
            );
          }}
          className="btn btn-danger"
        >
          ADD NEW PRODUCT
        </button>
      </div>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={productList}
        pagination={{ hideOnSinglePage: true }}
        scroll={{ y: "600px" }}
        loading={loading}
      />
    </div>
  );
}
