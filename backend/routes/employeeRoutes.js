const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const Employee = require("../models/Employee");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register Employee & Generate QR Code
router.post("/register", async (req, res) => {
  try {
    const { username, name, bloodType, department, emergencyContacts, medicalConditions, password } = req.body;

    console.log(req.body);

    // Validate required fields
    if (!username || !name || !bloodType || !department || !Array.isArray(emergencyContacts) || emergencyContacts.length === 0 || !password) {
      return res.status(400).json({ error: "All fields are required, and emergencyContacts must be a non-empty array." });
    }

    // Check if username already exists
    const existingEmployee = await Employee.findOne({ username });
    if (existingEmployee) {
      return res.status(400).json({ error: "Username already taken. Please choose a different one." });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const employee = new Employee({
      username,
      name,
      bloodType,
      department,
      emergencyContacts,
      medicalConditions,
      password: hashedPassword // Save hashed password
    });

    await employee.save(); // Save employee first to get the ID

    // Generate QR Code using Employee ID
    const qrCodeURL = await QRCode.toDataURL(`http://localhost:5174/user/${employee._id}`);
    employee.qrCode = qrCodeURL;
    await employee.save(); // Save QR Code in DB

    res.status(201).json({
      message: "Employee Registered Successfully!",
      employee: { ...employee.toObject(), password: undefined } // Exclude password
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Employee Login
// Employee Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Find Employee by username
    const employee = await Employee.findOne({ username });
    if (!employee) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: employee._id, username: employee.username }, JWT_SECRET, { expiresIn: "1h" });

    // ✅ Include `userId` in response
    res.json({ message: "Login successful!", token, userId: employee._id });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Get Employee by ID (for QR Code Scanning)
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).lean();
    if (!employee) return res.status(404).json({ message: "Employee Not Found" });

    res.json(employee);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
