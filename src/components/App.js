import "../styles/App.css";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import Footer from "./Footer/Footer";
import ProductsList from "./products/ProductsList";
import ProductComponent from "./products/ProductComponent";
import { Router, Routes, Route } from "react-router-dom";
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
import MyAccount from "./navbar/MyAccount";
import ProtectedRoute from "./ProtectedRoute";
import MyProfile from "./navbar/MyProfile";
import MyOrder from "./navbar/MyOrder";
import CheckoutComponent from "./checkout/CheckoutComponent";
import Shipping from "./checkout/Shipping";
import Payment from "./checkout/Payment";
import { Navigate } from "react-router-dom";
import WishlistComponent from "./whishlist/WishlistComponent";
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

                <Route path="/myaccount" element={<MyAccount />}>
                  <Route path="profile" element={<MyProfile />} />
                  <Route path="order" element={<MyOrder />} />
                  <Route path="wishlist" element={<WishlistComponent />} />
                </Route>
               
                <Route path="/checkout" element={<CheckoutComponent />}>
                  <Route index element={<Navigate to="shipping" />} /> 
                  <Route path="shipping" element={<Shipping />} />
                  <Route path="payment" element={<Payment />} />
                </Route>
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
