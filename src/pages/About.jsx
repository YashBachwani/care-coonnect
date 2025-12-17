import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Star, Smile, User, Building, Heart, Shield, 
  Lightbulb, Handshake, Stethoscope, ArrowRight 
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import image1 from '../assets/1.jpg'
import image2 from '../assets/2.jpg'
import image3 from '../assets/3.jpg'


// --- REUSABLE GLOW CARD COMPONENT ---
const GlowCard = ({ children, className = "", delay = 0 }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}
    >
      {/* The Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(19, 197, 221, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center text-center">
        {children}
      </div>
    </motion.div>
  );
};

// --- DATA ARRAYS ---
const stats = [
  { icon: Star, number: "7+", label: "Years of Excellence" },
  { icon: Smile, number: "1k+", label: "Happy Patients" },
  { icon: Stethoscope, number: "5+", label: "Expert Dentists" },
  { icon: Building, number: "3", label: "Clinic Locations" },
];

const values = [
  { icon: Heart, title: "Patient-Centered", desc: "Your comfort and safety are our absolute priority in every decision we make." },
  { icon: Shield, title: "Clinical Excellence", desc: "We maintain the highest standards through continuous education and training." },
  { icon: Handshake, title: "Transparency", desc: "Clear communication about treatments, costs, and expectations." },
  { icon: Lightbulb, title: "Innovation", desc: "Investing in cutting-edge technology for precise, painless results." },
];

const team = [
  { name: "Dr. Trishna Chhbaria", role: "Orthodontist", img: image1 }, 
  { name: "Dr. Yash Bachwani", role: "Endodontist", img: image3 },
  { name: "Dr. Shasvi Doshi", role: "Dental Surgeon", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Dr. Anusha Daryani", role: "Chief Dentist", img: image2 },

];

const About = () => {
  return (
    <PageTransition>
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#e6fcff] to-white">
        {/* Animated Wave SVG */}
        <div className="absolute top-0 right-[-10%] w-[120%] h-full pointer-events-none opacity-30">
           <motion.svg 
             viewBox="0 0 800 800" 
             className="w-full h-full"
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           >
            <defs>
              <linearGradient id="waveGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#13c5dd" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0fb3ca" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path fill="url(#waveGrad)" d="M0 0 C240 120 430 60 800 30 L800 800 L0 800 Z" />
           </motion.svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[#0fb3ca] font-semibold tracking-widest uppercase text-sm mb-4"
            >
              About Care Connect
            </motion.p>
            
            <motion.h1 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
            >
              Transforming Smiles, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13c5dd] to-blue-500">
                Changing Lives
              </span>
            </motion.h1>

            <motion.p 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed"
            >
              For over 15 years, Care Connect has been at the forefront of dental innovation, 
              providing exceptional care that combines advanced technology with a gentle, personal touch.
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <GlowCard key={i} delay={0.4 + (i * 0.1)}>
                  <div className="w-16 h-16 rounded-2xl bg-[#13c5dd]/10 flex items-center justify-center mb-4 text-[#13c5dd]">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-[#13c5dd] rounded-3xl rotate-6 opacity-20 transition-transform group-hover:rotate-12" />
                <img 
                  src="https://images.pexels.com/photos/305565/pexels-photo-305565.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Dental Care History" 
                  className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-[#13c5dd] font-bold text-sm uppercase tracking-wide">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                A Legacy of Caring Smiles
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Care Connect was founded with a simple yet powerful vision: to make 
                  world-class dental care accessible to everyone in our community.
                </p>
                <p>
                  What started as a small practice with just two dentists has grown 
                  into a leading dental care provider. Our founder believed dental visits 
                  should never be stressful or intimidating.
                </p>
                <p>
                  This philosophy has shaped every aspect of our clinic—from the gentle 
                  approach to the warm and welcoming environment we nurture today.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 bg-[#f8fdfe]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
             {/* Mission */}
             <GlowCard className="text-left items-start">
               <div className="w-14 h-14 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-2xl mb-6">🎯</div>
               <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
               <p className="text-gray-600 leading-relaxed">
                 To provide exceptional dental care that improves lives. We're committed to delivering 
                 personalized, compassionate treatment using the latest technology, while making 
                 dental care accessible and stress-free for all.
               </p>
             </GlowCard>

             {/* Vision */}
             <GlowCard className="text-left items-start">
               <div className="w-14 h-14 rounded-full bg-[#13c5dd]/10 flex items-center justify-center text-2xl mb-6">💚</div>
               <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
               <p className="text-gray-600 leading-relaxed">
                 To be the most trusted dental care provider in the region, known for clinical excellence, 
                 innovative treatments, and the genuine relationships we build with every patient who 
                 walks through our doors.
               </p>
             </GlowCard>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <span className="text-[#13c5dd] font-bold text-sm uppercase">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Values That Guide Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <GlowCard key={i} delay={i * 0.1}>
                <div className="w-16 h-16 rounded-full bg-[#e0fafb] flex items-center justify-center mb-6 text-[#13c5dd]">
                  <val.icon size={28} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Team</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Our team of experienced specialists is dedicated to your oral health and smile aesthetics.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-6 shadow-lg">
                  <div className="absolute inset-0 bg-[#13c5dd]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Social overlay or extra info could go here */}
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#13c5dd] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FLOATING CTA (Mobile/Desktop) --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Link to="/book-appointment">
          <button className="bg-[#13c5dd] text-white px-6 py-4 rounded-full font-bold shadow-lg shadow-[#13c5dd]/40 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all flex items-center gap-2">
            Book Appointment
            <ArrowRight size={20} />
          </button>
        </Link>
      </motion.div>
    </PageTransition>
  );
};

export default About;