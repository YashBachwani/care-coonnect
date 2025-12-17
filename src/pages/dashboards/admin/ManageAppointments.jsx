import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppointmentFormModal from './AppointmentFormModal';

// --- Helper: Format Date to YYYY-MM-DD safely ---
const formatDate = (date) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${d.getFullYear()}-${month}-${day}`;
};

// --- Helper Component: Status Badge ---
const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'bg-green-100 text-green-700 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Completed: 'bg-blue-100 text-blue-700 border-blue-200',
    Canceled: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const initialPatients = [
  { id: 2, name: 'Bob Williams' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'Diana Prince' },
];

const initialDoctors = [
  { id: 101, name: 'Dr. Carter', specialty: 'Orthodontics' },
  { id: 102, name: 'Dr. Smith', specialty: 'Oral Surgery' },
];

const initialAppointments = [
  { id: 1, date: '2025-12-18', time: '10:00', patient: 'Charlie Brown', doctor: 'Dr. Carter', status: 'Confirmed', notes: 'Routine checkup.' },
  { id: 2, date: '2025-12-18', time: '14:00', patient: 'Diana Prince', doctor: 'Dr. Smith', status: 'Pending', notes: 'Wisdom tooth consultation.' },
  { id: 3, date: '2025-12-19', time: '09:00', patient: 'Bob Williams', doctor: 'Dr. Carter', status: 'Completed', notes: 'Cleaning done.' },
];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const activeDateString = useMemo(() => formatDate(selectedDate), [selectedDate]);

  const appointmentsForSelectedDay = useMemo(() => {
    return appointments.filter(appt => {
      const matchesDate = appt.date === activeDateString;
      const matchesSearch = appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          appt.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDate && matchesSearch;
    });
  }, [appointments, activeDateString, searchTerm]);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dString = formatDate(date);
      const hasAppt = appointments.some(a => a.date === dString);
      return hasAppt ? (
        <div className="flex justify-center mt-1">
          <div className="w-1.5 h-1.5 bg-[#13c5dd] rounded-full"></div>
        </div>
      ) : null;
    }
  };

  const handleOpenAddModal = () => {
    setCurrentAppointment({
      date: activeDateString,
      time: '10:00',
      patient: '',
      doctor: '',
      status: 'Pending',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (appt) => {
    setCurrentAppointment(appt);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (currentAppointment?.id) {
      setAppointments(prev => prev.map(a => a.id === currentAppointment.id ? { ...formData, id: a.id } : a));
    } else {
      const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
      setAppointments(prev => [...prev, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      setAppointments(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="text-[#13c5dd]" />
            Appointment Schedule
          </h2>
          <p className="text-gray-500 text-sm">Manage and track patient visits</p>
        </div>

        <motion.button
          onClick={handleOpenAddModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center bg-[#13c5dd] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-100 transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Appointment
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Calendar Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate}
            tileContent={tileContent}
            className="border-none w-full"
          />
        </div>

        {/* Right: List for Selected Date */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="font-bold text-gray-800 text-lg">
                Agenda for {selectedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Filter by name..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-cyan-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-4 px-2">Time</th>
                    <th className="pb-4 px-2">Patient</th>
                    <th className="pb-4 px-2">Doctor</th>
                    <th className="pb-4 px-2">Status</th>
                    <th className="pb-4 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointmentsForSelectedDay.map((appt) => (
                    <tr key={appt.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-2 font-semibold text-[#13c5dd]">{appt.time}</td>
                      <td className="py-4 px-2 text-gray-900 font-medium">{appt.patient}</td>
                      <td className="py-4 px-2 text-gray-600">{appt.doctor}</td>
                      <td className="py-4 px-2">
                        <StatusBadge status={appt.status} />
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleOpenEditModal(appt)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(appt.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {appointmentsForSelectedDay.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <CalendarIcon size={48} className="mb-2 opacity-20" />
                  <p>No appointments found for this date.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AppointmentFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        appointmentData={currentAppointment}
        doctors={initialDoctors}
        patients={initialPatients}
      />

      <style jsx global>{`
        .react-calendar { border: none !important; font-family: inherit; width: 100% !important; }
        .react-calendar__navigation button { font-weight: bold; font-size: 1.1rem; color: #1f2937; }
        .react-calendar__month-view__weekdays__weekday abbr { text-decoration: none; font-weight: 800; color: #d1d5db; font-size: 0.7rem; }
        .react-calendar__tile--active { background: #13c5dd !important; border-radius: 12px; color: white !important; box-shadow: 0 4px 12px rgba(19, 197, 221, 0.3); }
        .react-calendar__tile--now { background: #ecfeff !important; border-radius: 12px; color: #13c5dd !important; font-weight: bold; }
        .react-calendar__tile { padding: 1em 0.5em !important; display: flex; flex-direction: column; align-items: center; }
        .react-calendar__tile:hover { background-color: #f9fafb !important; border-radius: 12px; }
      `}</style>
    </div>
  );
};

export default ManageAppointments;