import React from 'react';

const recentOrderData = [
  {
    id: '1',
    product_id: '4324',
    customer_id: '23143',
    customer_name: 'Shirley A. Lape',
    order_date: '2022-05-17T03:24:00',
    order_total: '$435.50',
    current_order_status: 'PLACED',
    shipment_address: 'Cottage Grove, OR 97424'
  },
  {
    id: '7',
    product_id: '7453',
    customer_id: '96453',
    customer_name: 'Ryan Carroll',
    order_date: '2022-05-14T05:24:00',
    order_total: '$96.35',
    current_order_status: 'CONFIRMED',
    shipment_address: 'Los Angeles, CA 90017'
  },
  {
    id: '2',
    product_id: '5434',
    customer_id: '65345',
    customer_name: 'Mason Nash',
    order_date: '2022-05-17T07:14:00',
    order_total: '$836.44',
    current_order_status: 'SHIPPED',
    shipment_address: 'Westminster, CA 92683'
  },
  {
    id: '3',
    product_id: '9854',
    customer_id: '87832',
    customer_name: 'Luke Parkin',
    order_date: '2022-05-16T12:40:00',
    order_total: '$334.50',
    current_order_status: 'SHIPPED',
    shipment_address: 'San Mateo, CA 94403'
  },
  {
    id: '4',
    product_id: '8763',
    customer_id: '09832',
    customer_name: 'Anthony Fry',
    order_date: '2022-05-14T03:24:00',
    order_total: '$876.00',
    current_order_status: 'OUT_FOR_DELIVERY',
    shipment_address: 'San Mateo, CA 94403'
  },
  {
    id: '5',
    product_id: '5627',
    customer_id: '97632',
    customer_name: 'Ryan Carroll',
    order_date: '2022-05-14T05:24:00',
    order_total: '$96.35',
    current_order_status: 'DELIVERED',
    shipment_address: 'Los Angeles, CA 90017'
  }
];

// دالة لتحديد لون الحالة
const getStatusColor = (status) => {
    switch (status) {
        case 'PLACED': return 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400';
        case 'CONFIRMED': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
        case 'SHIPPED': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
        case 'OUT_FOR_DELIVERY': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'DELIVERED': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
        default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
};

const RecentOrders = () => {
    return (
        <div className="bg-white dark:bg-slate-800 px-4 pt-3 pb-4 rounded-xl border border-gray-200 dark:border-slate-700 flex-1 w-full mt-6 shadow-sm">
            <strong className="text-gray-700 dark:text-white font-bold text-lg">Recent Orders</strong>
            <div className="border-x border-gray-200 dark:border-slate-700 rounded-sm mt-3 overflow-x-auto">
                <table className="w-full text-gray-700 dark:text-gray-300">
                    <thead className="bg-gray-100 dark:bg-slate-700 font-bold text-sm border-b border-gray-200 dark:border-slate-600">
                        <tr>
                            <td className="p-3">ID</td>
                            <td className="p-3">Product ID</td>
                            <td className="p-3">Customer Name</td>
                            <td className="p-3">Order Date</td>
                            <td className="p-3">Total</td>
                            <td className="p-3">Shipping Address</td>
                            <td className="p-3">Order Status</td>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                        {recentOrderData.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                <td className="p-3">#{order.id}</td>
                                <td className="p-3">
                                    <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer">#{order.product_id}</span>
                                </td>
                                <td className="p-3">
                                    <span className="font-medium text-gray-900 dark:text-white">{order.customer_name}</span>
                                </td>
                                <td className="p-3">{new Date(order.order_date).toLocaleDateString()}</td>
                                <td className="p-3 font-medium">{order.order_total}</td>
                                <td className="p-3 text-gray-500 dark:text-gray-400">{order.shipment_address}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(order.current_order_status)}`}>
                                        {order.current_order_status.replace(/_/g, ' ')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;
