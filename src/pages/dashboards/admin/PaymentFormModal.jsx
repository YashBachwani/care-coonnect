// src/pages/dashboards/Admin/PaymentFormModal.jsx

import React, { useState, useEffect } from 'react';
import { X, User, DollarSign, Calendar, CreditCard, Info } from 'lucide-react';

const PaymentFormModal = ({ isOpen, onClose, onSubmit, paymentData }) => {
  const [formData, setFormData] = useState({
    patient: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'Credit Card',
    status: 'Paid',
  });

  useEffect(() => {
    if (paymentData) {
      setFormData(paymentData);
    } else {
      setFormData({
        patient: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        method: 'Credit Card',
        status: 'Paid',
      });
    }
  }, [paymentData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patient || !formData.amount || !formData.date) {
      alert("Patient Name, Amount, and Date are required.");
      return;
    }
    onSubmit(formData);
  };

  const isEditMode = !!paymentData?.id;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Payment Record' : 'Record New Payment'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Manage billing and transaction history for patients.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Patient Name */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <User className="w-4 h-4 mr-2 text-[#13c5dd]" /> Patient Name
            </label>
            <input
              type="text"
              name="patient"
              placeholder="Enter patient full name"
              value={formData.patient}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <DollarSign className="w-4 h-4 mr-2 text-[#13c5dd]" /> Amount
              </label>
              <input
                type="number"
                name="amount"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
              />
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <Calendar className="w-4 h-4 mr-2 text-[#13c5dd]" /> Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
              />
            </div>
          </div>
          
          {/* Payment Method */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <CreditCard className="w-4 h-4 mr-2 text-[#13c5dd]" /> Payment Method
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
              <option value="Insurance">Insurance</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <Info className="w-4 h-4 mr-2 text-[#13c5dd]" /> Payment Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#13c5dd] rounded-xl hover:bg-[#10a8c0] transition-all shadow-lg shadow-cyan-100 hover:shadow-cyan-200"
            >
              {isEditMode ? 'Save Changes' : 'Record Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentFormModal;