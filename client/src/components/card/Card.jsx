import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({ card }) => {
  return (
    <Link to={`/gigs?cat=${card.category}`}>  
    <div className="card">
      <img src={card.img} alt="" />
      <p className="card-title">{card.title}</p>
      <p className="card-desc">{card.desc}</p>
    </div>
    </Link>
  );
};

export default Card;
