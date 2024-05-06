import { useCookies } from "react-cookie";
import { useMe } from "../hooks/fetchMe";
import "../styles/Profile.css";
import { useState } from "react";

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const handleLogout = () => {
        removeCookie('userToken');
        window.location.href = '/login';
      };

    let { data: user, isLoading, error } = useMe(cookies.userToken);
    const[showOrders, setShowOrders] = useState(true);

    if (isLoading) return (
            <div>Loading...</div>       
    )

    if (error) return (
        <>
            <div>An error occurred: {error.message}</div>
            <div className="profile_logout">
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>;
        </>
    )

    if(user === undefined){
        return (
            <div className="profile_container">
                <div className="profile_wrapper">
                    <div className="profile_section">
                        <h1>Mon Profile</h1>
                        <p>Vous n'êtes pas connecté</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="profile_container">
            <div className="profile_wrapper">

                <div className="profile_section">
                    <h1>Mon Profile</h1>
                    <p>Prénom : {user.firstname}</p>
                    <p>Nom : {user.lastname}</p>
                    <p>Email : {user.email}</p>
                </div>

                <div className="profile_section">
                    <ul>
                        <li onClick={() => setShowOrders(true)} className="button_profile">Commandes</li>
                        <li onClick={() => setShowOrders(false)} className="button_profile">Mes infos</li>
                    </ul>
                </div>

                <div className="profile_section">
                    {showOrders ? (
                        <>
                        <h1>Mes commandes</h1>
                            <ul>
                                {user.orders.map((order: any) => (
                                    <div className="order-container">
                                    <li key={order.id}>
                                        <p>Commande n°{order.id}</p>
                                        <p>Date : {order.creationDate}</p>
                                        <p>Montant : {order.totalPrice} €</p>
                                        <details>
                                            <summary>Détails de la commande</summary>
                                            <ul className="order-details">
                                                {order.products.map((product: any) => (
                                                    <li key={product.id}>
                                                        <p>{product.name}</p>
                                                        <p>{product.description}</p>
                                                        <p>Prix : {product.price} €</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </li>
                                
                                    </div>
                                ))}
                            
                            </ul>
                        </>
                    ) : <p> salut </p>}
                  
                </div>
              
            </div>
            <div className="profile_logout">
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>
        </div>
    )

}

export default Profile;
