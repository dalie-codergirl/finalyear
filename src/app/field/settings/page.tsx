'use client';
import { useState, useContext } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import BackButton from '../components/BackButton';
import { ThemeContext } from '../dashboard/page';

export default function SettingsPage() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // The theme change will be handled by the ThemeContext
  };

  return (
    <div className={`p-8 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <BackButton />
      <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
      
      <div className="space-y-6">
        {/* Theme Settings */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Theme Preferences</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleThemeChange('light')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                theme === 'light' 
                  ? 'bg-sky-100 text-sky-700 border-2 border-sky-500'
                  : 'bg-gray-700 text-gray-300 border-2 border-transparent'
              }`}
            >
              <SunIcon className="w-5 h-5" />
              <span>Light</span>
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-sky-100 text-sky-700 border-2 border-sky-500'
                  : 'bg-gray-700 text-gray-300 border-2 border-transparent'
              }`}
            >
              <MoonIcon className="w-5 h-5" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Language Settings</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </div>
  );
} 