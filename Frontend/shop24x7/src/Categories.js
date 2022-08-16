import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import "./App.css";
import TopNav from "./TopNav";
import ProductCard from "./ProductCard";

const productapi = "http://localhost:8080/api/v1/homepage/categories";

function Categories() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  // Add all available(non-deleted) products on page load
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

  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
      return items;
    } else if (
      selectedCategory === "tv" ||
      selectedCategory === "mobile" ||
      selectedCategory === "tablet"
    ) {
      return items.filter((item) => item.category === selectedCategory);
    } else {
      return items.filter(
        (item) =>
          item.price >= selectedCategory.split("-")[0] &&
          item.price <= selectedCategory.split("-")[1]
      );
    }
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [selectedCategory, items]);

  // function call for on change event of category selection
  function handleCategoryChange(event) {
    var id = event.target.id;
    if (id === "pricelist")
      document.getElementById("categorylist").selectedIndex = 0;

    if (id === "categorylist")
      document.getElementById("pricelist").selectedIndex = 0;

    setSelectedCategory(event.target.value);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container-fluid">
        <TopNav />
        <div className="row">
          <div className="filter-container">
            <div className="text-title py-2">
              Filter by Category:
              <select
                name="categorylist"
                id="categorylist"
                onChange={handleCategoryChange}
                className="mx-3 rounded"
              >
                <option value="">All</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="tv">Television</option>
              </select>
            </div>
            <div className="text-title py-2">
              Filter by Price Range:
              <select
                name="pricelist"
                id="pricelist"
                onChange={handleCategoryChange}
                className="mx-3 rounded"
              >
                <option value="">All</option>
                <option value="5-50">$5-$50</option>
                <option value="50-150">$50-$150</option>
                <option value="150-500">$150-$500</option>
                <option value="500-1500">$500-$1500</option>
                <option value="1500-5000">$1500-$5000</option>
              </select>
            </div>
          </div>
          {!!filteredList &&
            filteredList.map((item, index) => {
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
