import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import Cookies from 'js-cookie';
import ky from 'ky';

function SignUp() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');
  const [error, setError] = useState('');
  const [, setToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await ky.post('http://localhost:3000/users', {
        json: {
          user: {
            email,
            password,
            password_confirmation
          }
        }
      }).json();
      console.log(response)

      const { user, token } = response;
      setUser({
        email: user.email,
        id: user.id,
        token: token,
        isLoggedIn: true,
      });
      Cookies.set('token', token);
      Cookies.set('id', user.id);

      setToken(token);
      setEmail('');
      setPassword('');
      setPassword_Confirmation('');
    } catch (error) {
      setError('Erreur durant l\'inscription. Veuillez recommencer.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1> S'inscrire </h1>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor='email'> Email </label>
        <input type='email' id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor='password'> Mot de passe </label>
        <input type='password' id='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label htmlFor='password_confirmation'> Confirme ton mot de passe </label>
        <input type='password' id='password_confirmation' placeholder='Confirme ton mot de passe' value={password_confirmation} onChange={(e) => setPassword_Confirmation(e.target.value)} required />
      </div>
      <button type='submit'> S'inscrire </button>

      <Link to="/login"> Se connecter </Link> | <Link to="/"> Accueil </Link>
    </form>
  );
}

export default SignUp;

