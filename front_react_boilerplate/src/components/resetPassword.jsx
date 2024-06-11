import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ky from 'ky';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    async function checkTokenValidity() {
      try {
        await ky.get(`/api/password/reset/${token}`);
        setTokenValid(true);
      } catch (error) {
        setTokenValid(false);
        setMessage('Le lien de réinitialisation du mot de passe est invalide ou a expiré.');
      }
    }
    checkTokenValidity();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ky.post('http://localhost:3000/users/password', {
        json: { 
          user: { 
            email: '', 
            password: password,
            password_confirmation: passwordConfirmation
          },
          reset_password_token: token
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).json();
      setMessage('Le mot de passe a été réinitialisé avec succès.');
      console.log(response);
    } catch (error) {
      if (error.response) {
        const errorData = await error.response.json();
        const errorMessage = Array.isArray(errorData.error) ? errorData.error.join(', ') : errorData.error;
        setMessage(`Erreur lors de la réinitialisation du mot de passe: ${errorMessage}`);
        console.error('There was an error resetting the password!', errorData);
      } else {
        setMessage('Erreur lors de la réinitialisation du mot de passe.');
        console.error('There was an error resetting the password!', error);
      }
    }
  };

  if (!tokenValid) {
    return (
      <div>
        <h2>Token invalide</h2>
        <p>{message}</p>
        <p>
          <Link to="/signup">S'inscrire</Link> | <Link to="/login">Se connecter</Link> | <Link to="/">Accueil</Link>
        </p>
      </div>
    );
  }

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
        <Link to="/signup">S'inscrire</Link> | <Link to="/login">Se connecter</Link> | <Link to="/">Accueil</Link>
      </p>
    </div>
  );
};

export default ResetPassword;




