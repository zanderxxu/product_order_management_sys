import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Order() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [trackingCompany, setTrackingCompany] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [displayLimit, setDisplayLimit] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:3000/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const createOrder = () => {
    axios.post('http://localhost:3000/api/order', {
      products: [{ name: productName, quantity: quantity }]
    })
    .then(response => {
      setOrders([...orders, response.data]);
      setMessage('Order created successfully!');
      resetCreateOrderInputs();
    })
    .catch(error => {
      console.error('Error creating order:', error);
      setMessage('Error creating order.');
    });
  };

  const updateShippingInfo = () => {
    axios.put(`http://localhost:3000/api/order/${selectedOrderId}/shipping`, {
      trackingCompany,
      trackingNumber
    })
    .then(response => {
      setMessage('Shipping info updated successfully!');
      resetShippingInfoInputs();
    })
    .catch(error => {
      console.error('Error updating shipping info:', error);
      setMessage('Error updating shipping info.');
    });
  };
  
  const updateOrderStatus = () => {
    axios.put(`http://localhost:3000/api/order/${selectedOrderId}/status`, {
      status
    })
    .then(response => {
      setMessage('Order status updated successfully!');
      resetOrderStatusSelection();
    })
    .catch(error => {
      console.error('Error updating order status:', error);
      setMessage('Error updating order status.');
    });
  };

  const resetCreateOrderInputs = () => {
    setProductName('');
    setQuantity(0);
  };

  const resetShippingInfoInputs = () => {
    setTrackingCompany('');
    setTrackingNumber('');
  };

  const resetOrderStatusSelection = () => {
    setStatus('');
  };

  const showMoreOrders = () => {
    setDisplayLimit(displayLimit + 10);
  };

  const isCreateOrderInputValid = productName && quantity > 0;
  const isUpdateShippingInfoInputValid = trackingCompany && trackingNumber;
  const isUpdateOrderStatusInputValid = status;

  return (
    <div>
      <h1>Order Management</h1>
      <div>
        <input 
          type="text"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input 
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button onClick={createOrder} disabled={!isCreateOrderInputValid}>Create Order</button>
        <button onClick={resetCreateOrderInputs}>Reset</button>
      </div>

      <h2>Update Shipping Info</h2>
      <div>
        <input 
          type="text"
          value={trackingCompany}
          onChange={e => setTrackingCompany(e.target.value)}
          placeholder="Tracking Company"
        />
        <input 
          type="text"
          value={trackingNumber}
          onChange={e => setTrackingNumber(e.target.value)}
          placeholder="Tracking Number"
        />
        <button onClick={updateShippingInfo} disabled={!isUpdateShippingInfoInputValid}>Update Shipping Info</button>
        <button onClick={resetShippingInfoInputs}>Reset</button>
      </div>

      <h2>Update Order Status</h2>
      <div>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="processing">Processing</option>
          <option value="canceled">Canceled</option>
          <option value="delivered">Delivered</option>
        </select>
        <button onClick={updateOrderStatus} disabled={!isUpdateOrderStatusInputValid}>Update Status</button>
        <button onClick={resetOrderStatusSelection}>Reset</button>
      </div>

      <h2>Order List</h2>
      <select onChange={e => setSelectedOrderId(e.target.value)}>
        <option value="">Select an Order</option>
        {orders.slice(0, displayLimit).map(order => (
          <option key={order._id} value={order._id}>
            {order.products.map(p => `${p.name} (Qty: ${p.quantity})`).join(', ')} - ID: {order._id}
          </option>
        ))}
      </select>
      {displayLimit < orders.length && (
        <button onClick={showMoreOrders}>Show More</button>
      )}

      {message && <p>{message}</p>}

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Order;