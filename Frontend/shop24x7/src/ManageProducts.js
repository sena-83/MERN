import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import TopNav from "./TopNav";

const createHistory = require("history").createBrowserHistory;
const productlistapi = "http://localhost:8080/api/v1/admin/products";

function ManageProducts() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [show, setShow] = useState(false);
  const [redirectionRequired, setRedirectionRequired] = useState(false);

  useEffect(() => {
    fetch(productlistapi)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.products);
          //console.log("result");
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function editHandler(pid) {
    console.log("The edit link was clicked." + pid);
    if (pid) {
      let history = createHistory();
      history.push("/updateproduct?pid=" + pid);
      let pathUrl = window.location.href;
      window.location.href = pathUrl;
    }
  }

  function deleteHandler(pid) {
    console.log("The delete link was clicked." + pid);

    // Logical Deletion of product
    if (pid) {
      fetch(productlistapi + "/" + pid, {
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
              console.log(result.message);
              setModalMessage(result.message + pid);
              setModalTitle("Success");
              setShow(true);
              setRedirectionRequired(true);
            } else {
              console.log(
                "System is experiencing some problem, please try again later"
              );
              setModalMessage(
                "System is experiencing some problem, please try again later"
              );
              setModalTitle("Error");
              setShow(true);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container-fluid">
        <TopNav />
        <Modal
          modalTitle={modalTitle}
          modalMessage={modalMessage}
          onClose={() => setShow(false)}
          redirectionRequired={redirectionRequired}
          redirectURL="/manageproducts"
          show={show}
        />
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-4">
            <p className="position:relative fw-bolder text-title">
              Manage Products{" "}
              <input
                type="button"
                className="btn btn-primary py-1"
                value="Add New Product"
                onClick={() => navigate("/addnewproduct")}
              />
            </p>
            {!!items &&
              items.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col">
                    <p className="position:relative text-title">
                      {item.name}
                      <br></br>
                      Price ${item.price}
                      <br></br>
                    </p>
                  </div>{" "}
                  <div className="col">
                    <p className="d-flex justify-content-end">
                      <NavLink onClick={() => editHandler(item.id)} to="#">
                        Edit
                      </NavLink>{" "}
                      |{" "}
                      <NavLink onClick={() => deleteHandler(item.id)} to="#">
                        Delete
                      </NavLink>
                    </p>
                  </div>
                  <hr></hr>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ManageProducts;
