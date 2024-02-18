import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import homeHeaderStyle from "../../components/Headers/HomeHeader/HomeHeader.module.css";
import CartDetail from "./CartDetail";

export default function Cart(props) {
  const { isLogin, email } = useSelector((state) => state.IsLoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartList, numOfItem, totalMoney } = useSelector(
    (state) => state.CartReducer
  );
  const { userDetail } = useSelector((state) => state.IsLoginReducer);
  const [orderInfo, setOrderInfo] = useState({
    user_id: 0,
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    note: "",
    total_money: 0,
    shipping_method: "express",
    payment_method: "cod",
    cart_items: [],
  });
  useEffect(() => {
    if (isLogin) {
      dispatch({
        type: "GET_USER_DETAIL",
      });
    } else {
      navigate("/users/signin");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  const payment = () => {
    const updatedOrderInfo = {
      ...orderInfo,
      user_id: userDetail.id,
      total_money: totalMoney,
      cart_items: cartList,
    };

    dispatch({
      type: "PAYMENT_API",
      orderInfo: updatedOrderInfo,
    });
  };

  return (
    <div>
      <div id={homeHeaderStyle.topHeader}>
        <div className="container d-flex justify-content-between">
          <ul className={homeHeaderStyle.headerLinks}>
            <li>
              <a href="tel: +84941300169">
                <i className="fa fa-phone-alt" /> +021-95-51-84
              </a>
            </li>
            <li>
              <a href="mailto:email@gmail.com">
                <i className="far fa-envelope" /> email@gmail.com
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/ug3xQaUquE1wrkEE8">
                <i className="fa fa-map-marker-alt" /> 1734 Stonecoal Road
              </a>
            </li>
          </ul>
          <ul className={homeHeaderStyle.headerLinks}>
            <li>
              <a href="#">
                <i className="fa fa-dollar-sign" /> USD
              </a>
            </li>
            <li>
              <NavLink to="/users/signin">
                <i className="far fa-user" />{" "}
                {email !== "" ? email : "My Accout"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <section className="h-100" style={{ backgroundColor: "#ececec" }}>
        <div className="container h-100 py-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row d-flex justify-content-space-between align-items-center h-100">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold mb-0 text-black">Shopping Cart</h3>
                    <div>
                      <p className="mb-0">
                        <NavLink to={"/home"} className="text-body">
                          <i className="fas fa-angle-left mt-1"></i> Back to
                          shopping
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
                {cartList.map((item, index) => {
                  return <CartDetail key={index} item={item} />;
                })}
                <div className="card mb-4">
                  <div className="card-body p-4 d-flex flex-row">
                    <div className="flex-fill">
                      <h4 className="">Total Money</h4>
                    </div>
                    <h5 className="ms-3">
                      ${Number(totalMoney).toLocaleString()}
                    </h5>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <button
                      type="button"
                      className="btn btn-danger btn-lg w-100 fw-bold"
                      onClick={() => {
                        // dispatch action gọi api
                        payment();
                      }}
                    >
                      PROCEED TO PAY
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold mb-0 text-black">Shipping Information</h3>
              <form className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Full name</label>
                  <input
                    name="fullname"
                    type="text"
                    className="form-control"
                    placeholder="enter your full name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    onChange={(e) => handleChange(e)}
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="enter your email"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Phone number</label>
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="phone_number"
                    type="text"
                    className="form-control"
                    placeholder="enter your phone number"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address</label>
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="address"
                    type="text"
                    className="form-control"
                    placeholder="enter your address"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Note</label>
                  <textarea
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="note"
                    className="form-control"
                    placeholder="enter some note"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
