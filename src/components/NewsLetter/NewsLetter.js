import React from "react";
import NewsLetterStyle from "./NewsLetter.module.css";
import clsx from "clsx";

export default function NewsLetter() {
  return (
    <div id={NewsLetterStyle.newsLetter} className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              className={NewsLetterStyle.newsLetter}
              style={{ textAlign: "center" }}
            >
              <p>
                Sign Up for the <strong>NEWSLETTER</strong>
              </p>
              <form>
                <input
                  className={clsx(NewsLetterStyle.input, "input")}
                  type="email"
                  placeholder="Enter Your Email"
                />
                <button className={NewsLetterStyle.newsLetterBtn}>
                  <i className="fa fa-envelope" /> Subcribe
                </button>
              </form>
              <ul className={NewsLetterStyle.newsLetterFollow}>
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-pinterest" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
