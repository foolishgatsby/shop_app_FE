import React, { useEffect, useRef, useState } from "react";
import { Space, Table, Button, Input } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory_api } from "../../redux/actions/ActionsApi";

// const dataSource = [
//   {
//     key: "1",
//     id: 1,
//     name: "product 1",
//     category: "Laptops",
//     price: 1300000,
//     oldprice: 1300000,
//     rating: 4.5,
//   },
//   {
//     key: "2",
//     id: 2,
//     name: "product 2",
//     category: "Laptops",
//     price: 5000000,
//     oldprice: 5000000,
//     rating: 4.5,
//   },
//   {
//     key: "3",
//     id: 3,
//     name: "product 3",
//     category: "Accessories",
//     price: 5000000,
//     oldprice: 5000000,
//     rating: 4.5,
//   },
//   {
//     key: "4",
//     id: 4,
//     name: "product 4",
//     category: "Accessories",
//     price: 5000000,
//     oldprice: 5000000,
//     rating: 5,
//   },
//   {
//     key: "5",
//     id: 5,
//     name: "product 5",
//     category: "Cameras",
//     price: 1500000,
//     oldprice: 1500000,
//     rating: 3,
//   },
// ];

export default function ProductTable(props) {
  const { productList } = useSelector((state) => state.ProductTableReducer);

  // get product by category
  const { categoryId } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductByCategory_api(categoryId));
  }, []);

  // search function of table
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
      title: "Product Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
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
      title: "Old price",
      dataIndex: "oldprice",
      key: "oldprice",
      ...getColumnSearchProps("oldprice"),
      sorter: (a, b) => a.oldprice - b.oldprice,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      // ...getColumnSearchProps("rating"),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
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

  // return component
  return (
    <div>
      <div className="mb-3">
        <button className="btn btn-danger">ADD NEW PRODUCT</button>
      </div>
      <Table columns={columns} dataSource={productList} />
    </div>
  );
}