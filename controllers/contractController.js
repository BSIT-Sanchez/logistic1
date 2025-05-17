import Contract from "../models/contractModel.js";
import { User } from "../models/user.model.js";

export const createContract = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      amount,
      status,
      vendor, 
    } = req.body;

    
    const user = await User.findById(vendor);
    if (!user) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const vendorFullName = `${user.firstName} ${user.lastName}`;

    const contractFile = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/profile-pictures/${req.file.filename}`
      : null;

    const newContract = new Contract({
      title,
      description,
      startDate,
      endDate,
      amount,
      status,
      vendor: vendorFullName, 
      contractFile,
    });

    await newContract.save();

    res.status(201).json({
      message: "Contract created successfully",
      contract: newContract,
    });
  } catch (error) {
    console.error("Error creating contract:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllContracts = async (req, res) => {
    try {
      const contracts = await Contract.find().sort({ createdAt: -1 });
      res.status(200).json(contracts);
    } catch (error) {
      console.error("Error fetching contracts:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

  
export const getContractById = async (req, res) => {
    try {
      const { id } = req.params;
      const contract = await Contract.findById(id);
  
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
  
      res.status(200).json(contract);
    } catch (error) {
      console.error("Error fetching contract:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
export const updateContract = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        startDate,
        endDate,
        amount,
        status,
        vendor,
      } = req.body;
  
      // Get vendor full name
      const user = await User.findById(vendor);
      if (!user) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      const vendorFullName = `${user.firstName} ${user.lastName}`;
  
      const contractFile = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/profile-pictures/${req.file.filename}`
        : undefined; // only update if a file is uploaded
  
      const updatedContract = await Contract.findByIdAndUpdate(
        id,
        {
          title,
          description,
          startDate,
          endDate,
          amount,
          status,
          vendor: vendorFullName,
          ...(contractFile && { contractFile }),
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedContract) {
        return res.status(404).json({ message: "Contract not found" });
      }
  
      res.status(200).json({
        message: "Contract updated successfully",
        contract: updatedContract,
      });
    } catch (error) {
      console.error("Error updating contract:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContract = await Contract.findByIdAndDelete(id);
    if (!deletedContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    res.status(200).json({ message: "Contract deleted successfully" });
  } catch (error) {
    console.error("Error deleting contract:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getContractsByVendorId = async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Fetch the user to get their full name
    const user = await User.findById(vendorId);
    if (!user) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const vendorFullName = `${user.firstName} ${user.lastName}`;

    // Find all contracts where vendor matches the full name
    const contracts = await Contract.find({ vendor: vendorFullName }).sort({ createdAt: -1 });

    res.status(200).json(contracts);
  } catch (error) {
    console.error("Error fetching vendor contracts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

