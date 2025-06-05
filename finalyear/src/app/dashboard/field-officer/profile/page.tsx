import { useState } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    location: 'New York',
    bio: 'Field officer with 5 years of experience in project management and community development.',
    avatar: '/placeholder-avatar.jpg'
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>

      <div className="max-w-2xl">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={profileData.avatar}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-sky-600 text-white p-1 rounded-full hover:bg-sky-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{profileData.name}</h2>
                  <p className="text-gray-500">Field Officer</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sky-600 hover:text-sky-800"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
              <p className="mt-2 text-gray-600">{profileData.bio}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={profileData.location}
                  disabled={!isEditing}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                disabled={!isEditing}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-sky-500 disabled:bg-gray-100"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Activity Stats */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Activity Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-sky-600">24</div>
              <div className="text-sm text-gray-500">Reports Submitted</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-gray-500">Projects Completed</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">6</div>
              <div className="text-sm text-gray-500">Ongoing Projects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 