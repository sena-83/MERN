import TopNav from "./TopNav";
import { useState } from "react";
import { useEffect } from "react";
import { useCart } from "react-use-cart";
const createHistory = require("history").createBrowserHistory;

const profileapi = "http://localhost:8080/api/v1/profile";
const loggedinorderapi = "http://localhost:8080/api/v1/checkout";
const guestorderapi = "http://localhost:8080/api/v1/guest/checkout";

var cartArr = [];

function Order() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]);

  const { items } = useCart();
  items.map((item) =>
    cartArr.push({ productId: item.id, quantity: item.quantity })
  );

  useEffect(() => {
    fetch(profileapi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUser(result);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  }, []);

  return (
    <div className="container-fluid">
      <TopNav />
      <div className="row justify-content-center">
        <h4 className="text-center py-3 text-decoration-underline">
          Order Form
        </h4>
        <br></br>
        {error}
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-4">
          <p className="position:relative fw-bolder text-title">User Info </p>
          <form onSubmit={handleOrder}>
            <div className="mb-3">
              <label className="form-label">Firstname</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                required
                value={!!user && user.firstName}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                required
                value={!!user && user.lastName}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={!!user && user.email}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <p className="position:relative fw-bolder text-title">
              Shipping Address{" "}
            </p>
            <div className="mb-3">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                id="street"
                required
              />
              <label className="form-label">City</label>
              <input type="text" className="form-control" id="city" required />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input type="text" className="form-control" id="state" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input
                type="number"
                className="form-control"
                id="zipcode"
                required
              />
            </div>

            <div className="d-flex justify-content-end py-3">
              <input type="hidden" id="uid" value={!!user && user._id} />
              <button type="submit" id="submit" className="btn btn-primary">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function handleOrder(event) {
  event.preventDefault();

  const uid = event.target.elements.uid.value;
  console.log("Logged in user id" + uid);

  const in_fname = event.target.elements.firstname.value;
  const in_lname = event.target.elements.lastname.value;
  const in_email = event.target.elements.email.value;

  const in_street = event.target.elements.street.value;
  const in_city = event.target.elements.city.value;
  const in_state = event.target.elements.state.value;
  const in_zip = event.target.elements.zipcode.value;

  console.log("Cart Details" + cartArr);

  const guest = {
    firstName: in_fname,
    lastName: in_lname,
  };

  const shippingAddress = {
    street: in_street,
    city: in_city,
    state: in_state,
    zip: in_zip,
  };

  if (uid) {
    const loggedinorder = {
      id: uid,
      email: in_email,
      shippingAddress: shippingAddress,
      cart: cartArr,
    };

    fetch(loggedinorderapi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(loggedinorder),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "success") {
            console.log(result.message);
            console.log(result.payload);
            let history = createHistory();
            history.push(
              "/orderconfirmation?&orderno=" +
                result.payload.order.id +
                "&email=" +
                result.payload.order.email
            );
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
          } else {
            alert(
              "System is experiencing some problem, please try again later"
            );
          }
        },
        (error) => {
          console.log(error);
          alert("System is experiencing some problem, please try again later");
        }
      );
  } else {
    const guestorder = {
      guest: guest,
      email: in_email,
      shippingAddress: shippingAddress,
      cart: cartArr,
    };

    fetch(guestorderapi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guestorder),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "success") {
            console.log(result.message);
            console.log(result.payload);
            let history = createHistory();
            history.push(
              "/orderconfirmation?&orderno=" +
                result.payload.order.id +
                "&email=" +
                result.payload.order.email
            );
            let pathUrl = window.location.href;
            window.location.href = pathUrl;
          } else {
            alert(
              "System is experiencing some problem, please try again later"
            );
          }
        },
        (error) => {
          console.log(error);
          alert("System is experiencing some problem, please try again later");
        }
      );
  }

  //console.log("Order Placed");
}

export default Order;
