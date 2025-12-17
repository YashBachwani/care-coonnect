import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Stethoscope,
  ShieldCheck,
  BriefcaseMedical,
  KeyRound
} from "lucide-react";
import { toast } from "sonner";
import PageTransition from "../components/PageTransition";
import { useAuth } from "../contexts/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("patient"); // 'patient', 'doctor', 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialty: "", // For Doctors
    adminKey: ""   // For Admins
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Pass role to login to ensure they are logging into the correct portal
   const success = login(formData.email, formData.password);


    if (success) {
      toast.success(`Welcome back, ${role.charAt(0).toUpperCase() + role.slice(1)}!`);
      
      // 🟢 REDIRECT LOGIC BASED ON ROLE 🟢
      if (role === 'patient') {
        navigate('/dashboard/patient');
      } else if (role === 'doctor') {
        navigate('/dashboard/doctor');
      } else if (role === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate('/'); // Fallback
      }

    } else {
      toast.error("Invalid email or password");
    }

    setIsSubmitting(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Role specific validation
    if (role === 'doctor' && !formData.specialty) {
      toast.error("Please select your specialty");
      return;
    }

    if (role === 'admin' && formData.adminKey !== "ADMIN123") {
      // Simple hardcoded check for demo purposes
      toast.error("Invalid Admin Secret Key");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const success = signup(
      formData.fullName,
      formData.email,
      formData.phone,
      formData.password,
      role,
      role === 'doctor' ? formData.specialty : null
    );

    if (success) {
      toast.success("Account created successfully! Please login.");
      setIsLogin(true); // Switch to login view after signup
    } else {
      toast.error("Email already exists");
    }

    setIsSubmitting(false);
  };

  // Variants for animations
  const slideVariants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  return (
    <PageTransition>
      <section className="min-h-screen pt-28 pb-12 flex items-center justify-center relative overflow-hidden">
        
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#13c5dd]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#13c5dd]/5 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            
            {/* --- TOP TOGGLE (Login/Signup) --- */}
            <div className="glass-card p-1.5 flex mb-6 relative z-20">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isLogin
                    ? "bg-[#13c5dd] text-white shadow-lg shadow-[#13c5dd]/25"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                  !isLogin
                    ? "bg-[#13c5dd] text-white shadow-lg shadow-[#13c5dd]/25"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="glass-card p-8 relative overflow-hidden shadow-2xl border-white/50">
              
              {/* --- ROLE SELECTOR --- */}
              <div className="mb-8">
                <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Select your role
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'patient', label: 'Patient', icon: User },
                    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
                    { id: 'admin', label: 'Admin', icon: ShieldCheck },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                        role === r.id
                          ? "bg-[#13c5dd]/10 border-[#13c5dd] text-[#13c5dd]"
                          : "bg-white/50 border-transparent hover:bg-gray-50 text-gray-500"
                      }`}
                    >
                      <r.icon className={`w-6 h-6 ${role === r.id ? "scale-110" : "scale-100"} transition-transform`} />
                      <span className="text-xs font-semibold">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* --- FORM CONTENT --- */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isLogin ? `Welcome Back, ${role.charAt(0).toUpperCase() + role.slice(1)}` : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      {isLogin ? "Enter your credentials to access your account" : "Fill in your details to get started"}
                    </p>
                  </div>

                  <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} className="space-y-4">
                    
                    {/* --- SIGNUP ONLY FIELDS --- */}
                    {!isLogin && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-gray-700 pl-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              placeholder="John Doe"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-gray-700 pl-1">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              placeholder="+1 234 567 8900"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        {/* DOCTOR SPECIFIC: SPECIALTY */}
                        {role === 'doctor' && (
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 pl-1">Specialty</label>
                            <div className="relative">
                              <BriefcaseMedical className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                              <select
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                              >
                                <option value="">Select Specialty</option>
                                <option value="General Dentist">General Dentist</option>
                                <option value="Orthodontist">Orthodontist</option>
                                <option value="Pediatric Dentist">Pediatric Dentist</option>
                                <option value="Oral Surgeon">Oral Surgeon</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {/* ADMIN SPECIFIC: SECRET KEY */}
                        {role === 'admin' && (
                          <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 pl-1">Admin Secret Key</label>
                            <div className="relative">
                              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                name="adminKey"
                                value={formData.adminKey}
                                onChange={handleChange}
                                required
                                placeholder="Enter secret key (Demo: ADMIN123)"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* --- COMMON FIELDS (Login & Signup) --- */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 pl-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 pl-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          placeholder="••••••••"
                          className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {!isLogin && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 pl-1">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#13c5dd] focus:border-transparent outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* --- SUBMIT BUTTON --- */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary h-12 shadow-xl shadow-[#13c5dd]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {isLogin ? "Signing in..." : "Creating Account..."}
                          </>
                        ) : (
                          <>
                            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                            {isLogin ? "Sign In" : "Create Account"}
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                          type="button"
                          onClick={() => setIsLogin(!isLogin)}
                          className="text-[#13c5dd] font-semibold hover:underline"
                        >
                          {isLogin ? "Sign up" : "Sign in"}
                        </button>
                      </p>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Demo Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} />
                Secure, Role-Based Authentication
              </p>
            </div>
            
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Auth;