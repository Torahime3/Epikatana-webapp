import React from 'react';
import '../styles/Authentication.css';
import { useCookies } from 'react-cookie';

const Authentication: React.FC = () => {

  const [cookies, setCookies] = useCookies(['userToken']);
  const [registration, setRegistration] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const checkFormValidity = () => {

    if(registration){

      if(form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '' || form.confirmPassword === ''){
        alert('Veuillez remplir tous les champs');
        return false;
      }

      if(form.password !== form.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return false;
      }

    } else {

      if(form.email === '' || form.password === ''){
        alert('Veuillez remplir tous les champs');
        return false;
      }

    }

    return true;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(!checkFormValidity()) return;

    if(registration){
      fetch('https://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(response => {
      if(response.ok) {
        alert('Inscription réussie');
        setRegistration(false);
      } else {
        alert('Erreur lors de l\'inscription');
      }
    });
    } else {
      fetch('https://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.email,
        password: form.password
      })
    }).then(response => {
      if(response.ok) {
        response.json().then(data => {
          setCookies('userToken', data.token);
          alert('Connexion réussie');
          window.location.href='/profile';

        });
      } else {
        alert('Erreur lors de la connexion');
      }
    });
    }
    

  }

  return (
    <div className="register_container">

      <div className="box register">

        {registration
         ? <h1>Inscription</h1> : <h1>Connexion</h1> }

        <form>
          
          {registration ? ( <>
          <div className="inputBox">
            <label>Prénom</label>
            <input 
              type="text" 
              name="firstName"
              onChange={handleChange}
              required 
              />
          </div>

          <div className="inputBox">
            <label>Nom</label>
            <input 
              type="text" 
              name="lastName"
              onChange={handleChange}
              required 
            />
          </div>

          <div className="inputBox">
            <label>Email</label>
            <input 
            type="email" 
            name="email"
            onChange={handleChange}
            required
            />
          </div>

          <div className="inputBox">
            <label>Mot de passe</label>
            <input 
              type="password" 
              name="password"
              onChange={handleChange}
              required 
              />
          </div>

          <div className="inputBox">
            <label>Confirmation de mot de passe</label>
            <input 
              type="password" 
              name="confirmPassword"
              onChange={handleChange}
              required 
              />
          </div>
          </>
          ) : (
          <>
          <div className="inputBox">
            <label>Email</label>
            <input 
            type="email" 
            name="email"
            onChange={handleChange}
            required
            />
          </div>

          <div className="inputBox">
            <label>Mot de passe</label>
            <input 
              type="password" 
              name="password"
              onChange={handleChange}
              required 
              />
          </div>
          </>
        
        )}

          <input type="submit" name="" value={registration ? "S'inscrire" : "Se connecter"}  onClick={handleSubmit}/>

        </form>

        <p onClick={() => setRegistration(!registration)}>
          {registration ? "Déjà inscrit ? Connectez-vous" : "Pas encore inscrit ? Inscrivez-vous"}
        </p>

      </div>

      
    </div>
  );
};

export default Authentication;
