import { useCookies } from 'react-cookie';
import '../styles/Header.css';
import Cart from './Cart';
import { Link } from 'react-router-dom';


const Header = () => {

  const [cookies] = useCookies(['userToken']);


  return (
    <div className="header">
      <div className="logo">
        <p>Epikatana</p>
      </div>
      <nav>
        <ul className="header_navbar">
          <li>
            <Link to={`/`}>Accueil</Link>
          </li>
          <li>
            <Link to={`/products`}>Nos produits</Link>
          </li>
           <li>
            <Link to={`/business`}>Qui sommes nous</Link>
          </li>
          <li>{cookies.userToken !== undefined ? (
            <Link to={`/profile`}>Profile</Link>
          ) : (
            <Link to={`/login`}>Connexion</Link>
          )}</li>
        </ul>
      </nav>
      <div className="header_cart">
        <Link to={`/carts`}><Cart/></Link>
      </div>
    </div>
  );
};

export default Header;
