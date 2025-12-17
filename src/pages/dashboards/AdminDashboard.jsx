import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Users, DollarSign, Activity, LogOut, 
  Stethoscope, CalendarCheck, FileText, CreditCard,
  MoreHorizontal, Menu, X, LayoutDashboard
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

import { useAuth } from '../../contexts/AuthContext';
import PageTransition from '../../components/PageTransition';

// --- Placeholder Imports for Sub-Components ---
// Ensure these files exist in your project, or the dashboard will break.
import ManagePatients from './admin/ManagePatients'; 
import ManageDoctors from './admin/ManageDoctors'; 
import ManageAppointments from './admin/ManageAppointments'; 
import ManagePayments from './admin/ManagePayments';
import SystemReports from './admin/SystemReports';

// --- MOCK DATA FOR CHARTS ---
const appointmentData = [
  { month: 'Jan', appointments: 40 },
  { month: 'Feb', appointments: 55 },
  { month: 'Mar', appointments: 48 },
  { month: 'Apr', appointments: 70 },
  { month: 'May', appointments: 85 },
  { month: 'Jun', appointments: 75 },
];

// --- DASHBOARD OVERVIEW COMPONENT ---
const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Overview</h2>
          <p className="text-gray-500 text-sm">Welcome back, Admin. System is running smoothly.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-100">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          System Online
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Patients', value: '1,204', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Doctors', value: '45', icon: Stethoscope, color: 'text-[#13c5dd]', bg: 'bg-[#13c5dd]/10' },
          { label: 'Appointments', value: '128', icon: CalendarCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Monthly Revenue', value: '$124k', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((widget, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{widget.label}</p>
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-[#13c5dd] transition-colors">{widget.value}</h3>
              </div>
              <div className={`${widget.bg} p-3 rounded-2xl ${widget.color}`}>
                <widget.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Charts & Activity Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Appointment Analytics</h3>
              <p className="text-sm text-gray-500">6-Month Trend</p>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400">
                <MoreHorizontal size={20} />
            </button>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={appointmentData}>
                <defs>
                  <linearGradient id="colorAppt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13c5dd" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#13c5dd" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#13c5dd', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="appointments" stroke="#13c5dd" strokeWidth={3} fillOpacity={1} fill="url(#colorAppt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="bg-orange-50 p-2 rounded-lg text-orange-500"><Activity size={18} /></div>
            Recent Activity
          </h3>
          <div className="space-y-0 relative flex-1">
            {/* Timeline Line */}
            <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-gray-100"></div>

            {[
              { title: "Dr. Khan confirmed appt.", time: "12m ago" },
              { title: "New Patient: Jane Doe", time: "1h ago" },
              { title: "Payment: $150 received", time: "3h ago" },
              { title: "System Backup Completed", time: "5h ago" }
            ].map((log, i) => (
              <div key={i} className="flex gap-4 relative pb-8 last:pb-0">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-[#13c5dd] z-10 flex-shrink-0 mt-1 shadow-sm"></div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{log.title}</p>
                  <p className="text-xs text-gray-400 font-medium">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 rounded-xl border border-gray-100 text-gray-500 text-sm font-bold hover:bg-gray-50 transition-colors">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN ADMIN DASHBOARD ---
const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: DashboardOverview },
    { id: 'patients', label: 'Manage Patients', icon: Users, component: ManagePatients },
    { id: 'doctors', label: 'Manage Doctors', icon: Stethoscope, component: ManageDoctors },
    { id: 'payments', label: 'Manage Payments', icon: CreditCard, component: ManagePayments },
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck, component: ManageAppointments },
    { id: 'reports', label: 'System Reports', icon: FileText, component: SystemReports },
  ];

  const ActiveComponent = navItems.find(item => item.id === activeTab)?.component || DashboardOverview;

  // Reusable Sidebar Content
  const SidebarContent = ({ isMobile }) => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#13c5dd] flex items-center justify-center text-white shadow-lg shadow-[#13c5dd]/30">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Admin Panel</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Master Control</p>
          </div>
        </div>
        {isMobile && (
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => { 
                setActiveTab(item.id); 
                window.scrollTo(0,0);
                if(isMobile) setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                isActive 
                  ? 'bg-[#13c5dd] text-white shadow-lg shadow-[#13c5dd]/25' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <button 
          onClick={logout} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium"
        >
          <LogOut size={20} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex pt-20"> 
        
        {/* --- DESKTOP SIDEBAR --- */}
        {/* Sticky positioning fixes footer overlap */}
        <aside className="hidden lg:block w-72 border-r border-gray-200 h-[calc(100vh-80px)] sticky top-20 z-30 self-start">
          <SidebarContent isMobile={false} />
        </aside>

        {/* --- MOBILE HEADER --- */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-gray-200 p-4 z-20 flex justify-between items-center shadow-sm">
          <span className="font-bold text-gray-800 capitalize flex items-center gap-2">
            <LayoutDashboard size={18} className="text-[#13c5dd]" />
            {activeTab.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* --- MOBILE DRAWER --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden"
              >
                <SidebarContent isMobile={true} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 p-4 lg:p-8 pt-24 lg:pt-8 w-full max-w-[100vw] overflow-x-hidden min-h-screen">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </div>
        
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;