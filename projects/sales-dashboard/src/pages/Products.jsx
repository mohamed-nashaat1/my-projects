import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const productsData = [
  { 
    id: 1, 
    name: "Apple MacBook Pro 16", 
    category: "Electronics", 
    price: "$2499", 
    stock: 12, 
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Sony WH-1000XM5", 
    category: "Audio", 
    price: "$349", 
    stock: 45, 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    name: "Nike Air Force 1", 
    category: "Footwear", 
    price: "$120", 
    stock: 8, 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Modern Chair", 
    category: "Furniture", 
    price: "$850", 
    stock: 3, 
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    name: "Mechanical Keyboard", 
    category: "Accessories", 
    price: "$150", 
    stock: 22, 
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1000&auto=format&fit=crop" 
  },
  {
    id: 6,
    name: "Smart Watch",
    category: "Electronics",
    price: "$199",
    stock: 15,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
  }
];



const Products = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products Inventory</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productsData.map((product) => (
          <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden group">
            <div className="h-48 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute top-2 right-2 bg-white dark:bg-slate-900 px-2 py-1 rounded-md text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm">
                {product.category}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-800 dark:text-white truncate">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">{product.price}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${product.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {product.stock} in stock
                </span>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm">
                  <FaEdit /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-white hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Products;
