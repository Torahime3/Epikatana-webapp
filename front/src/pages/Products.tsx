import { useState } from 'react';
import '../styles/ProductsList.css';
import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/fetchProducts';
import '../styles/ProductsList.css';
import Product from '../components/Product';


const ProductList = () => {
  const { data: products, isLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div className="loading_page"><div className="loading_text">Loading...</div></div>;
  if (error) return <div className="loading_page"><div className="loading_text">An error occurred: {error.message}</div></div>;

  const filteredProducts = products.filter((product: { name: string; }) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg_image_red"> </div>
      <div className="page_container">
        <h1 className="title_section"> Nos produits </h1>

        {/* Intégration de la barre de recherche */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="product-container">
          {filteredProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
