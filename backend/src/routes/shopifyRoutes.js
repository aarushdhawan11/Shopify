import express from "express";
import { getShopifyProducts, getShopifyCustomers, getShopifyOrders } from "../shopifyService.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await getShopifyProducts();
  res.json(products);
});

router.get("/customers", async (req, res) => {
  const customers = await getShopifyCustomers();
  res.json(customers);
});

router.get("/orders", async (req, res) => {
  const orders = await getShopifyOrders();
  res.json(orders);
});

export default router;
