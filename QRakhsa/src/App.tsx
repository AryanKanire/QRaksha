import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EmployeeCard from "./components/EmployeeCard";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import UserSignupForm from "./components/UserSignupForm";
import UserProfile from "./components/userProfile";
import type { Employee, Alert } from "./types";

// Mock Employee Data
const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    bloodType: "O+",
    department: "Engineering",
    emergencyContacts: [
      { name: "Jane Doe", relationship: "Spouse", phone: "+1-555-0123" },
      { name: "James Doe", relationship: "Brother", phone: "+1-555-0124" },
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

// Initial Alerts
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
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <div className="container mx-auto px-4 py-8">
                <h2 className="text-xl font-bold mb-4">Select Employee:</h2>
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

          <Route
            path="admin"
            element={
              <div className="container mx-auto px-4 py-8">
                <AdminDashboard
                  alerts={alerts}
                  employees={mockEmployees}
                  onResolveAlert={handleResolveAlert}
                />
              </div>
            }
          />

          <Route
            path="signup"
            element={
              <div className="container mx-auto px-4 py-8">
                <UserSignupForm />
              </div>
            }
          />
        </Route>

        <Route
          path="user"
          element={
            <div className="container mx-auto px-4 py-8">
              <UserDashboard user={selectedEmployee} onSOS={handleSOS} />
            </div>
          }
        />

        <Route path="user/:employeeId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
