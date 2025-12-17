import React, { useState } from 'react';
import { Calendar, Search, Filter, Edit, Trash2, Plus, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MODAL COMPONENT ---
const AppointmentModal = ({ isOpen, onClose, appointmentData, isEditing, onSubmit }) => { 
    const initialData = appointmentData || { patientName: '', date: '', time: '', type: 'Consultation', status: 'Pending' }; 
    const [formData, setFormData] = useState(initialData);

    React.useEffect(() => { setFormData(appointmentData || initialData); }, [appointmentData]);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); onClose(); };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <Calendar className="text-[#13c5dd]" /> 
                    {isEditing ? 'Edit Appointment' : 'Book Appointment'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} required className="w-full p-3 rounded-xl border focus:border-[#13c5dd] outline-none" />
                    <div className="flex gap-3">
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 rounded-xl border focus:border-[#13c5dd] outline-none" />
                        <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-3 rounded-xl border focus:border-[#13c5dd] outline-none" />
                    </div>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 rounded-xl border focus:border-[#13c5dd] outline-none">
                        <option>Consultation</option><option>Follow-up</option><option>Check-up</option><option>Emergency</option>
                    </select>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 rounded-xl border focus:border-[#13c5dd] outline-none">
                        <option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
                    </select>
                    <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#13c5dd] text-white rounded-lg hover:bg-cyan-600">Save</button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// --- MAIN MODULE (Receives PROPS) ---
const AppointmentsModule = ({ appointments = [], onCreate, onUpdate, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    const openCreateModal = () => { setCurrentAppointment(null); setIsModalOpen(true); };
    const openEditModal = (appt) => { setCurrentAppointment(appt); setIsModalOpen(true); };
    
    const handleSubmit = (formData) => {
        if (formData.id) onUpdate(formData);
        else onCreate(formData);
    };

    // Safe filter check
    const filtered = (appointments || []).filter(a => 
        a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (filterStatus === 'All' || a.status === filterStatus)
    );

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            case 'Completed': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
                <button 
                    onClick={openCreateModal} 
                    className="bg-[#13c5dd] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-cyan-600 transition-colors shadow-lg shadow-[#13c5dd]/20"
                >
                    <Plus size={18} /> New Appointment
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search patients..." 
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none transition-all" 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                    />
                </div>
                <div className="relative min-w-[150px]">
                    <select 
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#13c5dd] outline-none bg-white appearance-none cursor-pointer" 
                        value={filterStatus} 
                        onChange={e => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="grid gap-4">
                {filtered.length > 0 ? filtered.map(appt => (
                    <div key={appt.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between hover:shadow-md transition-shadow gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center font-bold border border-blue-100 flex-shrink-0">
                                <span className="text-lg leading-none">{appt.date.split('-')[2]}</span>
                                <span className="text-[10px] uppercase">{new Date(appt.date).toLocaleString('default', { month: 'short' })}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{appt.patientName}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {appt.time}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {appt.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getStatusClasses(appt.status)}`}>
                                {appt.status}
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(appt)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit size={18} /></button>
                                <button onClick={() => onDelete(appt.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
                        No appointments found.
                    </div>
                )}
            </div>
            
            <AnimatePresence>
                {isModalOpen && (
                    <AppointmentModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        appointmentData={currentAppointment} 
                        isEditing={!!currentAppointment} 
                        onSubmit={handleSubmit} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AppointmentsModule;