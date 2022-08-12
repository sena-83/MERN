import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import TopNav from "./TopNav";
import ProductCard from "./ProductCard";

const productapi = "http://localhost:8080/api/v1/homepage/categories";

function Categories() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(productapi)
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
    );
  }
}

export default Categories;
