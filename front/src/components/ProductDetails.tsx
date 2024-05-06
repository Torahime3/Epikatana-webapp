import React from 'react';
import '../styles/ProductsDetails.css';

interface ProductDetailsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, description, price, photo }) => {
  return (
    <>
      <img className="product-image" src={photo} alt={name} /> 
      <h2 className="product-name">{name}</h2>
      <p className="product-description">{description}</p> 
      <p className="product-price">Price: {price}€</p>
    </>
  );
};

export default ProductDetails;
