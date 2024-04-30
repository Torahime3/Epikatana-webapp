import { useCookies } from 'react-cookie';
import '../styles/Header.css';
import Cart from './Cart';


const Header = () => {

  const [cookies] = useCookies(['userToken']);

  return (
    <div className="header">
      <div className="logo">
        <p>Epikatana</p>
      </div>
      <nav>
        <ul className="header_navbar">
          <li><a href="/products">Nos produits</a></li>
          <li><a href="/business">Qui sommes nous</a></li>
          <li>{cookies.userToken !== undefined ? (
            <a href="/profile">Profile</a>
          ) : (
            <a href="/login">Connexion</a>
          )}</li>
        </ul>
      </nav>
      <div className="header_cart">
        <Cart/>
      </div>
    </div>
  );
};

export default Header;
