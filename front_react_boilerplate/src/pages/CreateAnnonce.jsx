import React, { useState } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';

const CreateAnnonce = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [nombre_de_pieces, setNombre_de_pieces] = useState('');
  const [terrasse_jardin, setTerrasse_jardin] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [city, setCity] = useState('');

  const cities = ['Paris', 'Marseille', 'Toulouse'];

  const handleSelection = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('annonce[title]', title);
    formData.append('annonce[price]', price);
    formData.append('annonce[description]', description);
    formData.append('annonce[superficie]', superficie);
    formData.append('annonce[nombre_de_pieces]', nombre_de_pieces);
    formData.append('annonce[terrasse_jardin]', terrasse_jardin);
    formData.append('annonce[city]', city);
    formData.append('annonce[image]', image);

    const token = Cookies.get('token'); 

    try {
      const response = await ky.post('http://localhost:3000/create-annonce', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).json();

      console.log(response);

      window.location.href = "/";
    } catch (error) {
      console.error('There was an error creating the annonce!', error);
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <form onSubmit={handleSubmit} className='create-form' id='new_annonce'>
      <h1> CRÉER UNE ANNONCE </h1>
      <div>
        <label> Image : </label>
        <input type="file" onChange={handleImage} accept="image/*" />
        {<img src={previewImage} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
      </div>
      <div>
        <label> Titre : </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label> Prix : </label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <label>€</label>
      </div>
      <div>
        <label> Description : </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label> Superficie : </label>
        <input type="number" value={superficie} onChange={(e) => setSuperficie(e.target.value)} />
        <label>m²</label>
      </div>
      <div>
        <label> Nombre de pièces : </label>
        <input type="number" value={nombre_de_pieces} onChange={(e) => setNombre_de_pieces(e.target.value)} />
      </div>
      <div className='checkbox'>
        <label> Terrasse/Jardin : </label>
        <div>
          <input
            type="radio" id="terrasse_jardin_oui" name="terrasse_jardin" value={true} checked={terrasse_jardin === true} onChange={() => setTerrasse_jardin(true)} />
          <label htmlFor="terrasse_jardin_oui"> Oui </label>
          <input
            type="radio" id="terrasse_jardin_non" name="terrasse_jardin" value={false} checked={terrasse_jardin === false} onChange={() => setTerrasse_jardin(false)} />
          <label htmlFor="terrasse_jardin_non"> Non </label>
        </div>
      </div>
      <div>
        <label> Ville : </label>
        <select value={city} onChange={handleSelection} className='drop-create'>
          <option value=''> Sélectionner une ville </option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <button type="submit" className='btn-create'> CRÉER </button>
    </form>
  );
};

export default CreateAnnonce;


