import { Col, Form, Input, Row, Select } from "antd";

// import { Option } from "antd/es/mentions";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  addCategory_api,
  addProduct_api,
} from "../../redux/actions/ActionsApi";
import { DOMAIN, TOKEN } from "../../util/constants/settingSystem";
const { Option } = Select;

function FormAddProduct(props) {
  // console.log(props);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);
  const { temp_category_id } = useSelector(
    (state) => state.ProductTableReducer
  );
  const onChangeSelect = (value) => {
    props.setFieldValue("category_id", value);
  };
  // console.log(values);

  const dispatch = useDispatch();

  useEffect(() => {
    //load sự kiện submit form
    dispatch({
      type: "SET_SUBMIT_ADD_PRODUCT",
      submitFunc: handleSubmit,
    });
  }, []);

  return (
    <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Product's Name"
            initialValue={""}
            rules={[
              {
                required: true,
                message: "Please enter product's name",
              },
            ]}
          >
            <Input placeholder="Product's Name" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="category_id"
            label="Product's category"
            initialValue={temp_category_id}
            rules={[
              {
                required: true,
                message: "Please enter product's price",
              },
            ]}
          >
            <Select
              disabled
              placeholder="Select Category"
              onChange={onChangeSelect}
            >
              {arrCategories.map((category, index) => {
                return (
                  <Option key={index} value={category.id}>
                    {category.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            name="price"
            label="Product's price"
            initialValue={""}
            rules={[
              {
                required: true,
                message: "Please enter product's price",
              },
            ]}
          >
            <Input placeholder="Product's price" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            initialValue={""}
            rules={[
              {
                required: true,
                message: "Please enter some product's description",
              },
            ]}
          >
            <Input.TextArea onChange={handleChange} rows={5} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const AddProductFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      name: "",
      price: "",
      description: "",
      category_id: props.category_id,
    };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(values);
    const { name, price, description, category_id } = values;
    const newProduct = {
      name: name,
      price: price,
      description: description,
      category_id: category_id,
    };
    props.dispatch(addProduct_api(newProduct));
  },
  displayName: "AddCategoryFormik",
})(FormAddProduct);

const mapStatetoProps = (state) => {
  return {
    category_id: state.ProductTableReducer.temp_category_id,
  };
};

export default connect(mapStatetoProps)(AddProductFormik);
