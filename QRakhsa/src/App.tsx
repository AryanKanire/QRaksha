import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; 
import Layout from "./components/Layout"; 
import EmployeeCard from "./components/EmployeeCard";
import AdminDashboard from "./components/AdminDashboard"; 
import UserDashboard from "./components/UserDashboard"; 
import UserSignupForm from "./components/UserSignupForm"; 
import UserProfile from "./components/userProfile";
import type { Employee, Alert } from "./types"; 
import Homepage from './components/HomePage'; 
import LoginPage from './components/LoginPage'; 
import UserLayout from "./components/UserLayout";


// Mock Employee Data (Keep this - no changes needed)
const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    bloodType: "O+",
    department: "Engineering",
    emergencyContacts: [
      { name: "Jane Doe", relationship: "Spouse", phone: "+1-555-0123" },
      { name: "James Doe", relationship: "Spouse", phone: "+1-555-0124" },
    ],
    medicalConditions: ["Asthma", "Penicillin Allergy"],
    location: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "EMP002",
    name: "Alice Smith",
    bloodType: "A-",
    department: "Human Resources",
    emergencyContacts: [
      { name: "Bob Smith", relationship: "Husband", phone: "+1-555-5678" },
      { name: "Charlie Smith", relationship: "Father", phone: "+1-555-5679" },
    ],
    medicalConditions: ["Diabetes", "Nut Allergy"],
    location: { lat: 34.0522, lng: -118.2437 },
  },
];

console.log(mockEmployees[0])

// Initial Alerts (Keep this - no changes needed)
const mockAlerts: Alert[] = [];

function App() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(
    mockEmployees[0]
  );

  const handleSOS = () => {
    const newAlert: Alert = {
      id: `ALERT${Math.random().toString(36).substr(2, 9)}`,
      employeeId: selectedEmployee.id,
      timestamp: new Date(),
      status: "active",
      location: selectedEmployee.location,
    };
    setAlerts((prev) => [...prev, newAlert]);
    alert("Emergency alert sent!");
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"> {/* Layout for top-level routes */}
          <Route index element={<Homepage />} /> {/* Home page at "/" */}
          {/* <Route path="scan" element={<ScanQR />} /> Scan QR Page at "/scan" */}
          {/* <Route path="settings" element={<SettingsPage />} />  Settings Page at "/settings" */}
        </Route>

        <Route path="/admindashboard" element={<Layout />}> {/* Layout for admin dashboard routes */}

          <Route index element={<AdminDashboard // Render AdminDashboard component for index route
            alerts={alerts}
            employees={mockEmployees}
            onResolveAlert={handleResolveAlert}
          />} />
          <Route path="admin" element={<AdminDashboard // Admin management at "/admindashboard/admin"
            alerts={alerts}
            employees={mockEmployees}
            onResolveAlert={handleResolveAlert}
          />} />
          {/* <Route path="settings" element={<SettingsPage />} /> Settings within Admin at "/admindashboard/settings" */}
          {/* <Route path="scanqr" element={<ScanQR />} /> Scan QR within Admin at "/admindashboard/scanqr" */}
          <Route
            path="employee-card" // Example EmployeeCard route for admin section at "/admindashboard/employee-card"
            element={
              <div className="container mx-auto px-4 py-8">
                <h2 className="text-xl font-bold mb-4">Select Employee (Admin View):</h2>
                <select
                  className="border p-2 rounded"
                  onChange={(e) => {
                    const employee = mockEmployees.find(
                      (emp) => emp.id === e.target.value
                    );
                    if (employee) setSelectedEmployee(employee);
                  }}
                  value={selectedEmployee.id}
                >
                  {mockEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
                <EmployeeCard employee={selectedEmployee} onSOS={handleSOS} />
              </div>
            }
          />
        </Route>

       


        <Route path="/signup" element={<UserSignupForm />} /> {/* Signup page at "/signup" (outside layouts) */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page at "/login" (outside layouts) */}
        <Route path="/user/:employeeId" element={<UserProfile />} /> {/* User Profile at "/user/:employeeId" (outside layouts) */}
        <Route
          path="/user" // User Dashboard at "/user-dashboard" (outside admin layout)
          element={
            <div className="container mx-auto px-4 py-8">
              <UserDashboard user={selectedEmployee} onSOS={handleSOS} />
            </div>
          }
        />

        {/* User Layout Routes */}
        <Route path="/user" element={<UserLayout />}>  {/* Use UserLayout as element */}
          <Route path="" element={<UserDashboard user={selectedEmployee} onSOS={handleSOS} />} /> {/* /user/dashboard route */}
          <Route path="settings" element={<div>User Settings Page Content</div>} /> {/* /user/settings - Dummy Content */}
          {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> Redirect /user to /user/dashboard */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;