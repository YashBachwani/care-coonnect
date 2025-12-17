import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  service,
  onLearnMore,
  onBook,
  index = 0,
}) {
  const Icon = service.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-full"
    >
      <div className="h-full glass-card p-6 flex flex-col transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#13c5dd]/40 group-hover:shadow-[0_20px_40px_rgba(19,197,221,0.15)]">
        
        {/* Icon Container */}
        <div className="mb-6 inline-flex">
          <div className="w-14 h-14 rounded-2xl bg-[#13c5dd]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#13c5dd]">
            <Icon className="w-7 h-7 text-[#13c5dd] transition-all duration-300 group-hover:text-white group-hover:scale-110" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#13c5dd] transition-colors">
            {service.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            {service.shortDescription}
          </p>
          
          {/* Meta Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-500 border border-gray-100">
              {service.duration}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#13c5dd]/10 text-xs font-medium text-[#13c5dd] border border-[#13c5dd]/20">
              {service.price}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between">
          {onLearnMore && (
            <button
              onClick={() => onLearnMore(service)}
              className="text-sm font-semibold text-gray-600 hover:text-[#13c5dd] flex items-center gap-2 transition-colors group/link"
            >
              Learn more
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </button>
          )}

          {onBook && (
            <button
              onClick={() => onBook(service)}
              className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium transition-all duration-300 hover:bg-[#13c5dd] hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}