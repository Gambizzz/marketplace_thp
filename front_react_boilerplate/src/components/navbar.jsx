import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import '../index.scss';

const Nav = () => {
  const [user] = useAtom(userAtom);

  return (
    <nav>
        {user.isLoggedIn ? (
            <div className='navbar'>
                <Link to="/"> DOMUS </Link>
                <Link to="/cree-annonces"> CRÉER UNE ANNONCE </Link>
                <Link to="/mes-annonces"> MON PROFIL </Link>
                <Link to="/logout"> DÉCONNEXION </Link>
            </div>
        ) : (
            <div className='navbar'>
                <Link to="/"> DOMUS </Link>
                <Link to="/signup"> INSCRIPTION </Link>
                <Link to="/login"> CONNEXION </Link>
            </div>
        )}
    </nav>
  );
}

export default Nav;
