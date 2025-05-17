import express from "express";
import { predictDemand } from "../controllers/demandForecast.controller.js";


const router = express.Router();



router.get("/", predictDemand); // GET request to predict demand

export default router;
