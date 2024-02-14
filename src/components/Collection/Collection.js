import React from "react";
import CollectionStyle from "./Collection.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Collection(props) {
  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);

  const renderColectionCard = () => {
    return arrCategories?.map((category, index) => {
      if (index > 2) {
        return;
      }
      return (
        <div className="col-6 col-lg-4" key={index}>
          <div className={CollectionStyle.shop}>
            <div className={CollectionStyle.shopImg}>
              <img
                src={require(`../../assets/img/shop0${index + 1}.png.webp`)}
                alt={`collection ${index}`}
              />
            </div>
            <div className={CollectionStyle.shopBody}>
              <h3>
                {category.name}
                <br />
                Collection
              </h3>
              <NavLink
                to={`/category/${category.id}`}
                className={CollectionStyle.ctaBtn}
              >
                Shop now <i className="fa fa-arrow-circle-right" />
              </NavLink>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="setion">
      <div className="container">
        <div className="row">
          {/* <div className="col-6 col-lg-4">
            <div className={CollectionStyle.shop}>
              <div className={CollectionStyle.shopImg}>
                <img
                  src={require("../../assets/img/shop01.png.webp")}
                  alt="collection01"
                />
              </div>
              <div className={CollectionStyle.shopBody}>
                <h3>
                  Laptop
                  <br />
                  Collection
                </h3>
                <a href="#" className={CollectionStyle.ctaBtn}>
                  Shop now <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-4">
            <div className={CollectionStyle.shop}>
              <div className={CollectionStyle.shopImg}>
                <img
                  src={require("../../assets/img/shop03.png.webp")}
                  alt="collection02"
                />
              </div>
              <div className={CollectionStyle.shopBody}>
                <h3>
                  Accessories
                  <br />
                  Collection
                </h3>
                <a href="#" className={CollectionStyle.ctaBtn}>
                  Shop now <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-4">
            <div className={CollectionStyle.shop}>
              <div className={CollectionStyle.shopImg}>
                <img
                  src={require("../../assets/img/shop02.png.webp")}
                  alt="collection02"
                />
              </div>
              <div className={CollectionStyle.shopBody}>
                <h3>
                  Cameras
                  <br />
                  Collection
                </h3>
                <a href="#" className={CollectionStyle.ctaBtn}>
                  Shop now <i className="fa fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div> */}
          {renderColectionCard()}
        </div>
      </div>
    </div>
  );
}
