import { useState, useEffect } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const EditeAnnonce = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [nombre_de_pieces, setNombre_de_pieces] = useState('');
    const [terasse_jardin, setTerasse_jardin] = useState(null);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
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
            setSuperficie(response.superficie);
            setNombre_de_pieces(response.nombre_de_pieces);
            setTerasse_jardin(response.terasse_jardin);
            setImage(response.image_url);
            setPreviewImage(response.image_url);
        } catch (error) {
            console.error('There was an error fetching the annonce!', error);
        }
    };

    const handleEdit = async () => {
        const token = Cookies.get('token');

        const formData = new FormData();
        formData.append('annonce[title]', title);
        formData.append('annonce[price]', price);
        formData.append('annonce[description]', description);
        formData.append('annonce[superficie]', superficie);
        formData.append('annonce[nombre_de_pieces]', nombre_de_pieces);
        formData.append('annonce[terasse_jardin]', terasse_jardin);
        formData.append('annonce[image]', image);

        try {
            await ky.put(`http://localhost:3000/cree-annonces/${id}`, {
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        } catch (error) {
            console.error('There was an error saving the edited annonce!', error);
        }
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }

    return (
        <div>
            <h1>Page d'édition de l'annonce avec l'ID {id}</h1>
            <div>
                <div>
                    <label>Image:</label>
                    <input type="file" onChange={handleImage} accept="image/*" />
                    {<img src={previewImage} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                </div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" value={superficie} onChange={(e) => setSuperficie(e.target.value)} />
                <input type="number" value={nombre_de_pieces} onChange={(e) => setNombre_de_pieces(e.target.value)} />
                <div>
                    <label>Terasse/Jardin:</label>
                    <div>
                        <input type="radio" id="terasse_jardin_oui" name="terasse_jardin" value="oui" checked={terasse_jardin === true} onChange={() => setTerasse_jardin(true)} />
                        <label htmlFor="terasse_jardin_oui">Oui</label>
                    </div>
                    <div>
                        <input
                            type="radio" id="terasse_jardin_non" name="terasse_jardin" value="non" checked={terasse_jardin === false} onChange={() => setTerasse_jardin(false)} />
                        <label htmlFor="terasse_jardin_non">Non</label>
                    </div>
                </div>
                <button onClick={handleEdit}>Save</button>
            </div>
        </div>
    );
};

export default EditeAnnonce;
