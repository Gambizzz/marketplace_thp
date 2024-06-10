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
<div className='index-annonces'>
    <h2> TOUTES NOS ANNONCES </h2> 
    {annonces.map((annonce) => (
        <div key={annonce.id}>
            <img src={annonce.image_url} alt={annonce.title} />
            <h3>{annonce.title}</h3>
            <p> Description : {annonce.description}</p>
            <p> Prix : {annonce.price}</p>
            <p> Superficie : {annonce.superficie}</p>
            <p> Nombre de pièces : {annonce.nombre_de_pieces}</p>
            <p> Terrasse : {annonce.terasse_jardin ? "Oui" : "Non"}</p>
        </div>
    ))}
</div>
  );
};

export default Home;
