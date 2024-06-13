import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      
      window.location.href = "/";
    } catch (error) {
      setError('Identifiants invalides ou erreur');
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleLogin} id='new_user_session'>
        <h1> SE CONNECTER </h1>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor='email'> Email </label>
          <input type='email' id='email' placeholder='Adresse email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor='password'> Mot de passe </label>
          <input type='password' id='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button type='submit'> CONNEXION </button>
        </div>
        <Link to="/signup" className='links'> S'inscrire </Link> | <Link to="/forgot-password" className='links'> Mot de passe oublié </Link> | <Link to="/" className='links'> Accueil </Link>
      </form>
    </div>
  );
}

export default Login;

