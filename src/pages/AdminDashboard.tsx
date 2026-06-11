import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Calendar, Search, Filter } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Leads', value: '1,284', icon: <Users className="text-blue-500" />, change: '+12%' },
    { label: 'New Inquiries', value: '48', icon: <MessageSquare className="text-green-500" />, change: '+5%' },
    { label: 'Conversions', value: '156', icon: <TrendingUp className="text-red-500" />, change: '+18%' },
    { label: 'Trial Bookings', value: '24', icon: <Calendar className="text-purple-500" />, change: '+2%' },
  ];

  const leads = [
    { id: 1, name: 'Amit Sharma', phone: '+91 98200 12345', goal: 'Weight Loss', status: 'New', date: '2026-05-20' },
    { id: 2, name: 'Priya Patel', phone: '+91 98111 54321', goal: 'Muscle Gain', status: 'Contacted', date: '2026-05-19' },
    { id: 3, name: 'Rohan Mehra', phone: '+91 99300 98765', goal: 'Strength', status: 'Converted', date: '2026-05-18' },
    { id: 4, name: 'Sneha Gupta', phone: '+91 97654 32100', goal: 'General Fitness', status: 'New', date: '2026-05-18' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-serif">ADMIN DASHBOARD</h1>
            <p className="text-gray-400">Manage your gym leads and performance.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-all">
              <Search size={18} /> Search
            </button>
            <button className="bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-all">
              EXPORT DATA
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl">{stat.icon}</div>
                <span className="text-green-500 text-sm font-bold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Inquiries</h2>
            <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
              <Filter size={16} /> Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Goal</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-gray-400">{lead.phone}</td>
                    <td className="px-6 py-4">
                      <span className="bg-white/5 px-3 py-1 rounded-full text-xs">{lead.goal}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        lead.status === 'New' ? 'bg-blue-500/20 text-blue-500' :
                        lead.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{lead.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-red-500 hover:underline text-sm font-bold">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-white/10 text-center">
            <button className="text-gray-400 hover:text-white text-sm">View All Leads</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;