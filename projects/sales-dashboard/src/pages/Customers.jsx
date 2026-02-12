import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

const customersData = [
  { id: 1, name: "Ahmed Ali", email: "ahmed@example.com", phone: "+20 100 123 4567", orders: 12, spent: "$1,200", status: "Active" },
  { id: 2, name: "Sarah Connor", email: "sarah@example.com", phone: "+1 555 012 3456", orders: 5, spent: "$450", status: "Inactive" },
  { id: 3, name: "John Wick", email: "john@example.com", phone: "+1 555 000 0000", orders: 20, spent: "$3,500", status: "Active" },
  { id: 4, name: "Emily Blunt", email: "emily@example.com", phone: "+44 20 7123 4567", orders: 8, spent: "$800", status: "Active" },
  { id: 5, name: "Michael Scott", email: "michael@dundermifflin.com", phone: "+1 570 123 4567", orders: 45, spent: "$5,000", status: "Active" },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customers</h1>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FaUser size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">{customer.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${customer.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {customer.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                {customer.phone}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Orders</p>
                <p className="font-bold text-gray-800 dark:text-white">{customer.orders}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 dark:text-gray-400">Total Spent</p>
                <p className="font-bold text-indigo-600 dark:text-indigo-400">{customer.spent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Customers;
