import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LayoutDashboard, LogOut, ChevronDown, ShieldCheck, Stethoscope } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png"; 

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // --- HELPER FUNCTIONS ---

  // 1. Get Dashboard Route based on Role
  const getDashboardPath = () => {
    const role = user?.role?.toLowerCase();
    switch (role) {
      case 'admin': return "/dashboard/admin";
      case 'doctor': return "/dashboard/doctor";
      case 'patient': return "/dashboard/patient";
      default: return "/dashboard/patient"; // Fallback
    }
  };

  // 2. Get Display Label for Role
  const getRoleLabel = () => {
    const role = user?.role?.toLowerCase();
    switch (role) {
      case 'admin': return "System Admin";
      case 'doctor': return "Doctor";
      case 'patient': return "Patient";
      default: return "User";
    }
  };

  // 3. Get Role Icon
  const getRoleIcon = () => {
    const role = user?.role?.toLowerCase();
    if (role === 'admin') return <ShieldCheck size={18} />;
    if (role === 'doctor') return <Stethoscope size={18} />;
    return <User size={18} />;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-navbar py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img
              src={logo}
              alt="Care Connect"
              className="h-10 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="font-bold text-lg text-foreground group-hover:text-[#13c5dd] transition-colors hidden sm:block">
              Care Connect
            </span>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-colors duration-300 ${
                    isActive ? "text-[#13c5dd]" : "text-foreground/80 hover:text-[#13c5dd]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#13c5dd] rounded-full" />
                  )}
                  {!isActive && (
                    <motion.span
                      className="absolute left-0 -bottom-1 h-[2px] bg-[#13c5dd] rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* --- DESKTOP ACTIONS --- */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Show Book Now only if not admin/doctor (optional, mostly for patients/guests) */}
            {(!user || user.role === 'patient') && (
              <Link to="/book-appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#13c5dd] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-[#13c5dd]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Book Now
                </motion.button>
              </Link>
            )}

            {/* PROFILE DROPDOWN */}
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                    isProfileOpen 
                      ? "border-[#13c5dd] bg-[#13c5dd]/5 ring-2 ring-[#13c5dd]/20" 
                      : "border-gray-200 bg-white hover:border-[#13c5dd]/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    user?.role === 'admin' ? 'bg-purple-600' : 'bg-[#13c5dd]'
                  }`}>
                    {getRoleIcon()}
                  </div>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.fullName || "User"}</p>
                        <p className="text-xs text-gray-500 truncate mb-2">{user?.email}</p>
                        
                        <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          user?.role === 'admin' 
                            ? 'text-purple-600 bg-purple-100' 
                            : 'text-[#13c5dd] bg-[#13c5dd]/10'
                        }`}>
                          {getRoleLabel()}
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link 
                          to={getDashboardPath()} 
                          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <LayoutDashboard size={16} className={user?.role === 'admin' ? 'text-purple-600' : 'text-[#13c5dd]'} />
                          {user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                        </Link>
                        
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#13c5dd] font-semibold text-sm hover:bg-[#13c5dd]/10 px-4 py-2.5 rounded-full transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
            )}
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-navbar mt-2 mx-4 rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                      isActive
                        ? "bg-[#13c5dd] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <hr className="border-gray-100 my-2" />

              {isLoggedIn ? (
                <>
                  {/* Mobile Profile Section */}
                  <div className="flex items-center gap-3 px-4 py-2 mb-2 bg-gray-50 rounded-xl border border-gray-100">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      user?.role === 'admin' ? 'bg-purple-600' : 'bg-[#13c5dd]'
                    }`}>
                      {getRoleIcon()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <span className="text-[10px] font-bold text-[#13c5dd] uppercase mt-0.5 block">{getRoleLabel()}</span>
                    </div>
                  </div>

                  <Link 
                    to={getDashboardPath()}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
                  >
                    <LayoutDashboard size={18} className={user?.role === 'admin' ? 'text-purple-600' : 'text-[#13c5dd]'} />
                    {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/auth">
                    <button className="w-full py-3 rounded-xl border border-[#13c5dd] text-[#13c5dd] font-semibold text-sm">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/auth">
                    <button className="w-full py-3 rounded-xl bg-[#13c5dd] text-white font-semibold text-sm shadow-md">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
              
              {(!user || user?.role === 'patient') && (
                 <Link to="/book-appointment">
                   <button className="w-full mt-2 py-3 rounded-xl bg-gray-900 text-white font-semibold text-sm">
                     Book Appointment
                   </button>
                 </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}