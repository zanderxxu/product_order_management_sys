const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

router.post('/order', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/orders', async (req, res) => {
  try {
    const allOrders = await Order.find({});
    res.status(200).json(allOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
router.put('/order/:id/shipping', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { 'shippingInfo': req.body } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/order/:id/status', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { 'status': req.body.status } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
