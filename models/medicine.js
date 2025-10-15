const mongoose = require('mongoose')

const MedicineSchema = new mongoose.Schema(
  {
    medicineCode: {
      type: String,
      unique: true,
      trim: true,
      maxlength: 10
    },
    name: {
      type: String,
      required: [true, 'Please provide name'],
      trim: true,
      minlength: [2, "Medicine name must be at least 2 characters"], 
      maxlength: [100, "Medicine name cannot exceed 100 characters"]
    },
    costPrice: {
      type: Number,
      required: [true, 'Please provide cost price'],
      min: [0, "Cost price cannot be negative"] 
    },
    sellingPrice: {
      type: Number,
      required: [true, 'Please provide selling price'],
      min: [0, "Selling price cannot be negative"] 
      
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide medicine quantity'],
       min: [0, "Quantity cannot be negative"] 
    },
     expirationDate: {
      type: Date,
      required: [true, 'Please provide expiration date']
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Medicine', MedicineSchema)
