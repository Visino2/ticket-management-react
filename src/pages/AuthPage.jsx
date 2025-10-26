import React, { useState } from 'react';
import Toast from '../components/Toast';

const AuthPage = ({ mode, onNavigate, onAuth }) => {
    const [formData, setFormData] = useState({ email: '', password: '', name: ''});
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(null);

    const validate = () => {
        const newErrors ={};
        if (!formData.email) newErrors.email = 'Email is required';
        else if(!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 charaters';
        if (mode === 'signup' && !formData.name) newErrors.name = 'Name is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const token = 'mock_token_' + Date.now();
        localStorage.setItem('ticketapp_session', token);
        localStorage.setItem('ticket_user', JSON.stringify({ email: formData.email, name: formData.name || 'User'}));
        setToast({ message: mode === 'login' ? 'Login successful!' : 'Account created', types: 'success'});
        setTimeout(() => onAuth(), 1000);
    };

    return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-600 mt-2">to continue to TicketFlow</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => onNavigate(mode === 'login' ? 'signup' : 'login')} className="text-indigo-600 font-semibold">
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
    );
};
  export default AuthPage;