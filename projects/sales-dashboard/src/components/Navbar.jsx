import React from 'react';
import { FaSearch, FaBell, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm transition-colors duration-300">
      
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded-full px-4 py-2 w-96 transition-colors duration-300">
        <FaSearch className="text-gray-400 dark:text-gray-300" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none ml-2 text-sm text-gray-700 dark:text-white w-full"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-6">
        
        {/* زر التبديل - تم تحسينه ليكون قابلاً للنقر بسهولة */}
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 hover:ring-2 ring-indigo-500 transition-all duration-200 flex items-center justify-center w-10 h-10"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? (
            <FaMoon className="text-gray-600" size={18} />
          ) : (
            <FaSun className="text-yellow-400" size={18} />
          )}
        </button>

        <div className="relative cursor-pointer">
          <FaBell size={20} className="text-gray-500 dark:text-gray-300 hover:text-indigo-600 transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </div>
        
        <div className="flex items-center cursor-pointer space-x-2 border-l pl-6 border-gray-200 dark:border-slate-700">
          <FaUserCircle size={32} className="text-gray-400 dark:text-gray-300" />
          <div className="hidden md:block">
             <p className="text-sm font-bold text-gray-700 dark:text-white">Admin</p>
             <p className="text-xs text-gray-500 dark:text-gray-400">Dev</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
