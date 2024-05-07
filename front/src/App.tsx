import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Authentication from './pages/Authentication';
import Business from './pages/Business';
import Profile from './pages/Profile';
import Carts from './pages/Carts';
import './App.css';
import ProductDetailsPage from './pages/ProductsDetails';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/business" element={<Business />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/carts" element={<Carts />} />
        </Routes>
      </div>
    </Router>
  ) 
}

export default App;
