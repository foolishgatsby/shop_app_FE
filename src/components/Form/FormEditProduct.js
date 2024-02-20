import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import { Option } from "antd/es/mentions";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  addCategory_api,
  editCategory_api,
  editProduct_api,
} from "../../redux/actions/ActionsApi";
import { DOMAIN, TOKEN } from "../../util/constants/settingSystem";
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function FormEditProduct(props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChangeFile = ({ fileList, file }) => {
    // Cập nhật trạng thái của fileList
    // Đây là bước quan trọng để Ant Design `Upload` biết được danh sách file hiện tại
    setFileList(fileList);

    // Tùy chỉnh thêm: bạn có thể thực hiện gọi API tải file lên server tại đây
    // Lưu ý: Đối với việc tải lên thực tế, bạn có thể cần thực hiện trong hàm khác
    // và sử dụng `file` để tải lên.
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const transformProductImagesToFileList = (productImages) => {
    return productImages.map((img, index) => ({
      uid: img.id, // Sử dụng id của ảnh làm uid, đảm bảo là duy nhất
      name: `Image ${index + 1}`, // Tạo một tên giả định, hoặc bạn có thể sửa đổi nếu có thông tin tên file
      status: "done", // Đánh dấu đã tải lên thành công
      url: `${DOMAIN}/products/images/${img.image_url}`, // Sử dụng URL đã được cung cấp từ API
    }));
  };

  const customUploadFunction = async (options) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(`${DOMAIN}/products/uploads/${values.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Upload success");
        // Xử lý thêm nếu cần
        onSuccess(data, file); // Thông báo cho Upload component rằng tải lên thành công

        // Xử lý để cập nhật giao diện người dùng ở đây
        // Ví dụ: cập nhật danh sách ảnh để hiển thị ảnh mới
        const newImage = {
          uid: data.uid, // Giả sử server trả về một uid duy nhất cho mỗi ảnh
          name: file.name,
          status: "done",
          url: data.url, // URL để truy cập ảnh
        };
        setFileList((prevList) => [...prevList, newImage]); // Cập nhật danh sách ảnh với ảnh mới
      } else {
        console.log("Upload failed");
        onError(new Error("Upload failed"));
      }
    } catch (error) {
      console.log(error);
      onError(new Error("Upload error: " + error.message));
    }
  };

  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);
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

  const handleChangeSelectCategory = (value) => {
    console.log(value);
    setFieldValue("category_id", value);
  };

  const [fileList, setFileList] = useState(() =>
    transformProductImagesToFileList(values.product_images || [])
  );

  const handleRemove = async (file) => {
    console.log(file);
    // Gọi API để xóa ảnh trên server
    // Giả sử API của bạn cần ID của ảnh để xóa
    try {
      const response = await fetch(`${DOMAIN}/products/images/${file.uid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
      });

      if (response.ok) {
        // Xử lý logic sau khi xóa ảnh thành công (nếu cần)
        console.log("Image deleted successfully");
      } else {
        // Xử lý lỗi (nếu có)
        console.error("Failed to delete the image");
      }
    } catch (error) {
      console.error("Error deleting the image:", error);
    }
  };

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
            <Select
              placeholder="Category select"
              onChange={handleChangeSelectCategory}
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
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Product's Images">
            <Upload
              action={`${DOMAIN}/products/uploads/${values.id}`}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChangeFile}
              onRemove={handleRemove}
              customRequest={customUploadFunction} // Tùy chỉnh hàm tải file của bạn
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
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
      product_images: props.editProduct.product_images,
    };
  },

  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    // nhấn submit của form => dispatch add category api
    // console.log(props);
    console.log(values);
    const editProduct = {
      name: values.name,
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
