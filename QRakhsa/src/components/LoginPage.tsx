import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginPageProps {
  onLogin: (userId: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      alert("Login successful (simulated) for user: " + username);
      onLogin(username);
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      {/* Left Side: Welcome Text */}
      <div className="hidden lg:flex lg:flex-col justify-center items-start pr-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to <span className="text-blue-600">QRaksha</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Your emergency QR code generator.
        </p>
      </div>

      {/* Right Side: Login Form Card */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Login
        </h2>
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-3 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-5 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <button
          onClick={handleLogin}
          className="btn-primary w-full"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          New user?
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;