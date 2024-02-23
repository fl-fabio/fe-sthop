import React, { useEffect, useState } from "react";
import { Product } from "./types/Product";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [totQuantity, setTotQuantity] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products"
      );
      const data = await response.json();
      console.log(data);
      setProducts([...data].map(product => ({...product, quantity: 0})));
    }

    fetchData();
  },[]);

  useEffect(() => {
    setTotQuantity(products.reduce((acc, product) => acc + product.quantity, 0))
  },[products])

  console.log(products)

  return (
    <div className="container-fluid">
      <Navbar totQuantity={totQuantity}/>
      <h1 className="text-center">My Shop</h1>
      <div className="row">
        {products.map((product, index) => {
          return (
              <Card item={product} index={index} setProducts={setProducts}/>
            )
        })}
      </div>
    </div>
  );
}

export default App;
