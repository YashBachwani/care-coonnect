// src/pages/dashboards/Admin/PatientFormModal.jsx

import React, { useState, useEffect } from 'react';
import { X, User, Phone, Calendar, Info } from 'lucide-react';

const PatientFormModal = ({ isOpen, onClose, onSubmit, patientData }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    lastVisit: '',
    status: 'Active',
  });

  useEffect(() => {
    if (patientData) {
      setFormData(patientData);
    } else {
      setFormData({
        name: '',
        phone: '',
        lastVisit: '',
        status: 'Active',
      });
    }
  }, [patientData, isOpen]);

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
    if (!formData.name || !formData.phone) {
      alert("Name and Phone are required.");
      return;
    }
    onSubmit(formData);
  };

  const isEditMode = !!patientData?.id;

  return (
    // Backdrop with Blur
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
        
        {/* Header - Styled with soft background */}
        <div className="flex justify-between items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Patient Record' : 'Add New Patient'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Update or create personal details for the patient.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Patient Name Input */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <User className="w-4 h-4 mr-2 text-[#13c5dd]" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter patient's full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <Phone className="w-4 h-4 mr-2 text-[#13c5dd]" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 555-0123"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
            />
          </div>
          
          {/* Two Column Grid for Date and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <Calendar className="w-4 h-4 mr-2 text-[#13c5dd]" /> Last Visit
              </label>
              <input
                type="date"
                name="lastVisit"
                value={formData.lastVisit}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <Info className="w-4 h-4 mr-2 text-[#13c5dd]" /> Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {/* Custom arrow for select if desired, or keep default */}
              </div>
            </div>
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
              {isEditMode ? 'Save Changes' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientFormModal;