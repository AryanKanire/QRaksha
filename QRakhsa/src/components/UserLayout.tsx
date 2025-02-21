import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, User, Settings } from 'lucide-react'; // Import icons for UserLayout

const UserLayout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                {/* You can replace AlertCircle with a different icon or brand for UserLayout if desired */}
                {/* <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-500" /> */}
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">EmergencyQR User</span> {/* Modified brand text */}
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/" // Link to Homepage (root path) - as "Home" for User
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/')
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <Home className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link
                to="/user" // Link to User Dashboard as "Profile" for User
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/user-dashboard')
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500'
                }`}
              >
                <User className="h-5 w-5 mr-1" />
                Profile
              </Link>
              <Link
                to="/user-settings" // Dummy link for User Settings - you can define a route for this later
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/user-settings') // Update isActive check if you create a real settings route
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
        <Outlet /> {/* This is where the content of the matched route will be rendered */}
      </main>
    </div>
  );
};

export default UserLayout;