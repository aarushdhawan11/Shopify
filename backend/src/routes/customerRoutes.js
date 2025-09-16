import express from "express";
import shopify from "../shopify.js"; 
import { authenticate } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const response = await shopify.get("/customers.json");
    res.json(response.data.customers);
  } catch (err) {
    console.error("Error fetching customers:", err.message);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    if (!first_name || !email) {
      return res.status(400).json({ error: "First name and email are required" });
    }

    const newCustomer = {
      customer: {
        first_name,
        last_name: last_name || "",
        email,
      },
    };

    const response = await shopify.post("/customers.json", newCustomer);
    res.status(201).json(response.data.customer);
  } catch (err) {
    console.error("Error creating customer:", err.message);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

export default router;
