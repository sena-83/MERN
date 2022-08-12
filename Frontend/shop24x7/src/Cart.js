import * as React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";

import "./App.css";
import { useCart } from "react-use-cart";

const Cart = () => {
  const navigate = useNavigate();
  const {
    isEmpty,
    //totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  if (isEmpty)
    return (
      <div className="container-fluid">
        <TopNav />
        <h5 className="text-center py-5">My Cart is Empty</h5>
      </div>
    );
  return (
    <div className="container-fluid">
      <TopNav />
      <div className="row justify-content-center">
        <h4 className="text-center py-3 text-decoration-underline">My Cart</h4>
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-4">
          <p className="position:relative fw-bolder text-title">
            Total Items
            <span className="position-absolute translate-middle badge rounded-pill bg-danger">
              ({totalItems})
            </span>
          </p>
          <div>
            <table className="table table-primary table-hover m-0">
              <tbody>
                {!!items &&
                  items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.image}
                            className="cart-img"
                            alt=""
                          ></img>
                        </td>
                        <td>
                          {item.name}
                          <br></br>
                          {item.description}
                          <br></br>
                          Price ${item.price}
                          <br></br>
                          Discount $
                        </td>
                        <td>Quantity : {item.quantity}</td>
                        <td>
                          <button
                            className="btn btn-outline-dark mx-1"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <button
                            className="btn btn-outline-dark mx-1"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <button
                            className="btn btn-outline-danger mx-1"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove Item
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between py-3">
              <button
                className="btn btn-outline-danger"
                onClick={() => emptyCart()}
              >
                Clear All
              </button>
              <h4> Grand Total: ${cartTotal}</h4>
            </div>
            <div className="d-flex justify-content-end py-3">
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("../checkout?order=true")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
