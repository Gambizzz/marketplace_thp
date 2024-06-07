import React, { useEffect, useState } from 'react';
import ky from 'ky'; 

const Home = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const response = await ky.get('http://localhost:3000/cree-annonces');
      const data = await response.json();
      setAnnonces(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces : ', error);
    }
  };

  return (
    <div>
      <h1>PAGE D'ACCUEIL</h1>
      <h2>Annonces :</h2>
      <ul>
        {annonces.map((annonce) => (
          <li key={annonce.id}>
            <h3>{annonce.title}</h3>
            <p>Description : {annonce.description}</p>
            <p>Prix : {annonce.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
