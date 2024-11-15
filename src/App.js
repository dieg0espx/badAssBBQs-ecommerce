import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { PurchaseProvider } from './context/PurchaseContext'; // Adjust the path
import { OrdersProvider } from './context/OrdersContext';

import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout';
import CheckoutAuthorized from './pages/CheckoutAuthorized';
import PrivacyPolicy from './pages/PrivacyPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import DefectiveProduct from './pages/DefectiveProduct';
import ReturnPolicy from './pages/ReturnPolicy'
import Contact from './pages/Contact';
import OrderStatus from './pages/OrderStatus';

import CheckoutConfirmation from './pages/CheckoutConfirmation';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div> 
      <ProductsProvider>
      <CartProvider>
      <PurchaseProvider>
      <OrdersProvider>
      <Header />
      <div className='pt-0 xl:pt-[120px] max-w-[1400px] mx-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products/:brand/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-authorized" element={<CheckoutAuthorized />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/shipping-policy' element={<ShippingPolicy />} />
            <Route path='/defective-product' element={<DefectiveProduct />} />
            <Route path='/return-policy' element={<ReturnPolicy />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/order-status' element={<OrderStatus />} />
            
            <Route path='/checkout-confirmation' element={<CheckoutConfirmation/>} />
          </Routes>
      </div>
      </OrdersProvider>
      </PurchaseProvider>
      </CartProvider >
      </ProductsProvider>
      <Footer/>
    </div>
  );
}

export default App;
