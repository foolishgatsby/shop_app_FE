import { Col, DatePicker, Form, Input, Row, Select } from "antd";
// import { Option } from "antd/es/mentions";
import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  addCategory_api,
  editCategory_api,
  signup_api,
} from "../../redux/actions/ActionsApi";
const { Option } = Select;

function FormEditOrder(props) {
  // console.log(props);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  //   console.log(values);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "DONE_API",
      doneApi: false,
    });
    //load sự kiện submit form
    dispatch({
      type: "SET_SUBMIT_EDIT_ORDER",
      submitFunc: handleSubmit,
    });
  }, []);

  const handleChangeStatus = (value) => {
    setFieldValue("status", value);
  };

  return (
    <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="id" label="Id" initialValue={values.id}>
            <Input disabled placeholder="ID" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item
            name="user_id"
            label="User ID"
            initialValue={values.user_id}
          >
            <Input disabled placeholder="User ID" onChange={handleChange} />
          </Form.Item>
        </Col>
        <Col span={17}>
          <Form.Item
            name="fullname"
            label="Full Name"
            initialValue={values.fullname}
            rules={[
              {
                required: true,
                message: "Please enter full name",
              },
            ]}
          >
            <Input disabled placeholder="Full Name" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="email"
            label="Email"
            initialValue={values.email}
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input disabled placeholder="Email" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone_number"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
            initialValue={values.phone_number}
          >
            <Input
              disabled
              placeholder="eg: 0918......"
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Edit Status",
              },
            ]}
            initialValue={values.status}
          >
            <Select placeholder="Set status" onChange={handleChangeStatus}>
              <Option value={"pending"}>Pending</Option>
              <Option value={"processing"}>Processing</Option>
              <Option value={"shipped"}>Shipped</Option>
              <Option value={"delivered"}>Delivered</Option>
              <Option value={"cancelled"}>Cancelled</Option>
            </Select>
            {/* <Input onChange={handleChange} /> */}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="shipping_address"
            label="Shipping Address"
            initialValue={values.shipping_address}
          >
            <Input
              disabled
              placeholder="Shipping Address"
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const EditOrderFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { orderEdit } = props;
    return {
      id: orderEdit.id,
      user_id: orderEdit.user_id,
      fullname: orderEdit.fullname,
      phone_number: orderEdit.phone_number,
      email: orderEdit.email,
      address: orderEdit.address,
      note: orderEdit.note,
      total_money: orderEdit.total_money,
      shipping_method: orderEdit.shipping_method,
      shipping_address: orderEdit.shipping_address,
      shipping_date: orderEdit.shipping_date,
      payment_method: orderEdit.payment_method,
      status: orderEdit.status,
      active: orderEdit.active,
    };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(props);
    console.log(values);
    props.dispatch({
      type: "EDIT_ORDER_API",
      editOrder: {
        id: values.id,
        user_id: props.orderEdit.user_id,
        fullname: values.fullname,
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
        note: values.note,
        total_money: values.total_money,
        shipping_method: props.orderEdit.shipping_method,
        shipping_address: values.shipping_address,
        shipping_date: props.orderEdit.shipping_date,
        payment_method: props.orderEdit.payment_method,
        status: values.status,
      },
    });
  },
  displayName: "EditOrderFormik",
})(FormEditOrder);

const mapStateToProps = (state) => {
  return {
    orderEdit: state.OrderReducer.orderEdit,
  };
};

export default connect(mapStateToProps)(EditOrderFormik);
