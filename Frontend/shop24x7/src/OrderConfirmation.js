import TopNav from "./TopNav";
import { useSearchParams } from "react-router-dom";
import { useCart } from "react-use-cart";

function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const { emptyCart } = useCart();

  const orderno = searchParams.get("orderno");
  const email = searchParams.get("email");
  //console.log("orderno" + orderno);
  //console.log("email" + email);

  emptyCart();

  return (
    <div className="container-fluid">
      <TopNav />
      <div className="row justify-content-center">
        <h4 className="text-center py-3 text-decoration-underline">
          Your Orders
        </h4>
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 py-4">
          <div className="row">
            <div className="col">
              <p className="position:relative fw-bolder text-title">
                #{orderno}
              </p>
            </div>{" "}
            <div className="col">
              <p className="d-flex justify-content-end">
                <a href="./orderdetails">details</a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="text-subtitle">{email}</p>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
