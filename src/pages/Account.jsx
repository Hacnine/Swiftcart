import React, { useState } from 'react';

const Account = () => {
  const [formData, setFormData] = useState({
    username: 'JaneDoe',
    email: 'jane.doe@example.com',
    password: '',
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    // Simulate a save operation (could send to an API)
    alert('Account settings saved!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center pt-32 pb-40">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>

        {/* Profile Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Profile Information</h3>
          <div>
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Password Management */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Password Management</h3>
          <div>
            <label className="block text-gray-600">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter new password"
            />
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Notifications</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-gray-600">Receive email notifications</label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
