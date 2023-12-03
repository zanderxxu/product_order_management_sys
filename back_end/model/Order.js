const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [{
    name: String,
    quantity: Number 
  }],
  shippingInfo: {
    trackingCompany: String,
    trackingNumber: String
  },
  status: String
});

module.exports = mongoose.model('Order', OrderSchema);
