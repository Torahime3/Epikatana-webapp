import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useCart } from "../hooks/fetchCart";
import Product from "../components/Product";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout, { Token } from "react-stripe-checkout";
import "../styles/Cart.css";

const Carts = () => {
  const apiScheme = import.meta.env.VITE_API_SCHEME;
  const [cookies] = useCookies(["userToken"]);
  const { data: cart, isLoading, error } = useCart(cookies.userToken);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.products) {
      setProducts(cart.products);
    }
  }, [cart]);

  const removeProductFromCart = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    if (products) {
      let total = 0;
      products.forEach((product) => {
        total += product.price;
      });
      setTotalPrice(total);
    }
  }, [products]);

  const onToken = async (token: Token) => {
    try {
      const orderResponse = await fetch(`${apiScheme}://localhost:8000/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.userToken}`,
        },
      });

      if (orderResponse.ok) {
        alert("Paiement réussi !");
        await fetch(`${apiScheme}://localhost:8000/api/clear`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.userToken}`,
          }
          
        });
        navigate("/profile");
        window.location.reload();
      } else {
        alert("Échec de la création de la commande"); 
      }
    } catch (error) {
      console.log(error);
      alert("Échec du paiement");
    }
};


  if (cart === undefined) {
    return (
      <>
        <div className="bg_image_red"></div>
        <div className="cart_container">
          <div className="cart_wrapper">
            <div className="cart_section">
              <h1>Mon Panier</h1>
              <p>
                Votre panier est vide, ajoutez un produit depuis la page <Link to="/products">Produits</Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="cart_container">
        <div className="cart_wrapper">
          <div className="cart_section">
            <h1>Mon Panier</h1>
            <p>Chargement en cours...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart_container">
        <div className="cart_wrapper">
          <div className="cart_section">
            <h1>Mon Panier</h1>
            <p>Une erreur est survenue</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg_image_red"></div>
      <div className="cart_container">
        <div className="cart_wrapper">
          <div className="cart_section products">
            <h1>Mon Panier : {products.length} Produits</h1>
            <div className="scrollable">
              {cart.products.map((product: any) => (
                <Product key={product.id} {...product} viewInACart={true} removeProductFromCart={removeProductFromCart} />
              ))}
            </div>
          </div>
          <div className="cart_section infos">
            <h1>Informations</h1>
            <p>Prix total : {totalPrice}€</p>
            <StripeCheckout
              token={onToken}
              stripeKey="pk_test_51PG0NQLQ6aQSRWzZ9XjixBqI5E11SJh418smxfhe4EX059jsyFBh3SRZ0qYFE40b2LEk8wRU58MorBV83bjgRU8p00bDl0d2Id"
              name="Your Cart"
              amount={totalPrice * 100}
              currency="EUR"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Carts;
