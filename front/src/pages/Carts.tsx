import "../styles/Cart.css";
import { useCookies } from "react-cookie";
import { useCart } from "../hooks/fetchCart";
import Product from "../components/Product";
import { useEffect, useState } from "react";

const Carts = () => {

  const[cookies] = useCookies(["userToken"]);
  const {data: cart, isLoading, error} = useCart(cookies.userToken);
  const[totalPrice, setTotalPrice] = useState(0);
   const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cart && cart.products) {
      setProducts(cart.products);
    }
  }, [cart]);

  const removeProductFromCart = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  }

  useEffect(() => {
    if (products) {
      let total = 0;
      products.forEach((product) => {
        total += product.price;
      });
      setTotalPrice(total);
    }
  }, [products]);

  if(cart === undefined){
    return (
      <div className="cart_container">
          <div className="cart_wrapper">
              <div className="cart_section">
                  <h1>Mon Panier</h1>
                  <p>Vous n'êtes pas connecté</p>
              </div>
          </div>
      </div>
    )
  }

  if(isLoading){
    return (
      <div className="cart_container">
          <div className="cart_wrapper">
              <div className="cart_section">
                  <h1>Mon Panier</h1>
                  <p>Chargement en cours...</p>
              </div>
          </div>
      </div>
    )
  }

  if(error){
    return (
      <div className="cart_container">
          <div className="cart_wrapper">
              <div className="cart_section">
                  <h1>Mon Panier</h1>
                  <p>Une erreur est survenue</p>
              </div>
          </div>
      </div>
    )
  };

  return (
    <>
    <div className="bg_image_red"> </div>
      <div className="cart_container">
        <div className="cart_wrapper">
          <div className="cart_section products">
              <h1>Mon Panier : {products.length} Produits</h1>
              <div className="scrollable">
                {cart.products.map((product: any) => (
                  <Product key={product.id} {...product} viewInACart={true} removeProductFromCart={removeProductFromCart}/>
                ))}
              </div>
          </div>
          <div className="cart_section infos">
              <h1>Informations</h1>
              <p>Prix total : {totalPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carts;
