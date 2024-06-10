import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);

  useEffect(() => {
    fetchAnnonce(id);
  }, [id]);

  const fetchAnnonce = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cree-annonces/${id}`);
      const data = await response.json();
      setAnnonce(data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'annonce : ', error);
    }
  };

  if (!annonce) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="card">
      <img src={annonce.imageUrl} alt={annonce.title} />
      <div className="card-info">
        <h3>{annonce.title}</h3>
        <p>Superficie: {annonce.superficie}</p>
        <p>{annonce.description}</p>
        <p>Prix: {annonce.price}</p>
      </div>
    </div>
  );
};

export default Detail;
