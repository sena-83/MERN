import * as React from "react";
import "./App.css";
import { useCart } from "react-use-cart";

const ProductCard = (props) => {
  console.log("props" + props);
  const { addItem } = useCart();
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3">
      <div className="card h-100 shadow rounded">
        <img
          src={props.image}
          className="card-img-top img"
          alt={props.description}
        />
        <div className="card-body">
          {props.isTopProduct && (
            <div className="card-tag">#1 in {props.category} </div>
          )}
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${props.price}</h6>
          <div className="d-grid justify-content-end mt-4">
            <button
              onClick={() => addItem(props.item)}
              className="btn btn-primary"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
