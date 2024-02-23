import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../util/constants/settingSystem";

export default function UserOrders(props) {
  const { isLogin, email, userDetail, userOrderList } = useSelector(
    (state) => state.IsLoginReducer
  );

  console.log(userOrderList);

  const renderOneOrder = (order, index) => {
    return (
      <div className="order-details my-5" key={index}>
        <div className="order-info mb-3 pb-3 border-bottom">
          <span className="fw-bold">Order #${order.id}</span> Delivered on{" "}
          {order.shippingDate[2]}/{order.shippingDate[1]}/
          {order.shippingDate[0]}
          {"  |  "}
          {order.status}
        </div>
        <div className="order-items">
          {order.orderDetails?.map((item, index) => {
            return renderOrderItem(item, index);
          })}
        </div>
      </div>
    );
  };

  const renderOrderItem = (item, index) => {
    return (
      <div className="item row my-2" key={index}>
        <div className="col-md-2">
          <img
            src={`${DOMAIN}/products/images/${item.product.thumbnail}`}
            alt={item.product.name}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-10 ">
          <h5>{item.product.name}</h5>
          <p>
            Qty: ${item.numberOfProducts}, Price: ${item.price}
          </p>
          <h5 className="mt-3">
            $
            {(
              Number(item.numberOfProducts) * Number(item.price)
            ).toLocaleString()}
          </h5>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch({
        type: "GET_USER_DETAIL",
      });
    } else {
      navigate("/users/signin");
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    dispatch({
      type: "GET_ORDERS_BY_USER_ID",
      user_id: userDetail.id,
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#d10024",
        paddingTop: "5%",
        paddingBottom: "5%",
      }}
    >
      <div
        className="container rounded bg-white py-3"
        style={{ overflowY: "scroll" }}
      >
        <div className="order-tilte">
          <h5 className="mb-0">Your Order</h5>
          <p>Check the status of recent orders</p>
        </div>
        {userOrderList.map((order, index) => {
          return renderOneOrder(order, index);
        })}
      </div>
    </div>
  );
}
