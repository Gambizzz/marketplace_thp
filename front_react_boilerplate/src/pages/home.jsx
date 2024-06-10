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
    meuble: '',
  });

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const response = await ky.get('http://localhost:3000/cree-annonces');
      console.log('Response:', response); // Debug
      const data = await response.json();
      console.log('Fetched data:', data); // Debug
      setAnnonces(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces : ', error);
    }
  };

  const filteredAnnonces = annonces.filter((annonce) => {
    const priceMin = filters.priceMin ? parseFloat(filters.priceMin) : 0;
    const priceMax = filters.priceMax ? parseFloat(filters.priceMax) : Infinity;
    // const superficieMin = filters.superficieMin ? parseFloat(filters.superficieMin) : 0;
    // const superficieMax = filters.superficieMax ? parseFloat(filters.superficieMax) : Infinity;
    // const isMeuble = filters.meuble === '' ? true : (filters.meuble === 'true' ? annonce.meuble : !annonce.meuble);

    return (
      annonce.price >= priceMin &&
      annonce.price <= priceMax
      // &&
      // annonce.superficie >= superficieMin &&
      // annonce.superficie <= superficieMax &&
      // isMeuble
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
            <h3>{annonce.title}</h3>
            <p>Description : {annonce.description}</p>
            <p>Prix : {annonce.price}</p>
          </li>
        ))
      }
      </ul>
    </div>
  );
};

export default Home;
