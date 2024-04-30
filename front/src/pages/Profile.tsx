import { useCookies } from "react-cookie";
import { useMe } from "../hooks/fetchMe";
import "../styles/Profile.css";

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const handleLogout = () => {
        // Remove the userToken cookie
        removeCookie('userToken');
        // Redirect to the login page
        window.location.href = '/login';
      };

    let { data: user, isLoading, error } = useMe(cookies.userToken);

    if (isLoading) return <div>Loading...</div> && <div className="profile_logout">
    <button onClick={handleLogout}>Se déconnecter</button>
</div>;
    if (error) return <div>An error occurred: {error.message}</div> && <div className="profile_logout">
    <button onClick={handleLogout}>Se déconnecter</button>
</div>;

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
                        <li>Commandes</li>
                        <li>Mes infos</li>
                    </ul>
                </div>

                <div className="profile_section">
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
                  
                </div>
              
            </div>
            <div className="profile_logout">
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>
        </div>
    )

}

export default Profile;
