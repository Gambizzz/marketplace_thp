import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ky.post('/api/password/reset', { json: { email } });
      setMessage('Un email de réinitialisation du mot de passe a été envoyé.');
    } catch (error) {
      setMessage('Erreur lors de l\'envoi de l\'email de réinitialisation.');
    }
  };

  return (
    <div>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit"> Envoyer l'email de réinitialisation </button>
      </form>
      <p>{message}</p>
      <p>
        <Link to="/signup">S'inscrire</Link> | <Link to="/signin">Se connecter</Link> | <Link to="/">Accueil</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
