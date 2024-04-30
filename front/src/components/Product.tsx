import React from 'react';
import axios from 'axios';
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
    try {
      await axios.post(`/api/products/${id}/add-to-cart`);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = async () => {
    try {
      await axios.post(`/api/products/${id}/remove-from-cart`);
      alert('Product removed from cart');
    } catch (error) {
      console.error('Error removing product from cart:', error);
      alert('Failed to remove product from cart');
    }
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
