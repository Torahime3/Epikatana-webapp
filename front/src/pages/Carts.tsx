import "../styles/Cart.css";
import { useCookies } from "react-cookie";
import { useCart } from "../hooks/fetchCart";
import Product from "../components/Product";

const Carts = () => {
  
  const[cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const {data: cart, isLoading, error} = useCart(cookies.userToken);

  let totalPrice = 0;
  if(cart !== undefined){
    cart.products.forEach((product: any) => {
      totalPrice += product.price;
    });
  }


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
  }

  return (
    <>
      <div className="cart_container">
        <div className="cart_wrapper">
          <div className="cart_section products">
              <h1>Mon panier : {cart.products.length} Produits</h1>
              <div className="scrollable">
                {cart.products.map((product: any) => (
                  <Product key={product.id} {...product} viewInACart={true}/>
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
