import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import Cookies from 'js-cookie';

function LogoutLink() {
  const [, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });

    Cookies.remove('token');
    Cookies.remove('id');
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
}

export default LogoutLink;