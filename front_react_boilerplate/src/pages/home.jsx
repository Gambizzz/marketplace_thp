import React, { useEffect, useState } from 'react';
import ky from 'ky';
import Hero from '../components/Hero';
import Card from '../components/Card';
import './Home.css';

const Home = () => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const response = await ky.get('http://localhost:3000/cree-annonces');
      const data = await response.json();
      console.log(data); // Vérifiez les données reçues
      setAnnonces(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces : ', error);
    }
  };

  return (
    <div>
      <Hero />
      <h1>PAGE D'ACCUEIL</h1>
      <h2>Annonces :</h2>
      <div className="cards-container">
        {annonces.length === 0 ? (
          <p>Aucune annonce trouvée.</p>
        ) : (
          annonces.slice(0, 4).map((annonce) => (
            <Card
            key={annonce.id}
            id={annonce.id} 
            title={annonce.title}
            superficie={annonce.superficie}
            description={annonce.description}
            price={annonce.price}
            imageUrl={annonce.image_url} 
          />
          
          ))
        )}
      </div>
    </div>
  );
};

export default Home;



