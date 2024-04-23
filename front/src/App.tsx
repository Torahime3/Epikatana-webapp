import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< Updated upstream
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import Authentication from './components/Authentication';
import Business from './components/Business';
import './App.css';
=======
import Header from './pages/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Connection from './pages/Connection';
import Inscription from './pages/Inscription';
import Nous from './pages/Nous';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <div>
        <Header title="Epikatana" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/business" element={<Business />} />
          <Route path="/login" element={<Authentication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
