import React, { useEffect, useState } from "react";
import { Product } from "./types/Product";
import "./App.css";
import Card from "./components/Card/Card";

function App() {

  const [products, setProducts] = useState<Product[]>([])
  const cards = Array.from({ length: 20 });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products"
      );
      const data = await response.json();
      console.log(data);
      setProducts(data)
    }

    fetchData();
  },[]);


  return (
    <div className="container-fluid">
      <h1 className="text-center">My Shop</h1>
      <div className="row">
        {products.map((product, index) => (
          <Card item={product} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default App;
