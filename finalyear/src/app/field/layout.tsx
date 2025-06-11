'use client';
import { useState, createContext } from 'react';
import { 
  HomeIcon, 
  CogIcon, 
  UserCircleIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

// Create Theme Context
export const ThemeContext = createContext({
  theme: 'light',
  setTheme: (theme: string) => {},
});

export default function FieldLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [theme, setTheme] = useState('light');

  const isActivePath = (path: string) => {
    return pathname === `/field${path}`;
  };

  const handleNavigation = (path: string) => {
    if (path === '/analytics' && pathname === '/field/dashboard') {
      // If we're on dashboard and clicking analytics, scroll to the analytics section
      const analyticsSection = document.getElementById('analytics-section');
      if (analyticsSection) {
        analyticsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/field${path}`);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen h-screen flex bg-gray-50 overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
        {/* Sidebar Toggle Button for Mobile */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <aside 
          className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-sky-700 to-sky-800 text-white transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } z-40 shadow-xl flex flex-col`}
        >
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-sky-700 font-bold text-xl">FO</span>
                  </div>
                  <h2 className="text-xl font-bold">Field Portal</h2>
                </div>
                <div className="h-px bg-sky-600/50 w-full"></div>
              </div>
              
              <nav className="space-y-3">
                <button 
                  onClick={() => handleNavigation('/dashboard')}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                    isActivePath('/dashboard') 
                    ? 'bg-white text-sky-700 shadow-lg font-semibold' 
                    : 'hover:bg-sky-600/50 text-white'
                  }`}
                >
                  <HomeIcon className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/reports')}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                    isActivePath('/reports') 
                    ? 'bg-white text-sky-700 shadow-lg font-semibold' 
                    : 'hover:bg-sky-600/50 text-white'
                  }`}
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  <span className="font-medium">Reports</span>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/analytics')}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                    isActivePath('/analytics') 
                    ? 'bg-white text-sky-700 shadow-lg font-semibold' 
                    : 'hover:bg-sky-600/50 text-white'
                  }`}
                >
                  <ChartBarIcon className="w-5 h-5" />
                  <span className="font-medium">Analytics</span>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/settings')}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                    isActivePath('/settings') 
                    ? 'bg-white text-sky-700 shadow-lg font-semibold' 
                    : 'hover:bg-sky-600/50 text-white'
                  }`}
                >
                  <CogIcon className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/profile')}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                    isActivePath('/profile') 
                    ? 'bg-white text-sky-700 shadow-lg font-semibold' 
                    : 'hover:bg-sky-600/50 text-white'
                  }`}
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </button>
              </nav>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-sky-600/50 bg-sky-800/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center">
                <UserCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">John Doe</h3>
                <p className="text-xs text-sky-200">Field Officer</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex-1">
                  <h1 className="text-xl font-semibold text-gray-800">
                    {pathname === '/field/dashboard' ? 'Dashboard' :
                     pathname === '/field/reports' ? 'Reports' :
                     pathname === '/field/analytics' ? 'Analytics' :
                     pathname === '/field/settings' ? 'Settings' :
                     pathname === '/field/profile' ? 'Profile' : 'Field Portal'}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <BellIcon className="w-6 h-6 text-gray-600" />
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                  <div className="h-6 w-px bg-gray-200"></div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                      <span className="text-sky-700 font-medium text-sm">JD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
} 