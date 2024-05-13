import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import Carts from './pages/Carts';
import './App.css';
import ProductDetailsPage from './pages/ProductsDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <ToastContainer />
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/carts" element={<Carts />} />
        </Routes>
        <Footer />
      </div>
      
    </Router>
  )
}

export default App;
