import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/ProductsList.css'; 

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://localhost:8000/api/products');
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Invalid response format. Response:', response);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <p>Description : {product.description}</p>
          <p>Prix : {product.price}</p>
          {product.photo && (
            <img src={product.photo} alt={product.name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
