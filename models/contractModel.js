import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Active", "Pending", "Completed", "Terminated"],
    default: "Active",
  },
  vendor: {
  type: String, // storing full name instead of a ref
  required: true,
},

  contractFile: {
    type: String, 
    default: null,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Contract", contractSchema);
