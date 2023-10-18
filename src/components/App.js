import "../styles/App.css";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Footer from "./Footer/Footer";
import Products from "./products/Products";
import ProductComponent from "./products/ProductComponent";
import { Router, Routes, Route } from "react-router-dom";
import Cart from "./cart/Cart";
import WishList from "./whishlist/WishList";
import ProductListComponent from "./products/ProductListComponent";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<ProductComponent/>}/>
        <Route path="/productsList" element={<ProductListComponent/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
