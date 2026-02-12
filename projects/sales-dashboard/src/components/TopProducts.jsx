import React from 'react';

const products = [
  { name: 'Apple iPhone 14', price: '$999', sales: 450, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80' },
  { name: 'Nike Air Jordan', price: '$140', sales: 320, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80' },
  { name: 'Sony PlayStation 5', price: '$499', sales: 210, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100&q=80' },
  { name: 'Logitech Mouse', price: '$89', sales: 150, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&q=80' },
];

const TopProducts = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Top Products</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{product.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{product.sales} Sales</p>
              </div>
            </div>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
