import React, { useState, useMemo } from 'react';
import { CreditCard, Search, Plus, Edit, Trash2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // FIXED IMPORT
import PaymentFormModal from './PaymentFormModal';

const initialPayments = [
  { id: 1003, date: '2025-12-13', patient: 'Bob Williams', amount: 75.00, method: 'Cash', status: 'Paid' },
  { id: 1004, date: '2025-12-12', patient: 'Clark Kent', amount: 50.00, method: 'Debit Card', status: 'Refunded' },
];

const ManagePayments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  // --- CRUD Handlers ---
  const handleOpenAddModal = () => {
    setCurrentPayment(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (payment) => {
    setCurrentPayment(payment);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (currentPayment) {
      setPayments(payments.map(p => p.id === currentPayment.id ? { ...formData, id: p.id } : p));
    } else {
      const newId = payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1001;
      setPayments([...payments, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction record?")) {
      setPayments(payments.filter(p => p.id !== id));
    }
  };

  const filteredPayments = payments.filter(p =>
    p.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CreditCard className="text-[#13c5dd]" /> Payments
        </h2>
        <button 
          onClick={handleOpenAddModal}
          className="bg-[#13c5dd] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#11abbf] transition-colors"
        >
          <Plus size={20} /> Record New Payment
        </button>
      </div>

      {/* Search bar can go here */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPayments.map((pay) => (
              <tr key={pay.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-400">#{pay.id}</td>
                <td className="px-6 py-4 font-semibold">{pay.patient}</td>
                <td className="px-6 py-4 text-gray-600">{pay.date}</td>
                <td className="px-6 py-4 font-bold text-gray-900">${parseFloat(pay.amount).toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-600">{pay.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    pay.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {pay.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600"><FileText size={18} /></button>
                    <button onClick={() => handleOpenEditModal(pay)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(pay.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL CALL */}
      <AnimatePresence>
        {isModalOpen && (
          <PaymentFormModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            paymentData={currentPayment}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePayments;