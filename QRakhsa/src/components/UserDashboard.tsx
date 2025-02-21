import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface UserDashboardProps {
  user: {
    name: string;
    department: string;
    bloodType: string;
    medicalConditions: string[];
    emergencyContacts: { name: string; phone: string }[];
  };
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [qrData, setQrData] = useState<string>(JSON.stringify(user));
  const qrRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const generateUpdatedQR = () => {
    setQrData(JSON.stringify(updatedUser)); // Replace old QR with new data
    setIsEditing(false);
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


  const handleSOSCall = () => {
    // Call emergency services or send SOS alert
    alert("SOS call initiated!");
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Dashboard</h2>

      <div className="space-y-2">
        {!isEditing ? (
          <>
            <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {updatedUser.name}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Department:</strong> {updatedUser.department}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Blood Type:</strong> {updatedUser.bloodType}</p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Medical Conditions:</strong> {updatedUser.medicalConditions.length > 0 ? updatedUser.medicalConditions.join(", ") : "None"}
            </p>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Emergency Contacts:</strong>
              <ul className="list-disc ml-4 text-gray-600 dark:text-gray-400">
                {updatedUser.emergencyContacts.map((contact, index) => (
                  <li key={index}>
                    {contact.name}: {contact.phone}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <label className="block text-gray-700 dark:text-gray-300">
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full mt-1 dark:bg-gray-700 dark:text-white"
              />
            </label>

            <label className="block text-gray-700 dark:text-gray-300">
              <strong>Department:</strong>
              <input
                type="text"
                name="department"
                value={updatedUser.department}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full mt-1 dark:bg-gray-700 dark:text-white"
              />
            </label>

            <label className="block text-gray-700 dark:text-gray-300">
              <strong>Blood Type:</strong>
              <input
                type="text"
                name="bloodType"
                value={updatedUser.bloodType}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full mt-1 dark:bg-gray-700 dark:text-white"
              />
            </label>

            <label className="block text-gray-700 dark:text-gray-300">
              <strong>Medical Conditions:</strong>
              <textarea
                name="medicalConditions"
                value={updatedUser.medicalConditions.join(", ")}
                onChange={(e) =>
                  setUpdatedUser((prevUser) => ({
                    ...prevUser,
                    medicalConditions: e.target.value.split(", "),
                  }))
                }
                className="border rounded-lg p-2 w-full mt-1 dark:bg-gray-700 dark:text-white"
              />
            </label>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">Emergency Contacts:</strong>
              {updatedUser.emergencyContacts.map((contact, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="text"
                    name={`contact-${index}`}
                    value={`${contact.name}: ${contact.phone}`}
                    onChange={(e) => {
                      const [name, phone] = e.target.value.split(": ");
                      const updatedContacts = [...updatedUser.emergencyContacts];
                      updatedContacts[index] = { name, phone };
                      setUpdatedUser((prevUser) => ({
                        ...prevUser,
                        emergencyContacts: updatedContacts,
                      }));
                    }}
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Edit Info
          </button>
        ) : (
          <div className="flex">
            <button
              onClick={generateUpdatedQR}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save & Generate New QR
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-row items-center justify-center gap-8">
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

  {/* SOS Button Section */}
  <div className="flex flex-col items-center">
    <button
      onClick={handleSOSCall}
      className="w-36 h-36 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl shadow-md transition-all duration-300 active:translate-y-1 active:shadow-sm flex items-center justify-center relative animate-pulse"
      style={{
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.2),
          0 1px 3px rgba(0, 0, 0, 0.08),
          0 8px 12px -4px rgba(0, 0, 0, 0.3),
          inset 0 -3px 0 rgba(0, 0, 0, 0.2)
        `,
      }}
    >
      SOS
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent)`,
        }}
      />
    </button>
  </div>
</div>
    </div>
  );
};

export default UserDashboard;