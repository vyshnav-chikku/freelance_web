import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigofSingle,
  getGigs
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/single_gig/:id", getGigofSingle);

router.get("/", getGigs);

export default router;
