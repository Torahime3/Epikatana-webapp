import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import Nous from './components/Nous';

function App() {
  return (
    <Router>
      <div>
        <Header title="Epikatana" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nos-produits" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/qui-sommes-nous" element={<Nous />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
