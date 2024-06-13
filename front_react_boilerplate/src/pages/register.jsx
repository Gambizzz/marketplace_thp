import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import Cookies from 'js-cookie';
import ky from 'ky';

function SignUp() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

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

      const { user, token } = response;
      setUser({
        email: user.email,
        id: user.id,
        token: token,
        isLoggedIn: true,
      });
      Cookies.set('token', token);
      Cookies.set('id', user.id);

      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      
      window.location.href = "/";
    } catch (error) {
      setError('Erreur durant l\'inscription. Veuillez recommencer.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login-form' id='new_user'>
      <h1> S'INSCRIRE </h1>
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
        <input type='password' id='password_confirmation' placeholder='Confirme ton mot de passe' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
      </div>
      <div>
        <button type='submit'> INSCRIPTION </button>
      </div>
      <Link to="/login" className='links'> Se connecter </Link> | <Link to="/" className='links'> Accueil </Link>
    </form>
  );
}

export default SignUp;


