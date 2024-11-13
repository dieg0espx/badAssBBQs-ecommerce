import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { PurchaseProvider } from './context/PurchaseContext'; // Adjust the path
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout';
import CheckoutAuthorized from './pages/CheckoutAuthorized';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div> 
      <ProductsProvider>
      <CartProvider>
      <PurchaseProvider>
      <Header />
      <div className='pt-0 xl:pt-[120px] max-w-[1400px] mx-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products/:brand/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-authorized" element={<CheckoutAuthorized />} />
          </Routes>
      </div>
      </PurchaseProvider>
      </CartProvider >
      </ProductsProvider>
      <Footer/>
    </div>
  );
}

export default App;
