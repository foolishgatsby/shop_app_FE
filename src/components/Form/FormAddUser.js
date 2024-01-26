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

function FormAddUser(props) {
  // console.log(props);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  //   console.log(values);

  const dispatch = useDispatch();

  useEffect(() => {
    //load sự kiện submit form
    dispatch({
      type: "SET_SUBMIT_ADD_USER",
      submitFunc: handleSubmit,
    });
  }, []);

  const setDateOfBirth = (_, dateString) => {
    // console.log(dateString);
    props.setFieldValue("date_of_birth", dateString);
  };

  return (
    <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item name="role_id" label="Role" initialValue={1}>
            <Select placeholder="Role select" onChange={handleChange}>
              <Option value={1}>User</Option>
              <Option value={2}>Admin</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={17}>
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter full name",
              },
            ]}
          >
            <Input placeholder="Full Name" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="email"
            label="Enter your email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="Email" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="password"
            label="Enter your password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input placeholder="Password" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="retype_password"
            label="Retype your password"
            rules={[
              {
                required: true,
                message: "Please retype your password",
              },
            ]}
          >
            <Input placeholder="Retype password" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone_number"
            label="Enter phone number"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input placeholder="eg: 0918......" onChange={handleChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date_of_birth"
            label="Select date of birth"
            rules={[
              {
                required: true,
                message: "Select your birthday",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} onChange={setDateOfBirth} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="address" label="Enter your address">
            <Input placeholder="Address" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const AddUserFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      fullname: "",
      phone_number: "",
      email: "",
      address: "",
      password: "",
      retype_password: "",
      date_of_birth: "",
      role_id: 1,
    };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(props);
    // console.log(values);
    const newUser = {
      email: values.email, // required and valid
      password: values.password, // required and valid
      retype_password: values.retype_password,
      fullname: values.fullname, // required
      phone_number: values.phone_number, //required
      address: values.address, // none required
      date_of_birth: values.date_of_birth, // required
    };
    props.dispatch(signup_api(newUser, values.role_id));
  },
  displayName: "AddUserFormik",
})(FormAddUser);

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(AddUserFormik);
