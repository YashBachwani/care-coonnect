// src/pages/admin/ManageDoctors.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import DoctorFormModal from './DoctorFormModal'; // IMPORT NEW MODAL

// Dummy Data
const initialDoctors = [
  { id: 101, name: 'Dr. Emily Carter', specialty: 'Orthodontics', phone: '555-0201', status: 'Active' },
  { id: 102, name: 'Dr. Alex Smith', specialty: 'Oral Surgery', phone: '555-0202', status: 'Active' },
  { id: 103, name: 'Dr. Jane Doe', specialty: 'General Dentistry', phone: '555-0203', status: 'On Leave' },
];

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // Filter (Read)
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete
  const handleDeleteDoctor = (id) => {
    if (window.confirm(`Are you sure you want to delete Doctor ID: ${id}?`)) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  // Create/Update Handlers
  const openAddModal = () => {
    setCurrentDoctor(null);
    setIsModalOpen(true);
  };

  const openEditModal = (doctor) => {
    setCurrentDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (currentDoctor) {
      // Update
      setDoctors(doctors.map(d => 
        d.id === currentDoctor.id ? { ...formData, id: currentDoctor.id } : d
      ));
    } else {
      // Create
      const newId = Math.max(...doctors.map(d => d.id), 0) + 1;
      const newDoctor = { ...formData, id: newId };
      setDoctors([...doctors, newDoctor]);
    }
    
    setIsModalOpen(false);
  };

  const DoctorStatusBadge = ({ status }) => (
    <span 
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        status === 'Active' 
          ? 'bg-green-100 text-green-700' 
          : status === 'On Leave' 
            ? 'bg-yellow-100 text-yellow-700' 
            : 'bg-red-100 text-red-700'
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:ring-1 focus:ring-[#13c5dd] transition-colors"
          />
        </div>
        
        <motion.button
          onClick={openAddModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center bg-[#13c5dd] text-white px-5 py-2.5 rounded-lg font-medium shadow-md hover:bg-[#10a8c0] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Doctor
        </motion.button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100 mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPECIALTY</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredDoctors.map((doctor) => (
              <motion.tr key={doctor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doctor.specialty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{doctor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"><DoctorStatusBadge status={doctor.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(doctor)}
                    className="text-blue-500 hover:text-blue-700 p-1.5 rounded-md transition-colors"
                    title="Edit Doctor"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-md transition-colors"
                    title="Delete Doctor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <DoctorFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        doctorData={currentDoctor}
      />
    </div>
  );
};

export default ManageDoctors;