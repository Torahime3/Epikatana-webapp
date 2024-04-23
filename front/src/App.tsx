import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import Connection from './components/Connection';
import Inscription from './components/Inscription';
import Nous from './components/Nous';

function App() {
  return (
    <Router>
      <div>
        <Header title="Header2Merde" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nos-produits" element={<Products />} />
          <Route path="/connexion" element={<Connection />} />
          <Route path="/qui-sommes-nous" element={<Inscription />} />
          <Route path="/inscription" element={<Nous />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
