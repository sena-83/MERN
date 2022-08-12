//import { useState } from "react";
//import { useEffect } from "react";
import TopNav from "./TopNav";
const createHistory = require("history").createBrowserHistory;

const loginapi = "http://localhost:8080/api/v1/users/login";

function Login() {
  //const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="container-fluid">
      <TopNav />
      <div class="container text-left py-3">
        <div class="row">
          <div class="col-8">
            <p className="position:relative fw-bolder text-title">
              Welcome to Shop 24 x 7
            </p>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut purus
              elit, vestibulum ut, placerat ac, adipiscing vitae, felis.
              Curabitur dictum gravida mauris. Nam arcu libero, nonummy eget,
              consectetuer id, vulputate a, magna. Donec vehicula augue eu
              neque. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Mauris ut leo. Cras viverra
              metus rhoncus sem. Nulla et lectus vestibulum urna fringilla
              ultrices. Phasellus eu tellus sit amet tortor gravida placerat.
              Integer sapien est, iaculis in, pretium quis, viverra ac, nunc.
              Praesent eget sem vel leo ultrices bibendum. Aenean faucibus.
              Morbi dolor nulla, malesuada eu, pulvinar at, mollis ac, nulla.
              Curabitur auctor semper nulla. Donec varius orci eget risus. Duis
              nibh mi, congue eu, accumsan eleifend, sagittis quis, diam. Duis
              eget orci sit amet orci dignissim rutrum.
            </p>
          </div>
          <div class="col-4 border bg-light rounded py-3">
            <form onSubmit={handleLogin}>
              <div class="mb-3">
                <h5>
                  <b>Login</b>
                </h5>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  required
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text"></div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="d-flex justify-content py-3">
                Not Registered?{" "}
                <a className="nav-link" href="/registration">
                  <u>Sign up now.</u>
                </a>
              </div>
              <div className="d-flex justify-content-end py-3">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function handleLogin(event) {
  event.preventDefault();
  const in_email = event.target.elements.email.value;
  const in_pass = event.target.elements.password.value;

  const user = {
    email: in_email,
    password: in_pass,
  };

  fetch(loginapi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.status === "success") {
          console.log("Login successfull");
          console.log(result.accessToken);
          localStorage.setItem("token", result.accessToken);

          let history = createHistory();
          history.push("/");
          let pathUrl = window.location.href;
          window.location.href = pathUrl;
        } else {
          console.log("Username and Password are not correct");
          alert("Username and Password are not correct");
        }
      },
      (error) => {
        alert("System is experiencing some problem, please try again later");
      }
    );
}
export default Login;
