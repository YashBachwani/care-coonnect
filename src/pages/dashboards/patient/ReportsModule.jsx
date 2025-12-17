import React, { useState } from 'react';
import { FileText, Download, Eye, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const ReportsModule = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    { 
      id: 1, 
      name: 'Blood Test Report', 
      date: 'Oct 20, 2025', 
      doctor: 'Dr. Sarah Smith',
      details: {
        type: 'Complete Blood Count (CBC)',
        result: 'Normal',
        notes: 'Hemoglobin levels are stable. White blood cell count is within healthy range.'
      }
    },
    { 
      id: 2, 
      name: 'X-Ray (Molar)', 
      date: 'Sep 15, 2025', 
      doctor: 'Dr. John Doe',
      details: {
        type: 'Dental Radiograph',
        result: 'Cavity Detected',
        notes: 'Deep decay visible in lower left molar (#19). Root canal recommended.'
      }
    },
  ];

  // --- DOWNLOAD HANDLER ---
  const handleDownload = (report) => {
    const content = `
    LAB REPORT - CARE CONNECT
    -------------------------
    Report Name: ${report.name}
    Date: ${report.date}
    Prescribed By: ${report.doctor}
    
    DETAILS:
    Type: ${report.details.type}
    Result: ${report.details.result}
    
    NOTES:
    ${report.details.notes}
    
    -------------------------
    This is a computer-generated report.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Report downloaded successfully");
  };

  return (
    <div className="space-y-6 relative">
      <h2 className="text-2xl font-bold text-gray-900">Lab Reports</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-500">Report Name</th>
              <th className="p-4 font-medium text-gray-500 hidden md:table-cell">Date</th>
              <th className="p-4 font-medium text-gray-500 hidden md:table-cell">Prescribed By</th>
              <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#13c5dd]/10 flex items-center justify-center text-[#13c5dd]">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p>{report.name}</p>
                      {/* Mobile Only Details */}
                      <p className="md:hidden text-xs text-gray-400">{report.date}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 hidden md:table-cell">{report.date}</td>
                <td className="p-4 text-gray-600 hidden md:table-cell">{report.doctor}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setSelectedReport(report)}
                    className="p-2 text-gray-400 hover:text-[#13c5dd] hover:bg-[#13c5dd]/10 rounded-lg transition-colors tooltip mx-1"
                    title="View Report"
                  >
                    <Eye size={18}/>
                  </button>
                  <button 
                    onClick={() => handleDownload(report)}
                    className="p-2 text-gray-400 hover:text-[#13c5dd] hover:bg-[#13c5dd]/10 rounded-lg transition-colors tooltip"
                    title="Download Report"
                  >
                    <Download size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- VIEW REPORT MODAL --- */}
      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto"
              >
                <div className="bg-gray-900 text-white p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Activity className="text-[#13c5dd]" size={20} />
                      Medical Report Details
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{selectedReport.name}</p>
                  </div>
                  <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                      <p className="font-medium text-gray-900">{selectedReport.date}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase font-bold">Doctor</p>
                      <p className="font-medium text-gray-900">{selectedReport.doctor}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Test Type</p>
                      <p className="text-gray-600 text-sm">{selectedReport.details.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Result</p>
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                        {selectedReport.details.result}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Clinical Notes</p>
                      <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                        {selectedReport.details.notes}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDownload(selectedReport)}
                    className="w-full bg-[#13c5dd] hover:bg-[#0fb3ca] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download Full Report
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportsModule;