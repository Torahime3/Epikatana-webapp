import { useCookies } from "react-cookie";
import { useMe } from "../hooks/fetchMe";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useOrders } from "../hooks/fetchOrders"; // Assurez-vous d'importer correctement votre hook useOrders

const apiScheme = import.meta.env.VITE_API_SCHEME;

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('userToken');
    navigate('/login');
  };

  const { data: user, isLoading: isUserLoading, error: userError } = useMe(cookies.userToken);
  const { data: orders, isLoading: isOrdersLoading, error: ordersError } = useOrders(cookies.userToken);

  const [showOrders, setShowOrders] = useState(true);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: "",
        confirmPassword: ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.firstname === "" || form.lastname === "" || form.email === "" || form.password === "" || form.confirmPassword === "") {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    fetch(`${apiScheme}://localhost:8000/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies.userToken}`
      },
      body: JSON.stringify(form)
    }).then(response => {
      if (response.ok) {
        toast.success("Informations modifiées");
      } else {
        toast.error("Une erreur est survenue");
      }
    });

    console.log(form);
  };

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return newDate;
  };

  if (isUserLoading || isOrdersLoading) {
    return (
      <>
        <div className="bg_image_red"> </div>
        <div className="loading_page">
          <div className="loading_text">Loading...</div>
          <div className="profile_logout">
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        </div>
      </>
    );
  }

  if (userError || ordersError) {
    return (
      <>
        <div className="bg_image_red"> </div>
        <div className="loading_page">
          <div className="loading_text">An error occurred: {userError ? userError.message : ordersError.message}</div>
          <div className="profile_logout">
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
        </div>
      </>
    );
  }

  if (user === undefined) {
    return (
      <div className="profile_container">
        <div className="profile_wrapper">
          <div className="profile_section">
            <h1>Mon Profile</h1>
            <p>Vous n'êtes pas connecté</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg_image_red"> </div>
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
                  {orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <div className="order-container" key={order.id}>
                        <li>
                          <p>Commande n°{order.id}</p>
                          <p>Date : {dateParser(order.creationDate)}</p>
                          <p>Montant : {order.totalPrice} €</p>
                          <details>
                            <summary>Détails de la commande</summary>
                            <ul>
                              {order.products.map((product) => (
                                <li key={product.id} className="order-details">
                                  <p>{product.name}</p>
                                  <p>{product.description}</p>
                                  <p>Prix : {product.price} €</p>
                                  <img src={product.photo} alt={product.name} className="product-image"/>
                                </li>
                              ))}
                            </ul>
                          </details>
                        </li>
                      </div>
                    ))
                  ) : (
                    <p>Vous n'avez pas encore commandé</p>
                  )}
                </ul>
              </>
            ) : (
              <>
                <h1>Mes informations</h1>
                <div className="informations_sections">
                  <label htmlFor="firstname">Prénom</label>
                  <input type="text" name="firstname" placeholder="Prénom" value={form.firstname} onChange={handleChange} />

                  <label htmlFor="lastname">Nom</label>
                  <input type="text" name="lastname" placeholder="Nom" value={form.lastname} onChange={handleChange} />

                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />

                  <label htmlFor="password">Mot de passe</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Mot de passe" />
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirmer mot de passe" />
                  <button onClick={handleSubmit}>Modifier</button>
                </div>
              </>
            )}
          </div>

        </div>
        <div className="profile_logout">
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
