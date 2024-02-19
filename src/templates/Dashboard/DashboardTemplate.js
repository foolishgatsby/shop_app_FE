import React, { useEffect } from "react";
import "./DashboardTemplate.css";
import CustomerTable from "../../components/Tables/CustomerTable";
import CategoryTable from "../../components/Tables/CategoryTable";
import ProductTable from "../../components/Tables/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../../util/constants/settingSystem";
import { isLoginAction } from "../../redux/actions/NormalActions";
import { getProductByCategory_api } from "../../redux/actions/ActionsApi";
import OrderTable from "../../components/Tables/OrderTable";
import RatingTable from "../../components/Tables/RatingTable";

export default function DashboardTemplate(props) {
  const { isLogin, role_id, email } = useSelector(
    (state) => state.IsLoginReducer
  );
  const { arrCategories } = useSelector((state) => state.AllCategoriesReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin || localStorage.getItem(TOKEN) === null) {
      if (role_id !== 2) {
        navigate("/users/signin");
      }
    }
  }, [isLogin, role_id]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="d-flex align-items-start">
        <div
          // style={{ minWidth: "15%" }}
          className="nav flex-column nav-pills me-3 bg-dark"
          id="admin-pills-tab"
          role="tablist"
          aria-orientation="vertical"
          style={{ minWidth: "15%", height: "100vh" }}
        >
          <div className="admin-info text-center m-2">
            <div className="admin-name">
              <h6 className="text-white p-2 fw-light">{email}</h6>
            </div>
            <div className="admin-avatar">
              <img
                src={require("../../assets/img/find_user.png")}
                alt="avatar"
              />
            </div>
            <div
              onClick={() => {
                dispatch(isLoginAction(false, "", ""));
              }}
              className="btn btn-danger mt-2"
            >
              Đăng xuất
            </div>
          </div>
          <button
            className="nav-link active text-start mt-4"
            id="admin-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#admin-pills-home"
            type="button"
            role="tab"
            aria-controls="admin-pills-home"
            aria-selected="true"
            style={{ color: "white" }}
          >
            <i className="fa fa-user me-2" style={{ fontSize: "18px" }} />{" "}
            ACCOUNT
          </button>
          <button
            className="nav-link text-start"
            id="admin-pills-category-tab"
            data-bs-toggle="pill"
            data-bs-target="#admin-pills-category"
            type="button"
            role="tab"
            aria-controls="admin-pills-category"
            aria-selected="false"
            style={{ color: "white" }}
          >
            <i className="fa fa-store me-2" style={{ fontSize: "18px" }} />{" "}
            CATEGORY
          </button>

          <button
            className="nav-link text-start"
            data-bs-toggle="collapse"
            data-bs-target="#sideNavCollapse"
            type="button"
            aria-controls="sideNavCollapse"
            aria-expanded="false"
            style={{ color: "white", width: "100%" }}
          >
            <i
              className="fa fa-shopping-cart me-2"
              style={{ fontSize: "18px" }}
            />{" "}
            PRODUCT{" "}
            <i className="fa fa-caret-down" style={{ marginLeft: "70px" }} />
          </button>
          <ul
            className="collapse bg-dark"
            id="sideNavCollapse"
            style={{ maxHeight: "300px", overflowY: "scroll" }}
          >
            {arrCategories.map((category, index) => {
              return (
                <li key={index}>
                  <button
                    className="nav-link text-start bg-dark"
                    id={`admin-pills-${category.id}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#admin-pills-${category.id}`}
                    type="button"
                    role="tab"
                    aria-controls="admin-pills-laptops"
                    aria-selected="false"
                    style={{ color: "white", width: "100%" }}
                    onClick={() => {
                      // temp variable to add product
                      dispatch({
                        type: "SET_TEMP_CATEGORY",
                        temp_category_id: category.id,
                      });

                      // loading effect
                      dispatch({
                        type: "SET_LOADING",
                        loading: true,
                      });

                      // lấy product theo category.id
                      dispatch(getProductByCategory_api(category.id));
                    }}
                  >
                    {category.name}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className="nav-link text-start"
            id="admin-pills-evaluate-tab"
            data-bs-toggle="pill"
            data-bs-target="#admin-pills-evaluate"
            type="button"
            role="tab"
            aria-controls="admin-pills-evaluate"
            aria-selected="false"
            style={{ color: "white" }}
          >
            <i className="fa fa-comment me-2" style={{ fontSize: "18px" }} />{" "}
            RATINGS & COMMENTS
          </button>

          <button
            className="nav-link text-start"
            id="admin-pills-order-tab"
            data-bs-toggle="pill"
            data-bs-target="#admin-pills-order"
            type="button"
            role="tab"
            aria-controls="admin-pills-order"
            aria-selected="false"
            style={{ color: "white" }}
          >
            <i
              className="fa fa-shipping-fast me-2"
              style={{ fontSize: "18px" }}
            />{" "}
            ORDERS
          </button>
        </div>

        <div
          className="tab-content w-100 h-100 py-2"
          id="admin-pills-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="admin-pills-home"
            role="tabpanel"
            aria-labelledby="admin-pills-home-tab"
            tabIndex="0"
          >
            <CustomerTable />
          </div>
          <div
            className="tab-pane fade"
            id="admin-pills-category"
            role="tabpanel"
            aria-labelledby="admin-pills-category-tab"
            tabIndex="0"
          >
            <CategoryTable />
          </div>
          {arrCategories.map((category, index) => {
            return (
              <div
                key={index}
                className="tab-pane fade"
                id={`admin-pills-${category.id}`}
                role="tabpanel"
                aria-labelledby={`admin-pills-${category.id}-tab`}
                tabIndex="0"
              >
                <ProductTable category={category} />
              </div>
            );
          })}
          <div
            className="tab-pane fade"
            id="admin-pills-order"
            role="tabpanel"
            aria-labelledby="admin-pills-order-tab"
            tabIndex="0"
          >
            <OrderTable />
          </div>
          <div
            className="tab-pane fade show"
            id="admin-pills-evaluate"
            role="tabpanel"
            aria-labelledby="admin-pills-evaluate-tab"
            tabIndex="0"
          >
            <RatingTable />
          </div>
        </div>
      </div>
    </div>
  );
}
