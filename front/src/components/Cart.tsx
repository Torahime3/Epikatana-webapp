import { BiCart } from "react-icons/bi";
import '../styles/Header.css';
import { useCart } from "../hooks/fetchCart";
import { useCookies } from "react-cookie";


const Cart = () => {

    return (
        <>
            <BiCart />
            <span>Panier</span>
        </>
    );

}

export default Cart;