import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import TopNav from "./TopNav";
import Modal from "./Modal";
const addproductapi = "http://localhost:8080/api/v1/admin/add-new-product";
const updateproductapi = "http://localhost:8080/api/v1/admin/products/";
const fetchproductapi = "http://localhost:8080/api/v1/products/";

function Product() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [show, setShow] = useState(false);
  const [redirectionRequired, setRedirectionRequired] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isTopProduct, setIsTopProduct] = useState(false);

  const handleOnChange = (event) => {
    if (event.target.id === "name") setName(event.target.value);
    if (event.target.id === "category") setCategory(event.target.value);
    if (event.target.id === "price") setPrice(event.target.value);
    if (event.target.id === "image") setImage(event.target.value);
    if (event.target.id === "description") setDescription(event.target.value);
    if (event.target.id === "discountPrice")
      setDiscountPrice(event.target.value);
    if (event.target.id === "isTopProduct")
      setIsTopProduct(event.target.checked);
  };

  useEffect(() => {
    const pid = searchParams.get("pid");

    fetch(fetchproductapi + pid)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.product) {
            setProduct(result.product);
            setName(result.product.name);
            setCategory(result.product.category);
            setPrice(result.product.price);
            setImage(result.product.image);
            setDescription(result.product.description);
            setDiscountPrice(result.product.discountPrice);
            setIsTopProduct(result.product.isTopProduct);
          }

          console.log("result" + result.product);
          console.log("result" + result.message);
          console.log("result" + result.status);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function addProduct(event) {
    event.preventDefault();
    const product = {
      name: name,
      category: category,
      price: price,
      discountPrice: discountPrice,
      description: description,
      image: image,
      isTopProduct: isTopProduct,
    };
    fetch(addproductapi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "success") {
            console.log(result.message);
            console.log(result.payload);

            setModalMessage(result.message + result.payload.product.id);
            setModalTitle("Success");
            setShow(true);
            setRedirectionRequired(true);
          } else if (result.status === "duplicate") {
            setModalMessage(result.message);
            setModalTitle("Duplicate");
            setShow(true);
            //setRedirectionRequired(true);
          } else {
            console.log(
              "System is experiencing some problem, please try again later"
            );
            setModalMessage(
              "System is experiencing some problem, please try again later"
            );
            setModalTitle("Error");
            setShow(true);
            setRedirectionRequired(true);
          }
        },
        (error) => {
          console.log(error);
          setModalMessage(
            "System is experiencing some problem, please try again later"
          );
          setModalTitle("Error");
          setShow(true);
          setRedirectionRequired(true);
        }
      );
  }

  function updateProduct(event) {
    event.preventDefault();
    const product = {
      name: name,
      category: category,
      price: price,
      discountPrice: discountPrice,
      description: description,
      image: image,
      isTopProduct: isTopProduct,
    };

    const pid = searchParams.get("pid");
    fetch(updateproductapi + pid, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === "success") {
            console.log(result.message);
            setModalMessage(result.message);
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
            setRedirectionRequired(true);
          }
        },
        (error) => {
          console.log(error);
          setModalMessage(
            "System is experiencing some problem, please try again later"
          );
          setModalTitle("Error");
          setShow(true);
          setRedirectionRequired(true);
        }
      );
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
        <div className="row justify-content-center py-4">
          <div className="row col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-2">
            <div className="col-12 rounded py-2">
              <form onSubmit={!!product ? updateProduct : addProduct}>
                <div className="mb-3">
                  <h5>
                    {!!product ? <b>Update product</b> : <b>Add new product</b>}
                  </h5>
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    required
                    value={category}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    required
                    value={price}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Discount Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="discountPrice"
                    value={discountPrice}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Image</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    required
                    value={image}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Description</label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="description"
                    required
                    value={description}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Top Selling Product</label>{" "}
                  <input
                    type="checkbox"
                    id="isTopProduct"
                    checked={isTopProduct}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="d-flex justify-content-end py-3">
                  {!!product ? (
                    <button
                      type="submit"
                      id="submit"
                      className="btn btn-primary"
                    >
                      Update Product
                    </button>
                  ) : (
                    <button
                      type="submit"
                      id="submit"
                      className="btn btn-primary"
                    >
                      Add New Product
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
