import { Col, DatePicker, Form, Input, Row, Select } from "antd";
// import { Option } from "antd/es/mentions";
import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  addCategory_api,
  editCategory_api,
  editProduct_api,
} from "../../redux/actions/ActionsApi";
const { Option } = Select;

function FormEditProduct(props) {
  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);
  // console.log(props);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  //   console.log(values);

  const dispatch = useDispatch();

  useEffect(() => {
    //load sự kiện submit form
    dispatch({
      type: "SET_SUBMIT_EDIT_PRODUCT",
      submitFunc: handleSubmit,
    });
  }, []);

  return (
    <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={7}>
          <Form.Item name="id" label="Product ID" initialValue={values.id}>
            <Input placeholder="Product Id" disabled />
          </Form.Item>
        </Col>
        <Col span={17}>
          <Form.Item
            name="name"
            label="Product's Name"
            initialValue={values.name}
            rules={[
              {
                required: true,
                message: "Please enter product's name",
              },
            ]}
          >
            <Input placeholder="Product Name" onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="category_id"
            label="Category"
            initialValue={values.category_id}
          >
            <Select placeholder="Category select" onChange={handleChange}>
              {arrCategories.map((category) => {
                return <Option value={category.id}>{category.name}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label="Product's Price"
            initialValue={values.price}
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
            initialValue={values.description}
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

const EditProductFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      id: props.editProduct.id,
      name: props.editProduct.name,
      price: props.editProduct.price,
      category_id: props.editProduct.category_id,
      description: props.editProduct.description,
    };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(props);
    // console.log(values);
    const editProduct = {
      name: values.id,
      price: values.price,
      category_id: values.category_id,
      description: values.description,
    };
    props.dispatch(editProduct_api(values.id, editProduct));
  },
  displayName: "EditProductFormik",
})(FormEditProduct);

const mapStateToProps = (state) => {
  return { editProduct: state.ProductTableReducer.editProduct };
};

export default connect(mapStateToProps)(EditProductFormik);
