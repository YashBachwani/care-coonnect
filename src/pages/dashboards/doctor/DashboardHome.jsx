import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Clock, CheckCircle, Calendar, TrendingUp, 
  MoreVertical, MapPin, Phone, FileText, ArrowRight 
} from 'lucide-react';

const DashboardHome = () => {
  // Mock Schedule Data
  const schedule = [
    { id: 1, time: '09:00 AM', patient: 'Alice Johnson', type: 'Root Canal', status: 'In Progress', color: 'blue' },
    { id: 2, time: '10:30 AM', patient: 'Michael Ross', type: 'General Checkup', status: 'Upcoming', color: 'green' },
    { id: 3, time: '11:45 AM', patient: 'Emma Watson', type: 'Consultation', status: 'Pending', color: 'purple' },
    { id: 4, time: '02:00 PM', patient: 'Robert Brown', type: 'Dental Implant', status: 'Confirmed', color: 'orange' },
  ];

  const nextPatient = {
    name: 'Alice Johnson',
    age: 29,
    condition: 'Severe Tooth Pain',
    time: '09:00 AM',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Dr. Smith. You have <span className="font-bold text-[#13c5dd]">4 appointments</span> remaining today.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Date</p>
          <p className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#13c5dd] to-cyan-600 p-6 rounded-3xl text-white shadow-xl shadow-[#13c5dd]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm"><Users className="text-white" /></div>
            <span className="bg-white/20 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">+12%</span>
          </div>
          <h3 className="text-4xl font-bold mb-1 relative z-10">1,240</h3>
          <p className="opacity-90 text-sm font-medium relative z-10">Total Patients</p>
        </motion.div>

        {[
          { title: 'Pending', value: '8', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
          { title: 'Completed', value: '15', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
          { title: 'Satisfaction', value: '98%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' }
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}><stat.icon /></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* --- MAIN CONTENT SPLIT --- */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT: SCHEDULE TIMELINE (2/3 width) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="text-[#13c5dd]" size={20} /> Today's Schedule
            </h3>
            <button className="text-sm font-bold text-[#13c5dd] hover:text-[#0fb3ca] transition-colors">View All</button>
          </div>

          <div className="space-y-0 relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[65px] top-4 bottom-10 w-0.5 bg-gray-100 hidden sm:block"></div>

            {schedule.map((item, index) => (
              <div key={item.id} className="relative flex flex-col sm:flex-row gap-6 pb-8 last:pb-0 group">
                
                {/* Time Column */}
                <div className="w-[65px] flex-shrink-0 text-right pt-2 hidden sm:block">
                  <span className="text-sm font-bold text-gray-500">{item.time}</span>
                </div>

                {/* Timeline Dot */}
                <div className={`absolute left-[58px] top-3 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 hidden sm:block
                  ${item.status === 'In Progress' ? 'bg-[#13c5dd] ring-4 ring-[#13c5dd]/10' : 'bg-gray-300'}
                `}></div>

                {/* Card Content */}
                <div className="flex-1">
                  <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                    item.status === 'In Progress' 
                      ? 'bg-[#13c5dd]/5 border-[#13c5dd] shadow-md' 
                      : 'bg-white border-gray-100 hover:border-[#13c5dd]/30 hover:shadow-md'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                          ${item.status === 'In Progress' ? 'bg-[#13c5dd] text-white' : 'bg-gray-100 text-gray-500'}
                        `}>
                          {item.patient.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.patient}</h4>
                          <p className="text-sm text-gray-500">{item.type}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Upcoming' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {/* Time for mobile view inside card */}
                    <div className="mt-3 pt-3 border-t border-gray-100 sm:hidden flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} /> {item.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: NEXT PATIENT & QUICK ACTIONS (1/3 width) */}
        <motion.div variants={itemVariants} className="space-y-6">
          
          {/* Next Patient Card */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-100 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#13c5dd]"></div>
            <div className="flex justify-between items-center mb-6 mt-2">
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> LIVE NOW
              </span>
              <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
            </div>

            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img 
                  src={nextPatient.image} 
                  alt={nextPatient.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#13c5dd]/10 mx-auto"
                />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-3">{nextPatient.name}</h3>
              <p className="text-sm text-gray-500">{nextPatient.age} Years • Female</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText size={16} className="text-[#13c5dd]" />
                <span className="text-sm font-bold text-gray-700">Reason for Visit</span>
              </div>
              <p className="text-sm text-gray-600 pl-7">{nextPatient.condition}</p>
            </div>

            <button className="w-full bg-[#13c5dd] text-white py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-all shadow-lg shadow-[#13c5dd]/20 flex items-center justify-center gap-2">
              View Patient Record <ArrowRight size={18} />
            </button>
          </div>

          {/* Mini Calendar / Quick Stats */}
          <div className="bg-[#13c5dd] rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Calendar size={120} />
            </div>
            <h3 className="font-bold text-lg mb-4">Availability</h3>
            <div className="flex items-center justify-between bg-white/20 p-3 rounded-xl backdrop-blur-sm mb-2">
              <span className="text-sm font-medium">Morning Slots</span>
              <span className="font-bold">Full</span>
            </div>
            <div className="flex items-center justify-between bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <span className="text-sm font-medium">Evening Slots</span>
              <span className="font-bold">2 Left</span>
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;