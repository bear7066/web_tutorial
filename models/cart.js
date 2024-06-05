const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  products: [{ type: String }]
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
