import React from "react";

// style.module.css
import homeFooterStyle from "./HomeFooter.module.css";

export default function HomeFooter(props) {
  return (
    <footer id="footer">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-xs-6">
              <div className={homeFooterStyle.footer}>
                <h3 className={homeFooterStyle.footerTitle}>About Us</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut.
                </p>
                <ul className={homeFooterStyle.footerLinks}>
                  <li>
                    <a href="#">
                      <i className="fa fa-map-marker-alt" />
                      1734 Stonecoal Road
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-phone-alt" />
                      +021-95-51-84
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="far fa-envelope" />
                      email@email.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-xs-6">
              <div className={homeFooterStyle.footer}>
                <h3 className={homeFooterStyle.footerTitle}>Categories</h3>
                <ul className={homeFooterStyle.footerLinks}>
                  <li>
                    <a href="#">Hot deals</a>
                  </li>
                  <li>
                    <a href="#">Laptops</a>
                  </li>
                  <li>
                    <a href="#">Smartphones</a>
                  </li>
                  <li>
                    <a href="#">Cameras</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="clearfix d-block d-sm-none" />
            <div className="col-md-3 col-xs-6">
              <div className={homeFooterStyle.footer}>
                <h3 className={homeFooterStyle.footerTitle}>Information</h3>
                <ul className={homeFooterStyle.footerLinks}>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Orders and Returns</a>
                  </li>
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-xs-6">
              <div className={homeFooterStyle.footer}>
                <h3 className={homeFooterStyle.footerTitle}>Service</h3>
                <ul className={homeFooterStyle.footerLinks}>
                  <li>
                    <a href="#">My Account</a>
                  </li>
                  <li>
                    <a href="#">View Cart</a>
                  </li>
                  <li>
                    <a href="#">Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Track My Order</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id={homeFooterStyle.bottomFooter} className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <ul className={homeFooterStyle.footerPayment}>
                <li>
                  <a href="#">
                    <i className="fab fa-cc-visa" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-credit-card" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-cc-paypal" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-cc-mastercard" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-cc-discover" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-cc-amex" />
                  </a>
                </li>
              </ul>
              <span className={homeFooterStyle.copyright}>
                Copyright ©2024 All rights reserved | Made by{" "}
                <a href="#" target="_blank"></a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
