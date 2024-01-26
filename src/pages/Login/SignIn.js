import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { signin_api } from "../../redux/actions/ActionsApi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  isLoginAction,
  setRoleAction,
} from "../../redux/actions/NormalActions";
// import { TOKEN } from "../../util/constants/settingSystem";

export default function SignIn(props) {
  const { isLogin, role_id } = useSelector((state) => state.IsLoginReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      switch (role_id) {
        case "1":
          navigate("/home");
          break;
        case "2":
          navigate("/admin");
          break;
        default:
          break;
      }
    }
  }, [isLogin, role_id, navigate]);
  // state dùng để hiển thị alert-validate message
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    role_id: "1",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const checkRequire = (value) => {
    if (value.trim() === "") {
      return false;
    }
    return true;
  };

  const checkValidEmail = (email) => {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).trim());
  };

  const checkValidPassword = (password) => {
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    // Should contain at least one digit
    // Should contain at least one lower case
    // Should contain at least one upper case
    // Sholud contain from 6 -> 15 character
    return regexPassword.test(String(password).trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // console.log(name, value);
    setUserLogin({
      ...userLogin,
      [name]: value,
    });

    let newErrors = { ...errors }; // copy object
    // check required
    if (!checkRequire(value)) {
      newErrors[name] = name + " is required";
    } else {
      newErrors[name] = "";
    }

    // check and set valid for email
    if (name === "email") {
      if (!checkValidEmail(value)) {
        newErrors[name] = name + " is invalid";
      } else {
        newErrors[name] = "";
      }
    }
    // check and set valid for password
    // if (name === "password") {
    //   if (!checkValidPassword(value)) {
    //     newErrors[name] = name + " is invalid";
    //   } else {
    //     newErrors[name] = "";
    //   }
    // }

    setErrors(newErrors);
  };

  // dispatch lên redux saga => gọi api đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { ...errors };

    for (let key in newErrors) {
      if (!checkRequire(userLogin[key])) {
        newErrors[key] = key + " is required";
        valid = false;
      }
    }

    setErrors(newErrors);

    if (valid) {
      // dispatch userLogin
      dispatch(signin_api(userLogin));
    }
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
        <form
          className="login100-form validate-form"
          onSubmit={(e) => {
            dispatch(setRoleAction(userLogin.role_id));
            handleSubmit(e);
          }}
        >
          <div
            className={`wrap-input100 m-b-26`}
            style={{ borderBottom: "0px" }}
            data-validate="Please choose your role"
          >
            <span className="label-input100">You are</span>
            <select
              className="form-select"
              name="role_id"
              defaultValue={"1"}
              onChange={(e) => {
                // console.log(e.target.value);
                dispatch(setRoleAction(e.target.value));
                handleChange(e);
              }}
            >
              <option value={"1"}>User</option>
              <option value={"2"}>Admin</option>
            </select>
          </div>
          <div
            className={`wrap-input100 validate-input m-b-26 ${
              errors.email === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.email}
          >
            <span className="label-input100">Email</span>
            <input
              className="input100"
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <span className="focus-input100" />
          </div>
          <div
            className={`wrap-input100 validate-input m-b-26 ${
              errors.password === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.password}
          >
            <span className="label-input100">Password</span>
            <input
              className="input100"
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
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
              <NavLink to={"/users/signup"} className="txt1" target="_blank">
                Sign Up
              </NavLink>
            </div>
          </div>
          <div className="container-login100-form-btn flex-column">
            <button className="login100-form-btn" type="submit">
              Sign In
            </button>
            <div className="login-social mt-2 text-center">
              <h6 className="fw-normal opacity-50">Or sign in with</h6>
              <a href="#">
                <i className="fab fa-facebook" />
              </a>
              <a href="#" className="ms-3">
                <i className="fab fa-google-plus-g" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
