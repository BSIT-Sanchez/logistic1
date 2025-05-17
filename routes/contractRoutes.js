import express from "express";
import { createContract, getAllContracts, getContractById, updateContract, deleteContract, getContractsByVendorId } from "../controllers/contractController.js";
import { upload } from "../middleware/upload.js"; 
const router = express.Router();

router.post(
  "/contracts",
  upload.single("contractFile"),
  createContract
);
router.get("/contracts", getAllContracts);
router.get("/contracts/:id", getContractById);
router.put("/contracts/:id", upload.single("contractFile"), updateContract);
router.delete("/contracts/:id", deleteContract);
router.get("/contracts/vendor/:vendorId", getContractsByVendorId);

export default router;
