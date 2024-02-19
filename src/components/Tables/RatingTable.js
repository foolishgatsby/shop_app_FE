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
import FormEditOrder from "../Form/FormEditOrder";
// import FormAddUser from "../Form/FormEditAccount";

export default function RatingTable(props) {
  const { arrEvaluate, loading } = useSelector(
    (state) => state.EvaluateReducer
  );

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Lấy tất cả orders về
    dispatch({
      type: "SET_LOADING_EVALUATE",
      loading: true,
    });
    dispatch({
      type: "GET_ALL_EVALUATE_API",
    });
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
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      ...getColumnSearchProps("comment"),
      sorter: (a, b) => a.comment.length - b.comment.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rating",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      render: (_, { product }) => product.name,
    },
    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      render: (_, { user }) => user.fullName,
    },
    {
      title: "",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="btn btn-danger"
            onClick={() => {
              // api delete order
              dispatch({
                type: "DELETE_EVALUATE_API",
                evaluate_id: record.id,
              });
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
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={arrEvaluate}
        pagination={{ hideOnSinglePage: true }}
        scroll={{ y: "600px" }}
        loading={loading}
      />
    </div>
  );
}
