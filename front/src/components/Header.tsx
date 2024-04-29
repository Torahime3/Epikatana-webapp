import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCookies } from 'react-cookie';
import '../styles/Header.css';
import { useCookies } from 'react-cookie';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [cookies] = useCookies(['userToken']); // Get the userToken cookie
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cookies] = useCookies(['userToken']);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className="header-toolbar">
        <div className="header-left">
          <div className="header-left-content">
            <a href="/" className="header-icon-button" aria-label="home">
              <img src="https://www.creativefabrica.com/wp-content/uploads/2021/03/31/katana-sword-logo-vintage-vector-design-Graphics-10177934-1.jpg" alt="logo" className="header-logo" />
            </a>
            <Typography variant="h6" component="div" className="header-title">
              {title}
            </Typography>
          </div>
        </div>
        <div className="header-center">
          <input type="text" placeholder="Rechercher..." className="header-search-input" />
        </div>
        <div className="header-right">
          <IconButton color="inherit" aria-label="shopping cart">
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="body1" color="inherit">
            Panier
          </Typography>
          <IconButton
            color="inherit"
            aria-label="more"
            aria-controls="header-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="header-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <a href="/products" className="header-menu-link" onClick={handleClose}>Nos produits</a>
            {cookies.userToken && <a href="/orders" className="header-menu-link" onClick={handleClose}>Commandes</a>}
            <a href="/business" className="header-menu-link" onClick={handleClose}>Qui sommes nous</a>
            <a href="/login" className="header-menu-link" onClick={handleClose}>Connexion</a>
            {cookies.userToken !== undefined ? (
              <a href="/profile" className="header-menu-link" onClick={handleClose}>Profile</a>
            ) : (
              <a href="/login" className="header-menu-link" onClick={handleClose}>Profile</a>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
