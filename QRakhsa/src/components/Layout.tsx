import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AlertCircle, Home, Settings, Users } from 'lucide-react'; // REMOVED QrCode import

const Layout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">EmergencyQR</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/" // Link to Homepage (root path)
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/')
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
              {/* REMOVED SCAN LINK HERE */}
              {/* <Link
                to="/scan" // Link to ScanPage (or ScanQRPage)
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/scan')
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <QrCode className="h-5 w-5 mr-1" />
                Scan
              </Link> */}
              <Link
                to="/admindashboard/admin" // Link to AdminDashboard (under /admindashboard)
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/admindashboard/admin') // Correct isActive check for nested route
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <Users className="h-5 w-5 mr-1" />
                Admin
              </Link>
              <Link
                to="/admindashboard/settings" // Link to SettingsPage (under /admindashboard)
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/admindashboard/settings') // Correct isActive check for nested route
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <Settings className="h-5 w-5 mr-1" />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet /> {/*  This is where the content of the matched route will be rendered */}
      </main>
    </div>
  );
};

export default Layout;  