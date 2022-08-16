import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Login from "./Login";
import Profile from "./Profile";
import Cart from "./Cart";
import Order from "./Order";
import OrderConfirmation from "./OrderConfirmation";
import Product from "./Product";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import Categories from "./Categories";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Order />} />
          <Route
            exact
            path="/orderconfirmation"
            element={<OrderConfirmation />}
          />
          <Route exact path="/addnewproduct" element={<Product />} />
          <Route exact path="/updateproduct" element={<Product />} />
          <Route exact path="/manageproducts" element={<ManageProducts />} />
          <Route exact path="/manageorders" element={<ManageOrders />} />
          <Route exact path="/categories" element={<Categories />} />
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
