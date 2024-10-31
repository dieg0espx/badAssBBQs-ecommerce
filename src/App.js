import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import { ProductsProvider } from './context/ProductsContext';
import Header from './components/Header';

function App() {
  return (
    <div> 
      <Header />
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </ProductsProvider>
    </div>
  );
}

export default App;
