import TopNav from "./TopNav";
const createHistory = require("history").createBrowserHistory;
const addproductapi = "http://localhost:8080/api/v1/admin/add-new-product";

function Product() {
  return (
    <div className="container-fluid">
      <TopNav />
      <div className="row justify-content-center py-4">
        <div className="row col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-2">
          <div className="col-12 rounded py-2">
            <form onSubmit={addProduct}>
              <div className="mb-3">
                <h5>
                  <b>Add new product</b>
                </h5>
              </div>
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productname"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Discount Price</label>
                <input type="number" className="form-control" id="discount" />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product Description</label>
                <input
                  type="textarea"
                  className="form-control"
                  id="description"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Top Selling Product</label>{" "}
                <input type="checkbox" id="isTopProduct" />
              </div>
              <div className="d-flex justify-content-end py-3">
                <button type="submit" id="submit" className="btn btn-primary">
                  Add New Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function addProduct(event) {
  event.preventDefault();
  const in_productname = event.target.elements.productname.value;
  const in_category = event.target.elements.category.value;
  const in_price = event.target.elements.price.value;
  const in_discount = event.target.elements.discount.value;
  const in_image = event.target.elements.image.value;
  const in_desc = event.target.elements.description.value;
  const in_isTopProduct = event.target.elements.isTopProduct.value;

  const product = {
    name: in_productname,
    category: in_category,
    price: in_price,
    discountPrice: in_discount,
    description: in_desc,
    image: in_image,
    isTopProduct: in_isTopProduct,
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
          let history = createHistory();
          history.push(
            "/manageproducts?&productid=" + result.payload.product.id
          );

          let pathUrl = window.location.href;
          window.location.href = pathUrl;
        } else {
          alert("System is experiencing some problem, please try again later");
        }
      },
      (error) => {
        console.log(error);
        alert("System is experiencing some problem, please try again later");
      }
    );
}

export default Product;
