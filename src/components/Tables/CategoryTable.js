import React from "react";
import { Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const dataSource = [
  {
    key: "1",
    id: 1,
    name: "Laptops",
  },
  {
    key: "2",
    id: 2,
    name: "Accessories",
  },
  {
    key: "3",
    id: 3,
    name: "Cameras",
  },
];

export default function CategoryTable() {
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
          <button className="btn btn-primary">
            <EditOutlined />
          </button>
          <button className="btn btn-danger">
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="mb-3">
        <button className="btn btn-danger">ADD CATEGORY</button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
