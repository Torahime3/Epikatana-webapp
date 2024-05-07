import React from 'react';
import { Link } from 'react-router-dom';
import { BiCartAdd } from 'react-icons/bi';
import { BiSolidTrash } from "react-icons/bi";
import { useCookies } from 'react-cookie';


interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  viewInACart?: boolean;
  removeProductFromCart?: (id: number) => void;
}

const Product = ({ id, name, description, price, photo, viewInACart = false, removeProductFromCart}: ProductProps) => {

  const [cookies] = useCookies(['userToken']);
  const [hiddenClass, setHiddenClass] = React.useState("display");

  const handleDelete = () => {
    console.log(id);
    fetch(`https://localhost:8000/api/carts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${cookies.userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Une erreur est survenue');
        }
        setHiddenClass("none");
        removeProductFromCart && removeProductFromCart(id);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => { 
        console.error(error);
      });
  }

  if(viewInACart){
    return (
      <>
      <div style={{display: hiddenClass}}>
        <div className="productInCart-card">
          <img src={photo} alt={name} />
          <div className="productInCart-details">
            <p className="product-type">Katana Japonais</p>
            <h2>{name} {id}</h2>
            <p>{description}</p>
            <p>{price}€</p>
          </div>
          <button className="productinCart-delete" onClick={handleDelete}> <BiSolidTrash/> </button>
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
