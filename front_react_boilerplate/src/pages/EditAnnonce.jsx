import { useState, useEffect } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const EditeAnnonce = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams(); // Récupérer l'ID du post depuis l'URL

    useEffect(() => {
        fetchAnnonce();
    }, []);

    const fetchAnnonce = async () => {
        const token = Cookies.get('token');
        try {
            const response = await ky.get(`http://localhost:3000/cree-annonces/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).json();
            setTitle(response.title);
            setPrice(response.price);
            setDescription(response.description);
        } catch (error) {
            console.error('There was an error fetching the annonce!', error);
        }
    };

    const handleEdit = async () => {
        const token = Cookies.get('token');
        try {
            await ky.put(`http://localhost:3000/cree-annonces/${id}`, {
                json: { title, price, description },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
    
        } catch (error) {
            console.error('There was an error saving the edited annonce!', error);
        }
    };

    return (
        <div>
            <h1>Page d'édition de l'annonce avec l'ID {id}</h1>
            <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={handleEdit}>Save</button>
            </div>
        </div>
    );
};

export default EditeAnnonce;
