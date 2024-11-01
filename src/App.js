import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import { ProductsProvider } from './context/ProductsContext';
import Home from './pages/Home'

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div> 
      <Header />
      <div className='pt-[120px] max-w-[1400px] mx-auto'>
        <ProductsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/products" element={<ProductList />} /> */}
            <Route path="products/:brand/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </ProductsProvider>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
