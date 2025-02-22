import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, MapPin, Bell, CheckCircle } from "lucide-react";
import type { Alert, Employee } from "../types";
import EmployeeCard from "./EmployeeCard";

const API_BASE_URL = "http://localhost:5000/api/admin";

interface AdminDashboardProps {
  alerts: Alert[];
  onResolveAlert: (alertId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ alerts, onResolveAlert }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Retrieve the "adminToken"
        if (!token) throw new Error("No adminToken found");

        const response = await axios.get(`${API_BASE_URL}/employees`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    (employee.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (employee.medicalConditions ?? []).some((condition) =>
      (condition?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
    )
  );

  const activeAlerts = alerts.filter((alert) => alert.status === "active");

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Bell className="h-6 w-6 text-red-600 mr-2" />
          Active Alerts ({activeAlerts.length})
        </h2>
        <div className="space-y-4">
          {activeAlerts.map((alert) => {
            const employee = employees.find((emp) => emp.id === alert.employeeId);
            if (!employee) return null;

            return (
              <div key={alert.id} className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{employee.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {employee.department} • {new Date(alert.timestamp).toLocaleTimeString()}
                  </p>
                  {alert.location && (
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        Lat: {alert.location.lat.toFixed(6)}, Lng: {alert.location.lng.toFixed(6)}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onResolveAlert(alert.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Resolve
                </button>
              </div>
            );
          })}
          {activeAlerts.length === 0 && (
            <p className="text-center text-gray-600 dark:text-gray-400">No active alerts</p>
          )}
        </div>
      </div>

      {/* Employee Directory */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Employee Directory</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or medical condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-150"
              onClick={() => setSelectedEmployee(employee)}
            >
              <h3 className="font-medium text-gray-900 dark:text-white">{employee.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{employee.department}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Blood Type: {employee.bloodType}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedEmployee && (
        <EmployeeCard employee={selectedEmployee} onSOS={() => alert("SOS function in Admin Dashboard")} />
      )}
    </div>
  );
};

export default AdminDashboard;
