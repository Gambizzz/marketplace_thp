import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ky from 'ky';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';

const AnnonceDetails = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await ky.get(`http://localhost:3000/create-annonce/${id}`);
        const data = await response.json();
        setAnnonce(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'annonce : ', error);
      }
    };
    fetchAnnonce();
  }, [id]);

  if (!annonce) {
    return <div> Loading... </div>;
  }

  return (
    <div className='announcement-card'>
      <div className='annonce-details'>
        <h1> {annonce.title} </h1>
        <img src={annonce.image_url} alt={annonce.title} />
        <p> Description : {annonce.description}</p>
        <p> Prix : {annonce.price} € </p>
        <p> Superficie : {annonce.superficie} m2 </p>
        <p> Nombre de pièces : {annonce.nombre_de_pieces}</p>
        <p> Terrasse : {annonce.terrasse_jardin ? "Oui" : "Non"} </p>
        <p> Ville : {annonce.city} </p>
        {user.isLoggedIn ? (
          <p> <strong> Propriétaire : </strong> {annonce.user.email} </p>
          ) : (
            <div></div>
          )}
      </div>
    </div>
  );
};

export default AnnonceDetails;
