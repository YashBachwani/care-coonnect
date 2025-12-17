import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Shield, Clock, ArrowRight } from 'lucide-react';

import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import FAQAccordion from '../components/FAQAccordion';
import { services, categories } from '../data/services';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const handleLearnMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBook = (service) => {
    navigate(`/book-appointment?service=${service.id}`);
  };

  const generalFaqs = [
    { question: 'Do you accept insurance?', answer: 'Yes, we accept most major dental insurance plans. Please contact us or bring your insurance card during your visit for verification.' },
    { question: 'What are your payment options?', answer: 'We accept cash, credit/debit cards, and offer flexible payment plans for extensive treatments. We also partner with financing options for your convenience.' },
    { question: 'How do I prepare for my first visit?', answer: 'Please arrive 15 minutes early to complete paperwork. Bring your insurance card, ID, and any relevant dental records. Avoid eating for 2 hours if having a procedure.' },
    { question: 'Do you offer emergency dental services?', answer: 'Yes! We reserve time slots for dental emergencies. Call our emergency line for same-day appointments when you need immediate care.' },
    { question: 'Is dental treatment painful?', answer: 'We prioritize your comfort with modern anesthesia and gentle techniques. Most patients report minimal to no discomfort during procedures.' },
  ];

  const treatmentSteps = [
    { step: 1, title: 'Online Booking', description: 'Schedule your appointment through our website or by phone' },
    { step: 2, title: 'Consultation', description: 'Meet with our dentist for a thorough examination and treatment plan' },
    { step: 3, title: 'Treatment', description: 'Receive your personalized treatment with care and comfort' },
    { step: 4, title: 'Follow-up', description: 'Get aftercare guidance and schedule follow-up visits as needed' },
  ];

  return (
    <PageTransition>
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#13c5dd]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#13c5dd]/5 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#13c5dd]/10 text-[#13c5dd] font-semibold text-sm mb-6 tracking-wide">
              OUR SERVICES
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Comprehensive Dental <br />
              <span className="text-transparent bg-clip-text bg-[#13c5dd]">
                Solutions For You
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              From preventive care to advanced cosmetic treatments, we combine technology with compassion to give you the smile you deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CATEGORY FILTER --- */}
      <section className="sticky top-20 z-30 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide md:justify-center">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-[#13c5dd] text-white shadow-lg shadow-[#13c5dd]/25'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onLearnMore={handleLearnMore}
                  onBook={handleBook}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">No services found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- JOURNEY TIMELINE --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#13c5dd] font-semibold text-sm uppercase tracking-wider">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Your Journey to a Better Smile</h2>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Center Line (Hidden on Mobile, Visible Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#13c5dd]/10 via-[#13c5dd] to-[#13c5dd]/10 -translate-x-1/2" />
            
            {/* Mobile Line */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#13c5dd]/10 via-[#13c5dd] to-[#13c5dd]/10" />

            <div className="space-y-12">
              {treatmentSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-center md:justify-between ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Empty space for desktop layout balance */}
                  <div className="hidden md:block w-5/12" />

                  {/* Center Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#13c5dd] z-10 shadow-[0_0_0_4px_rgba(19,197,221,0.2)]" />

                  {/* Content Card */}
                  <div className="ml-16 md:ml-0 md:w-5/12 w-full">
                    <div className="glass-card p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300 border-l-4 border-l-[#13c5dd]">
                      <div className="text-[#13c5dd] text-sm font-bold mb-2 uppercase tracking-wide">
                        Step 0{step.step}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 bg-[#13c5dd]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Care Connect Difference</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Modern Tech', desc: 'Precision treatments' },
              { icon: Heart, title: 'Gentle Care', desc: 'Patient-first approach' },
              { icon: Shield, title: 'Top Experts', desc: 'Decades of experience' },
              { icon: Clock, title: 'Flexible Hours', desc: 'Weekends available' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm text-center border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto bg-[#13c5dd]/10 rounded-2xl flex items-center justify-center mb-4 text-[#13c5dd]">
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={generalFaqs} />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#13c5dd] to-blue-900 text-white p-12 md:p-12 text-center"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to Transform Your Smile?</h2>
              <p className="text-white/90 text-lg mb-10">
                Book your appointment today and take the first step towards a healthier, happier you.
              </p>
              <button
                onClick={() => navigate('/book-appointment')}
                className="bg-white text-[#13c5dd] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 mx-auto"
              >
                Book Appointment
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageTransition>
  );
};

export default Services;