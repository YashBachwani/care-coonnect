import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Trash2, Edit, X, 
  Pill, Clock, Printer, User, Calendar 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// --- SUB-COMPONENT: PRESCRIPTION MODAL ---
const PrescriptionModal = ({ isOpen, onClose, data, isEditing, onSubmit }) => {
  const initialData = data || { 
    patientName: '', age: '', date: new Date().toISOString().split('T')[0], 
    notes: '', 
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }] 
  };
  const [formData, setFormData] = useState(initialData);

  React.useEffect(() => { 
    setFormData(data ? { ...data } : initialData); 
  }, [data, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Medicine Array Handlers
  const handleMedicineChange = (index, field, value) => {
    const updatedMeds = [...formData.medicines];
    updatedMeds[index][field] = value;
    setFormData({ ...formData, medicines: updatedMeds });
  };

  const addMedicineRow = () => {
    setFormData({ 
      ...formData, 
      medicines: [...formData.medicines, { name: '', dosage: '', frequency: '', duration: '' }] 
    });
  };

  const removeMedicineRow = (index) => {
    if (formData.medicines.length > 1) {
      const updatedMeds = formData.medicines.filter((_, i) => i !== index);
      setFormData({ ...formData, medicines: updatedMeds });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl p-8 w-full max-w-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#13c5dd]/10 p-2 rounded-xl text-[#13c5dd]">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Prescription' : 'New Prescription'}</h2>
              <p className="text-xs text-gray-500">RX ID: #{Math.floor(Math.random() * 10000)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Patient Info */}
          <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-2xl">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Patient Name</label>
              <input required type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full p-2 bg-white rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="Full Name" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Age</label>
              <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 bg-white rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="Age" />
            </div>
          </div>

          {/* Medicines List */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700">Medications</label>
              <button type="button" onClick={addMedicineRow} className="text-xs font-bold text-[#13c5dd] hover:text-[#0fb3ca] flex items-center gap-1">
                <Plus size={14} /> Add Medicine
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.medicines.map((med, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="grid grid-cols-12 gap-2 flex-1">
                    <div className="col-span-4">
                      <input required type="text" value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)} className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="Medicine Name" />
                    </div>
                    <div className="col-span-3">
                      <input required type="text" value={med.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)} className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="Dosage (e.g. 500mg)" />
                    </div>
                    <div className="col-span-3">
                      <input required type="text" value={med.frequency} onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)} className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="Freq (e.g. 1-0-1)" />
                    </div>
                    <div className="col-span-2">
                      <input required type="text" value={med.duration} onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)} className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="Days" />
                    </div>
                  </div>
                  {formData.medicines.length > 1 && (
                    <button type="button" onClick={() => removeMedicineRow(index)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg mt-0.5">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Instructions / Notes</label>
            <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none resize-none" placeholder="Take after meals..."></textarea>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-[#13c5dd] text-white hover:bg-[#0fb3ca] font-bold transition-colors shadow-lg shadow-[#13c5dd]/20">
              {isEditing ? 'Update Prescription' : 'Issue Prescription'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- MAIN MODULE ---
const PrescriptionsModule = () => {
  const [prescriptions, setPrescriptions] = useState([
    { 
      id: 1, patientName: 'Alice Johnson', age: 29, date: '2025-10-24', notes: 'Drink plenty of water.',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: '1-0-1', duration: '5 Days' },
        { name: 'Paracetamol', dosage: '650mg', frequency: 'SOS', duration: '3 Days' }
      ]
    },
    { 
      id: 2, patientName: 'Bob Smith', age: 45, date: '2025-10-22', notes: 'Follow up in a week.',
      medicines: [
        { name: 'Ibuprofen', dosage: '400mg', frequency: '1-0-0', duration: '5 Days' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRx, setCurrentRx] = useState(null);

  // --- CRUD Handlers ---
  const handleCreate = (data) => {
    setPrescriptions([...prescriptions, { ...data, id: Date.now() }]);
    toast.success('Prescription issued successfully!');
  };

  const handleUpdate = (data) => {
    setPrescriptions(prescriptions.map(p => p.id === currentRx.id ? { ...data, id: p.id } : p));
    toast.success('Prescription updated!');
  };

  const handleDelete = (id) => {
    if(confirm('Delete this prescription record?')) {
      setPrescriptions(prescriptions.filter(p => p.id !== id));
      toast.success('Record deleted.');
    }
  };

  const openCreateModal = () => { setCurrentRx(null); setIsModalOpen(true); };
  const openEditModal = (rx) => { setCurrentRx(rx); setIsModalOpen(true); };

  const handlePrint = () => {
    toast.success("Sending to printer...");
  };

  const filteredRx = prescriptions.filter(p => p.patientName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Prescriptions</h2>
          <p className="text-gray-500 text-sm">Issue digital prescriptions and manage history.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-[#13c5dd] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-all shadow-lg shadow-[#13c5dd]/20 flex items-center gap-2"
        >
          <Plus size={20} /> Issue New
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by patient name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none shadow-sm transition-all"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredRx.length > 0 ? (
            filteredRx.map((rx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={rx.id} 
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{rx.patientName}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> {rx.date} • {rx.age} Yrs
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handlePrint()} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Print">
                      <Printer size={16} />
                    </button>
                    <button onClick={() => openEditModal(rx)} className="p-2 text-gray-400 hover:text-[#13c5dd] hover:bg-cyan-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(rx.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Medicine List Preview */}
                <div className="flex-1 space-y-3 mb-4">
                  {rx.medicines.map((med, i) => (
                    <div key={i} className="flex justify-between items-center text-sm bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2">
                        <Pill size={14} className="text-[#13c5dd]" />
                        <span className="font-semibold text-gray-700">{med.name}</span>
                        <span className="text-gray-400 text-xs">({med.dosage})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} /> {med.frequency}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes Footer */}
                {rx.notes && (
                  <div className="mt-auto pt-3 border-t border-gray-50 text-xs text-gray-500 italic">
                    Note: {rx.notes}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">No prescriptions found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <PrescriptionModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            data={currentRx} 
            isEditing={!!currentRx} 
            onSubmit={currentRx ? handleUpdate : handleCreate} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrescriptionsModule;