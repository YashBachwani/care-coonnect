import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
} from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden"
      style={{ backgroundColor: "#1d2a4d" }} // ★ New Theme Color
    >
      {/* Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#13c5dd20] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#13c5dd15] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Care Connect" className="h-12 w-auto" />
              <div>
                <h3 className="font-bold text-xl">Care Connect</h3>
                <p className="text-xs text-white/70">Reason to Smile</p>
              </div>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted partner in dental care. We combine modern technology
              with compassionate service to give you the smile you deserve.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-[#13c5dd] transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "About", "Contact", "Book Appointment"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Book Appointment" ? "/book-appointment" : `/${item.toLowerCase()}`}
                    className="text-white/70 hover:text-[#13c5dd] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {["Root Canal", "Teeth Alignment", "Cosmetic Dentistry", "Oral Hygiene", "Cavity Inspection"].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-white/70 hover:text-[#13c5dd] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#13c5dd]" />
                123 Healthcare Street, Ahmedabad , Gujarat , 382340
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#13c5dd]" />
                +91 9662433151
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#13c5dd]" />
                hello@careconnect.com
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[#13c5dd]" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p>Sat: 9:00 AM - 5:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#13c5dd40] to-[#13c5dd20] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-lg text-white">Ready for your best smile?</h4>
            <p className="text-white/70 text-sm">
              Book your appointment today and experience the difference.
            </p>
          </div>

          <Link to="/book-appointment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-xl font-semibold text-[#1d2a4d] bg-white hover:bg-[#e8fdff] transition-all"
            >
              Book Appointment
            </motion.button>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Care Connect. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#13c5dd] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#13c5dd] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Scroll To Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 right-8 p-3 rounded-full bg-[#13c5dd] text-white shadow-lg"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
