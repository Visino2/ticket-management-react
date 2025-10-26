import React, { useState, useEffect } from 'react';
import { LogOut, CheckCircle, Clock, XCircle } from 'lucide-react';

const Dashboard = ({ onNavigate, onLogout }) => {
    const [tickets, setTickets] =useState([]);
    const user = JSON.parse(localStorage.getItem('ticketapp_user') || '{}');

    useEffect(() => { 
        const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
        setTickets(storedTickets);
    }, []);

    const stats ={
        total:tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inprogress:tickets.filter(t => t.status === 'in_progress').length,
        closed:tickets.filter(t => t.status === 'closed').length

    };

     return (
          <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">TicketFlow</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Hello, {user.name}</span>
            <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h2>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tickets', count: stats.total, color: 'blue', icon: <CheckCircle className="text-blue-600" /> },
            { label: 'Open', count: stats.open, color: 'green', icon: <CheckCircle className="text-green-600" /> },
            { label: 'In Progress', count: stats.inProgress, color: 'amber', icon: <Clock className="text-amber-600" /> },
            { label: 'Closed', count: stats.closed, color: 'gray', icon: <XCircle className="text-gray-600" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.count}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => onNavigate('tickets')} className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
          Manage Tickets
        </button>
      </main>
    </div>
     );
};
export default Dashboard;