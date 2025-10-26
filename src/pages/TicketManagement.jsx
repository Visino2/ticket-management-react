import React, { useState, useEffect } from "react";
import { LogOut, Plus, Edit2, Trash2 } from "lucide-react";
import Toast from "../components/Toast"; 

const TicketManagement = ({ onNavigate, onLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

                      // Load tickets from localStorage
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    setTickets(storedTickets);
  }, []);
   
                    // Save tickets to localStorage
  const saveTickets = (newTickets) => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(newTickets));
    setTickets(newTickets);
  };

                     // Validate ticket form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!["open", "in_progress", "closed"].includes(formData.status)) {
      newErrors.status = "Status must be open, in_progress, or closed";
    }
    return newErrors;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingTicket) {
      const updated = tickets.map((t) =>
        t.id === editingTicket.id ? { ...formData, id: t.id } : t
      );
      saveTickets(updated);
      setToast({ message: "Ticket updated successfully!", type: "success" });
    } else {
      const newTicket = { ...formData, id: Date.now() };
      saveTickets([...tickets, newTicket]);
      setToast({ message: "Ticket created successfully!", type: "success" });
    }

    setShowModal(false);
    setEditingTicket(null);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({});
  };

                    // Handle delete ticket
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id);
      saveTickets(updated);
      setToast({ message: "Ticket deleted successfully!", type: "success" });
    }
  };

                     // Open edit modal
  const openEditModal = (ticket) => {
    setEditingTicket(ticket);
    setFormData(ticket);
    setShowModal(true);
  };

                // Ticket status color classes
  const statusColors = {
    open: "bg-green-100 text-green-800",
    in_progress: "bg-amber-100 text-amber-800",
    closed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

                           {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">TicketFlow</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("dashboard")}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Dashboard
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </header>

                           {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Ticket Management</h2>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingTicket(null);
              setFormData({
                title: "",
                description: "",
                status: "open",
                priority: "medium",
              });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus size={20} /> New Ticket
          </button>
        </div>

                        {/* Tickets List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {ticket.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}
                >
                  {ticket.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {ticket.description || "No description"}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(ticket)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

                        {/* Empty State */}
        {tickets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No tickets yet. Create your first ticket!
            </p>
          </div>
        )}
      </main>

                          {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">
              {editingTicket ? "Edit Ticket" : "New Ticket"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

                                {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />
              </div>

                                 {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
              </div>

                                     {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

                                        {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  {editingTicket ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTicket(null);
                    setErrors({});
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;
