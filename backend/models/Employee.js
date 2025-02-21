const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  department: { type: String, required: true },
  emergencyContacts: [
    { name: String, relationship: String, phone: String }
  ],
  medicalConditions: [String], 
  qrCode: { type: String, default: "" }, 
  password: { type: String, required: true } // Added password field
});

module.exports = mongoose.model("Employee", EmployeeSchema);
