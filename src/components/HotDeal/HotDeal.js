import React from "react";
import HotDealStyle from "./HotDeal.module.css";
import clsx from "clsx";

export default function HotDeal() {
  return (
    <div id={HotDealStyle.hotDeal} className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              className={HotDealStyle.hotDeal}
              style={{ textAlign: "center" }}
            >
              <ul className={HotDealStyle.hotDealCountdown}>
                <li>
                  <div>
                    <h3>02</h3>
                    <span>Days</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>10</h3>
                    <span>Hours</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>34</h3>
                    <span>Mins</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>60</h3>
                    <span>Secs</span>
                  </div>
                </li>
              </ul>
              <h2 className="text-uppercase">hot deal this week</h2>
              <p>New Collection Up to 50% OFF</p>
              <a className={clsx(HotDealStyle.ctaBtn, "primary-btn")} href="#">
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
