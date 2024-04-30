import React from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

const Product: React.FC<ProductProps> = ({ id, name, description, price, photo }) => {

  // Fonction pour ajouter un produit au panier
  const addToCart = async () => {

  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = async () => {

  };

  return (
    <div key={id} className="product-card">
      {photo && (
        <img src={photo} alt={name} />
      )}
      <p className="product-type">Katana Japonais</p>
      <h2 className="product-name">{name}</h2>
      <p className="product-price"> A partir de {price}€</p>
      <div className="product-options">
        <Link to={`/products/${id}`} className="product-button-see" target="_blank">
          Afficher les détails
        </Link>
        <button className="product-button-addtocart" onClick={addToCart}>
          Ajouter au panier
        </button>
        <button className="product-button-removefromcart" onClick={removeFromCart}>
          Retirer du panier
        </button>
      </div>
    </div>
  );
};

export default Product;
