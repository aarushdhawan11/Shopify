import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./db.js";

import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import shopifyRoutes from "./routes/shopifyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

let dashboardRoutes;
try {
  dashboardRoutes = (await import("./routes/dashboardRoutes.js")).default;
} catch (err) {
  console.warn("⚠️ dashboardRoutes.js not found, skipping dashboard endpoints");
}

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://our-shopify.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shopify", shopifyRoutes);

if (dashboardRoutes) {
  app.use("/api/dashboard", dashboardRoutes);
}

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    await sequelize.sync({ alter: true }); 
    console.log("📦 Database & tables synced!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();
