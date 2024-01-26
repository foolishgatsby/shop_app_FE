import { Col, DatePicker, Form, Input, Row, Select } from "antd";
// import { Option } from "antd/es/mentions";
import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  addCategory_api,
  editCategory_api,
} from "../../redux/actions/ActionsApi";
const { Option } = Select;

function FormEditCategory(props) {
  // console.log(props);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  //   console.log(values);

  const dispatch = useDispatch();

  useEffect(() => {
    //load sự kiện submit form
    dispatch({
      type: "SET_SUBMIT_EDIT_CATEGORY",
      submitFunc: handleSubmit,
    });
  }, []);

  return (
    <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item name="id" label="Category ID" initialValue={values.id}>
            <Input placeholder="Category Id" disabled />
          </Form.Item>
        </Col>
        <Col span={17}>
          <Form.Item
            name="name"
            label="Category Name"
            initialValue={values.name}
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

const EditCategoryFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return { id: props.categoryEdit.id, name: props.categoryEdit.name };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(props);
    console.log(values);
    props.dispatch(editCategory_api(values.id, values.name));
  },
  displayName: "EditCategoryFormik",
})(FormEditCategory);

const mapStateToProps = (state) => {
  return { categoryEdit: state.AllCategoriesReducer.categoryEdit };
};

export default connect(mapStateToProps)(EditCategoryFormik);
