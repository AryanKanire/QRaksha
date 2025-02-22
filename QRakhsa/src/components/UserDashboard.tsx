import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary

interface UserDashboardProps {
  user: {
    name: string;
    department: string;
    bloodType: string;
    medicalConditions: string[];
    emergencyContacts: { name: string; phone: string }[];
  };
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user: initialUser }) => {
  const [updatedUser, setUpdatedUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [qrData, setQrData] = useState<string>("");
  const [qrError, setQrError] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employees/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUpdatedUser(userData);

        // Generate a link to the user profile page using localhost
        const userProfileLink = `http://localhost:5173/user-profile/${userId}`; // Adjust the port if necessary
        setQrData(userProfileLink);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const generateUpdatedQR = () => {
    try {
      // Generate a link to the user profile page using localhost
      const userProfileLink = `http://localhost:5173/user-profile/${userId}`; // Adjust the port if necessary
      setQrData(userProfileLink);
      setIsEditing(false);
      setQrError(null); // Clear any previous errors
    } catch (error) {
      setQrError("Failed to generate QR code: Data too large.");
    }
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
            {/* Edit form fields */}
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
          {qrError ? (
            <p className="text-red-500">{qrError}</p>
          ) : (
            <div ref={qrRef}>
              <QRCodeCanvas
                value={qrData}
                size={150}
                level="H"
                includeMargin={true}
              />
            </div>
          )}
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