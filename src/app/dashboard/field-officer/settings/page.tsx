import { useState } from 'react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="space-y-6">
          {/* Theme Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Theme Preferences</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-lg border-2 ${
                  theme === 'light' ? 'border-sky-500' : 'border-gray-200'
                }`}
              >
                <div className="h-20 bg-white border rounded-md mb-2"></div>
                <span className="block text-center">Light</span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-lg border-2 ${
                  theme === 'dark' ? 'border-sky-500' : 'border-gray-200'
                }`}
              >
                <div className="h-20 bg-gray-900 border rounded-md mb-2"></div>
                <span className="block text-center">Dark</span>
              </button>
              
              <button
                onClick={() => setTheme('system')}
                className={`p-4 rounded-lg border-2 ${
                  theme === 'system' ? 'border-sky-500' : 'border-gray-200'
                }`}
              >
                <div className="h-20 bg-gradient-to-b from-white to-gray-900 border rounded-md mb-2"></div>
                <span className="block text-center">System</span>
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Receive notifications for activity updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email updates for reports and activities</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="button"
              className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 