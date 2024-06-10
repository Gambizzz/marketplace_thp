import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'

const Card = ({ id, title, superficie, description, price, imageUrl }) => {
  return (
    <Link to={`/detail/${id}`} className="card-link">
      <div className="card">
        <img src={imageUrl} alt={title} />
        <div className="card-info">
          <h3>{title}</h3>
          <p>{superficie}</p>
          <p>{description}</p>
          <p>Prix : {price} /mois</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

