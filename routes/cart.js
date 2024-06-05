const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const mongoose = require('mongoose');

// （新增購物車）沒有加參數的 post ，會用此服務
router.post('/', async (req, res) => {
  const cart = new Cart();
  await cart.save();
  res.status(201).send(cart);
});

// （顧名思義）
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // 這串拿來測試 server 內是否有指定的 id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid cart ID' });
  }
  await Cart.findByIdAndDelete(id);
  res.status(204).send();
});

// （新增特定商品）有加參數的 post，此處是用來新增商品，結構為 id, product name
// 引用方式要加 add，代表新增
router.post('/:id/add', async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid cart ID' });
  }
  const cart = await Cart.findById(id);
  cart.products.push(product);
  await cart.save();
  res.status(200).send(cart);
});

// （移除特定商品）
router.delete('/:id/remove', async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid cart ID' });
  }
  const cart = await Cart.findById(id);
  cart.products = cart.products.filter(p => p !== product);
  await cart.save();
  res.status(200).send(cart);
});

// （測試的好東西）可以列出 server 現在有什麼
router.get('/list', async (req, res) => {
  const carts = await Cart.find();
  res.status(200).send(carts);
});

// （列出特定購物車的商品）
router.get('/:id/list-cart', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'Invalid cart ID' });
  }
  const cart = await Cart.findById(id);
  res.status(200).send(cart.products);
});

module.exports = router;
