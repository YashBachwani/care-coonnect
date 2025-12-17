import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceModal({ service, isOpen, onClose }) {
  if (!service) return null;

  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="relative bg-[#13c5dd]/5 p-6 border-b border-[#13c5dd]/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#13c5dd] flex items-center justify-center text-white shadow-lg shadow-[#13c5dd]/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{service.name}</h2>
                    <p className="text-sm text-[#13c5dd] font-medium">{service.category}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {service.fullDescription}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Duration</span>
                    <p className="font-semibold text-gray-900">{service.duration}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Starting From</span>
                    <p className="font-semibold text-[#13c5dd]">{service.price}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Key Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#13c5dd] mt-0.5 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Procedure Steps</h3>
                  <div className="space-y-4">
                    {service.steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#13c5dd]/10 text-[#13c5dd] text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-sm text-gray-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <Link to={`/book-appointment?service=${service.id}`} onClick={onClose}>
                  <button className="w-full bg-[#13c5dd] text-white font-bold py-4 rounded-xl shadow-xl shadow-[#13c5dd]/25 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                    Book Appointment Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}