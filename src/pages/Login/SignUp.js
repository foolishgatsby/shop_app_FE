import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { User } from "./User";
import { signup_api } from "../../redux/actions/ActionsApi";

export default function SignUp(props) {
  const dispatch = useDispatch();

  const resetValue = () => {
    setNewUser({
      ...newUser,
      email: "", // required and valid
      password: "", // required and valid
      retype_password: "",
      fullname: "", // required
      phone_number: "", //required
      address: "", // none required
      date_of_birth: "", // required
    });
  };

  const [newUser, setNewUser] = useState({
    email: "", // required and valid
    password: "", // required and valid
    retype_password: "",
    fullname: "", // required
    phone_number: "", //required
    address: "", // none required
    date_of_birth: "", // required
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    retype_password: "",
    fullname: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
  });

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

  // optional
  // const checkValidFullName = (fullname) => {
  //   const regexFullname =
  //     /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  //   // Vietnamese name
  //   return regexFullname.test(String(fullname).trim());
  // };

  const checkValidPhonenumber = (phone_number) => {
    const regexPhonenumber = /((^(\+84|84|0){1})(3|5|7|8|9))+([0-9]{8})$/;
    // Vietnamese phone
    return regexPhonenumber.test(String(phone_number).trim());
  };

  const checkValidDateOfBirth = (date_of_birth) => {
    const d = new Date();
    const year = d.getFullYear();
    if (year - Number(date_of_birth.substring(0, 4)) >= 18) {
      return true;
    }
    return false;
  };

  const checkRequire = (value) => {
    if (value.trim() === "") {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setNewUser({
      ...newUser,
      [name]: value,
    });

    let newErrors = { ...errors };
    // check require field
    if (name !== "address") {
      if (!checkRequire(value)) {
        newErrors[name] = name + " is required";
      } else {
        newErrors[name] = "";
      }
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
    if (name === "password") {
      if (!checkValidPassword(value)) {
        newErrors[name] = name + " is invalid";
      } else {
        newErrors[name] = "";
      }
    }
    // check password confirm
    if (name === "retype_password") {
      if (value !== newUser.password) {
        newErrors[name] = "Password confirm is not match";
      } else {
        newErrors[name] = "";
      }
    }
    // check and set valid for phone number
    if (name === "phone_number") {
      if (!checkValidPhonenumber(value)) {
        newErrors[name] = "Phone number is invalid";
      } else {
        newErrors[name] = "";
      }
    }
    // check and set valid for date of birth
    if (name === "date_of_birth") {
      if (!checkValidDateOfBirth(value)) {
        newErrors[name] = "You must be more than 18 years old";
      } else {
        newErrors[name] = "";
      }
    }

    setErrors(newErrors);
  };

  // dispatch lên redux saga => gọi api khi nhấn submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { ...errors };

    for (const key in newErrors) {
      if (key !== "address") {
        if (!checkRequire(newUser[key])) {
          newErrors[key] = key + " is required";
          valid = false;
        }
      }
    }

    setErrors(newErrors);

    for (const key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }

    if (valid) {
      // alert("Tạo thành công người dùng mới");
      dispatch(signup_api(newUser, "1"));
    }

    resetValue();

    // nếu tất cả đều valid => tạo user mới và gửi đến backend
    // console.log(newUser.date_of_birth);
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
          <span className="login100-form-title-1">Sign Up</span>
        </div>
        <form
          style={{ paddingBottom: "60px", paddingTop: "30px" }}
          className="login100-form validate-form"
          onSubmit={handleSubmit}
        >
          <div
            className={`wrap-input100 validate-input m-b-18 ${
              errors.email === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.email}
          >
            <span className="label-input100">Email</span>
            <input
              className="input100"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={newUser.email}
            />
            <span className="focus-input100" />
          </div>
          <div
            className={`wrap-input100 validate-input m-b-10 ${
              errors.password === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.password}
          >
            <span className="label-input100">Password</span>
            <input
              className="input100"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={newUser.password}
            />
            <span className="focus-input100" />
          </div>
          <h6
            className="input-notes opacity-75 fw-normal"
            style={{ fontSize: "12px" }}
          >
            Password has 6-15 character, contain one digit (0,1...,9), one
            uppercase (A,B...,Z), one lowercase (a,b,...z)
          </h6>
          <div
            className={`wrap-input100 validate-input m-b-18 ${
              errors.retype_password === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.retype_password}
          >
            <span className="label-input100">Password confirm</span>
            <input
              className="input100"
              type="password"
              name="retype_password"
              placeholder="Enter your password again"
              onChange={handleChange}
              value={newUser.retype_password}
            />
            <span className="focus-input100" />
          </div>
          <div
            className={`wrap-input100 validate-input m-b-18 ${
              errors.fullname === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.fullname}
          >
            <span className="label-input100">Full name</span>
            <input
              className="input100"
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              onChange={handleChange}
              value={newUser.fullname}
            />
            <span className="focus-input100" />
          </div>
          <div
            className={`wrap-input100 validate-input m-b-10 ${
              errors.phone_number === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.phone_number}
          >
            <span className="label-input100">Phone number</span>
            <input
              className="input100"
              type="tel"
              name="phone_number"
              placeholder="Enter your phone number (e.g: +84...)"
              onChange={handleChange}
              value={newUser.phone_number}
            />
            <span className="focus-input100" />
          </div>
          <div
            className={`wrap-input100 validate-input m-b-18 ${
              errors.address === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.address}
          >
            <span className="label-input100">Address</span>
            <input
              className="input100"
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
              value={newUser.address}
            />
            <span className="focus-input100" />
          </div>
          <div
            className={`wrap-input100 validate-input m-b-18 ${
              errors.date_of_birth === "" ? "" : "alert-validate"
            }`}
            data-validate={errors.date_of_birth}
          >
            <span className="label-input100">Birthday</span>
            <input
              className="input100"
              type="date"
              name="date_of_birth"
              placeholder="Choose your date of birth"
              onChange={handleChange}
              value={newUser.date_of_birth}
            />
            <span className="focus-input100" />
          </div>
          <div className="container-login100-form-btn flex-column">
            <button className="login100-form-btn" type="submit">
              Sign Up
            </button>
            <div className="login-social mt-2 text-center">
              <h6 className="fw-normal opacity-50">
                If you alredy have account{" "}
                <NavLink to={"/users/signin"} style={{ fontSize: "16px" }}>
                  Sign in here
                </NavLink>
              </h6>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
