import { useCookies } from "react-cookie";
import { useMe } from "../hooks/fetchMe";
import "../styles/Profile.css";

const Profile = () => {
    const [cookies] = useCookies(['userToken']);

    let { data: user, isLoading, error } = useMe(cookies.userToken);
        
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    if(user === null){
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
                        <li>Commande 1</li>
                        <li>Commande 2</li>
                        <li>Commande 3</li>
                    </ul>
                </div>

            </div>
        </div>
    )

}

export default Profile;