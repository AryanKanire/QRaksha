import React, { useState } from "react";

interface LoginPageProps {
  onLogin: (userId: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState("");

  const handleLogin = () => {
    if (userId) {
      onLogin(userId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded w-64 mb-4"
      />
      <button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
