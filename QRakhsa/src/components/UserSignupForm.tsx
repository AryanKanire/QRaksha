import React, { useState, useRef } from "react";
import axios from "axios";
import QRCode, { QRCodeCanvas } from "qrcode.react";

const UserSignupForm: React.FC = () => {
  // Form state
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Emergency contacts state
  const [emergencyContacts, setEmergencyContacts] = useState<
    { name: string; phone: string }[]
  >([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  // QR Code & Submission state
  const [qrData, setQrData] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Add emergency contact
  const addEmergencyContact = () => {
    if (newContactName.trim() && newContactPhone.trim()) {
      setEmergencyContacts([
        ...emergencyContacts,
        { name: newContactName.trim(), phone: newContactPhone.trim() },
      ]);
      setNewContactName("");
      setNewContactPhone("");
    }
  };

  // Handle user signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !department || !bloodType || !password || !username) {
      alert("Please fill in all required fields.");
      return;
    }

    const userData = {
      name,
      department,
      bloodType,
      medicalConditions: medicalConditions
        .split(",")
        .map((cond) => cond.trim())
        .filter(Boolean),
      emergencyContacts,
      password,
      username,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees/register",
        userData
      );

      if (response.status === 201) {
        alert("Registration successful!");
        setQrData(response.data.employee.qrCode);
        setSubmitted(true);
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  // Download QR Code
  const downloadHighResQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qraksha-qr.png";
        link.click();
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        User Signup
      </h2>

      {!submitted ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your department"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Blood Type
            </label>
            <input
              type="text"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your blood type"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Medical Conditions
            </label>
            <input
              type="text"
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Asthma, Diabetes (comma-separated)"
            />
          </div>

          {/* Emergency Contacts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Emergency Contacts
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
                placeholder="Contact Name"
              />
              <input
                type="text"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 flex-1"
                placeholder="Contact Phone"
              />
              <button
                type="button"
                onClick={addEmergencyContact}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full"
          >
            Submit & Generate QR
          </button>
        </form>
      ) : (
        <div className="text-center mt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            QR Code Generated
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Save this QR code for emergencies.
          </p>
          <div className="flex flex-col items-center">
            <div ref={qrRef}>
              {qrData && <QRCodeCanvas value={qrData} size={150} />}
            </div>
            <button
              onClick={downloadHighResQR}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSignupForm;
