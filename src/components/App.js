import "../styles/App.css";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Footer from "./Footer/Footer";
import ProductsList from "./products/Products";
import ProductComponent from "./products/ProductComponent";
import { Router, Routes, Route } from "react-router-dom";
import Cart from "./cart/EmptyCart";
import WishList from "./whishlist/WishList";
import ProductListComponent from "./products/ProductListComponent";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/productslist" element={<ProductsList/>}/>
        <Route path="/products/:id" element={<ProductComponent/>}/>
        <Route path="/productslistcomponent" element={<ProductListComponent/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
