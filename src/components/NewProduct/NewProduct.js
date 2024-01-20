import React, { useRef } from "react";
// import { NavLink } from "react-router-dom";
import NewProductStyle from "./NewProduct.module.css";

// react slick
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../Card/ProductCard";

const sliderSetting = {
  className: NewProductStyle.productSlick,
  dots: false,
  infinite: true,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
  ],
};

export default function NewProduct(props) {
  const sliderRef = useRef(null);

  // custom arrows
  const renderArrows = () => {
    return (
      <div className="products-slick-nav">
        <button
          className="slick-prev slick-arrow"
          aria-label="Previous"
          type="button"
          onClick={() => sliderRef.current.slickPrev()}
        >
          Previous
        </button>
        <button
          className="slick-next slick-arrow"
          aria-label="Next"
          type="button"
          onClick={() => sliderRef.current.slickNext()}
        >
          Next
        </button>
      </div>
    );
  };

  // get data from reducer
  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);
  const { productList } = useSelector((state) => state.ProductTableReducer);

  // render nav-tabs theo categories
  const renderNavTabs = () => {
    return arrCategories?.map((category, index) => {
      return (
        <li className="nav-item" role="presentation" key={index}>
          <a
            className={`nav-link ${category.id === 1 ? "active" : ""}`}
            id={`newProduct-${category.id}-tab`}
            data-bs-toggle="tab"
            data-bs-target={`#newProduct${category.id}`}
            type="button"
            role="tab"
            aria-controls=""
            aria-selected="true"
          >
            {category.name}
          </a>
        </li>
      );
    });
  };

  // render product trong từng tab
  const renderProducts = (id) => {
    return productList
      .filter((product) => product.category_id === id)
      .map((product, index) => {
        return <ProductCard product={product} key={index} />;
      });
  };

  // render tabs theo categories
  const renderTabs = () => {
    return arrCategories?.map((category, index) => {
      return (
        <div
          key={index}
          className={`tab-pane ${category.id === 1 ? "active" : ""}`}
          id={`newProduct${category.id}`}
          role="tabpanel"
          aria-labelledby={`${category.id}-tab`}
          tabIndex={0}
          style={{
            overflowY: "hidden",
            paddingBottom: "60px",
            marginBottom: "-60px",
          }}
        >
          <Slider ref={sliderRef} {...sliderSetting}>
            {/* <div className={NewProductStyle.product}>
              <div className={NewProductStyle.productImg}>
                <img
                  src={require("../../assets/img/product01.png.webp")}
                  alt="product02"
                />
                <div className={NewProductStyle.productLabel}>
                  <span className={NewProductStyle.sale}>-30%</span>
                  <span className={NewProductStyle.new}>NEW</span>
                </div>
              </div>
              <div className={NewProductStyle.productBody}>
                <p className={NewProductStyle.productCategory}>Category</p>
                <h3 className={NewProductStyle.productName}>
                  <NavLink to={"/productdetail"}>
                    product name goes here
                  </NavLink>
                </h3>
                <h4 className={NewProductStyle.productPrice}>
                  $980.00{" "}
                  <del className={NewProductStyle.productOldPrice}>$990.00</del>
                </h4>
                <div className={NewProductStyle.productRating}>
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="far fa-star" />
                </div>
                <div className={NewProductStyle.productBtns}>
                  <button className="add-to-wishlist">
                    <i className="far fa-heart" />
                    <span className={NewProductStyle.tooltip}>
                      add to wishlist
                    </span>
                  </button>
                  <button className="add-to-compare">
                    <i className="fa fa-exchange-alt" />
                    <span className={NewProductStyle.tooltip}>
                      add to compare
                    </span>
                  </button>
                  <button className="quick-view">
                    <i className="fa fa-eye" />
                    <span className={NewProductStyle.tooltip}>quick view</span>
                  </button>
                </div>
              </div>
              <div className={NewProductStyle.addToCart}>
                <button className={NewProductStyle.addToCartBtn}>
                  <i className="fa fa-shopping-cart" /> add to cart
                </button>
              </div>
            </div>
            <div className={NewProductStyle.product}>
              <div className={NewProductStyle.productImg}>
                <img
                  src={require("../../assets/img/product01.png.webp")}
                  alt="product02"
                />
              </div>
              <div className={NewProductStyle.productBody}>
                <p className={NewProductStyle.productCategory}>Category</p>
                <h3 className={NewProductStyle.productName}>
                  <NavLink to={"/productdetail"}>
                    product name goes here
                  </NavLink>
                </h3>
                <h4 className={NewProductStyle.productPrice}>
                  $980.00{" "}
                  <del className={NewProductStyle.productOldPrice}>$990.00</del>
                </h4>
                <div className={NewProductStyle.productRating}>
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="far fa-star" />
                </div>
                <div className={NewProductStyle.productBtns}>
                  <button className="add-to-wishlist">
                    <i className="far fa-heart" />
                    <span className={NewProductStyle.tooltip}>
                      add to wishlist
                    </span>
                  </button>
                  <button className="add-to-compare">
                    <i className="fa fa-exchange-alt" />
                    <span className={NewProductStyle.tooltip}>
                      add to compare
                    </span>
                  </button>
                  <button className="quick-view">
                    <i className="fa fa-eye" />
                    <span className={NewProductStyle.tooltip}>quick view</span>
                  </button>
                </div>
              </div>
              <div className={NewProductStyle.addToCart}>
                <button className={NewProductStyle.addToCartBtn}>
                  <i className="fa fa-shopping-cart" /> add to cart
                </button>
              </div>
            </div>
            <div className={NewProductStyle.product}>
              <div className={NewProductStyle.productImg}>
                <img
                  src={require("../../assets/img/product01.png.webp")}
                  alt="product02"
                />
              </div>
              <div className={NewProductStyle.productBody}>
                <p className={NewProductStyle.productCategory}>Category</p>
                <h3 className={NewProductStyle.productName}>
                  <NavLink to={"/productdetail"}>
                    product name goes here
                  </NavLink>
                </h3>
                <h4 className={NewProductStyle.productPrice}>
                  $980.00{" "}
                  <del className={NewProductStyle.productOldPrice}>$990.00</del>
                </h4>
                <div className={NewProductStyle.productRating}>
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="far fa-star" />
                </div>
                <div className={NewProductStyle.productBtns}>
                  <button className="add-to-wishlist">
                    <i className="far fa-heart" />
                    <span className={NewProductStyle.tooltip}>
                      add to wishlist
                    </span>
                  </button>
                  <button className="add-to-compare">
                    <i className="fa fa-exchange-alt" />
                    <span className={NewProductStyle.tooltip}>
                      add to compare
                    </span>
                  </button>
                  <button className="quick-view">
                    <i className="fa fa-eye" />
                    <span className={NewProductStyle.tooltip}>quick view</span>
                  </button>
                </div>
              </div>
              <div className={NewProductStyle.addToCart}>
                <button className={NewProductStyle.addToCartBtn}>
                  <i className="fa fa-shopping-cart" /> add to cart
                </button>
              </div>
            </div>
            <div className={NewProductStyle.product}>
              <div className={NewProductStyle.productImg}>
                <img
                  src={require("../../assets/img/product01.png.webp")}
                  alt="product02"
                />
              </div>
              <div className={NewProductStyle.productBody}>
                <p className={NewProductStyle.productCategory}>Category</p>
                <h3 className={NewProductStyle.productName}>
                  <NavLink to={"/productdetail"}>
                    product name goes here
                  </NavLink>
                </h3>
                <h4 className={NewProductStyle.productPrice}>
                  $980.00{" "}
                  <del className={NewProductStyle.productOldPrice}>$990.00</del>
                </h4>
                <div className={NewProductStyle.productRating}>
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="far fa-star" />
                </div>
                <div className={NewProductStyle.productBtns}>
                  <button className="add-to-wishlist">
                    <i className="far fa-heart" />
                    <span className={NewProductStyle.tooltip}>
                      add to wishlist
                    </span>
                  </button>
                  <button className="add-to-compare">
                    <i className="fa fa-exchange-alt" />
                    <span className={NewProductStyle.tooltip}>
                      add to compare
                    </span>
                  </button>
                  <button className="quick-view">
                    <i className="fa fa-eye" />
                    <span className={NewProductStyle.tooltip}>quick view</span>
                  </button>
                </div>
              </div>
              <div className={NewProductStyle.addToCart}>
                <button className={NewProductStyle.addToCartBtn}>
                  <i className="fa fa-shopping-cart" /> add to cart
                </button>
              </div>
            </div>
            <div className={NewProductStyle.product}>
              <div className={NewProductStyle.productImg}>
                <img
                  src={require("../../assets/img/product01.png.webp")}
                  alt="product02"
                />
              </div>
              <div className={NewProductStyle.productBody}>
                <p className={NewProductStyle.productCategory}>Category</p>
                <h3 className={NewProductStyle.productName}>
                  <NavLink to={"/productdetail"}>
                    product name goes here
                  </NavLink>
                </h3>
                <h4 className={NewProductStyle.productPrice}>
                  $980.00{" "}
                  <del className={NewProductStyle.productOldPrice}>$990.00</del>
                </h4>
                <div className={NewProductStyle.productRating}>
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="fa fa-star" style={{ color: "#ef233c" }} />
                  <i className="far fa-star" />
                </div>
                <div className={NewProductStyle.productBtns}>
                  <button className="add-to-wishlist">
                    <i className="far fa-heart" />
                    <span className={NewProductStyle.tooltip}>
                      add to wishlist
                    </span>
                  </button>
                  <button className="add-to-compare">
                    <i className="fa fa-exchange-alt" />
                    <span className={NewProductStyle.tooltip}>
                      add to compare
                    </span>
                  </button>
                  <button className="quick-view">
                    <i className="fa fa-eye" />
                    <span className={NewProductStyle.tooltip}>quick view</span>
                  </button>
                </div>
              </div>
              <div className={NewProductStyle.addToCart}>
                <button className={NewProductStyle.addToCartBtn}>
                  <i className="fa fa-shopping-cart" /> add to cart
                </button>
              </div>
            </div> */}
            {renderProducts(category.id)}
          </Slider>
          {renderArrows()}
        </div>
      );
    });
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">New Products</h3>
              {/* Nav tabs */}
              <div className="section-nav">
                <ul
                  className="section-tab-nav nav nav-tabs"
                  id={NewProductStyle.newProductsTab}
                  role="tablist"
                >
                  {renderNavTabs()}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="tab-content">{renderTabs()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
