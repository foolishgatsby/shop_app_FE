import React from "react";
import CollectionStyle from "./Collection.module.css";

export default function Collection() {
  return (
    <div className="setion">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-6">
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
          <div className="col-md-4 col-6">
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
          <div className="col-md-4 col-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
