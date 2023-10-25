import "../styles/App.css";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Footer from "./Footer/Footer";
import ProductsList from "./products/ProductsList";
import ProductComponent from "./products/ProductComponent";
import { Router, Routes, Route } from "react-router-dom";
import WishList from "./whishlist/WishList";
import MenProducts from "./products/MenProducts";
import WomanProducts from "./products/WomanProducts";
import Combos from "./products/Combos";
import Goggers from "./products/Goggers";
import ShopByCollection from "./products/ShopByCollection";
import ShopTheLook from "./products/ShopTheLook";
import { CartNumberProvider } from "./context/CartNumberContext";
import CartComponent from "./cart/CartComponent";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { LoaderProvider } from "./context/LoaderContext";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <CartNumberProvider>
        <CheckoutProvider>
          <LoaderProvider>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productslist" element={<ProductsList />} />
                <Route path="/products/:id" element={<ProductComponent />} />
                <Route path="/menproducts" element={<MenProducts />} />
                <Route path="/womanproducts" element={<WomanProducts />} />
                <Route path="/combos" element={<Combos />} />
                <Route path="/goggers" element={<Goggers />} />
                <Route
                  path="/shopbycollection"
                  element={<ShopByCollection />}
                />
                <Route path="/shopthelook" element={<ShopTheLook />} />
                <Route
                  path="/cart"
                  element={<ProtectedRoute component={<CartComponent />} />}
                />
                <Route path="/wishlist" element={<WishList />} />
              </Routes>
              <Footer />
            </div>
          </LoaderProvider>
        </CheckoutProvider>
      </CartNumberProvider>
    </AuthProvider>
  );
}

export default App;
