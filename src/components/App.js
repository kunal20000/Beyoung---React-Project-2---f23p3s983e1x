import "../styles/App.css";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Footer from "./Footer/Footer";
import Products from "./products/Products";
import { Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
