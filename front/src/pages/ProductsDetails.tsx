import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/fetchDetails';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = id ? parseInt(id) : undefined;

  if (!productId) return <div>Product ID not provided</div>;

  const { data: product, isLoading, error } = useProductDetails(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  if (!product) return <div>Product not found</div>;

  return <ProductDetails {...product} />;
};

export default ProductDetailsPage;
