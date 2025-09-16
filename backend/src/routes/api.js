import express from "express";
import Product from "../models/Product.js";
import Customer from "../models/customer.js";
import Order from "../models/order.js";

const router = express.Router();


router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/dashboard", async (req, res) => {
  try {
    const totalCustomers = await Customer.count();
    const totalOrders = await Order.count();
    const totalSales = await Order.sum("totalPrice"); 

    res.json({
      totalCustomers,
      totalOrders,
      totalSales,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
