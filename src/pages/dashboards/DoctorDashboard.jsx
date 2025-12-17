import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FolderOpen,
  Pill,
  FileText,
  DollarSign,
  LogOut,
  Stethoscope,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import PageTransition from "../../components/PageTransition";

// Import Modules
import DashboardHome from "./doctor/DashboardHome";
import AppointmentsModule from "./doctor/AppointmentsModule";
import PatientsModule from "./doctor/PatientsModule";
import TreatmentsModule from "./doctor/TreatmentsModule";
import PrescriptionsModule from "./doctor/PrescriptionsModule";
import BillingModule from "./doctor/BillingModule";

// --- MOCK DATA ---
const INITIAL_DATA = {
  appointments: [
    {
      id: 201,
      patientName: "Alex Johnson",
      time: "10:00",
      date: "2025-12-17",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      id: 202,
      patientName: "Sarah Lee",
      time: "10:30",
      date: "2025-12-17",
      type: "Consultation",
      status: "Pending",
    },
    {
      id: 203,
      patientName: "Michael Chen",
      time: "11:00",
      date: "2025-12-17",
      type: "Check-up",
      status: "Cancelled",
    },
  ],
};

const DoctorDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [appointments, setAppointments] = useState(
    INITIAL_DATA.appointments
  );

  // --- HANDLERS ---
  const handleCreateAppointment = (newAppt) => {
    const id = Math.max(...appointments.map((a) => a.id), 0) + 1;
    setAppointments([...appointments, { ...newAppt, id }]);
  };

  const handleUpdateAppointment = (updatedAppt) => {
    setAppointments(
      appointments.map((a) =>
        a.id === updatedAppt.id ? updatedAppt : a
      )
    );
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "appointments", label: "My Appointments", icon: Calendar },
    { id: "patients", label: "Patient Records", icon: FolderOpen },
    { id: "treatments", label: "Treatment Plans", icon: Pill },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "billing", label: "Billing & Invoices", icon: DollarSign },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "appointments":
        return (
          <AppointmentsModule
            appointments={appointments}
            onCreate={handleCreateAppointment}
            onUpdate={handleUpdateAppointment}
            onDelete={handleDeleteAppointment}
          />
        );
      case "patients":
        return <PatientsModule />;
      case "treatments":
        return <TreatmentsModule />;
      case "prescriptions":
        return <PrescriptionsModule />;
      case "billing":
        return <BillingModule />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex pt-20 relative">

        {/* ================= SIDEBAR (Sticky) ================= */}
        {/* Changed from 'fixed' to 'sticky' to prevent overlap */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 h-[calc(100vh-80px)] sticky top-20 z-30 overflow-y-auto self-start">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-[#13c5dd]">
              <Stethoscope size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight truncate w-32">
                Dr. {user?.fullName?.split(" ")[0] || "Smith"}
              </h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Orthodontist
              </p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-[#13c5dd] text-white shadow-lg shadow-[#13c5dd]/25"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100 mt-auto flex-shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </aside>

        {/* ================= MOBILE HEADER ================= */}
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-gray-200 p-4 z-30 flex justify-between items-center shadow-sm">
          <span className="font-bold text-gray-800 flex items-center gap-2 capitalize">
            {/* Dynamic Icon */}
            {React.createElement(
              menuItems.find((i) => i.id === activeTab)?.icon || LayoutDashboard,
              { size: 20, className: "text-[#13c5dd]" }
            )}
            {activeTab.replace(/([A-Z])/g, " $1")}
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ================= MOBILE MENU DRAWER ================= */}
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
              
              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl lg:hidden flex flex-col h-full"
              >
                {/* Mobile Sidebar Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-[#13c5dd]">
                      <Stethoscope size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">
                        Dr. {user?.fullName?.split(" ")[0] || "Smith"}
                      </h3>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                        Orthodontist
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-4 space-y-2 flex-1 overflow-y-auto">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                        activeTab === item.id
                          ? "bg-[#13c5dd]/10 text-[#13c5dd]"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-100 mt-auto">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500 bg-red-50 hover:bg-red-100 font-medium transition-colors"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ================= MAIN CONTENT ================= */}
        {/* Removed lg:ml-72 because the sidebar is sticky */}
        <main className="flex-1 p-4 lg:p-8 w-full max-w-[100vw] overflow-x-hidden min-h-[calc(100vh-80px)]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Added extra padding bottom to ensure content doesn't hit footer immediately */}
            <div className="pb-12">
              {renderContent()}
            </div>
          </motion.div>
        </main>

      </div>
    </PageTransition>
  );
};

export default DoctorDashboard;