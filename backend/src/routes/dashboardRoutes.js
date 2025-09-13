// src/routes/dashboardRoutes.js
import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authenticate } from "../middleware/authMiddleware.js"; // ✅ Protect with JWT

const router = express.Router();

// GET /api/dashboard?start=YYYY-MM-DD&end=YYYY-MM-DD (protected)
router.get("/", authenticate, getDashboard);

export default router;
