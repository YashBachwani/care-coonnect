import React, { useState } from 'react';
import { 
  Search, UserPlus, Filter, Phone, MapPin, 
  MoreVertical, Edit, Trash2, Calendar, Activity, X, User 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// --- SUB-COMPONENT: PATIENT FORM MODAL ---
const PatientModal = ({ isOpen, onClose, patientData, isEditing, onSubmit }) => {
  const initialData = patientData || { 
    name: '', age: '', gender: 'Male', phone: '', 
    condition: '', address: '', status: 'Active', lastVisit: '' 
  };
  const [formData, setFormData] = useState(initialData);

  // Reset form when opening/closing
  React.useEffect(() => { setFormData(patientData || initialData); }, [patientData, isOpen]);

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
        className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-[#13c5dd]/10 p-2 rounded-xl text-[#13c5dd]">
              <UserPlus size={24} />
            </div>
            {isEditing ? 'Edit Patient Record' : 'Register New Patient'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Section 1: Personal Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none transition-colors" placeholder="e.g. John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Age</label>
                  <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="25" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="+1 234 567 890" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="City, State" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section 2: Medical Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Medical Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Primary Condition</label>
                <input required type="text" name="condition" value={formData.condition} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="e.g. Root Canal" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Last Visit Date</label>
                <input type="date" name="lastVisit" value={formData.lastVisit} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none">
                <option value="Active">Active (Under Treatment)</option>
                <option value="Monitoring">Monitoring (Checkups)</option>
                <option value="Recovered">Recovered (Discharged)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-[#13c5dd] text-white hover:bg-[#0fb3ca] font-bold transition-colors shadow-lg shadow-[#13c5dd]/20">
              {isEditing ? 'Save Changes' : 'Register Patient'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- MAIN MODULE ---
const PatientsModule = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Alice Johnson', age: 29, gender: 'Female', phone: '+1 234 567 890', condition: 'Cavity Treatment', address: 'New York, USA', status: 'Active', lastVisit: '2025-10-20' },
    { id: 2, name: 'Bob Smith', age: 45, gender: 'Male', phone: '+1 987 654 321', condition: 'Gum Disease', address: 'London, UK', status: 'Active', lastVisit: '2025-09-12' },
    { id: 3, name: 'Charlie Brown', age: 12, gender: 'Male', phone: '+1 555 666 777', condition: 'Braces Adjustment', address: 'Toronto, CA', status: 'Monitoring', lastVisit: '2025-10-01' },
    { id: 4, name: 'Diana Prince', age: 34, gender: 'Female', phone: '+1 222 333 444', condition: 'Teeth Whitening', address: 'Paris, FR', status: 'Recovered', lastVisit: '2025-08-15' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // --- ACTIONS ---
  const handleCreate = (data) => {
    const newPatient = { ...data, id: Date.now() }; // Simple ID generation
    setPatients([...patients, newPatient]);
    toast.success('Patient registered successfully!');
  };

  const handleUpdate = (data) => {
    setPatients(patients.map(p => p.id === currentPatient.id ? { ...data, id: p.id } : p));
    toast.success('Patient record updated!');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this patient record?')) {
      setPatients(patients.filter(p => p.id !== id));
      toast.success('Patient removed.');
    }
  };

  const openCreateModal = () => { setCurrentPatient(null); setIsModalOpen(true); };
  const openEditModal = (patient) => { setCurrentPatient(patient); setIsModalOpen(true); };

  // --- FILTERING ---
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || p.status === filterStatus)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Records</h2>
          <p className="text-gray-500 text-sm">Manage all current and past patient history.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-[#13c5dd] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-all shadow-lg shadow-[#13c5dd]/20 flex items-center gap-2"
        >
          <UserPlus size={20} /> Add New Patient
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none transition-all"
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none bg-white appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Recovered">Recovered</option>
          </select>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={p.id} 
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    p.status === 'Active' ? 'bg-green-100 text-green-600' : 
                    p.status === 'Recovered' ? 'bg-gray-100 text-gray-500' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {p.status}
                  </span>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg ${
                    p.gender === 'Female' ? 'bg-pink-400 shadow-pink-200' : 'bg-[#13c5dd] shadow-[#13c5dd]/30'
                  }`}>
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#13c5dd] transition-colors">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.age} Yrs • {p.gender}</p>
                  </div>
                </div>

                {/* Info Blocks */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                    <Activity size={16} className="text-[#13c5dd]" />
                    <span className="font-medium">{p.condition}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 px-2">
                    <Phone size={16} className="text-gray-400" />
                    {p.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 px-2">
                    <MapPin size={16} className="text-gray-400" />
                    {p.address}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 px-2">
                    <Calendar size={16} className="text-gray-400" />
                    Last Visit: {p.lastVisit}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button onClick={() => openEditModal(p)} className="flex-1 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold hover:bg-[#13c5dd] hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Edit size={16} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No patients found matching your search.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <PatientModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            patientData={currentPatient}
            isEditing={!!currentPatient}
            onSubmit={currentPatient ? handleUpdate : handleCreate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientsModule;