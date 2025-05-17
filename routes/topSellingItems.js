import express from "express";
import { topSellingItems } from "../controllers/topSellingItems.controller.js";


const router = express.Router();



router.get("/", topSellingItems);

export default router;
