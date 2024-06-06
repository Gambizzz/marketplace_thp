import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ky from 'ky';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function checkTokenValidity() {
      try {
        await ky.get(`/api/password/reset/${token}`);
      } catch (error) {
        setMessage('Le lien de réinitialisation du mot de passe est invalide ou a expiré.');
      }
    }
    checkTokenValidity();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ky.post(`/api/password/reset/${token}`, { json: { password, password_confirmation: passwordConfirmation } });
      setMessage('Le mot de passe a été réinitialisé avec succès.');
    } catch (error) {
      setMessage('Erreur lors de la réinitialisation du mot de passe.');
    }
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Nouveau mot de passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password_confirmation">Confirmer le nouveau mot de passe:</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      <p>{message}</p>
      <p>
        <Link to="/signup">S'inscrire</Link> | <Link to="/signin">Se connecter</Link> | <Link to="/">Accueil</Link>
      </p>
    </div>
  );
};

export default ResetPassword;
