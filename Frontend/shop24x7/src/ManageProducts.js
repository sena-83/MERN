import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import TopNav from "./TopNav";
const productlistapi = "http://localhost:8080/api/v1/admin/products";

function ManageProducts() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const productid = searchParams.get("productid");
  var addmsg = "";
  if (productid) {
    addmsg = "New Product Added Successfully - #" + productid;
    console.log("productid" + productid);
  }

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
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container-fluid">
        <TopNav />

        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-4">
            <div className="row justify-content-center">
              <br></br>
              {addmsg}
              <br></br>
            </div>
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
                      <NavLink to="#">Edit</NavLink> |{" "}
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
function deleteHandler(pid) {
  console.log("The delete link was clicked." + pid);

  // Logical Deletion of product
  if (pid) {
    fetch(productlistapi + "/" + pid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "success") {
            //console.log("Product deleted successfully");
            console.log(result.message);
            var delmsg = "Product deleted successfully #" + pid;
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

export default ManageProducts;
