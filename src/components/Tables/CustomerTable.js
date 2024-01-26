import React, { useState, useRef, useEffect } from "react";
import { Space, Table, Button, Input } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../redux/actions/DrawerActions";
import { OPEN_DRAWER } from "../../redux/constants/DrawerConstants";
import FormAddUser from "../Form/FormAddUser";

// const dataSource = [
//   {
//     key: "1",
//     id: 1,
//     name: "Mike",
//     password: "password 1",
//     role: "admin",
//   },
//   {
//     key: "2",
//     id: 2,
//     name: "Store 1",
//     password: "password 2",
//     role: "store owner",
//   },
//   {
//     key: "3",
//     id: 3,
//     name: "User account 1",
//     password: "password 3",
//     role: "user",
//   },
//   {
//     key: "4",
//     id: 4,
//     name: "User account 2",
//     password: "password 4",
//     role: "user",
//   },
//   {
//     key: "5",
//     id: 5,
//     name: "Store 2",
//     password: "password 5",
//     role: "store owner",
//   },
// ];

export default function CustomerTable(props) {
  const { arrAccount } = useSelector((state) => state.AccountManageReducer);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Lấy tất cả account về
  }, []);
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
      title: "User Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Account Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "",
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
        <button
          onClick={() => {
            dispatch(openDrawer(OPEN_DRAWER, <FormAddUser />, "Add User"));
          }}
          className="btn btn-danger"
        >
          ADD ACCOUNT
        </button>
      </div>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={arrAccount}
        pagination={{ hideOnSinglePage: true }}
        scroll={{ y: "600px" }}
      />
    </div>
  );
}
