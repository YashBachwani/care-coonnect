import React, { useState } from 'react';
import { 
  Pill, Search, Plus, Calendar, Activity, 
  CheckCircle, Clock, AlertCircle, MoreVertical, Edit, Trash2, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// --- SUB-COMPONENT: TREATMENT MODAL ---
const TreatmentModal = ({ isOpen, onClose, treatmentData, isEditing, onSubmit }) => {
  const initialData = treatmentData || { 
    patientName: '', type: '', progress: 0, 
    status: 'Active', startDate: '', nextVisit: '', notes: '' 
  };
  const [formData, setFormData] = useState(initialData);

  React.useEffect(() => { setFormData(treatmentData || initialData); }, [treatmentData, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
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
        className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="bg-[#13c5dd]/10 p-2 rounded-lg text-[#13c5dd]">
              <Activity size={20} />
            </div>
            {isEditing ? 'Update Treatment Plan' : 'New Treatment Plan'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Patient Name</label>
            <input required type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="e.g. Alice Johnson" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Treatment Type</label>
              <input required type="text" name="type" value={formData.type} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="e.g. Invisalign" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none">
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Progress ({formData.progress}%)
            </label>
            <input 
              type="range" name="progress" min="0" max="100" 
              value={formData.progress} onChange={handleChange} 
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#13c5dd]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
              <input required type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Next Visit</label>
              <input required type="date" name="nextVisit" value={formData.nextVisit} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Clinical Notes</label>
            <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none resize-none" placeholder="Enter observations..."></textarea>
          </div>

          <button type="submit" className="w-full bg-[#13c5dd] text-white py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-colors shadow-lg shadow-[#13c5dd]/20">
            {isEditing ? 'Save Changes' : 'Create Plan'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- MAIN MODULE ---
const TreatmentsModule = () => {
  const [treatments, setTreatments] = useState([
    { id: 1, patientName: 'Alice Johnson', type: 'Invisalign', progress: 65, status: 'Active', startDate: '2025-08-01', nextVisit: '2025-11-12', notes: 'Aligner set 14/20 provided.' },
    { id: 2, patientName: 'Bob Smith', type: 'Root Canal', progress: 100, status: 'Completed', startDate: '2025-09-10', nextVisit: '-', notes: 'Final crown placed successfully.' },
    { id: 3, patientName: 'Charlie Brown', type: 'Implants', progress: 30, status: 'Active', startDate: '2025-10-05', nextVisit: '2025-11-20', notes: 'Healing phase post-extraction.' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);

  // --- HANDLERS ---
  const handleCreate = (data) => {
    setTreatments([...treatments, { ...data, id: Date.now() }]);
    toast.success('Treatment plan created!');
  };

  const handleUpdate = (data) => {
    setTreatments(treatments.map(t => t.id === currentTreatment.id ? { ...data, id: t.id } : t));
    toast.success('Treatment updated!');
  };

  const handleDelete = (id) => {
    if(confirm('Delete this treatment plan?')) {
      setTreatments(treatments.filter(t => t.id !== id));
      toast.success('Treatment plan removed.');
    }
  };

  const openCreateModal = () => { setCurrentTreatment(null); setIsModalOpen(true); };
  const openEditModal = (t) => { setCurrentTreatment(t); setIsModalOpen(true); };

  const filteredTreatments = treatments.filter(t => 
    t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Treatment Plans</h2>
          <p className="text-gray-500 text-sm">Monitor patient progress and ongoing procedures.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-[#13c5dd] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-all shadow-lg shadow-[#13c5dd]/20 flex items-center gap-2"
        >
          <Plus size={20} /> New Treatment Plan
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by patient or treatment..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none shadow-sm transition-all"
        />
      </div>

      {/* Treatment Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTreatments.length > 0 ? (
            filteredTreatments.map((t) => (
              <motion.div 
                layout
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                    t.status === 'Active' ? 'bg-blue-100 text-blue-700' : 
                    t.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {t.status === 'Active' && <Activity size={12} />}
                    {t.status === 'Completed' && <CheckCircle size={12} />}
                    {t.status === 'Paused' && <Clock size={12} />}
                    {t.status}
                  </span>
                  
                  <div className="flex gap-1">
                    <button onClick={() => openEditModal(t)} className="p-2 text-gray-400 hover:text-[#13c5dd] hover:bg-gray-50 rounded-lg transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900">{t.type}</h3>
                <p className="text-sm text-[#13c5dd] font-semibold mb-4">Patient: {t.patientName}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{t.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-[#13c5dd] h-2 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${t.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 mb-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-gray-400">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Next Visit</p>
                    <p className="text-sm font-semibold text-gray-700">{t.nextVisit}</p>
                  </div>
                </div>

                {t.notes && (
                  <p className="text-xs text-gray-500 italic bg-gray-50/50 p-2 rounded-lg border border-gray-100">
                    "{t.notes}"
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <Pill className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">No treatments found matching your search.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <TreatmentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            treatmentData={currentTreatment}
            isEditing={!!currentTreatment}
            onSubmit={currentTreatment ? handleUpdate : handleCreate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TreatmentsModule;