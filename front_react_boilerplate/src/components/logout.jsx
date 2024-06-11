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
    window.location.href = "/";
  };

  return (
    <div className='logout-form'>
      <h1> SE DÉCONNECTER </h1>
      <button onClick={handleLogout}> Déconnexion </button>
    </div>
  );
}

export default LogoutLink;
