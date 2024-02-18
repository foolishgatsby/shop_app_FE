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

function FormEditAccount(props) {
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
    //load sự kiện submit form
    dispatch({
      type: "SET_SUBMIT_EDIT_USER",
      submitFunc: handleSubmit,
    });
  }, []);

  const handleChangeRole = (value) => {
    setFieldValue("role_id", value);
  };

  const handleChangeStatus = (value) => {
    setFieldValue("active", value);
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
          <Form.Item name="role_id" label="Role" initialValue={values.role.id}>
            <Select placeholder="Role select" onChange={handleChangeRole}>
              <Option value={1}>User</Option>
              <Option value={2}>Admin</Option>
            </Select>
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
            name="active"
            label="Status"
            rules={[
              {
                required: true,
                message: "Edit Status",
              },
            ]}
            initialValue={values.active === true ? 1 : 0}
          >
            <Select placeholder="Status" onChange={handleChangeStatus}>
              <Option value={0}>Banned</Option>
              <Option value={1}>Active</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="Address"
            initialValue={values.address}
          >
            <Input disabled placeholder="Address" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const EditAccountFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { accountEdit } = props;
    return {
      id: accountEdit.id,
      fullname: accountEdit.fullname,
      phone_number: accountEdit.phone_number,
      email: accountEdit.email,
      address: accountEdit.address,
      role: accountEdit.role,
      active: accountEdit.active,
    };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(props);
    console.log(values);
    props.dispatch({
      type: "EDIT_ACCOUNT_API",
      editAccount: {
        id: values.id,
        is_active: values.active,
        role_id: values.role_id,
      },
    });
  },
  displayName: "EditAccountFormik",
})(FormEditAccount);

const mapStateToProps = (state) => {
  return {
    accountEdit: state.AccountManageReducer.accountEdit,
  };
};

export default connect(mapStateToProps)(EditAccountFormik);
