import { useProducts } from '../hooks/fetchProducts';
import '../styles/ProductsList.css';
import Product from '../components/Product';


const ProductList = () => {

  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <div className="bg_image_red"> </div>
      <div className="page_container">
        <h1 className="title_section"> Nos produits </h1>
        <div className="product-container">
          {products.map((product: Product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
