import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import Dropdown from './Dropdown';
import '../index.scss';

const Nav = () => {
  const [user] = useAtom(userAtom);

  const cityItems = [
    { label: 'Paris', link: '/ville/paris' },
    { label: 'Marseille', link: '/ville/marseille' },
    { label: 'Toulouse', link: '/ville/toulouse' }
  ]
  
  return (
    <nav>
        {user.isLoggedIn ? (
            <div className='navbar'>
                <Link to="/" className='logo'> DOMUS </Link>
                <Link to="/cree-annonces"> CRÉER UNE ANNONCE </Link>
                <Link to="/mes-annonces"> MON PROFIL </Link>
                <Dropdown title="VILLES" items={cityItems} />
                <Link to="/logout"> DÉCONNEXION </Link>
            </div>
        ) : (
            <div className='navbar'>
                <Link to="/" className='logo'> DOMUS </Link>
                <Link to="/signup"> INSCRIPTION </Link>
                <Link to="/login"> CONNEXION </Link>
                <Dropdown title="VILLES" items={cityItems} />
            </div>
        )}
    </nav>
  );
}

export default Nav;
