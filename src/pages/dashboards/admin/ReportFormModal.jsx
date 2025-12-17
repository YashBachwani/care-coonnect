// src/pages/dashboards/Admin/ReportFormModal.jsx

import React, { useState, useEffect } from 'react';
import { X, User, Stethoscope, Calendar, FileText, Activity, Paperclip } from 'lucide-react';

const ReportFormModal = ({ isOpen, onClose, onSubmit, reportData }) => {
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Prescription',
    details: '',
    file: '',
  });

  useEffect(() => {
    if (reportData) {
      setFormData(reportData);
    } else {
      setFormData({
        patient: '',
        doctor: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Prescription',
        details: '',
        file: '',
      });
    }
  }, [reportData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patient || !formData.details) {
      alert("Please fill in patient name and report details.");
      return;
    }
    onSubmit(formData);
  };

  const isEditMode = !!reportData?.id;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Medical Report' : 'Create New Medical Report'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Record clinical findings, prescriptions, and attachments.</p>
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
              placeholder="Enter patient's full name"
              value={formData.patient}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Doctor */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                <Stethoscope className="w-4 h-4 mr-2 text-[#13c5dd]" /> Doctor
              </label>
              <input
                type="text"
                name="doctor"
                placeholder="Attending Doctor"
                value={formData.doctor}
                onChange={handleChange}
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

          {/* Report Type */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <Activity className="w-4 h-4 mr-2 text-[#13c5dd]" /> Report Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="Prescription">Prescription</option>
              <option value="X-Ray">X-Ray / Scan</option>
              <option value="Lab Report">Lab Report</option>
              <option value="Consultation Note">Consultation Note</option>
            </select>
          </div>

          {/* Details / Diagnosis */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <FileText className="w-4 h-4 mr-2 text-[#13c5dd]" /> Details / Diagnosis
            </label>
            <textarea
              name="details"
              rows="3"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter clinical findings, dosage, or diagnostic notes..."
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm resize-none"
            />
          </div>

          {/* Attachment Link */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
              <Paperclip className="w-4 h-4 mr-2 text-[#13c5dd]" /> Attachment Name
            </label>
            <input
              type="text"
              name="file"
              value={formData.file}
              onChange={handleChange}
              placeholder="e.g. molar_xray_scan.pdf"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 focus:border-[#13c5dd] transition-all outline-none text-sm"
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
              {isEditMode ? 'Update Report' : 'Save Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportFormModal;