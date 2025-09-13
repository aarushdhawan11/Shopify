import express from "express";
import shopify from "../shopify.js"; // Shopify helper
import { authenticate } from "../middleware/authMiddleware.js"; // 🔒 JWT middleware

const router = express.Router();

// ✅ Get all products from Shopify (protected)
router.get("/", authenticate, async (req, res) => {
  try {
    const response = await shopify.get("/products.json");
    res.json(response.data.products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Add a new product to Shopify (protected)
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = {
      product: {
        title: name,
        variants: [
          {
            price: price,
          },
        ],
      },
    };

    const response = await shopify.post("/products.json", newProduct);
    res.json(response.data.product);
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
});

export default router;
