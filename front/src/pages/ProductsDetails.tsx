import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/fetchDetails';
import ProductDetails from '../components/ProductDetails';
import '../styles/ProductsDetails.css';
import { useCookies } from 'react-cookie';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = id ? parseInt(id) : undefined;
  const [cookies] = useCookies(['userToken']);

  if (!productId) return <div>Product ID not provided</div>;

  const { data: product, isLoading, error } = useProductDetails(productId);
  const [form, setForm] = useState({
    quantity: 1
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  const handleChange = (e: any) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    console.log(form);

    fetch(`https://localhost:8000/api/carts/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${cookies.userToken}`
      },
      body: JSON.stringify(form)
    }).then(response => {
      if(response.ok) {
        alert('Produit ajouté au panier');
      } else {
        alert('Erreur lors de l\'ajout au panier');
      }
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
            <form className="product-details-form" onClick={handleAddToCart}>
              <label className="product-details-quantity-label">Quantity:</label>
              <input className="product-details-quantity" type="number" defaultValue={form.quantity} min="1" max="99" onChange={handleChange}/>
              <input type="submit" className="product-details-buy-button" value="Ajouter au panier"/>
            </form>
          </div>
        </div>
      </div>
    </> 
  );
};

export default ProductDetailsPage;
