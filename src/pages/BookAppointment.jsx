import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Mail, Phone, Stethoscope, 
  ChevronDown, MapPin, Shield, CheckCircle, Lock, LogIn, UserPlus 
} from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '../components/PageTransition';
import { services } from '../data/services';
import { doctors } from '../data/doctors';
import { useAuth } from '../contexts/AuthContext'; // Import Auth

// Grouped time slots
const timeSlots = {
  Morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  Afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
  Evening: ['05:00 PM', '05:30 PM', '06:00 PM']
};

const BookAppointment = () => {
  const { user } = useAuth(); // Get current user status
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedService = searchParams.get('service');

  // Initialize form state (Auto-fill if user exists)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: '',
    service: preSelectedService || '',
    concern: '',
    date: '',
    time: '',
    doctor: '',
    firstVisit: 'yes'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync form data if user logs in while on this page (edge case)
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleFirstVisitChange = (value) => {
    setFormData(prev => ({ ...prev, firstVisit: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.time) {
      toast.error("Please select a time slot");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store in localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      ...formData,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      serviceName: services.find(s => s.id === formData.service)?.name || 'General Checkup',
      doctorName: doctors.find(d => d.id === formData.doctor)?.name || 'Any Available Specialist',
      userId: user?.email // Link this appointment to the logged-in user
    };
    
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    setAppointmentDetails(newAppointment);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Appointment booked successfully!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <PageTransition>
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#13c5dd]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#13c5dd]/5 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#13c5dd]/10 text-[#13c5dd] font-semibold text-sm mb-6 tracking-wide">
              BOOK ONLINE
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Schedule Your Visit
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Your journey to a healthier smile starts here. 
              {!user && " Please login to proceed with booking."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* 🔒 AUTH CHECK 🔒 */}
            {!user ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 md:p-16 text-center border-2 border-[#13c5dd]/10 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#13c5dd] to-blue-500" />
                
                <div className="w-20 h-20 rounded-full bg-[#13c5dd]/10 flex items-center justify-center mx-auto mb-6 text-[#13c5dd]">
                  <Lock size={40} />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Required</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                  To ensure the security of your medical records and manage your appointments efficiently, please log in or create an account.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/auth">
                    <button className="btn-primary flex items-center gap-2 px-8 py-3 shadow-lg shadow-[#13c5dd]/25">
                      <LogIn size={20} />
                      Login to Book
                    </button>
                  </Link>
                  <Link to="/auth">
                    <button className="px-8 py-3 rounded-full font-semibold text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors flex items-center gap-2">
                      <UserPlus size={20} />
                      Create Account
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ✅ BOOKING FORM (Visible only if logged in) ✅ */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#13c5dd] to-blue-500" />

                <AnimatePresence mode="wait">
                  {isSubmitted && appointmentDetails ? (
                    /* --- SUCCESS STATE --- */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-24 h-24 rounded-full bg-[#13c5dd]/10 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-12 h-12 text-[#13c5dd]" />
                      </motion.div>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                      <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Thank you for choosing Care Connect. We've sent a confirmation email to 
                        <span className="font-semibold text-gray-900"> {appointmentDetails.email}</span>.
                      </p>

                      {/* Receipt Card */}
                      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 max-w-lg mx-auto text-left border border-gray-100 shadow-sm mb-8">
                        <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Appointment ID</p>
                            <p className="text-[#13c5dd] font-mono font-medium">#{appointmentDetails.id.slice(0, 8).toUpperCase()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Date</p>
                            <p className="font-medium text-gray-900">{appointmentDetails.date}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-400">Patient</p>
                              <p className="font-medium text-gray-900">{appointmentDetails.fullName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Stethoscope className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-400">Service</p>
                              <p className="font-medium text-gray-900">{appointmentDetails.serviceName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-400">Time</p>
                              <p className="font-medium text-gray-900">{appointmentDetails.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-400">Location</p>
                              <p className="font-medium text-gray-900">Care Connect Clinic, Main Street</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          // Keep user details, clear appointment details
                          setFormData({
                            fullName: user?.fullName || '', 
                            email: user?.email || '', 
                            phone: user?.phone || '', 
                            age: '',
                            service: '', concern: '', date: '', time: '',
                            doctor: '', firstVisit: 'yes'
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="btn-primary"
                      >
                        Book Another Appointment
                      </button>
                    </motion.div>
                  ) : (
                    /* --- FORM --- */
                    <motion.form
                      key="form"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      {/* Section 1: Personal Info */}
                      <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-[#13c5dd]">
                            <User size={20} />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Patient Information</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name *</label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              placeholder="e.g. John Doe"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="e.g. john@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder="e.g. +1 234 567 8900"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Age *</label>
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                              required
                              min="1"
                              max="120"
                              placeholder="e.g. 28"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>

                      <hr className="border-gray-100" />

                      {/* Section 2: Medical Details */}
                      <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-[#13c5dd]">
                            <Stethoscope size={20} />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Appointment Details</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Service *</label>
                            <div className="relative">
                              <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                              >
                                <option value="">Choose a service...</option>
                                {services.map(service => (
                                  <option key={service.id} value={service.id}>{service.name}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Preferred Doctor</label>
                            <div className="relative">
                              <select
                                name="doctor"
                                value={formData.doctor}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                              >
                                <option value="">Any Available Specialist</option>
                                {doctors.map(doctor => (
                                  <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Describe Your Concern</label>
                          <textarea
                            name="concern"
                            value={formData.concern}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Briefly tell us about your symptoms or reason for visit..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all resize-none"
                          />
                        </div>
                      </motion.div>

                      <hr className="border-gray-100" />

                      {/* Section 3: Date & Time */}
                      <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-[#13c5dd]">
                            <Clock size={20} />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Select Date *</label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            min={today}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all cursor-pointer"
                          />
                        </div>

                        {/* Interactive Time Slot Grid */}
                        <div className="space-y-4">
                          <label className="text-sm font-medium text-gray-700">Select Time Slot *</label>
                          <div className="space-y-4">
                            {Object.entries(timeSlots).map(([period, slots]) => (
                              <div key={period}>
                                <p className="text-xs font-semibold text-gray-400 uppercase mb-2 ml-1">{period}</p>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                                  {slots.map((slot) => {
                                    const isSelected = formData.time === slot;
                                    return (
                                      <button
                                        key={slot}
                                        type="button"
                                        onClick={() => handleTimeSelect(slot)}
                                        className={`
                                          py-2 px-1 text-sm rounded-lg border transition-all duration-200
                                          ${isSelected 
                                            ? 'bg-[#13c5dd] border-[#13c5dd] text-white shadow-lg shadow-[#13c5dd]/30 scale-105' 
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-[#13c5dd] hover:text-[#13c5dd]'}
                                        `}
                                      >
                                        {slot}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Section 4: Visit Type */}
                      <motion.div variants={itemVariants} className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">Is this your first visit?</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div 
                            onClick={() => handleFirstVisitChange('yes')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                              formData.firstVisit === 'yes' 
                                ? 'border-[#13c5dd] bg-[#13c5dd]/5' 
                                : 'border-gray-100 hover:border-[#13c5dd]/30'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.firstVisit === 'yes' ? 'border-[#13c5dd]' : 'border-gray-300'}`}>
                              {formData.firstVisit === 'yes' && <div className="w-2.5 h-2.5 rounded-full bg-[#13c5dd]" />}
                            </div>
                            <span className={`font-medium ${formData.firstVisit === 'yes' ? 'text-[#13c5dd]' : 'text-gray-600'}`}>Yes, first time</span>
                          </div>

                          <div 
                            onClick={() => handleFirstVisitChange('no')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                              formData.firstVisit === 'no' 
                                ? 'border-[#13c5dd] bg-[#13c5dd]/5' 
                                : 'border-gray-100 hover:border-[#13c5dd]/30'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.firstVisit === 'no' ? 'border-[#13c5dd]' : 'border-gray-300'}`}>
                              {formData.firstVisit === 'no' && <div className="w-2.5 h-2.5 rounded-full bg-[#13c5dd]" />}
                            </div>
                            <span className={`font-medium ${formData.firstVisit === 'no' ? 'text-[#13c5dd]' : 'text-gray-600'}`}>No, returning patient</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div variants={itemVariants} className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full btn-primary h-14 text-lg shadow-xl shadow-[#13c5dd]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Confirm Appointment
                              <Shield className="w-5 h-5" />
                            </>
                          )}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3" />
                          Your personal information is securely encrypted.
                        </p>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default BookAppointment;