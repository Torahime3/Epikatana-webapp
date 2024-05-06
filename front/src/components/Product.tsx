import React from 'react';
import { Link } from 'react-router-dom';
import { BiCartAdd } from 'react-icons/bi';

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  viewInACart?: boolean;
}

const Product = ({ id, name, description, price, photo, viewInACart = false }: ProductProps) => {

  if(viewInACart){
    return (
      <>
        <div className="productInCart-card">
          <img src={photo} alt={name} />
          <div className="productInCart-details">
            <p className="product-type">Katana Japonais</p>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}€</p>
          </div>
        </div>
      </>
    )
  }

  return (
      <div key={id} className="product-card">
        {photo && (
          <img src={photo} alt={name} />
        )}
        <p className="product-type">Katana Japonais</p>
        <h2 className="product-name">{name}</h2>
        <p className="product-price"> A partir de {price}€</p>
        <div className="product-options">
          <Link to={`/products/${id}`} className="product-button-see">
            Afficher les détails
          </Link>
          <button className="product-button-addtocart">
            <BiCartAdd />
          </button>
        </div>
      </div>
  );
};

export default Product;
