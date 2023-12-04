import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('');
  const [selectedShippingInfo, setSelectedShippingInfo] = useState({
    trackingCompany: '',
    trackingNumber: '',
  });

  useEffect(() => {
    axios
      .get('https://radiant-sands-65015-6cb5ddc7695c.herokuapp.com/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const createOrder = () => {
    axios
      .post('https://radiant-sands-65015-6cb5ddc7695c.herokuapp.com/api/order', {
        products: [{ name: productName, quantity: quantity }],
      })
      .then((response) => {
        setOrders([...orders, response.data]);
        setMessage('Order created successfully!');
        resetCreateOrderInputs();
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        setMessage('Error creating order.');
      });
  };

  const updateShippingInfo = () => {
    axios
      .put(
        `https://radiant-sands-65015-6cb5ddc7695c.herokuapp.com/api/order/${selectedOrderId}/shipping`,
        {
          trackingCompany,
          trackingNumber,
        }
      )
      .then((response) => {
        setMessage('Shipping info updated successfully!');
        resetShippingInfoInputs();
      })
      .catch((error) => {
        console.error('Error updating shipping info:', error);
        setMessage('Error updating shipping info.');
      });
  };

  const updateOrderStatus = () => {
    axios
      .put(
        `https://radiant-sands-65015-6cb5ddc7695c.herokuapp.com/api/order/${selectedOrderId}/status`,
        {
          status,
        }
      )
      .then((response) => {
        setMessage('Order status updated successfully!');
        resetOrderStatusSelection();
      })
      .catch((error) => {
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

  const onChangeOrderSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedOrderId(selectedId);

    const selectedOrder = orders.find(order => order._id === selectedId);
    if (selectedOrder) {
      setSelectedOrderStatus(selectedOrder.status);
      setStatus(selectedOrder.status);

      const { trackingCompany, trackingNumber } = selectedOrder.shippingInfo;
      setSelectedShippingInfo({ trackingCompany, trackingNumber });
      setTrackingCompany(trackingCompany);
      setTrackingNumber(trackingNumber);
    } else {
      setSelectedOrderStatus('');
      setStatus('');
      setSelectedShippingInfo({ trackingCompany: '', trackingNumber: '' });
      setTrackingCompany('');
      setTrackingNumber('');
    }
  };

  return (
    <div>
      <h1>Order Management</h1>
      <div>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <button onClick={createOrder} disabled={!isCreateOrderInputValid}>
          Create Order
        </button>
        <button onClick={resetCreateOrderInputs}>Reset</button>
      </div>

      <h2>Update Shipping Info</h2>
      <p>Please click the Order in the Orders List to update the Information</p>
      <div>
        <input
          type="text"
          value={trackingCompany}
          onChange={(e) => setTrackingCompany(e.target.value)}
          placeholder="Tracking Company"
        />
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Tracking Number"
        />
        <button
          onClick={updateShippingInfo}
          disabled={!isUpdateShippingInfoInputValid}
        >
          Update Shipping Info
        </button>
        <button onClick={resetShippingInfoInputs}>Reset</button>
      </div>

      <h2>Update Order Status</h2>
      <p>Please click the Order in the Orders List to update the Information</p>
      <div>
        <select
          value={selectedOrderStatus}
          onChange={(e) => setSelectedOrderStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="processing">Processing</option>
          <option value="canceled">Canceled</option>
          <option value="delivered">Delivered</option>
        </select>
        <button
          onClick={updateOrderStatus}
          disabled={!isUpdateOrderStatusInputValid}
        >
          Update Status
        </button>
        <button onClick={resetOrderStatusSelection}>Reset</button>
      </div>

      <h2>Orders List</h2>
      <select onChange={onChangeOrderSelection} value={selectedOrderId || ''}>
        <option value="">Select an Order</option>
        {orders.slice(0, displayLimit).map((order) => (
          <option key={order._id} value={order._id}>
            {order.products
              .map((p) => `${p.name} (Qty: ${p.quantity})`)
              .join(', ')} - ID: {order._id}
          </option>
        ))}
      </select>
      {displayLimit < orders.length && (
        <button onClick={showMoreOrders}>Show More</button>
      )}

      {message && <p>{message}</p>}

      <button onClick={() => window.location.href = "/"}>Back to Home</button>
    </div>
  );
}

export default Order;