import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { FaWallet, FaShoppingBag, FaUserPlus, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import RecentOrders from '../components/RecentOrders';
import TopProducts from '../components/TopProducts'; // <--- استيراد

// بيانات الرسم البياني الخطي
const areaData = [
  { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 }, { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 }, { name: 'Jun', sales: 2390 },
];

// بيانات الرسم البياني الدائري (جديد)
const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 300 },
  { name: 'Other', value: 200 },
];
const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between hover:shadow-md transition-all duration-300">
    <div>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
      <span className="text-xs font-bold text-green-500 flex items-center mt-2">
        <FaArrowUp className="mr-1" /> +12% growth
      </span>
    </div>
    <div className={`p-4 rounded-full ${color} bg-opacity-10 dark:bg-opacity-20`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
  </div>
);

const Dashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? "#334155" : "#f1f5f9";
  const textColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-slate-400 transition-colors">Welcome back! Here's what's happening properly today.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$54,230" icon={FaWallet} color="text-indigo-600 bg-indigo-100" />
        <StatCard title="Total Orders" value="1,250" icon={FaShoppingBag} color="text-emerald-600 bg-emerald-100" />
        <StatCard title="New Customers" value="340" icon={FaUserPlus} color="text-orange-600 bg-orange-100" />
        <StatCard title="Total Sales" value="$32,000" icon={FaWallet} color="text-blue-600 bg-blue-100" />
      </div>

      {/* Charts Section: Area Chart (Left) + Pie Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart - يأخذ ثلثين المساحة */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Revenue Analytics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" stroke={textColor} axisLine={false} tickLine={false} />
              <YAxis stroke={textColor} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '8px', color: isDark ? '#fff' : '#000' }} 
              />
              <Area type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - يأخذ ثلث المساحة */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', borderRadius: '8px', border: 'none' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Recent Orders (Left) + Top Products (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <RecentOrders />
        </div>
        <div>
            <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
