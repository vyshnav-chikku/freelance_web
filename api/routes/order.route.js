import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/:user_id", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.post("/:id", verifyToken, confirm);

export default router;
