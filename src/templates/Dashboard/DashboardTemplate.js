import React from "react";
import "./DashboardTemplate.css";
import CustomerTable from "../../components/Tables/CustomerTable";
import CategoryTable from "../../components/Tables/CategoryTable";
import ProductTable from "../../components/Tables/ProductTable";

export default function DashboardTemplate(props) {
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
              <h3 className="text-white p-2 fw-light">ADMIN NAME</h3>
            </div>
            <div className="admin-avatar">
              <img
                src={require("../../assets/img/find_user.png")}
                alt="avatar"
              />
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
          <ul className="collapse bg-dark" id="sideNavCollapse">
            <li>
              <button
                className="nav-link text-start bg-dark"
                id="admin-pills-laptops-tab"
                data-bs-toggle="pill"
                data-bs-target="#admin-pills-laptops"
                type="button"
                role="tab"
                aria-controls="admin-pills-laptops"
                aria-selected="false"
                style={{ color: "white", width: "100%" }}
              >
                Laptops
              </button>
            </li>
            <li>
              <button
                className="nav-link text-start bg-dark"
                id="admin-pills-accessories-tab"
                data-bs-toggle="pill"
                data-bs-target="#admin-pills-accessories"
                type="button"
                role="tab"
                aria-controls="admin-pills-accessories"
                aria-selected="false"
                style={{ color: "white", width: "100%" }}
              >
                Accessories
              </button>
            </li>
            <li>
              <button
                className="nav-link text-start bg-dark"
                id="admin-pills-cameras-tab"
                data-bs-toggle="pill"
                data-bs-target="#admin-pills-cameras"
                type="button"
                role="tab"
                aria-controls="admin-pills-cameras"
                aria-selected="false"
                style={{ color: "white", width: "100%" }}
              >
                Cameras
              </button>
            </li>
          </ul>
        </div>

        <div
          className="tab-content w-100 h-100 py-2 pe-3"
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
          <div
            className="tab-pane fade"
            id="admin-pills-laptops"
            role="tabpanel"
            aria-labelledby="admin-pills-laptops-tab"
            tabIndex="0"
          >
            <ProductTable categoryId="1" />
          </div>
          <div
            className="tab-pane fade"
            id="admin-pills-accessories"
            role="tabpanel"
            aria-labelledby="admin-pills-accessories-tab"
            tabIndex="0"
          >
            <ProductTable categoryId="2" />
          </div>
          <div
            className="tab-pane fade"
            id="admin-pills-cameras"
            role="tabpanel"
            aria-labelledby="admin-pills-cameras-tab"
            tabIndex="0"
          >
            <ProductTable categoryId="3" />
          </div>
        </div>
      </div>
    </div>
  );
}
