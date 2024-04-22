import React from 'react';
import { Link } from 'react-router-dom'; // Import de Link depuis react-router-dom
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../Css/Header.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="header-icon-button"
        >
          {/* Logo */}
          <img src="https://www.creativefabrica.com/wp-content/uploads/2021/03/31/katana-sword-logo-vintage-vector-design-Graphics-10177934-1.jpg" alt="logo" className="header-logo" />
        </IconButton>
        <Typography variant="h6" component="div" className="header-title">
          {title}
        </Typography>
        <div className="header-search">
          {/* Barre de recherche */}
          <input type="text" placeholder="Rechercher..." className="header-search-input" />
          {/* Liens */}
          <Link to="/nos-produits" className="header-link">Nos produits</Link>
          <Link to="/qui-sommes-nous" className="header-link">Qui Sommes-Nous</Link>
          <Link to="/se-connecter" className="header-link header-link-primary">Se connecter</Link>
          <Link to="/inscription" className="header-link header-link-secondary">S'inscrire</Link>
        </div>
        <div className="header-cart">
          {/* Icône du panier */}
          <IconButton color="inherit" aria-label="shopping cart">
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="body1" color="inherit">
            Panier
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
