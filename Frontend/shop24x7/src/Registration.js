import { useState } from "react";
import TopNav from "./TopNav";
import Modal from "./Modal";
const registerapi = "http://localhost:8080/api/v1/users/register";

function Registration() {
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [show, setShow] = useState(false);
  const [redirectionRequired, setRedirectionRequired] = useState(false);

  function handleRegistration(event) {
    event.preventDefault();
    const in_fname = event.target.elements.firstname.value;
    const in_lname = event.target.elements.lastname.value;
    const in_email = event.target.elements.email.value;
    const in_pass = event.target.elements.password.value;
    const in_confirm_pass = event.target.elements.confirmpassword.value;
    var flag = false;
    if (in_pass !== in_confirm_pass) {
      setModalMessage("Password and confirm password should exactly match");
      setModalTitle("Error");
      setShow(true);
      flag = true;
    }

    const user = {
      firstName: in_fname,
      lastName: in_lname,
      email: in_email,
      password: in_pass,
    };

    if (!flag) {
      fetch(registerapi, {
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
              setModalMessage("Registration successfull");
              setModalTitle("Success");
              setShow(true);
              setRedirectionRequired(true);
              console.log(result.message);
            } else {
              setModalMessage(result.message);
              setModalTitle("Alert");
              setShow(true);
              console.log(result.message);
            }
          },
          (error) => {
            console.log(error);
            setModalMessage(
              "System is experiencing some problem, please try again later"
            );
            setModalTitle("Error");
            setShow(true);
          }
        );
    }
  }

  return (
    <div className="container-fluid">
      <TopNav />
      <Modal
        modalTitle={modalTitle}
        modalMessage={modalMessage}
        onClose={() => setShow(false)}
        redirectionRequired={redirectionRequired}
        redirectURL="/login"
        show={show}
      />
      <div className="container text-left py-3">
        <div className="row">
          <div className="col-8">
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

          <div className="col-4 border bg-light rounded py-3">
            <form onSubmit={handleRegistration}>
              <div className="mb-3">
                <h5>
                  <b>Registration</b>
                </h5>
              </div>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  Firstname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Lastname
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  required
                />
              </div>
              <div className="d-flex justify-content-end py-3">
                <button type="submit" id="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
