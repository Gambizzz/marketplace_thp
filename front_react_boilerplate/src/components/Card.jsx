import React from 'react';
import './Card.css';

const Card = ({ title, description, price, imageUrl }) => (
  <div className="card">
    <img src={imageUrl} alt={title} />
    <div className="card-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Prix : {price}</p>
    </div>
  </div>
);

export default Card;
