import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaChartLine, FaShoppingCart, FaUsers, FaBox, FaCog, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: FaChartLine, name: "Dashboard", path: "/" },
    { icon: FaShoppingCart, name: "Sales", path: "/sales" },
    { icon: FaUsers, name: "Customers", path: "/customers" },
    { icon: FaBox, name: "Products", path: "/products" },
    { icon: FaCog, name: "Settings", path: "/settings" },
  ];

  return (
    <motion.div 
      animate={{ width: isOpen ? "250px" : "80px" }}
      className="h-screen bg-white dark:bg-slate-800 text-gray-800 dark:text-white border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300 shadow-lg relative z-50"
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-slate-700">
        {isOpen && <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">SalesPro</h1>}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={index} className="block px-4">
              <div className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                isActive 
                ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold' 
                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
              }`}>
                <item.icon size={20} />
                {isOpen && <span className="ml-4">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Sidebar;
