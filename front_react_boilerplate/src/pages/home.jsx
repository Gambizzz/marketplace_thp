import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ky from 'ky'; 
import Filter from '../components/filter';
import Hero from '../components/hero';

const Home = () => {
  const { city } = useParams(); // Récupère la ville depuis les paramètres de l'URL
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
  }, [city]);

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
      isTerrasse &&
      (!city || annonce.city.toLowerCase() === city.toLowerCase()) // Ajoutez cette ligne pour filtrer par ville
    );
  });

  return (
    <div>
      <div className='home-title'>
        <Hero />
        <h1>{city ? `Annonces à ${city}` : 'TOUTES NOS ANNONCES'}</h1>
      </div>
      <div className='index-annonces'>
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
              <p>Ville : {annonce.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;



