import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, FileText, Activity, Pill, CreditCard, 
  Star, LogOut, Menu, X, User, LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PageTransition from '../../components/PageTransition';

// Import Modules
import AppointmentsModule from './patient/AppointmentsModule';
import ReportsModule from './patient/ReportsModule';
import TreatmentsModule from './patient/TreatmentsModule';
import PrescriptionsModule from './patient/PrescriptionsModule';
import PaymentsModule from './patient/PaymentsModule';
import ReviewsModule from './patient/ReviewsModule';

const PatientDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'reports', label: 'Lab Reports', icon: FileText },
    { id: 'treatments', label: 'Treatments', icon: Activity },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reviews', label: 'Doctor Reviews', icon: Star },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments': return <AppointmentsModule />;
      case 'reports': return <ReportsModule />;
      case 'treatments': return <TreatmentsModule />;
      case 'prescriptions': return <PrescriptionsModule />;
      case 'payments': return <PaymentsModule />;
      case 'reviews': return <ReviewsModule />;
      default: return <AppointmentsModule />;
    }
  };

  // Reusable Sidebar Content Component
  const SidebarContent = ({ isMobile }) => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-[#13c5dd]">
            <User size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight truncate w-32 sm:w-40">
              {user?.fullName || 'Patient'}
            </h3>
            <p className="text-xs text-gray-500 font-medium">Patient ID: #PT-2024</p>
          </div>
        </div>
        {isMobile && (
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { 
              setActiveTab(item.id); 
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if(isMobile) setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${
              activeTab === item.id 
                ? 'bg-[#13c5dd] text-white shadow-lg shadow-[#13c5dd]/25' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex pt-20">
        
        {/* --- DESKTOP SIDEBAR --- */}
        {/* 'sticky' ensures it stays in view but flows with the page to avoid footer overlap */}
        <aside className="hidden lg:block w-72 border-r border-gray-200 h-[calc(100vh-80px)] sticky top-20 z-30 self-start">
          <SidebarContent isMobile={false} />
        </aside>

        {/* --- MOBILE HEADER --- */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-gray-200 p-4 z-20 flex justify-between items-center shadow-sm">
          <span className="font-bold text-gray-800 capitalize flex items-center gap-2">
            {/* Dynamic Icon showing current tab */}
            {React.createElement(menuItems.find(i => i.id === activeTab)?.icon || LayoutDashboard, { size: 20, className: "text-[#13c5dd]" })}
            {activeTab.replace('-', ' ')}
          </span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* --- MOBILE DRAWER (Slide-in) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              />
              
              {/* Sidebar Drawer */}
              <motion.div 
                initial={{ x: '-100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden"
              >
                <SidebarContent isMobile={true} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 p-4 lg:p-8 pt-24 lg:pt-8 w-full max-w-[100vw] overflow-x-hidden min-h-screen">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>

      </div>
    </PageTransition>
  );
};

export default PatientDashboard;