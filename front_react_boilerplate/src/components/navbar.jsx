import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import '../index.scss';
import Dropdown from './Dropdown';

const Nav = () => {
  const [user] = useAtom(userAtom);

  // Données des villes
  const cities = [
    { label: 'Paris', link: 'paris' },
    { label: 'Marseille', link: 'marseille' },
    { label: 'Toulouse', link: 'toulouse' }
  ];

  return (
    <nav>
      {user.isLoggedIn ? (
        <div className='navbar'>
          <Link to="/" className='logo'> DOMUS </Link>
          <Link to="/create-annonce"> CRÉER UNE ANNONCE </Link>
          <Link to="/user-annonces"> MON PROFIL </Link>
          <Dropdown title="VILLES" items={cities} />
          <Link to="/logout"> DÉCONNEXION </Link>
        </div>
      ) : (
        <div className='navbar'>
          <Link to="/" className='logo'> DOMUS </Link>
          <Link to="/signup"> INSCRIPTION </Link>
          <Link to="/login"> CONNEXION </Link>
          <Dropdown title="VILLES" items={cities} />
        </div>
      )}
    </nav>
  );
}

export default Nav;



