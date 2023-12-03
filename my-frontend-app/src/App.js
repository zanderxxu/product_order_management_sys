import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Product from './components/Product';
import Order from './components/Order';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeWithButtons />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

function HomeWithButtons() {
  return (
    <div>
      <h1>Product and Order management system</h1>

      <Link to="/product">
        <button>Go to Product</button>
      </Link>
      <Link to="/order">
        <button>Go to Order</button>
      </Link>
    </div>
  );
}

export default App;

