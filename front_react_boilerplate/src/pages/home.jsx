import { useEffect, useState } from 'react';
import ky from 'ky'; 
import Filter from '../components/filter';

const Home = () => {
  const [annonces, setAnnonces] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    superficieMin: '',
    superficieMax: '',
    nbDePiecesMin: '',
    nbDePiecesMax: '',
    terasse_jardin: ''
  });

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

  const filteredAnnonces = annonces.filter((annonce) => {
    const priceMin = filters.priceMin ? parseFloat(filters.priceMin) : 0;
    const priceMax = filters.priceMax ? parseFloat(filters.priceMax) : Infinity;
    const superficieMin = filters.superficieMin ? parseFloat(filters.superficieMin) : 0;
    const superficieMax = filters.superficieMax ? parseFloat(filters.superficieMax) : Infinity;
    const nbDePiecesMin = filters.nbDePiecesMin ? parseFloat(filters.nbDePiecesMin) : 0;
    const nbDePiecesMax = filters.nbDePiecesMax ? parseFloat(filters.nbDePiecesMax) : Infinity;
    const isTerrasse = filters.terasse_jardin === '' ? true : (filters.terasse_jardin === 'true' ? annonce.terasse_jardin : !annonce.terasse_jardin);

    return (
      annonce.price >= priceMin &&
      annonce.price <= priceMax &&
      annonce.superficie >= superficieMin &&
      annonce.superficie <= superficieMax &&
      annonce.nombre_de_pieces >= nbDePiecesMin &&
      annonce.nombre_de_pieces <= nbDePiecesMax &&
      isTerrasse
    );
  });
  return (
    <div>
      <h1>PAGE D'ACCUEIL</h1>
      <Filter filters={filters} setFilters={setFilters} />
      <h2>Annonces :</h2> 
      <ul>
      {filteredAnnonces.map((annonce) => (
          <li key={annonce.id}>
            <img src={annonce.image_url} alt={annonce.title} />
            <h3>{annonce.title}</h3>
            <p>Description : {annonce.description}</p>
            <p>Prix : {annonce.price}</p>
            <p>Superficie: {annonce.superficie}</p>
            <p>Nombre de pièces: {annonce.nombre_de_pieces}</p>
            <p>Terasse: {annonce.terasse_jardin ? "Oui" : "Non"}</p>
          </li>
        ))
      }
      </ul>
    </div>
  );
};

export default Home;
