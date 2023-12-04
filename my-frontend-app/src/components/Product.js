import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Product() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(10); 

  useEffect(() => {
    axios.get('https://radiant-sands-65015-6cb5ddc7695c.herokuapp.com/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const createProduct = () => {
    axios.post('https://radiant-sands-65015-6cb5ddc7695c.herokuapp.com/api/product', {
      name: productName,
      price: productPrice,
      stockQuantity: stockQuantity
    })
    .then(response => {
      setMessage('Product created successfully.');
      setProducts([...products, response.data]);
      resetForm();
    })
    .catch(error => {
      setMessage('Error creating product: ' + error.message);
      console.error('Error creating product:', error);
    });
  };

  const updateProduct = () => {
    if (selectedProductId) {
      axios.put(`https://radiant-sands-65015-6cb5ddc7695c.herokuapp.com/api/product/${selectedProductId}`, {
        name: productName,
        price: productPrice,
        stockQuantity: stockQuantity
      })
      .then(response => {
        setMessage('Product updated successfully.');
        const updatedProducts = products.map(p => 
          p._id === selectedProductId ? response.data : p
        );
        setProducts(updatedProducts);
        resetForm();
      })
      .catch(error => {
        setMessage('Error updating product: ' + error.message);
        console.error('Error updating product:', error);
      });
    } else {
      setMessage('Please select a product to update.');
    }
  };

  const handleProductSelect = (e) => {
    const selectedProduct = products.find(p => p._id === e.target.value);
    if (selectedProduct) {
      setProductName(selectedProduct.name);
      setProductPrice(selectedProduct.price);
      setStockQuantity(selectedProduct.stockQuantity);
      setSelectedProductId(selectedProduct._id);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setStockQuantity('');
    setSelectedProductId(null);
  };

  const showMoreProducts = () => {
    setDisplayLimit(displayLimit + 10); 
  };


  const isInputValid = productName && productPrice && stockQuantity;

  return (
    <div>
      <h1>Products Management</h1>
      <p>Please click the Product in the Products List to update the Information</p>
      <input 
        type="text" 
        value={productName} 
        onChange={e => setProductName(e.target.value)} 
        placeholder="Product Name"
      />
      <input 
        type="text" 
        value={productPrice} 
        onChange={e => setProductPrice(e.target.value)} 
        placeholder="Product Price"
      />
      <input 
        type="number" 
        value={stockQuantity} 
        onChange={e => setStockQuantity(e.target.value)} 
        placeholder="Stock Quantity"
      />
      <button onClick={createProduct} disabled={!isInputValid}>Create Product</button>
      <button onClick={updateProduct} disabled={!selectedProductId || !isInputValid}>Update Product</button>
      <button onClick={resetForm}>Reset</button>

      {message && <p>{message}</p>}

      <h2>Products List</h2>
      <select onChange={handleProductSelect} value={selectedProductId || ''}>
        <option value="">Select a Product</option>
        {products.slice(0, displayLimit).map(product => (
          <option key={product._id} value={product._id}>
            {product.name} - ${product.price} - Stock: {product.stockQuantity}
          </option>
        ))}
      </select>
      {displayLimit < products.length && (
        <button onClick={showMoreProducts}>Show More</button>
      )}

      <Link to="/">Back to Home</Link>
      <button onClick={() => window.location.href = "/"}>Back to Home</button>
    </div>
  );
}

export default Product;
