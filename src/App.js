import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProductList from './pages/ProductsList'
import ProductDetails from './pages/ProductDetails';
import  { ProductsProvider } from './context/ProductsContext'


function App() {
  return (
    <BrowserRouter >
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} /> Add your product details route
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
