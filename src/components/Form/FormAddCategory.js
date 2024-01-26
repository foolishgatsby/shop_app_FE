import { Col, DatePicker, Form, Input, Row, Select } from "antd";
// import { Option } from "antd/es/mentions";
import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { addCategory_api } from "../../redux/actions/ActionsApi";
const { Option } = Select;

function FormAddCategory(props) {
  // console.log(props);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  // console.log(values);

  const dispatch = useDispatch();

  useEffect(() => {
    //load sự kiện submit form
    dispatch({
      type: "SET_SUBMIT_ADD_CATEGORY",
      submitFunc: handleSubmit,
    });
  }, []);

  return (
    <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Category Name"
            initialValue={""}
            rules={[
              {
                required: true,
                message: "Please enter category name",
              },
            ]}
          >
            <Input placeholder="Category Name" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const AddCategoryFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return { name: "" };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(values);
    props.dispatch(addCategory_api(values.name));
  },
  displayName: "AddCategoryFormik",
})(FormAddCategory);

export default connect()(AddCategoryFormik);
