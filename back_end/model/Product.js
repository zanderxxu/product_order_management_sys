const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stockQuantity: Number
});

module.exports = mongoose.model('Product', ProductSchema);
