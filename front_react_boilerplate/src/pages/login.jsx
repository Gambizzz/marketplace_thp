import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import Cookies from 'js-cookie';
import ky from 'ky';

function Login() {
    const [, setUser] = useAtom(userAtom);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (event) => {
      event.preventDefault();
      setError('');
  
      try {
        const response = await ky.post('http://localhost:3000/users/sign_in', {
          json: {
            user: {
              email,
              password,
            }
          }
        }).json();
  
        const { user, token } = response;
        setUser({
          email: user.email,
          id: user.id,
          token: token,
          isLoggedIn: true,
        });
  
        Cookies.set('token', token);
        Cookies.set('id', user.id);
      } catch (error) {
        setError('Identifiants invalides ou erreur');
      }
    };
  
    return (
      <div>
        <form onSubmit={handleLogin}>
          <h1>Se connecter</h1>
          {error && <p>{error}</p>}
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder='Adresse email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor='password'>Mot de passe</label>
            <input type='password' id='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type='submit'>Se connecter</button>
          <Link to="/signup">S'inscrire</Link> | <Link to="/forgot-password">Mot de passe oublié</Link> | <Link to="/">Accueil</Link>
        </form>
      </div>
    );
  }
  

export default Login;
