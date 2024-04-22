import React from 'react';
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
        {}
        <a href="/" className="header-icon-button" aria-label="home">
          <img src="https://www.creativefabrica.com/wp-content/uploads/2021/03/31/katana-sword-logo-vintage-vector-design-Graphics-10177934-1.jpg" alt="logo" className="header-logo" />
        </a>
        <Typography variant="h6" component="div" className="header-title">
          {title}
        </Typography>
        <div className="header-search">
          <input type="text" placeholder="Rechercher..." className="header-search-input" />
          <a href="/nos-produits" className="header-link">Nos produits</a>
          <a href="/qui-sommes-nous" className="header-link">Qui Sommes-Nous</a>
          <a href="/connexion" className="header-link header-link-primary">Se connecter</a>
          <a href="/inscription" className="header-link header-link-secondary">S'inscrire</a>
        </div>
        <div className="header-cart">
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
