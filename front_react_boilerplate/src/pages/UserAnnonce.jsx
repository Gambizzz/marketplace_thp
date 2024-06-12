import { useEffect, useState } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const UserAnnonces = () => {
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        fetchAnnonces();
    }, []);

    const fetchAnnonces = async () => {
        const token = Cookies.get('token');
        try {
            const response = await ky.get('http://localhost:3000/user-annonces', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).json();
            setAnnonces(response);
        } catch (error) {
            console.error('There was an error fetching the annonces!', error);
        }
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('token');
        try {
            await ky.delete(`http://localhost:3000/create-annonce/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAnnonces(); // liste des annonces après la suppression
        } catch (error) {
            console.error('There was an error deleting the annonce!', error);
        }
    };


    return (
      <div >
        <div className='profil-title'>
          <h1> MES ANNONCES </h1>
        </div>
        <div className='index-annonces'>
          {annonces.map((annonce) => (
              <div key={annonce.id} className="annonce-card">
                  <h2> {annonce.title} </h2>
                  <img src={annonce.image_url} alt={annonce.title} className="annonce-image" />
                  <p> Prix : {annonce.price} € </p>
                  <p> Description : {annonce.description} </p>
                  <p> Superficie : {annonce.superficie} m2 </p>
                  <p> Nombre de pièces : {annonce.nombre_de_pieces} </p>
                  <p> Terrasse : {annonce.terrasse_jardin ? "Oui" : "Non"} </p>
                  <p> Ville : {annonce.city} </p>
                  <Link to={`/edit-annonce/${annonce.id}`}> <button className='link-edit'> Éditer </button> </Link>
                  <button onClick={() => handleDelete(annonce.id)} className='link-delete'> Supprimer </button>
              </div>
          ))}
        </div>
      </div>
    );
};

export default UserAnnonces;
