const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://main--dazzling-beignet-fe6b9c.netlify.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
const mongoDBUri = process.env.MONGODB_URI || 'mongodb+srv://zxu01:90hOBddjWLY0Fi0b@cluster0.bey9sm7.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDBUri)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json());

const productRoutes = require('./routes/product_routes');
const orderRoutes = require('./routes/order_routes');
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

