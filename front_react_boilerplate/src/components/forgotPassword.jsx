import React, { useState } from 'react';
import ky from 'ky';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ky.post('http://localhost:3000/users/password', {
        json: {
          user: {
            email
          }
        },
        headers: {
          "Content-Type": "application/json"
        }
      }).json();

      setMessage('Un email de réinitialisation du mot de passe a été envoyé.');
      console.log(response);
    } catch (error) {
      if (error.response) {
        const errorData = await error.response.json();
        const errorMessage = Array.isArray(errorData.error) ? errorData.error.join(', ') : errorData.error;
        setMessage(`Erreur lors de l'envoi de l'email de réinitialisation: ${errorMessage}`);
        console.error('There was an error sending the reset password email!', errorData);
      } else {
        setMessage('Erreur lors de l\'envoi de l\'email de réinitialisation.');
        console.error('There was an error sending the reset password email!', error);
      }
    }
  };

  return (
    <div className='forgot-pass'>
      <h1> MOT DE PASSE OUBLIÉ </h1>
      <form onSubmit={handleSubmit} className='forgot-form'>
        <label htmlFor="email"> Email : </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className='btn-forgot'> Envoyer l'email de réinitialisation </button>

      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;







