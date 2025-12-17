import React, { useState, useMemo } from 'react';
import { FileText, Search, Plus, Edit, Trash2, Image as ImageIcon, ClipboardList, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReportFormModal from './ReportFormModal';

const initialReports = [
  { id: 1, patient: 'Charlie Brown', doctor: 'Dr. Carter', date: '2025-12-10', type: 'X-Ray', details: 'Lower jaw alignment check', file: 'xray_01.jpg' },
  { id: 2, patient: 'Diana Prince', doctor: 'Dr. Smith', date: '2025-12-12', type: 'Prescription', details: 'Amoxicillin 500mg - 3 times a day', file: null },
];

const SystemReports = () => {
  const [reports, setReports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);

  // --- CRUD Handlers ---
  const handleOpenAddModal = () => {
    setCurrentReport(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (report) => {
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (currentReport) {
      setReports(reports.map(r => r.id === currentReport.id ? { ...formData, id: r.id } : r));
    } else {
      const newId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;
      setReports([...reports, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this medical report?")) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  const filteredReports = reports.filter(r =>
    r.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ClipboardList className="text-[#13c5dd]" /> Patient Medical Reports
          </h2>
          <p className="text-sm text-gray-500">Manage prescriptions, X-rays, and clinical notes</p>
        </div>
        
        <button 
          onClick={handleOpenAddModal}
          className="bg-[#13c5dd] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#11abbf] transition-all shadow-lg shadow-cyan-100"
        >
          <Plus size={20} /> New Report
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search by patient or report type..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#13c5dd]/20 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <motion.div 
            layout
            key={report.id}
            className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${report.type === 'X-Ray' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                {report.type === 'X-Ray' ? <ImageIcon size={24} /> : <FileText size={24} />}
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleOpenEditModal(report)} className="p-2 text-gray-400 hover:text-blue-500"><Edit size={16} /></button>
                <button onClick={() => handleDelete(report.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 text-lg">{report.patient}</h3>
            <p className="text-xs text-[#13c5dd] font-semibold mb-3">{report.type} • {report.date}</p>
            
            <div className="space-y-2 mb-4">
               <p className="text-sm text-gray-600 line-clamp-2 italic">"{report.details}"</p>
               <div className="flex items-center text-xs text-gray-400">
                  <User size={12} className="mr-1" /> Requested by {report.doctor}
               </div>
            </div>

            {report.file && (
              <div className="mt-4 p-2 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center text-xs text-gray-500">
                📎 {report.file} (Attachment Attached)
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ReportFormModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            reportData={currentReport}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemReports;