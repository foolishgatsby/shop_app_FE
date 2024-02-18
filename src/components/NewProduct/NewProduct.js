import React, { useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
import NewProductStyle from "./NewProduct.module.css";

// react slick
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Card/ProductCard";
import { getProductByCategory_api } from "../../redux/actions/ActionsApi";

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
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: "GET_NEW_PRODUCT_API",
    });
  }, []);

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

  const { newProduct } = useSelector((state) => state.ProductTableReducer);

  // render product trong từng tab
  const renderProducts = () => {
    // console.log(newProduct);
    // dispatch event get product by category_id
    return newProduct?.map((product, index) => {
      return <ProductCard product={product} key={index} />;
    });
  };

  // render tabs theo categories
  const renderTabs = () => {
    return (
      <div
        style={{
          overflowY: "hidden",
          paddingBottom: "60px",
          marginBottom: "-60px",
        }}
      >
        <Slider ref={sliderRef} {...sliderSetting}>
          {renderProducts()}
        </Slider>
        {renderArrows()}
      </div>
    );
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>New Products</h3>
          </div>
          <div className="col-md-12">
            <div className="tab-content">{renderTabs()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
