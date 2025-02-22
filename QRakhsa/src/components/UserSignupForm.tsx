import React, { useState,useRef } from "react";
import QRCode, { QRCodeCanvas } from "qrcode.react";

const UserSignupForm: React.FC = () => {
  // Form state for user details
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  // Emergency contacts state
  const [emergencyContacts, setEmergencyContacts] = useState<
    { name: string; phone: string }[]
  >([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  // QR code state
  const [qrData, setQrData] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Function to add a new emergency contact
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

  // Function to handle form submission and generate QR code
  const handleSubmit = (e: React.FormEvent) => {
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
      password: password,
      username: username,
    };

    setQrData(JSON.stringify(userData));
    setSubmitted(true);
  };

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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Signup</h2>

      {!submitted ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your department"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Type</label>
            <input
              type="text"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your blood type"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medical Conditions</label>
            <input
              type="text"
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g., Asthma, Diabetes (comma-separated)"
            />
          </div>

          {/* Emergency Contacts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emergency Contacts</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-1"
                placeholder="Contact Name"
              />
              <input
                type="text"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-1"
                placeholder="Contact Phone"
              />
              <button
                type="button"
                onClick={addEmergencyContact}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Add
              </button>
            </div>
            {emergencyContacts.length > 0 && (
              <ul className="list-disc ml-4 text-gray-600 dark:text-gray-400">
                {emergencyContacts.map((contact, index) => (
                  <li key={index}>
                    {contact.name}: {contact.phone}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg w-full transition duration-200"
          >
            Submit & Generate QR
          </button>
        </form>
      ) : (
        <div className="text-center mt-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">QR Code Generated</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Save this QR code for emergencies.</p>
          {/* <div className="mt-6 flex justify-center">
            {qrData && <QRCodeCanvas value={qrData} size={150} />}
          </div> */}
          {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <div ref={qrRef}>
                <QRCodeCanvas
                  value={qrData}
                  size={150}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <button
                onClick={downloadHighResQR}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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