import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/fetchDetails';
import ProductDetails from '../components/ProductDetails';
import '../styles/ProductsDetails.css';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = id ? parseInt(id) : undefined;

  if (!productId) return <div>Product ID not provided</div>;

  const { data: product, isLoading, error } = useProductDetails(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  if (!product) return <div>Product not found</div>;

  return ( 
    <> 
      <div className="product-details-container">
        <div className="product-details-wrapper">
          <div className="product-details-card">
            <ProductDetails {...product} /> 
          </div>
          <div className="product-details-buy">
            <label className="product-details-quantity-label">Quantity:</label>
            <input className="product-details-quantity" type="number" defaultValue="1" min="1" max="99" />
            <button className="product-details-buy-button">Ajouter au panier</button>
          </div>
        </div>
      </div>
    </> 
  );
};

export default ProductDetailsPage;
