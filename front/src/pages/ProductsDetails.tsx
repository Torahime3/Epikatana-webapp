import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/fetchDetails';
import ProductDetails from '../components/ProductDetails';
import '../styles/ProductsDetails.css';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = id ? parseInt(id) : undefined;
  const [cookies] = useCookies(['userToken']);

  if (!productId) return <div>Product ID not provided</div>;

  const { data: product, isLoading, error } = useProductDetails(productId);
  const [form, setForm] = useState({
    quantity: 1
  })

  if (isLoading) return (
    <>
      <div className="bg_image_red"> </div>
      <div className="loading_page">
        <div className="loading_text">Loading...</div>;
      </div>
    </>
  )

  if (error) return (
    <>
      <div className="bg_image_red"> </div>
      <div className="loadgin_page">
        <div className="loading_text">An error occurred: {error.message}</div>;
      </div>
    </>
  )

  if (!product) return (
    <>
      <div className="bg_image_red"> </div>
      <div className="loading_page">
        <div className="loading_text">Product not found</div>
      </div>
    </>
  )

  const handleAddToCart = (e: any) => {
    e.preventDefault();

    if(cookies.userToken === undefined){
      toast.error('Vous devez être connecté pour ajouter un produit au panier');
      return;
    }

    fetch(`https://localhost:8000/api/carts/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${cookies.userToken}`
      },
      body: JSON.stringify(form),

    }).then(response => {
      if(response.ok) {
        toast.success('Produit ajouté au panier', {
          autoClose: 1500,
          position: 'bottom-right'
        });
      } else {
        toast.error('Une erreur est survenue');
      }
    });

  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <div className="product-details-container">
        <div className="product-details-wrapper">
          <div className="product-details-card">
            <ProductDetails {...product} />
          </div>
          <div className="product-details-buy" >
            <form className="product-details-form">
              <label className="product-details-quantity-label">Quantity:</label>
              <input className="product-details-quantity" type="number" defaultValue={form.quantity} min="1" max="99" onChange={handleChange}/>
              <input type="submit" className="product-details-buy-button" value="Ajouter au panier"  onClick={handleAddToCart}/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
