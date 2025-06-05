'use client';
import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/solid';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'report' | 'update' | 'alert';
}

export default function NotificationSystem() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Report Submitted',
      message: 'John Doe submitted a new field report for Project A',
      time: '2 minutes ago',
      read: false,
      type: 'report'
    },
    {
      id: '2',
      title: 'Budget Update',
      message: 'Project B budget utilization exceeded 80%',
      time: '1 hour ago',
      read: false,
      type: 'alert'
    },
    {
      id: '3',
      title: 'Team Update',
      message: 'New field officer assigned to Project C',
      time: '3 hours ago',
      read: true,
      type: 'update'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'report':
        return 'bg-sky-100 text-sky-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'update':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <span className="text-sm text-gray-500">{unreadCount} unread</span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-gray-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${getNotificationColor(notification.type)}`}>
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <button
              onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
              className="text-sm text-sky-600 hover:text-sky-800"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 