import React, { useEffect, useState } from "react";
// style.module.css
import homeHeaderStyle from "./HomeHeader.module.css";
// library
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories_api } from "../../../redux/actions/ActionsApi";
import { DOMAIN } from "../../../util/constants/settingSystem";

export default function HomeHeader(props) {
  const { isLogin, email } = useSelector((state) => state.IsLoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);
  const { cartList, numOfItem, totalMoney } = useSelector(
    (state) => state.CartReducer
  );
  useEffect(() => {
    dispatch(getCategories_api());
  }, []);

  const [searchInfo, setSearchInfo] = useState({
    category_id: "",
    keyword: "",
  });

  const renderCart = () => {
    return cartList?.map(({ product, quantity }, index) => {
      return (
        <div
          key={index}
          className={clsx(homeHeaderStyle.productWidget, "product-widget")}
        >
          <div className={clsx(homeHeaderStyle.productImg, "product-img")}>
            <img
              src={`${DOMAIN}/products/images/${product.thumbnail}`}
              alt="product"
            />
          </div>
          <div className={clsx(homeHeaderStyle.productBody, "product-body")}>
            <h3 className="product-name">
              <a href="#">{product.name}</a>
            </h3>
            <h4 className={clsx(homeHeaderStyle.productPrice, "product-price")}>
              <span className="qty">${quantity}x</span>$
              {Number(product.price).toLocaleString()}
            </h4>
          </div>
          <button
            className="delete"
            onClick={() => {
              dispatch({
                type: "DELETE_FROM_CART",
                product: product,
              });
            }}
          >
            <i className="fa fa-times" style={{ color: "white" }} />
          </button>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchInfo.keyword}/${searchInfo.category_id}`);
  };

  // console.log(homeHeaderStyle);
  return (
    <header>
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
              {isLogin === false ? (
                <NavLink to="/users/signin">
                  <i className="far fa-user" />{" "}
                  {email !== "" ? email : "My Accout"}
                </NavLink>
              ) : (
                // update profile
                <NavLink to={`/users/${email}`}>
                  <i className="far fa-user" />{" "}
                  {email !== "" ? email : "My Accout"}
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div id={homeHeaderStyle.header}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3 d-flex justify-content-center d-lg-block">
              <div className={homeHeaderStyle.headerLogo}>
                <NavLink to={"/home"} className={homeHeaderStyle.logo}>
                  <img
                    src={require("../../../assets/img/logo.png.webp")}
                    alt="logo"
                  />
                </NavLink>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className={homeHeaderStyle.headerSearch}>
                <form onSubmit={handleSubmit}>
                  <select
                    name="category_id"
                    className={homeHeaderStyle.inputSelect}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    defaultValue={0}
                  >
                    <option value={0} disabled hidden>
                      Select category
                    </option>
                    {arrCategories?.map((category, index) => {
                      return (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    name="keyword"
                    className={clsx(homeHeaderStyle.input, "input")}
                    placeholder="Search here"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <button type="submit" className={homeHeaderStyle.searchBtn}>
                    Search
                  </button>
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-3 clearfix">
              <div className={homeHeaderStyle.headerCtn}>
                <div>
                  <a href="#">
                    <i className="fa fa-heart" />
                    <span>Your Wishlist</span>
                    <div className={homeHeaderStyle.qty}>2</div>
                  </a>
                </div>
                <div className="dropdown">
                  <a
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    role="button"
                    href="#"
                  >
                    <i className="fa fa-shopping-cart" />
                    <span>Your Cart</span>
                    <div className={homeHeaderStyle.qty}>{numOfItem}</div>
                  </a>
                  <div
                    className={clsx(
                      homeHeaderStyle.cartDropdown,
                      "cart-dropdown",
                      "dropdown-menu dropdown-menu-end"
                    )}
                  >
                    <div
                      className={clsx(homeHeaderStyle.cartList, "cart-list")}
                    >
                      {renderCart()}
                    </div>
                    <div className={homeHeaderStyle.cartSummary}>
                      <small>
                        {numOfItem} Item{numOfItem > 1 ? "(s)" : ""} selected
                      </small>
                      <h5 style={{ fontSize: "12px" }}>
                        SUBTOTAL: ${Number(totalMoney).toLocaleString()}
                      </h5>
                    </div>
                    <div className={homeHeaderStyle.cartBtns}>
                      <NavLink to={"/cart"}>View Cart</NavLink>
                      <a href="#">
                        Checkout <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="menu-toggle" style={{ display: "none" }}>
                  <a href="#">
                    <i className="fa fa-bars" />
                    <span>Menu</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
