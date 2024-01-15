import React, { useState } from "react";
import "./ProductDetail.css";
import { Progress } from "antd";

export default function ProductDetail(props) {
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty(qty + 1);
    console.log(qty);
  };

  const decreaseQty = () => {
    if (qty <= 1) {
      setQty(1);
    } else {
      setQty(qty - 1);
    }
    console.log(qty);
  };

  return (
    <div className="container section">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div
            className="p-3"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow:
                "0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15)",
            }}
          >
            <div className="row">
              <div className="col-12 col-lg-6">
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators mb-0">
                    <button
                      style={{ width: "50px" }}
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    >
                      <img
                        style={{
                          border: "0.5px solid #000",
                          borderRadius: "10px",
                        }}
                        src={require("../../assets/img/product01.png.webp")}
                        className="w-100 d-block"
                        alt="First slide"
                      />
                    </button>
                    <button
                      style={{ width: "50px" }}
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    >
                      <img
                        style={{
                          border: "0.5px solid #000",
                          borderRadius: "10px",
                        }}
                        src={require("../../assets/img/product01.png.webp")}
                        className="w-100 d-block"
                        alt="Second slide"
                      />
                    </button>
                    <button
                      style={{ width: "50px" }}
                      type="button"
                      data-bs-target="#productCarousel"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    >
                      <img
                        style={{
                          border: "0.5px solid #000",
                          borderRadius: "10px",
                        }}
                        src={require("../../assets/img/product01.png.webp")}
                        className="w-100 d-block"
                        alt="Third slide"
                      />
                    </button>
                  </div>
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                      <img
                        src={require("../../assets/img/product01.png.webp")}
                        className="w-100 d-block"
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={require("../../assets/img/product01.png.webp")}
                        className="w-100 d-block"
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={require("../../assets/img/product01.png.webp")}
                        className="w-100 d-block"
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                      style={{
                        backgroundColor: "rgba(0,0,0,.3)",
                        borderRadius: "0 200px 200px 0",
                        width: "3rem",
                        height: "3rem",
                        marginRight: "30px",
                      }}
                    />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#productCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                      style={{
                        backgroundColor: "rgba(0,0,0,.3)",
                        borderRadius: "200px 0 0 200px",
                        width: "3rem",
                        height: "3rem",
                        marginLeft: "30px",
                      }}
                    />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-5 mt-lg-0">
                <h3 className="fw-normal">Thông số kỹ thuật</h3>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Kích thước màn</td>
                      <td>14 inches</td>
                    </tr>
                    <tr>
                      <td>Loại card đồ hoạ</td>
                      <td>AMD Radeon Graphics</td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>LPDDR4X Onboard</td>
                    </tr>
                    <tr>
                      <td>Ổ cứng</td>
                      <td>512GB M.2 NVMe PCIe 3.0 SSD</td>
                    </tr>
                    <tr>
                      <td>Pin</td>
                      <td>75WHrs, 2S2P, 4-cell Li-ion</td>
                    </tr>
                    <tr>
                      <td>Hệ điều hành</td>
                      <td>Windows 11 Home</td>
                    </tr>
                    <tr>
                      <td>Độ phân giải màn hình</td>
                      <td>2880 x 1800 pixels</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn w-100 btn-product-detail
                    d-flex justify-content-center align-items-baseline"
                    style={{ border: "1px solid #000" }}
                    data-bs-toggle="modal"
                    data-bs-target="#modal-product-detail"
                  >
                    Xem cấu hình chi tiết
                    <i
                      className="fa fa-angle-down"
                      style={{ fontSize: "16px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <h3 className="mb-2">Laptop Asus Zenbook 14 OLED UM3402YA-KM405W</h3>
          <div className="product-rating mb-3">
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="far fa-star" />
            <span className="ms-2">{"(100)"}</span>
          </div>
          <h4 className="product-price text-danger mb-5">
            $980.00{" "}
            <del
              style={{ opacity: ".7", color: "#000" }}
              className="old-price fw-normal"
            >
              $990.00
            </del>
          </h4>
          <div className="product-order d-flex justify-content-evenly">
            <div
              className="product-qty text-center p-2 d-flex justify-content-between align-items-center fw-bold"
              style={{
                border: "1px solid #000",
                borderRadius: "30px",
                width: "30%",
              }}
            >
              <button className="increase btn fw-bold" onClick={decreaseQty}>
                -
              </button>
              {qty}
              <button className="decrease btn fw-bold" onClick={increaseQty}>
                +
              </button>
            </div>
            <button
              className="btn btn-dark w-50"
              style={{ borderRadius: "30px" }}
            >
              <i className="fa fa-cart-plus" /> Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div
          className="col-12 p-3"
          style={{
            marginLeft: "12px",
            marginRight: "12px",
            backgroundColor: "#fff",
            borderRadius: "20px",
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15)",
          }}
        >
          <h5 className="mb-5">Đánh giá & nhận xét {"PRODUCT NAME"}</h5>
          <div className="row">
            <div
              className="col-lg-5 d-flex justify-content-center align-items-center"
              style={{ borderRight: "1px solid rgba(0,0,0,0.5)" }}
            >
              <div className="text-center">
                <h5 className="mb-2">5.0/5</h5>
                <i className="fa fa-star" style={{ color: "#ef233c" }} />
                <i className="fa fa-star" style={{ color: "#ef233c" }} />
                <i className="fa fa-star" style={{ color: "#ef233c" }} />
                <i className="fa fa-star" style={{ color: "#ef233c" }} />
                <i className="fa fa-star" style={{ color: "#ef233c" }} />
                <p>{"( 5 đánh giá )"}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  5 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={100}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>5 đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  0 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={0}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>0 đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  3 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={0}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>0 đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  2 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={0}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>0 đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  1 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={0}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>0 đánh giá</span>
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div className="comment">
            <div className="comment-title">
              <div className="d-flex align-item-center">
                <p className="me-2 name-letter">N</p>
                <div className="comment-info">
                  <span className="comment-name">Nguyễn A</span>
                  <p className="date-time">
                    <i className="far fa-clock" /> 24/10/2023 17:30
                  </p>
                </div>
              </div>
            </div>
            <div className="comment-review">
              <div className="review-rating"></div>
              <div className="review-txt"></div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL POPUP XEM CHI TIE^T' */}
      {/* Modal Body */}
      <div
        className="modal fade"
        id="modal-product-detail"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#d10024" }}
            >
              <h5 className="modal-title text-white" id="modalTitleId">
                Thông số kỹ thuật
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, .5)",
                }}
              />
            </div>
            <div className="modal-body">
              <table className="table "></table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn w-100"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "#d10024", color: "white" }}
              >
                <i className="fa fa-times me-2" />
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
