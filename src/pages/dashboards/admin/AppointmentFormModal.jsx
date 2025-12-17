import React, { useState, useEffect } from 'react';
import { X, User, Clock, Calendar, Stethoscope, FileText, Info } from 'lucide-react';

const AppointmentFormModal = ({ isOpen, onClose, onSubmit, appointmentData, doctors }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '09:00',
    patient: '',
    doctor: '',
    status: 'Pending',
    notes: '',
  });

  useEffect(() => {
    if (appointmentData) {
      setFormData(appointmentData);
    } else {
      setFormData({
        date: '',
        time: '09:00',
        patient: '',
        doctor: doctors[0]?.name || '', // Default to first doctor
        status: 'Pending',
        notes: '',
      });
    }
  }, [appointmentData, doctors, isOpen]); // Reset when modal opens/closes

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
    if (!formData.date || !formData.time || !formData.patient || !formData.doctor) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
  };

  const isEditMode = !!appointmentData?.id;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Appointment' : 'Schedule New Appointment'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Fill in the details below to manage the schedule.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="grid grid-cols-2 gap-4">
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

            {/* Time */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <Clock className="w-4 h-4 mr-2 text-[#13c5dd]" /> Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
              />
            </div>
          </div>
          
          {/* Patient Name - CHANGED TO MANUAL INPUT */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <User className="w-4 h-4 mr-2 text-[#13c5dd]" /> Patient Name
            </label>
            <input
              type="text"
              name="patient"
              placeholder="Enter patient's full name"
              value={formData.patient}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Doctor Select */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <Stethoscope className="w-4 h-4 mr-2 text-[#13c5dd]" /> Doctor
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm appearance-none cursor-pointer"
              >
                {doctors.map(d => (
                  <option key={d.id || d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Status Select */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <Info className="w-4 h-4 mr-2 text-[#13c5dd]" /> Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm appearance-none cursor-pointer"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <FileText className="w-4 h-4 mr-2 text-[#13c5dd]" /> Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any specific instructions or symptoms..."
              rows="3"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm resize-none"
            />
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
              {isEditMode ? 'Save Changes' : 'Schedule Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormModal;