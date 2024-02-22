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

export default function OrderTable(props) {
  const { arrOrders, loading, doneApi } = useSelector(
    (state) => state.OrderReducer
  );

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Lấy tất cả orders về
    dispatch({
      type: "SET_LOADING_ORDER",
      loading: true,
    });
    dispatch({
      type: "GET_ALL_ORDER_API",
    });
    if (doneApi) {
      dispatch(openDrawer(OPEN_DRAWER, <FormEditOrder />, "Edit Order"));
    }
  }, [doneApi]);
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

  //helper func to translate date time
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  //helper func to calculate the number of products
  const getTotalNumberOfProducts = (orderDetails) => {
    return orderDetails.reduce(
      (total, current) => total + current.numberOfProducts,
      0
    );
  };

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
      title: "Receiver Name",
      dataIndex: "fullname",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Shipping Address",
      dataIndex: "shipping_address",
      key: "shipping_address",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Total Money",
      dataIndex: "total_money",
      key: "total_money",
      render: (_, { total_money }) => total_money.toLocaleString(),
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Number Of Products",
      dataIndex: "order_details",
      key: "numberOfProducts",
      render: (orderDetails) => getTotalNumberOfProducts(orderDetails),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Is Active",
      dataIndex: "active",
      key: "active",
      render: (_, { active }) => (active === true ? "active" : "unactive"),
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
              // api edit order
              dispatch({
                type: "GET_EDIT_ORDER_DETAIL",
                order_id: record.id,
              });
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              // api delete order
              dispatch({
                type: "DELETE_ORDER_API",
                order_id: record.id,
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
        dataSource={arrOrders}
        pagination={{ hideOnSinglePage: true }}
        scroll={{ y: "600px" }}
        loading={loading}
      />
    </div>
  );
}
