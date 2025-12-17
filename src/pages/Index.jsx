import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Star, Award, ChevronRight, Phone } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import ServiceCard from '../components/ServiceCard';
import DoctorCard from '../components/DoctorCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { services } from '../data/services';
import { doctors } from '../data/doctors';

const Home = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Animated blobs */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
              >
                <Star className="w-4 h-4 fill-[#13c5dd] border-[#13c5dd]" />
                Reason To Smile 😊
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Smarter Dental Care with{' '}
                <span className="gradient-text">Care Connect</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Experience modern dentistry with a personal touch. From routine check-ups to smile makeovers, we make dental care easy, comfortable, and convenient.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book-appointment">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </motion.button>
                </Link>
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    View Services
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
                  ].map((src, i) => (
                    <img 
                      key={i}
                      src={src}
                      alt="Patient"
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">1,000+ Happy Patients</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                          key={i}
                          className="
                            w-4 h-4
                            fill-[#13c5dd]
                            text-[#13c5dd]
                            transition-all
                            duration-300
                            hover:scale-110
                            hover:drop-shadow-[0_0_8px_rgba(19,197,221,0.9)]
                          "
                          fill="currentColor"
                        />

                    ))}
                    <span className="text-sm text-muted-foreground ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=700&fit=crop"
                  alt="Modern dental care"
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                />
              </motion.div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-16 top-1/4 glass-card p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                 <div>
                  <p className="text-xs text-muted-foreground">Expert Team</p>
                  <p className="font-semibold text-foreground">5+ Dentists</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -right-6 bottom-1/4 glass-card p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Certified</p>
                  <p className="font-semibold text-foreground">ISO 9001</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, scale:0.8 }}
          animate={{ opacity: 1, scale:1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          {/* Mouse Body */}
          <div className="relative w-[26px] h-[42px] rounded-full border-2 border-[#13c5dd] flex justify-center items-start bg-transparent shadow-[0_0_20px_rgba(19,197,221,0.25)]">

            {/* Scroll Wheel */}
            <motion.span
          animate={{ y: [4, 14, 4], opacity: [1, 0.4, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-[8px]
            left-1/2
            -translate-x-1/2
            w-[4px]
            h-[8px]
            rounded-full
            bg-[#13c5dd]
          "
        />

          </div>
        </motion.div>

      </section>

      {/* Services Preview */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-primary font-medium">Our Services</span>

                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Comprehensive Dental Care
                </h2>

                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  From routine check-ups to advanced treatments, we offer a full range of
                  dental services to keep your smile healthy and beautiful.
                </p>
              </div>
            </ScrollReveal>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    btn-outline
                    group
                    flex items-center gap-2
                    mx-auto
                  "
                >
                  View All Services

                  <ChevronRight
                    className="
                      w-4 h-4
                      text-[#13c5dd]
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:text-[#13c5dd]
                      group-hover:drop-shadow-[0_0_8px_rgba(19,197,221,0.6)]
                    "
                  />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>


      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 7, suffix: '+', label: 'Years Experience' },
                { value: 1000, suffix: '+', label: 'Happy Patients' },
                { value: 50, suffix: '+', label: '5-Star Reviews' },
                { value: 5, suffix: '+', label: 'Expert Dentists' },
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold gradient-text">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=500&fit=crop"
                alt="Our clinic"
                className="rounded-3xl shadow-xl w-full"
              />
            </ScrollReveal>

            <ScrollReveal direction="right">
              <span className="text-primary font-medium">About Care Connect</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Your Smile is Our Priority
              </h2>
              <p className="text-muted-foreground mb-6">
                At Care Connect, we believe everyone deserves a healthy, beautiful smile. Our state-of-the-art clinic combines cutting-edge technology with compassionate care to deliver exceptional dental experiences.
              </p>
              <p className="text-muted-foreground mb-8">
                From the moment you walk through our doors, you'll experience the Care Connect difference – a warm welcome, personalized attention, and treatment that puts your comfort first.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Advanced Technology',
                  'Gentle Approach',
                  'Flexible Scheduling',
                  'Affordable Care'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Learn More About Us
                </motion.button>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-medium">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Meet Our Expert Dentists
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Our team of experienced, caring professionals is dedicated to providing you with the highest quality dental care.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-medium">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                What Our Patients Say
              </h2>
            </div>
          </ScrollReveal>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 md:p-16 shadow-xl"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    rgba(255, 255, 255, 0.65) 0%,
                    rgba(235, 250, 255, 0.95) 100%
                  )
                `,
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(19,197,221,0.15)",
              }}
            >

              {/* Floating blur orbs */}
              <motion.div
                className="absolute top-0 left-0 w-72 h-72 bg-[#13c5dd]/25 rounded-full blur-3xl"
                animate={{
                  x: [0, 40, -20, 30, 0],
                  y: [0, -30, 40, -20, 0],
                  scale: [1, 1.1, 0.95, 1.05, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute bottom-0 right-0 w-64 h-64 bg-[#13c5dd]/15 rounded-full blur-[90px]"
                animate={{
                  x: [0, -50, 20, -30, 0],
                  y: [0, 20, -40, 30, 0],
                  scale: [1, 1.08, 0.92, 1.03, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Gloss diagonal shine */}
              <div
                className="absolute inset-0 opacity-[0.22] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                }}
              />

              {/* CONTENT */}
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Still Have Questions?
                </h2>

                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We're here to help! Contact us anytime to learn more or book your appointment.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="btn-primary px-10"
                    >
                      Contact Us
                    </motion.button>
                  </Link>

                  <a href="tel:+919662433151">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="btn-outline px-10 flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
