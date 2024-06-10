import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';
import '../index.scss';

const Nav = () => {
  const [user] = useAtom(userAtom);

  return (
    <nav>
      <ul>
        {user.isLoggedIn ? (
          <>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/logout"> Se déconnecter </Link></li>
            <li> <Link to="/cree-annonces"> crée une annonces </Link>  </li>
            <li> <Link to="/mes-annonces">Mes annonces </Link> </li>
          </>
        ) : (
          <>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/signup"> S'inscrire </Link></li>
            <li> <Link to="/login"> Se connecter </Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
