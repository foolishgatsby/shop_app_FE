import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoginAction } from "../../redux/actions/NormalActions";

export default function UserProfile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin, userDetail, loading } = useSelector(
    (state) => state.IsLoginReducer
  );

  const [editProfile, setEditProfile] = useState({
    fullname: "",
    phone_number: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (isLogin) {
      dispatch({
        type: "GET_USER_DETAIL",
      });
    } else {
      navigate("/users/signin");
    }
  }, [dispatch, isLogin]); // Chỉ chạy một lần khi component được mount

  useEffect(() => {
    if (!loading) {
      setEditProfile(userDetail || {});
    }
  }, [loading]);

  useEffect(() => {
    // Ví dụ, kiểm tra một trường cụ thể để xác định xem có cần cập nhật không
    if (!loading && userDetail?.fullname !== editProfile?.fullname) {
      setEditProfile(userDetail);
    }
  }, [userDetail, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({
      ...editProfile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(editProfile);
    // dispatch thay đổi
    dispatch({
      type: "EDIT_PROFILE_API",
      userDetail: editProfile,
    });
  };

  return (
    <div>
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            backgroundColor: "#d10024",
            height: "100vh",
            paddingTop: "10%",
          }}
        >
          <div className="container rounded bg-white">
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                  <span className="font-weight-bold">
                    {userDetail?.fullname}
                  </span>
                  <span className="text-black-50">{userDetail?.email}</span>
                  <button
                    onClick={() => {
                      dispatch(isLoginAction(false, "", ""));
                    }}
                    className="btn btn-danger mt-2"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Full Name</label>
                        <input
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="full name"
                          value={editProfile?.fullname}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12">
                        <label className="labels">Phone Number</label>
                        <input
                          name="phone_number"
                          type="text"
                          className="form-control"
                          placeholder="enter phone number"
                          value={editProfile?.phone_number}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Address</label>
                        <input
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder="enter address"
                          value={editProfile?.address}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="labels">Email</label>
                        <input
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="email"
                          type="text"
                          className="form-control"
                          placeholder="enter email id"
                          value={editProfile?.email}
                        />
                      </div>
                    </div>
                    {/* <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">Date of birth</label>
                    <input
                      onChange={handleChange}
                      name="date_of_birth"
                      type="date"
                      className="form-control"
                      placeholder="date of birth"
                      value={parseDate}
                    />
                  </div>
                </div> */}
                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        type="submit"
                      >
                        Save Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 py-5">
                  <NavLink className="btn" to={"/home"}>
                    Back to shopping
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
