import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import ProductList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { PurchaseProvider } from './context/PurchaseContext';
import { OrdersProvider } from './context/OrdersContext';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutAuthorized from './pages/CheckoutAuthorized';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import DefectiveProduct from './pages/DefectiveProduct';
import ReturnPolicy from './pages/ReturnPolicy';
import Contact from './pages/Contact';
import OrderStatus from './pages/OrderStatus';
import Admin from './pages/Admin';
import Chatbot from './pages/Chatbot';
import Test from './pages/Test';
import CheckoutConfirmation from './pages/CheckoutConfirmation';
import Finding from './pages/Finding';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';

import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';


function App() {
  const location = useLocation();

  // Paths where both the Header and Footer should be hidden
  const noHeaderFooterPaths = ['/chatbot', '/login', '/dashboard'];

  const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <ProductsProvider>
      <div className="max-w-[100vw] overflow-x-hidden">
        <CartProvider>
          <PurchaseProvider>
            <OrdersProvider>
              {/* Conditionally render the Header */}
              {shouldShowHeaderFooter && <Header />}
              <div className="pt-0 xl:pt-[120px] max-w-[1400px] mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="products/:brand/:category" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetails />} />

                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />

                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/shipping-policy" element={<ShippingPolicy />} />
                  <Route path="/defective-product" element={<DefectiveProduct />} />
                  <Route path="/return-policy" element={<ReturnPolicy />} />
                  <Route path="/contact" element={<Contact />} />

                  <Route path="/order-status" element={<OrderStatus />} />
                  <Route path="/order-status/:id" element={<OrderStatus />} />

                  <Route path="/checkout-authorized/:method" element={<CheckoutAuthorized />} />
                  <Route path="/checkout-confirmation" element={<CheckoutConfirmation />} />

                  <Route path="/finding/:search" element={<Finding />} />

                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/chatbot" element={<Chatbot />} />

                  {/* Protected Route */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                </Routes>
              </div>
              {/* Conditionally render the Footer */}
              {shouldShowHeaderFooter && <Footer />}
            </OrdersProvider>
          </PurchaseProvider>
        </CartProvider>
      </div>
    </ProductsProvider>
  );
}

export default App;
