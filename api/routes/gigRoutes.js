import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
} from "../controller/gig.controller.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/singlegig/:id", getGig);
router.get("/", getAllGigs);

export default router;
