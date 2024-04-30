import '../styles/ProductsList.css'; 
import { BiCartAdd } from "react-icons/bi";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
}

const Product = (product: Product) => {

  console.log(product);
    return (
        <div key={product.id} className="product-card">
          {product.photo && (
                <img src={product.photo} alt={product.name} />
          )}
          <p className="product-type">Katana Japonais</p>
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price"> A partir de {product.price}€</p>
          <div className="product-options">
            <button className="product-button-see">Afficher les détails</button>
            <button className="product-button-addtocart"><BiCartAdd /></button>
          </div>
        </div>
    )

}

export default Product;