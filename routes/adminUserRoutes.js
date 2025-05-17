import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllVendors
} from "../controllers/adminUserController.js";

const router = express.Router();
router.get("/vendors", getAllVendors);
router.get("/", getAllUsers);        
router.get("/:id", getUserById);     
router.post("/", createUser);        
router.put("/:id", updateUser);      
router.delete("/:id", deleteUser);  



export default router;
