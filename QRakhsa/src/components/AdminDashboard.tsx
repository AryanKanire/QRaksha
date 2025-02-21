import React from 'react';
import { Search, MapPin, Bell, CheckCircle } from 'lucide-react';
import type { Alert, Employee } from '../types';

interface AdminDashboardProps {
  alerts: Alert[];
  employees: Employee[];
  onResolveAlert: (alertId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ alerts, employees, onResolveAlert }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterDepartment, setFilterDepartment] = React.useState('');
  const [filterBloodType, setFilterBloodType] = React.useState('');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.medicalConditions.some(condition => condition.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
    const matchesBloodType = !filterBloodType || employee.bloodType === filterBloodType;
    return matchesSearch && matchesDepartment && matchesBloodType;
  });

  const activeAlerts = alerts.filter(alert => alert.status === 'active');

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Bell className="h-6 w-6 text-red-600 mr-2" />
          Active Alerts ({activeAlerts.length})
        </h2>
        <div className="space-y-4">
          {activeAlerts.map(alert => {
            const employee = employees.find(emp => emp.id === alert.employeeId);
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Employee Directory</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
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
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
            >
              <option value="">All Departments</option>
              {Array.from(new Set(employees.map(emp => emp.department))).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filterBloodType}
              onChange={(e) => setFilterBloodType(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
            >
              <option value="">All Blood Types</option>
              {Array.from(new Set(employees.map(emp => emp.bloodType))).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map(employee => (
              <div key={employee.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white">{employee.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.department}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Blood Type: {employee.bloodType}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {employee.medicalConditions.map((condition, index) => (
                    <span
                      key={index}
                      className="text-xs bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-1 rounded-full"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;