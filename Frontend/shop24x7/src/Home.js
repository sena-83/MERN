import * as React from "react";
import "./App.css";

import TopNav from "./TopNav";
import StaticCard from "./StaticCard";
import ProductCard from "./ProductCard";
//import Cart from "./Cart";

import { useState } from "react";
import { useEffect } from "react";

import banner1 from "./img/banner1.png";
import banner2 from "./img/banner2.png";
import banner3 from "./img/banner3.png";

const topproductapi = "http://localhost:8080/api/v1/homepage/products";

function Home() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(topproductapi)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.products);

          console.log("result " + result.products);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log("error" + error);
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
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={banner2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={banner3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="container py-4">
          <StaticCard />
        </div>
        <div className="container py-4">
          <div className="container py-4">
            {" "}
            <b>Top Products</b>{" "}
          </div>
          <div className="row">
            {!!items &&
              items.map((item, index) => {
                console.log("index" + index);
                console.log({ item });
                return (
                  <ProductCard
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    title={item.title}
                    price={item.price}
                    category={item.category}
                    isTopProduct={item.isTopProduct}
                    item={item}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
