import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import homeHeaderStyle from "../../components/Headers/HomeHeader/HomeHeader.module.css";
import CartDetail from "./CartDetail";

export default function Cart(props) {
  const { isLogin, email } = useSelector((state) => state.IsLoginReducer);
  const dispatch = useDispatch();

  const { cartList, numOfItem, totalMoney } = useSelector(
    (state) => state.CartReducer
  );

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
                <h5 className="ms-3">${Number(totalMoney).toLocaleString()}</h5>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-danger btn-lg w-100 fw-bold"
                >
                  PROCEED TO PAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
