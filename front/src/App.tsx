import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Authentication from './pages/Authentication';
import Business from './pages/Business';
import './App.css';


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
