import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getProductByCategory_api } from "../../redux/actions/ActionsApi";
import { List, Pagination } from "antd";
import NavBar from "../../components/Navigation/NavBar";
import ProductCard from "../../components/Card/ProductCard";

export default function SearchProductTemplate(props) {
  const { category_id, keyword } = useParams();
  console.log(category_id, keyword);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.SearchProductReducer);
  const { loading } = useSelector((state) => state.SearchProductReducer);

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      loading: true,
    });
    dispatch({
      type: "SEARCH_PRODUCT_API",
      searchInfo: {
        category_id,
        keyword,
      },
    });
  }, [category_id, keyword]);

  return (
    <>
      <NavBar></NavBar>
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
