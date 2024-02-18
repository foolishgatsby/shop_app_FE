import React from "react";
import NewProductStyle from "../NewProduct/NewProduct.module.css";
import { NavLink } from "react-router-dom";
import { DOMAIN } from "../../util/constants/settingSystem";
import { useDispatch } from "react-redux";

export default function ProductCard(props) {
  const { product } = props;
  const dispatch = useDispatch();

  return (
    <div className={NewProductStyle.product}>
      <div className={NewProductStyle.productImg}>
        <img
          style={{ height: "350px" }}
          src={`${DOMAIN}/products/images/${product.thumbnail}`}
          alt={`product-${product.id}`}
        />
        <div className={NewProductStyle.productLabel}>
          {Math.round(Math.random()) === 1 ? (
            <span className={NewProductStyle.sale}>-30%</span>
          ) : (
            ""
          )}
          {Math.round(Math.random()) === 1 ? (
            <span className={NewProductStyle.new}>NEW</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={NewProductStyle.productBody}>
        <p className={NewProductStyle.productCategory}>
          Category {product.category_id}
        </p>
        <h3 className={NewProductStyle.productName}>
          <NavLink to={`/productdetail/${product.id}`}>
            {product.name.length >= 20
              ? `${product.name.slice(0, 20)} ...`
              : product.name}
          </NavLink>
        </h3>
        <h4 className={NewProductStyle.productPrice}>
          ${Number(product.price).toLocaleString()}
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
            <span className={NewProductStyle.tooltip}>add to wishlist</span>
          </button>
          <button className="add-to-compare">
            <i className="fa fa-exchange-alt" />
            <span className={NewProductStyle.tooltip}>add to compare</span>
          </button>
          <button className="quick-view" onClick={() => {}}>
            <i className="fa fa-eye" />
            <span className={NewProductStyle.tooltip}>quick view</span>
          </button>
        </div>
      </div>
      <div className={NewProductStyle.addToCart}>
        <button
          className={NewProductStyle.addToCartBtn}
          onClick={() => {
            dispatch({
              type: "ADD_TO_CART",
              product,
              quantity: 1,
            });
          }}
        >
          <i className="fa fa-shopping-cart" /> add to cart
        </button>
      </div>
    </div>
  );
}
