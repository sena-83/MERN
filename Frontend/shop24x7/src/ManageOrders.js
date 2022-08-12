import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import TopNav from "./TopNav";
const profileapi = "http://localhost:8080/api/v1/profile";
const orderlistapi = "http://localhost:8080/api/v1/orders";

function ManageOrders() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  const fetchData = () => {
    const orderlist = axios.get(orderlistapi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const profile = axios.get(profileapi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    axios.all([orderlist, profile]).then(
      axios.spread((...allData) => {
        const allorder = allData[0].data;
        const loggedinprofile = allData[1].data;

        setItems(allorder.orders);
        setUser(loggedinprofile);
        console.log({ allorder });
        console.log(loggedinprofile.email);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (error) {
    setError(error);
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="container-fluid">
        <TopNav />
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-4">
            <div className="row justify-content-center">
              <br></br>
              <br></br>
            </div>
            <p className="position:relative fw-bolder text-title">
              Manage Orders
            </p>
            {!!items &&
              items.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col">
                    {!!item && item.isDelivered === true && (
                      <p
                        className="position:relative text-title"
                        style={{ color: "green" }}
                      >
                        #{item._id}
                      </p>
                    )}
                    {!!item && item.isDelivered === false && <p>#{item._id}</p>}
                    <br></br>
                    <p className="position:relative text-title">
                      {!!item && item.email} <br></br>
                    </p>
                  </div>{" "}
                  {!!user && user.isAdminRole ? (
                    <div className="col">
                      <p className="d-flex justify-content-end">
                        <NavLink onClick={() => updateHandler(item._id)} to="#">
                          {!!item.isDelivered ? " " : "Process |"}
                        </NavLink>{" "}
                        <NavLink onClick={() => deleteHandler(item._id)} to="#">
                          Delete
                        </NavLink>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  <hr></hr>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

function deleteHandler(oid) {
  console.log("The delete link was clicked." + oid);

  // Logical Deletion of Order
  if (oid) {
    fetch(orderlistapi + "/" + oid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "success") {
            //console.log("Product deleted successfully");
            console.log(result.message);
            var delmsg = "Order deleted successfully #" + oid;
            alert(delmsg);
          } else {
            console.log(
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
}

function updateHandler(oid) {
  console.log("The update link was clicked." + oid);

  const deliveredorder = {
    isDelivered: true,
  };

  if (oid) {
    fetch(orderlistapi + "/" + oid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(deliveredorder),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "success") {
            console.log("Product delivered successfully");
            console.log(result.message);
            var msg = "Order delivered successfully #" + oid;
            alert(msg);
          } else {
            console.log(
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
}

export default ManageOrders;
