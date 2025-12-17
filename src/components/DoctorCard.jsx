import { motion } from "framer-motion";

export default function DoctorCard({ doctor, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-6 group relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />

      {/* Image */}
      <motion.div
        className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <img src={doctor.image} alt={doctor.name} className="w-full h-fulll object-cover" />
      </motion.div>

      {/* Info */}
      <div className="text-center relative z-10">
        <h3 className="font-semibold text-lg text-foreground">{doctor.name}</h3>
        <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
        <p className="text-muted-foreground text-sm mt-1">{doctor.experience} experience</p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {doctor.badges.map((badge, i) => (
            <span key={i} className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              {badge}
            </span>
          ))}
        </div>

        {/* Quote - visible on hover (uses group-hover) */}
        <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100">
          <p className="text-muted-foreground text-sm italic mt-4 pt-4 border-t border-border">
            "{doctor.quote}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
