import React, { useState } from 'react';

const ShoppingProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
  });

  const [orders] = useState([
    { id: '12345', date: '2023-08-21', status: 'Delivered', total: '$50.00' },
    { id: '12346', date: '2023-09-10', status: 'In Transit', total: '$30.00' },
  ]);

  const [addresses] = useState([
    { type: 'Home', address: '123 Main St, Springfield, USA' },
    { type: 'Office', address: '456 Office Rd, Springfield, USA' },
  ]);

  const [paymentMethods] = useState([
    { type: 'Visa', last4: '1234', expiry: '12/24' },
    { type: 'PayPal', email: 'jane.paypal@example.com' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen pt-40 pb-36  p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-[#e1e8f0] rounded-xl p-8 space-y-8 transform transition duration-300 hover:scale-105">

        {/* Header */}
        <h2 className="text-3xl font-bold text-indigo-700 text-center">Shopping Account Profile</h2>

        {/* Profile Information */}
        <section>
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full border border-indigo-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 w-full border border-indigo-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 w-full border border-indigo-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </div>
          </div>
        </section>

        {/* Order History */}
        <section>
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Order History</h3>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="flex justify-between bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg shadow-md">
                <span>Order #{order.id} - {order.date}</span>
                <span>Status: <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></span>
                <span className="font-bold">{order.total}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Saved Addresses */}
        <section>
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Saved Addresses</h3>
          <ul className="space-y-4">
            {addresses.map((address, index) => (
              <li key={index} className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-gray-800">{address.type}</p>
                <p className="text-gray-600">{address.address}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Payment Methods */}
        <section>
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Payment Methods</h3>
          <ul className="space-y-4">
            {paymentMethods.map((method, index) => (
              <li key={index} className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-gray-800">{method.type}</p>
                {method.type === 'PayPal' ? (
                  <p className="text-gray-600">{method.email}</p>
                ) : (
                  <p className="text-gray-600">Ending in {method.last4} (Expiry: {method.expiry})</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            onClick={() => alert('Profile updated successfully!')}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transform transition duration-200 hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProfile;
