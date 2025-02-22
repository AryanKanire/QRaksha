import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AdminLoginPageProps {
  onAdminLogin: () => void; // Callback function to update adminLoggedIn state in App
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onAdminLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to the backend
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      // If login is successful
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token); // Store the token in localStorage
        onAdminLogin(); // Call the callback to update adminLoggedIn state in App
        navigate("/admindashboard"); // Redirect to the admin dashboard
      }
    } catch (err) {
      // Handle login errors
      setError("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        {/* Display error message if login fails */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Username input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-5"
        />

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;