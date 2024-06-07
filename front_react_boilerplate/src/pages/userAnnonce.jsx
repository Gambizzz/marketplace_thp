import React, { useState } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';

const UserAnnonce = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = Cookies.get('token');  // Récupère le token depuis les cookies

    try {
      const response = await ky.post('http://localhost:3000/mes-annonces', {
        json: {
          annonce: {  
            title,
            price,
            description
          }
        },
        // method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`  // Ajoute le préfixe Bearer et le token dans l'en-tête
        }
      }).json();
      
      console.log(response);
    } catch (error) {
      console.error('There was an error creating the annonce!', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Create Annonce</button>
    </form>
  );
};

export default UserAnnonce;