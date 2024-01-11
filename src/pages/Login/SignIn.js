import React from "react";
import "./SignIn.css";
import { useDispatch } from "react-redux";
import { signin_api } from "../../redux/actions/ActionsApi";

export default function SignIn(props) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // e.preventDefault();
    // for (let value of formData.values()) {
    //   console.log(value);
    // }
    const formSubmit = Array.from(formData.values());
    // console.log(formSubmit);
    // console.log("userName", formSubmit[0]);
    // console.log("password", formSubmit[1]);
    dispatch(signin_api(formSubmit[0], formSubmit[1]));
  };

  return (
    <div className="container-login100">
      <div className="wrap-login100">
        <div
          className="login100-form-title"
          style={{
            backgroundImage: `url(/img/bg-signin.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <span className="login100-form-title-1">Sign In</span>
        </div>
        <form className="login100-form validate-form" onSubmit={handleSubmit}>
          <div
            className="wrap-input100 validate-input m-b-26 alert-validate"
            data-validate="Username is required"
          >
            <span className="label-input100">Username</span>
            <input
              className="input100"
              type="text"
              name="username"
              placeholder="Enter username"
            />
            <span className="focus-input100" />
          </div>
          <div
            className="wrap-input100 validate-input m-b-18 alert-validate"
            data-validate="Password is required"
          >
            <span className="label-input100">Password</span>
            <input
              className="input100"
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <span className="focus-input100" />
          </div>
          <div className="flex-sb-m w-full p-b-30">
            <div className="contact100-form-checkbox">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100" htmlFor="ckb1">
                Remember me
              </label>
            </div>
            <div>
              <a href="#" className="txt1">
                Forgot Password?
              </a>
              {" | "}
              <a href="#" className="txt1">
                Sign Up
              </a>
            </div>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
