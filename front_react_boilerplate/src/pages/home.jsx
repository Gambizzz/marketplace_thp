import React, { useEffect, useState } from 'react';
import ky from 'ky';
import Hero from '../components/Hero';
import Card from '../components/Card';
import './Home.css';
import SuperficieFilter from '../components/SuperficieFilter';
import PiecesFilter from '../components/PiecesFilter';
import MeubleFilter from '../components/MeubleFilter';
import TerrasseFilter from '../components/TerrasseFilter';

const Home = () => {
  const [annonces, setAnnonces] = useState([]);
  const [superficie, setSuperficie] = useState('');
  const [pieces, setPieces] = useState('');
  const [meuble, setMeuble] = useState('');
  const [terrasse, setTerrasse] = useState('');

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

  const filterAnnonces = () => {
    const annoncesFiltrees = annonces.filter(annonce => (
      (superficie === '' || annonce.superficie === superficie) &&
      (pieces === '' || annonce.pieces === pieces) &&
      (meuble === '' || annonce.meuble === meuble) &&
      (terrasse === '' || annonce.terrasse === terrasse)
    ));

    setAnnonces(annoncesFiltrees);
  };

  useEffect(() => {
    filterAnnonces();
  }, [superficie, pieces, meuble, terrasse]);

  return (
    <div>
      <Hero />
      <div className="filters">
        <SuperficieFilter value={superficie} onChange={setSuperficie} />
        <PiecesFilter value={pieces} onChange={setPieces} />
        <MeubleFilter value={meuble} onChange={setMeuble} />
        <TerrasseFilter value={terrasse} onChange={setTerrasse} />
      </div>
      <div className="cards-container">
        {annonces.length === 0 ? (
          <p>Aucune annonce trouvée.</p>
        ) : (
          annonces.slice(0, 4).map(annonce => (
            <Card
              key={annonce.id}
              title={annonce.title}
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




