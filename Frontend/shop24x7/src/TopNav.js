import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCart } from "react-use-cart";
import { NavLink } from "react-router-dom";

const createHistory = require("history").createBrowserHistory;

const profileapi = "http://localhost:8080/api/v1/profile";

function TopNav() {
  const { totalItems } = useCart();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(profileapi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      //body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setUser(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <b>Shop 24x7</b> &nbsp;
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "grey",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/categories"
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "grey",
                  })}
                >
                  Categories
                </NavLink>
              </li>
              {token ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    to="/profile"
                    style={({ isActive }) => ({
                      color: isActive ? "green" : "grey",
                    })}
                  >
                    Profile
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    to="/registration"
                    style={({ isActive }) => ({
                      color: isActive ? "green" : "grey",
                    })}
                  >
                    Registration
                  </NavLink>
                </li>
              )}
              {token ? (
                <li className="nav-item ">
                  <NavLink
                    className="nav-link active"
                    to="/manageorders"
                    style={({ isActive }) => ({
                      color: isActive ? "green" : "grey",
                    })}
                  >
                    ManageOrder
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {token && user.isAdminRole ? (
                <li className="nav-item ">
                  <NavLink
                    className="nav-link active"
                    to="/manageproducts"
                    style={({ isActive }) => ({
                      color: isActive ? "green" : "grey",
                    })}
                  >
                    ManageProduct
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            {token ? (
              <a className="nav-link me-2" href=".">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>{" "}
                Hello {!!user}{" "}
                <b>
                  {" "}
                  {user.firstName} {user.lastName}{" "}
                </b>
              </a>
            ) : (
              <NavLink
                className="nav-link active me-4"
                to="/login"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "grey",
                })}
              >
                Login
              </NavLink>
            )}

            {token ? (
              <button onClick={() => logout()} className="btn btn-danger me-2">
                Logout
              </button>
            ) : (
              " "
            )}
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Products"
                aria-label="Search"
              />
              <button className="btn btn-outline-success me-2" type="submit">
                Search
              </button>
            </form>
            <a className="nav-link d-flex" href="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
function logout() {
  localStorage.removeItem("token");
  localStorage.clear();
  let history = createHistory();
  history.push("/");
  let pathUrl = window.location.href;
  window.location.href = pathUrl;
}
export default TopNav;
