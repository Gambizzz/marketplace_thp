import { useEffect, useState } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const UserAnnonce = () => {
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        fetchAnnonces();
    }, []);

    const fetchAnnonces = async () => {
        const token = Cookies.get('token');
        try {
            const response = await ky.get('http://localhost:3000/mes-annonces', {
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
            await ky.delete(`http://localhost:3000/cree-annonces/${id}`, {
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
        <div>
            <h1>MES ANNONCES :</h1>
            <ul>
                {annonces.map((annonce) => (
                    <li key={annonce.id}>
                        <h2>{annonce.title}</h2>
                        <img src={annonce.image_url} alt={annonce.title} />
                        <p>Prix : {annonce.price}</p>
                        <p>Description : {annonce.description}</p>
                        <p>Superficie: {annonce.superficie}</p>
                        <p>Nombre de pièce: {annonce.nombre_de_pieces}</p>
                        <p>Terasse: {annonce.terasse_jardin ? "Oui" : "Non"}</p>
                        <Link to={`/edite-annonce/${annonce.id}`}><button>Éditer</button></Link>
                        <button onClick={() => handleDelete(annonce.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAnnonce;
