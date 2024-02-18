import React from "react";
import { DOMAIN } from "../../util/constants/settingSystem";

export default function CartDetail(props) {
  const { product, quantity } = props.item;
  return (
    <div className="card rounded-3 mb-4" style={{ backgroundColor: "#1e1f29" }}>
      <div className="card-body p-4">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img
              src={`${DOMAIN}/products/images/${product.thumbnail}`}
              className="img-fluid rounded-3"
              alt={product.name}
              style={{ backgroundColor: "#ececec" }}
            />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <p className="lead fw-bold mb-2 text-white">{product.name}</p>
            <p className="fw-light text-white">
              <span className="fw-normal">Color: </span>Grey
            </p>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
            <button className="btn btn-link px-2" onClick={() => {}}>
              <i className="fas fa-minus" />
            </button>
            <input
              id="form1"
              min={0}
              name="quantity"
              defaultValue={quantity}
              type="number"
              className="form-control form-control-sm"
              style={{ width: "35%" }}
            />
            <button className="btn btn-link px-2" onClick={() => {}}>
              <i className="fas fa-plus" />
            </button>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 className="mb-0 text-white">
              ${Number(product.price).toLocaleString()}
            </h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <button className="text-danger btn">
              <i className="fas fa-trash fa-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
