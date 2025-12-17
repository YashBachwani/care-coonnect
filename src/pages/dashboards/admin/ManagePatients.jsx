import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import PatientFormModal from './PatientFormModal'; // IMPORT THE NEW MODAL

// Dummy Data
const initialPatients = [
  { id: 2, name: 'Bob Williams', phone: '555-0102', lastVisit: '2025-12-01', status: 'Inactive' },
  { id: 3, name: 'Charlie Brown', phone: '555-0103', lastVisit: '2025-12-10', status: 'Active' },
  { id: 4, name: 'Diana Prince', phone: '555-0104', lastVisit: '2025-10-20', status: 'Active' },
];

const ManagePatients = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null); // Holds data for patient being edited (UPDATE)

  // --- R E A D ---
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.phone.includes(searchTerm)
  );

  // --- D E L E T E ---
  const handleDeletePatient = (id) => {
    if (window.confirm(`Are you sure you want to delete patient ID: ${id}?`)) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  // --- C R E A T E / U P D A T E Handlers ---
  const openAddModal = () => {
    setCurrentPatient(null); // Clear any previous edit data
    setIsModalOpen(true);
  };

  const openEditModal = (patient) => {
    setCurrentPatient(patient); // Set patient data for editing
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (currentPatient) {
      // ** UPDATE **
      setPatients(patients.map(p => 
        p.id === currentPatient.id ? { ...formData, id: currentPatient.id } : p
      ));
    } else {
      // ** CREATE **
      const newId = Math.max(...patients.map(p => p.id), 0) + 1;
      const newPatient = { ...formData, id: newId };
      setPatients([...patients, newPatient]);
    }
    
    setIsModalOpen(false); // Close modal after submission
  };

  const PatientStatusBadge = ({ status }) => (
    <span 
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        status === 'Active' 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:ring-1 focus:ring-[#13c5dd] transition-colors"
          />
        </div>
        
        {/* Add New Patient Button */}
        <motion.button
          onClick={openAddModal} // Calls the new openAddModal function
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center bg-[#13c5dd] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#10a8c0] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Patient
        </motion.button>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {/* Table Headers (Unchanged) */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LAST VISIT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <motion.tr 
                  key={patient.id} 
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm"><PatientStatusBadge status={patient.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(patient)} // Calls the new openEditModal function
                      className="text-blue-500 hover:text-blue-700 p-1.5 rounded-md transition-colors"
                      title="Edit Patient"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-md transition-colors"
                      title="Delete Patient"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No patients found. Click "Add New Patient" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Patient Form Modal for CREATE and UPDATE */}
      <PatientFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        patientData={currentPatient} // Pass the patient data for editing
      />
    </div>
  );
};

export default ManagePatients;