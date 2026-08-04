'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Search, Filter, Clock, CheckCircle2, Truck, Package, 
  XCircle, Eye, Download, User, MapPin, Phone, Mail, DollarSign, Calendar, 
  RefreshCw, ChevronRight, X, ArrowUpRight, ShieldCheck, Tag
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export interface OrderRequest {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    format: string;
  }[];
  totalAmount: number;
  paymentMethod: 'UPI' | 'Credit Card' | 'Net Banking' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: 'Pending Approval' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  orderDate: string;
  trackingNumber?: string;
  courierName?: string;
}

const INITIAL_ORDERS: OrderRequest[] = [
  {
    id: 'ord-1001',
    orderNumber: 'PC-ORD-2024-8801',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98765 43210',
    items: [
      { title: 'The Silent Echo', quantity: 2, price: 399, format: 'Paperback' },
      { title: 'Midnight Dreams', quantity: 1, price: 299, format: 'Hardcover' },
    ],
    totalAmount: 1097,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Pending Approval',
    shippingAddress: '42, MG Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    orderDate: '2024-03-04 14:22',
  },
  {
    id: 'ord-1002',
    orderNumber: 'PC-ORD-2024-8802',
    customerName: 'Priya Sundaram',
    email: 'priya.s@yahoo.com',
    phone: '+91 91234 56789',
    items: [
      { title: 'Startup Unlocked', quantity: 1, price: 499, format: 'eBook' },
    ],
    totalAmount: 499,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    shippingAddress: '108, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    orderDate: '2024-03-04 11:05',
    courierName: 'BlueDart Express',
    trackingNumber: 'BD-88992019',
  },
  {
    id: 'ord-1003',
    orderNumber: 'PC-ORD-2024-8803',
    customerName: 'Vikramaditya Roy',
    email: 'v.roy@outlook.com',
    phone: '+91 99887 76655',
    items: [
      { title: 'Shadows of Eldoria', quantity: 3, price: 449, format: 'Paperback' },
    ],
    totalAmount: 1347,
    paymentMethod: 'Net Banking',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    shippingAddress: '75, Park Street',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700016',
    orderDate: '2024-03-03 16:45',
    courierName: 'Delhivery',
    trackingNumber: 'DEL-441029',
  },
  {
    id: 'ord-1004',
    orderNumber: 'PC-ORD-2024-8804',
    customerName: 'Sneha Kulkarni',
    email: 'sneha.k@gmail.com',
    phone: '+91 97654 32109',
    items: [
      { title: 'The Silent Echo', quantity: 1, price: 399, format: 'Paperback' },
    ],
    totalAmount: 399,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    shippingAddress: '12/B, FC Road, Shivaji Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411005',
    orderDate: '2024-03-01 09:12',
    courierName: 'India Post SpeedPost',
    trackingNumber: 'IP-9901238',
  },
];

export default function OrderRequestsClient() {
  const [orders, setOrders] = useState<OrderRequest[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [courierInput, setCourierInput] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (newStatus: OrderRequest['orderStatus']) => {
    if (!selectedOrder) return;

    setOrders(prev => prev.map(o => {
      if (o.id === selectedOrder.id) {
        return {
          ...o,
          orderStatus: newStatus,
          trackingNumber: trackingNumberInput || o.trackingNumber,
          courierName: courierInput || o.courierName,
        };
      }
      return o;
    }));

    setSelectedOrder(prev => prev ? {
      ...prev,
      orderStatus: newStatus,
      trackingNumber: trackingNumberInput || prev.trackingNumber,
      courierName: courierInput || prev.courierName,
    } : null);

    toast.success(`Order ${selectedOrder.orderNumber} status updated to "${newStatus}"!`);
  };

  const handleExportCSV = () => {
    toast.success('Downloading Order Requests CSV report...');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#8B1A1A] via-[#A02020] to-[#1A1A2E] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-sm">
              Live Fulfillment Center
            </span>
            <span className="flex items-center text-amber-300 text-xs font-semibold gap-1.5 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Real-Time Order Stream
            </span>
          </div>
          <h1 className="text-3xl font-playfair font-bold text-white">Receive Order Requests Desk</h1>
          <p className="text-rose-100 text-sm mt-1 max-w-2xl">
            View, process, approve, and track incoming customer book purchases and author fulfillment requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20 text-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-3xl font-bold text-[#1A1A2E] font-playfair mt-1">{orders.length}</h3>
          </div>
          <div className="p-3 bg-red-50 text-[#8B1A1A] rounded-xl"><ShoppingCart className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Requests</p>
            <h3 className="text-3xl font-bold text-amber-500 font-playfair mt-1">
              {orders.filter(o => o.orderStatus === 'Pending Approval').length}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><Clock className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Shipped / Dispatched</p>
            <h3 className="text-3xl font-bold text-blue-600 font-playfair mt-1">
              {orders.filter(o => o.orderStatus === 'Shipped').length}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Truck className="w-6 h-6" /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Delivered Success</p>
            <h3 className="text-3xl font-bold text-green-600 font-playfair mt-1">
              {orders.filter(o => o.orderStatus === 'Delivered').length}
            </h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Order #, Customer Name, Phone, Email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase mr-1">Status:</span>
          {['All', 'Pending Approval', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#8B1A1A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Requests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Order Request</th>
                <th className="py-4 px-6">Customer & Contact</th>
                <th className="py-4 px-6">Items Summary</th>
                <th className="py-4 px-6">Amount / Payment</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-mono font-bold text-[#8B1A1A] text-base">{order.orderNumber}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {order.orderDate}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-bold text-[#1A1A2E]">{order.customerName}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3 h-3 text-gray-400" />
                      {order.email}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {order.phone}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-medium text-[#1A1A2E]">
                      {order.items.map(i => `${i.title} (${i.quantity}x)`).join(', ')}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {order.items.reduce((acc, curr) => acc + curr.quantity, 0)} total books
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="font-bold text-[#1A1A2E] text-base">₹{order.totalAmount}</div>
                    <span className="inline-block mt-0.5 text-[11px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded">
                      {order.paymentMethod} • {order.paymentStatus}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === 'Pending Approval'
                          ? 'bg-amber-100 text-amber-800'
                          : order.orderStatus === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-purple-100 text-purple-800'
                          : order.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setTrackingNumberInput(order.trackingNumber || '');
                        setCourierInput(order.courierName || '');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-semibold text-xs rounded-xl shadow transition-all active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View & Fulfill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Fulfillment Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#1A1A2E] text-white">
                <div>
                  <h3 className="font-playfair text-xl font-bold">Fulfill Order: {selectedOrder.orderNumber}</h3>
                  <p className="text-xs text-gray-300">Placed on {selectedOrder.orderDate}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Info</h4>
                    <p className="font-bold text-[#1A1A2E] text-base">{selectedOrder.customerName}</p>
                    <p className="text-gray-600 text-xs mt-1">{selectedOrder.email}</p>
                    <p className="text-gray-600 text-xs">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shipping Address</h4>
                    <p className="text-gray-700 text-xs font-medium">{selectedOrder.shippingAddress}</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {selectedOrder.city}, {selectedOrder.state} — {selectedOrder.pincode}
                    </p>
                  </div>
                </div>

                {/* Items Purchased */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Order Items</h4>
                  <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-white flex justify-between items-center">
                        <div>
                          <p className="font-bold text-[#1A1A2E]">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.format} • Quantity: {item.quantity}</p>
                        </div>
                        <div className="font-bold text-[#8B1A1A]">₹{item.price * item.quantity}</div>
                      </div>
                    ))}
                    <div className="p-3.5 bg-gray-50 flex justify-between items-center font-bold text-base">
                      <span>Total Paid Amount:</span>
                      <span className="text-[#8B1A1A]">₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping & Tracking Status Form */}
                <div className="space-y-4 border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dispatch & Tracking Info</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600">Courier Partner</label>
                      <input
                        type="text"
                        placeholder="e.g. BlueDart / Delhivery / SpeedPost"
                        value={courierInput}
                        onChange={e => setCourierInput(e.target.value)}
                        className="w-full px-3.5 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600">Tracking AWB Number</label>
                      <input
                        type="text"
                        placeholder="e.g. BD-9901238"
                        value={trackingNumberInput}
                        onChange={e => setTrackingNumberInput(e.target.value)}
                        className="w-full px-3.5 py-2 mt-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-gray-600 block">Change Status:</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleUpdateStatus('Processing')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow hover:bg-blue-700"
                      >
                        Approve & Start Processing
                      </button>
                      <button
                        onClick={() => handleUpdateStatus('Shipped')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold shadow hover:bg-purple-700"
                      >
                        Mark Shipped / Dispatched
                      </button>
                      <button
                        onClick={() => handleUpdateStatus('Delivered')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-bold shadow hover:bg-green-700"
                      >
                        Mark Delivered
                      </button>
                      <button
                        onClick={() => handleUpdateStatus('Cancelled')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-300"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
