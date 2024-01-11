import React from "react";
// style.module.css
import homeHeaderStyle from "./HomeHeader.module.css";
// library
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function HomeHeader(props) {
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
              <NavLink to="/user/signin">
                <i className="far fa-user" /> My Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div id={homeHeaderStyle.header}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3 d-flex justify-content-center d-lg-block">
              <div className={homeHeaderStyle.headerLogo}>
                <a href="#" className={homeHeaderStyle.logo}>
                  <img
                    src={require("../../../assets/img/logo.png.webp")}
                    alt="logo"
                  />
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className={homeHeaderStyle.headerSearch}>
                <form>
                  <select className={homeHeaderStyle.inputSelect}>
                    <option value={0}>All Categories</option>
                    <option value={1}>Category 01</option>
                    <option value={1}>Category 02</option>
                  </select>
                  <input
                    className={clsx(homeHeaderStyle.input, "input")}
                    placeholder="Search here"
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
                    <div className={homeHeaderStyle.qty}>3</div>
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
                      <div
                        className={clsx(
                          homeHeaderStyle.productWidget,
                          "product-widget"
                        )}
                      >
                        <div
                          className={clsx(
                            homeHeaderStyle.productImg,
                            "product-img"
                          )}
                        >
                          <img
                            src={require("../../../assets/img/product01.png.webp")}
                            alt="product"
                          />
                        </div>
                        <div
                          className={clsx(
                            homeHeaderStyle.productBody,
                            "product-body"
                          )}
                        >
                          <h3 className="product-name">
                            <a href="#">product name goes here</a>
                          </h3>
                          <h4
                            className={clsx(
                              homeHeaderStyle.productPrice,
                              "product-price"
                            )}
                          >
                            <span className="qty">1x</span>$980.00
                          </h4>
                        </div>
                        <button className="delete">
                          <i className="fa fa-close" />
                        </button>
                      </div>
                      <div
                        className={clsx(
                          homeHeaderStyle.productWidget,
                          "product-widget"
                        )}
                      >
                        <div
                          className={clsx(
                            homeHeaderStyle.productImg,
                            "product-img"
                          )}
                        >
                          <img
                            src={require("../../../assets/img/product02.png.webp")}
                            alt="product"
                          />
                        </div>
                        <div
                          className={clsx(
                            homeHeaderStyle.productBody,
                            "product-body"
                          )}
                        >
                          <h3 className="product-name">
                            <a href="#">product name goes here</a>
                          </h3>
                          <h4
                            className={clsx(
                              homeHeaderStyle.productPrice,
                              "product-price"
                            )}
                          >
                            <span className="qty">3x</span>$980.00
                          </h4>
                        </div>
                        <button className="delete">
                          <i className="fa fa-close" />
                        </button>
                      </div>
                    </div>
                    <div className={homeHeaderStyle.cartSummary}>
                      <small>3 Item(s) selected</small>
                      <h5 style={{ fontSize: "12px" }}>SUBTOTAL: $2940.00</h5>
                    </div>
                    <div className={homeHeaderStyle.cartBtns}>
                      <a href="#">View Cart</a>
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
