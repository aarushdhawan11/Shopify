import express from "express";
import shopify from "../shopify.js"; // your Shopify API helper
import { authenticate } from "../middleware/authMiddleware.js"; // 🔒 JWT middleware

const router = express.Router();

// ✅ Get all orders from Shopify (protected)
router.get("/", authenticate, async (req, res) => {
  try {
    const response = await shopify.get("/orders.json?status=any"); // fetch all orders
    res.json(response.data.orders);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ Get order by ID from Shopify (protected)
router.get("/:id", authenticate, async (req, res) => {
  try {
    const response = await shopify.get(`/orders/${req.params.id}.json`);
    res.json(response.data.order);
  } catch (err) {
    console.error("Error fetching order:", err.message);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// ➕ Create a new order in Shopify (protected)
router.post("/", authenticate, async (req, res) => {
  try {
    const { customer_id, line_items } = req.body; 
    // line_items: [{ variant_id: 12345, quantity: 2 }, ...]

    if (!customer_id || !line_items || !line_items.length) {
      return res.status(400).json({ error: "customer_id and line_items are required" });
    }

    const newOrder = {
      order: {
        customer: { id: customer_id },
        line_items,
        financial_status: "paid", // optional, adjust as needed
      },
    };

    const response = await shopify.post("/orders.json", newOrder);
    res.status(201).json(response.data.order);
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

export default router;
