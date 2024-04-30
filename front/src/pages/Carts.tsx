import React, { useState } from "react";
import Product from "../components/Product";
import "../styles/Cart.css";

interface CartItem {
  id: number;
  product: Product;
}

const Carts: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate total price

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <Product
            key={item.id}
            id={item.product.id}
            name={item.product.name}
            description={item.product.description}
            price={item.product.price}
            photo={item.product.photo}
          />
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <div className="cart-total">
            Total: {totalPrice} €
          </div>
          <button className="validate-cart-button">Validate Cart</button>
        </>
      )}
    </div>
  );
};

export default Carts;
