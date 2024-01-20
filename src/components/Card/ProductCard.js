import React from "react";
import NewProductStyle from "../NewProduct/NewProduct.module.css";
import { NavLink } from "react-router-dom";

export default function ProductCard(props) {
  const { product } = props;

  return (
    <div className={NewProductStyle.product}>
      <div className={NewProductStyle.productImg}>
        <img
          src={require("../../assets/img/product01.png.webp")}
          alt={`product-${product.id}`}
        />
        <div className={NewProductStyle.productLabel}>
          <span className={NewProductStyle.sale}>-30%</span>
          <span className={NewProductStyle.new}>NEW</span>
        </div>
      </div>
      <div className={NewProductStyle.productBody}>
        <p className={NewProductStyle.productCategory}>
          Category {product.category_id}
        </p>
        <h3 className={NewProductStyle.productName}>
          <NavLink to={"/productdetail"}>{product.name}</NavLink>
        </h3>
        <h4 className={NewProductStyle.productPrice}>
          $980.00{" "}
          <del className={NewProductStyle.productOldPrice}>
            ${Number(product.price).toLocaleString()}
          </del>
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
        <button className={NewProductStyle.addToCartBtn}>
          <i className="fa fa-shopping-cart" /> add to cart
        </button>
      </div>
    </div>
  );
}
