import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaDownload, FaEye, FaTrashAlt } from 'react-icons/fa';

// داتا وهمية للمبيعات (Mock Data)
const salesData = [
  { id: 101, customer: "Ahmed Ali", product: "iPhone 14 Pro", date: "2024-02-10", amount: "$1200", status: "Completed" },
  { id: 102, customer: "Sarah Connor", product: "MacBook Air", date: "2024-02-09", amount: "$999", status: "Pending" },
  { id: 103, customer: "John Wick", product: "Sony WH-1000XM5", date: "2024-02-08", amount: "$350", status: "Cancelled" },
  { id: 104, customer: "Emily Blunt", product: "iPad Pro", date: "2024-02-08", amount: "$800", status: "Completed" },
  { id: 105, customer: "Michael Scott", product: "Paper Ream", date: "2024-02-07", amount: "$50", status: "Shipped" },
  { id: 106, customer: "Dwight Schrute", product: "Beets Farm Kit", date: "2024-02-06", amount: "$120", status: "Completed" },
  { id: 107, customer: "Jim Halpert", product: "Pranks Set", date: "2024-02-05", amount: "$45", status: "Pending" },
  { id: 108, customer: "Pam Beesly", product: "Art Supplies", date: "2024-02-04", amount: "$200", status: "Completed" },
  { id: 109, customer: "Ryan Howard", product: "Wuphf Shirt", date: "2024-02-03", amount: "$25", status: "Cancelled" },
  { id: 110, customer: "Kelly Kapoor", product: "Fashion Mag", date: "2024-02-02", amount: "$15", status: "Completed" },
  { id: 111, customer: "Toby Flenderson", product: "Stress Ball", date: "2024-02-01", amount: "$10", status: "Pending" },
  { id: 112, customer: "Stanley Hudson", product: "Pretzel Box", date: "2024-01-31", amount: "$30", status: "Completed" },
];

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState(""); // للبحث
  const [currentPage, setCurrentPage] = useState(1); // للصفحات
  const itemsPerPage = 5; // عدد العناصر في كل صفحة

  // 1. تصفية البيانات (Filter)
  const filteredData = salesData.filter((item) =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. تقسيم الصفحات (Pagination)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // دالة لتغيير الصفحة
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sales Transactions</h1>
        
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search sales..." 
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} // نرجع للصفحة الأولى عند البحث
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-600 dark:text-white transition-colors">
            <FaFilter /> Filter
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm uppercase">
              <tr>
                <th className="p-4 border-b dark:border-slate-600">ID</th>
                <th className="p-4 border-b dark:border-slate-600">Customer</th>
                <th className="p-4 border-b dark:border-slate-600">Product</th>
                <th className="p-4 border-b dark:border-slate-600">Date</th>
                <th className="p-4 border-b dark:border-slate-600">Amount</th>
                <th className="p-4 border-b dark:border-slate-600">Status</th>
                <th className="p-4 border-b dark:border-slate-600 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm text-gray-700 dark:text-gray-300">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 font-medium">#{item.id}</td>
                    <td className="p-4">{item.customer}</td>
                    <td className="p-4">{item.product}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4 font-bold">{item.amount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${item.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                          item.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"><FaEye /></button>
                        <button className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"><FaTrashAlt /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No sales found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors text-sm dark:text-white"
            >
              Prev
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 border rounded text-sm transition-colors
                  ${currentPage === index + 1 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'hover:bg-gray-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700'
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors text-sm dark:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sales;
