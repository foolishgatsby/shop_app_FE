import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { Progress, Rate } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById_api } from "../../redux/actions/ActionsApi";
import { DOMAIN } from "../../util/constants/settingSystem";

export default function ProductDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.ProductTableReducer);
  const { evaluateList, averageRate } = useSelector(
    (state) => state.EvaluateReducer
  );
  const { isLogin, userDetail } = useSelector((state) => state.IsLoginReducer);
  useEffect(() => {
    // dispatch get product by id
    dispatch(getProductById_api(id));
    // get userDetail
    if (isLogin) {
      dispatch({
        type: "GET_USER_DETAIL",
      });
    }
    dispatch({
      type: "GET_EVALUATES_BY_PRODUCT_API",
      product_id: id,
    });
  }, []);
  const [quantity, setquantity] = useState(1);

  const increasequantity = () => {
    setquantity(quantity + 1);
    console.log(quantity);
  };

  const decreasequantity = () => {
    if (quantity <= 1) {
      setquantity(1);
    } else {
      setquantity(quantity - 1);
    }
    console.log(quantity);
  };

  const roundHalf = (num) => {
    return Math.round(num * 2) / 2;
  };

  const [evaluate, setEvaluate] = useState({
    comment: "",
    rate: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluate({
      ...evaluate,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    // console.log(evaluate, id, userDetail.id);
    if (!isLogin) {
      alert("Please login before you post your evaluate about product");
    }
    dispatch({
      type: "POST_EVALUATE_API",
      evaluateInfo: {
        comment: evaluate.comment,
        rate: evaluate.rate,
        product_id: id,
        user_id: userDetail.id,
      },
    });
  };

  const renderRating = () => {
    return (
      <div className="text-center">
        <h5 className="mb-2">{averageRate}/5</h5>
        <p>{`( ${evaluateList.length} đánh giá )`}</p>
      </div>
    );
  };

  const calculateEachStarNum = (star) => {
    let num = 0;
    evaluateList.forEach((evaluate, index) => {
      if (Math.round(evaluate.rate) === star) {
        num++;
      }
    });
    return num;
  };

  const calcPercentOfRate = (star) => {
    let num = calculateEachStarNum(star);
    return Math.round((num / evaluateList.length) * 100);
  };

  const renderComment = () => {
    return evaluateList.map((evaluate, index) => {
      return (
        <div className="comment mb-2">
          <div className="comment-title">
            <div className="d-flex align-items-start">
              <p className="me-2 name-letter">
                {evaluate.user.fullName.charAt(0)}
              </p>
              <div className="comment-info">
                <span className="comment-name">{evaluate.user.fullName}</span>
                {/* <p className="date-time">
                  <i className="far fa-clock" /> 24/10/2023 17:30
                </p> */}
              </div>
            </div>
          </div>
          <div className="comment-review ms-5">
            <div className="review-rating">{evaluate.rate}/5</div>
            <div className="review-txt">{evaluate.comment}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container section">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-7">
          <div
            className="p-3"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              boxShadow:
                "0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15)",
            }}
          >
            <div className="row pb-5">
              <div className="col-12">
                <div
                  id="productCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-indicators mb-0"
                    style={{ bottom: "-20px" }}
                  >
                    {productDetail.product_images?.map((img, index) => {
                      return (
                        <button
                          key={index}
                          style={{ width: "50px" }}
                          type="button"
                          data-bs-target="#productCarousel"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : ""}
                          aria-label={`Slide ${index + 1}`}
                        >
                          <img
                            style={{
                              border: "0.5px solid #000",
                              borderRadius: "10px",
                              height: "50px",
                            }}
                            src={`${DOMAIN}/products/images/${img.image_url}`}
                            className="w-100 d-block"
                            alt={`${index + 1} slide`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="carousel-inner" role="listbox">
                    {productDetail.product_images?.map((img, index) => {
                      if (index === 0) {
                        return (
                          <div key={index} className={`carousel-item active`}>
                            <img
                              style={{ height: "600px" }}
                              src={`${DOMAIN}/products/images/${img.image_url}`}
                              className="w-100 d-block"
                              alt={`${index + 1} slide`}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className={`carousel-item`}>
                            <img
                              style={{ height: "600px" }}
                              src={`${DOMAIN}/products/images/${img.image_url}`}
                              className="w-100 d-block"
                              alt={`${index + 1} slide`}
                            />
                          </div>
                        );
                      }
                    })}
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
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-5">
          <h3 className="mb-2">{productDetail.name}</h3>
          <div className="product-rating mb-3">
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="fa fa-star" style={{ color: "#ef233c" }} />
            <i className="far fa-star" />
            <span className="ms-2">{"(100)"}</span>
          </div>
          <h4 className="product-price text-danger mb-2">
            ${productDetail.price}
          </h4>
          <div className="product-descirption mb-3">
            <h4 className="fw-normal">Description</h4>
            <h5 className="fw-light">{productDetail.description}</h5>
          </div>
          <div className="product-order d-flex justify-content-evenly">
            <div
              className="product-qty text-center p-2 d-flex justify-content-between align-items-center fw-bold"
              style={{
                border: "1px solid #000",
                borderRadius: "30px",
                width: "30%",
              }}
            >
              <button
                className="increase btn fw-bold"
                onClick={decreasequantity}
              >
                -
              </button>
              {quantity}
              <button
                className="decrease btn fw-bold"
                onClick={increasequantity}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-dark w-50"
              style={{ borderRadius: "30px" }}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  product: productDetail,
                  quantity: quantity,
                });
              }}
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
            {/* Render Rating trung bình */}
            <div
              className="col-lg-5 d-flex justify-content-center align-items-center"
              style={{ borderRight: "1px solid rgba(0,0,0,0.5)" }}
            >
              {renderRating()}
            </div>
            {/* Render Rating */}
            <div className="col-lg-7">
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  5 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={calcPercentOfRate(5)}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>{calculateEachStarNum(5)} đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  4 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={calcPercentOfRate(4)}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>{calculateEachStarNum(4)} đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  3 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={calcPercentOfRate(3)}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>{calculateEachStarNum(3)} đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  2 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={calcPercentOfRate(2)}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>{calculateEachStarNum(2)} đánh giá</span>
              </div>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">
                  1 <i className="fa fa-star" />
                </div>
                <Progress
                  percent={calculateEachStarNum(1)}
                  strokeColor={"#d10024"}
                  className="w-75"
                  showInfo={false}
                ></Progress>
                <span>{calculateEachStarNum(1)} đánh giá</span>
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div className="d-flex justify-content-center">
            <div>
              <h5 className="mb-3">Bạn đánh giá sao về sản phẩm này?</h5>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#evaluateModal"
                >
                  Đánh giá ngay
                </button>
              </div>
            </div>
          </div>
          {/* <div className="comment">
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
          </div> */}
          <hr className="my-3" />
          {renderComment()}
        </div>
      </div>

      <div
        className="modal fade"
        id="evaluateModal"
        tabIndex={-1}
        aria-labelledby="evaluateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="evaluateModalLabel">
                Đánh giá và nhận xét ngay
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <h4>{productDetail.name}</h4>
              <h5>Đánh giá</h5>
              <Rate
                allowHalf
                defaultValue={5}
                onChange={(value) => {
                  setEvaluate({
                    ...evaluate,
                    rate: value,
                  });
                }}
              />
              <hr className="my-3" />
              <textarea
                name="comment"
                className="w-100"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger w-100"
                // data-bs-dismiss="modal"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
