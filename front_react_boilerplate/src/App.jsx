import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './atoms';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './pages/home';
import SignUp from './pages/register';
import Login from './pages/login';
import LogoutLink from './components/logout';
import Nav from './components/navbar';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import './App.scss';
import CreateAnnonce from './pages/CreateAnnonce';
import UserAnnonces from './pages/UserAnnonce';
import EditAnnonce from './pages/EditAnnonce';
import AnnonceDetails from './pages/AnnonceDetails';
import Footer from './components/footer';

function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const userId = Cookies.get('id');

    if (token && userId) {
      setUser({
        email: "",
        id: userId,
        token: token,
        isLoggedIn: true,
      });
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutLink />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/create-annonce" element={<CreateAnnonce />} />
        <Route path="/user-annonces" element={<UserAnnonces />} />
        <Route path="/edit-annonce/:id" element={<EditAnnonce />} />
        <Route path="/annonce/:id" element={<AnnonceDetails /> } />
        <Route path="/:city" element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

