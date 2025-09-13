import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./db.js";

import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import shopifyRoutes from "./routes/shopifyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


// 🟢 Check if dashboardRoutes exists before importing
let dashboardRoute;
try {
  dashboardRoute = (await import("./routes/dashboardRoutes.js")).default;
} catch (err) {
  console.warn("⚠️ dashboardRoutes.js not found, skipping dashboard endpoints");
}

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // allow cookies/session
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shopify", shopifyRoutes);
app.use("/api/dashboard", dashboardRoutes);



const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // ❌ Don't use force: true, it wipes tables
    // ✅ Use alter: true only if you need schema updates
    await sequelize.sync({ alter: true });  

    console.log("📦 Database & tables synced!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();
