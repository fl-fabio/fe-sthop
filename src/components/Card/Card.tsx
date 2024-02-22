import React from "react";
import './Card.css';
import { Product } from "../../types/Product";

interface CardProps {
    item: Product,
    index: number
}
const Card = ({item, index}: CardProps) => {

  return (
    <div className="card col-4" style={{ width: "18rem" }}>
      <img
        src={item.image}
        className="card-img-top"
        alt={"card"}
      />
      <div className="card-body">
        <h5 className="card-title truncate">{item.title}</h5>
        <p className="card-text truncate">
          {item.description}
        </p>
        <p className="price">{`${item.price} €`}</p>
      </div>
    </div>
  );
};

export default Card;
