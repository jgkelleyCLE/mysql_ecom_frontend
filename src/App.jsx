import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AllProducts from './Pages/AllProducts';
import Navbar from './components/Navbar/Navbar';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import SearchResults from './Pages/SearchResults';
import Gallery from './Pages/Gallery';
import Location from './Pages/Location';
import CategoryDetails from './Pages/CategoryDetails';
import { Toaster } from 'sonner';
import Auth from './Pages/Auth';
import Admin from './Pages/Admin';
import Profile from './Pages/Profile';
import OrderHistory from './Pages/OrderHistory';
import ThankYou from './Pages/ThankYou';
import OrderDetails from './Pages/OrderDetails';
import SearchDetails from './Pages/SearchDetails';
import AllSearches from './Pages/AllSearches';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<AllProducts />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/location" element={<Location />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:Category" element={<CategoryDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/search/:id" element={<SearchDetails />} />
          <Route path="/admin/all-searches" element={<AllSearches />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
