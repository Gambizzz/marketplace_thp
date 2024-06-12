import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky'; 
import Filter from '../components/filter';
import Hero from '../components/hero';

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

  // FILTRE
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
    <div className='index-annonces'>
      <Hero />
        <h1> TOUTES NOS ANNONCES </h1>
        <Filter filters={filters} setFilters={setFilters} />
          {filteredAnnonces.map((annonce) => (
              <Link key={annonce.id} to={`/annonce/${annonce.id}`} className="annonce-details">
              <div className="annonce-card">
                <h2>{annonce.title}</h2>
                <img src={annonce.image_url} alt={annonce.title} className="annonce-image" />
                <p>Description : {annonce.description}</p>
                <p>Prix : {annonce.price} €</p>
                <p>Superficie : {annonce.superficie} m²</p>
                <p>Nombre de pièces : {annonce.nombre_de_pieces}</p>
                <p>Terrasse : {annonce.terasse_jardin ? "Oui" : "Non"}</p>
              </div>
            </Link>
          ))}
      </div>
  );
};

export default Home;

