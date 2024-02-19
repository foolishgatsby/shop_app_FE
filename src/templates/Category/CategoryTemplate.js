import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getProductByCategory_api } from "../../redux/actions/ActionsApi";
import { List, Pagination } from "antd";
import NavBar from "../../components/Navigation/NavBar";
import ProductCard from "../../components/Card/ProductCard";

export default function CategoryTemplate(props) {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const { productList, sortStatus } = useSelector(
    (state) => state.ProductTableReducer
  );
  const { loading } = useSelector((state) => state.ProductTableReducer);

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    dispatch(getProductByCategory_api(category_id));
  }, [category_id]);

  return (
    <>
      <NavBar></NavBar>
      <div className="container d-flex justify-content-end mt-2">
        <div>
          <div>
            <h6 className="text-end" style={{ paddingRight: "10px" }}>
              Sort By: {sortStatus}
            </h6>
          </div>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={() => {
                dispatch({
                  type: "SET_SORT_INCREASE",
                  sortStatus: "Increase",
                });
              }}
              type="button"
              className="btn"
            >
              Increase Price
            </button>
            <button
              onClick={() => {
                dispatch(getProductByCategory_api(category_id));
              }}
              type="button"
              className="btn"
            >
              None
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "SET_SORT_DECREASE",
                  sortStatus: "Decrease",
                });
              }}
              type="button"
              className="btn"
            >
              Decrease Price
            </button>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div style={{ margin: "15px 0" }}>
            <List
              grid={{
                gutter: 24,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 5,
                xl: 5,
                xxl: 5,
              }}
              pagination
              loading={loading}
              dataSource={productList}
              renderItem={(item, index) => (
                <List.Item>
                  <ProductCard product={item} key={index} />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
