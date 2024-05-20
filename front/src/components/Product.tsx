import React from 'react';
import { Link } from 'react-router-dom';
import { BiCartAdd } from 'react-icons/bi';
import { BiSolidTrash } from "react-icons/bi";
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
const apiScheme = import.meta.env.VITE_API_SCHEME;

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
    fetch(`${apiScheme}://localhost:8000/api/carts/${id}`, {
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
        toast.success('Produit supprimé du panier', {
          autoClose: 1500,
          hideProgressBar: true,
        });
        return response.json();
      })
  }

  const handleAddToCart = (e: any) => {
    e.preventDefault();

    if(cookies.userToken === undefined){
      toast.error('Vous devez être connecté pour ajouter un produit au panier');
      return;
    }

    fetch(`${apiScheme}://localhost:8000/api/carts/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${cookies.userToken}`
      },
      body: JSON.stringify({
        quantity: 1
      }),

    }).then(response => {
      if(response.ok) {
        toast.success('Produit ajouté au panier', {
          autoClose: 1500,
          hideProgressBar: true,
        });
      } else {
        toast.error('Erreur lors de l\'ajout au panier');
      }
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
            <h2>{name}</h2>
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
          <button className="product-button-addtocart" onClick={handleAddToCart}>
            <BiCartAdd />
          </button>
        </div>
      </div>
  );
};

export default Product;
