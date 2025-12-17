import React, { useState } from 'react';
import { Pill, Clock, AlertCircle, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrescriptionsModule = () => {
  const [activeTab, setActiveTab] = useState('active');

  const meds = [
    { 
      id: 1, 
      name: 'Amoxicillin',
      strength: '500mg',
      type: 'Antibiotic',
      dosage: '1 tablet every 8 hours', 
      duration: '5 Days remaining', 
      status: 'active',
      schedule: ['Morning', 'Afternoon', 'Night'],
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=200&h=200" 
    },
    { 
      id: 2, 
      name: 'Ibuprofen', 
      strength: '400mg',
      type: 'Pain Relief',
      dosage: 'Take as needed for pain', 
      duration: '3 Days remaining', 
      status: 'active',
      schedule: ['As Needed'],
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200"
    },
    { 
      id: 3, 
      name: 'Vitamin D3', 
      strength: '1000 IU',
      type: 'Supplement',
      dosage: '1 capsule daily', 
      duration: 'Completed', 
      status: 'past',
      schedule: ['Morning'],
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200"
    },
  ];

  const filteredMeds = meds.filter(m => activeTab === 'all' ? true : m.status === activeTab);

  return (
    <div className="space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Prescriptions</h2>
          <p className="text-gray-500 text-sm">Manage your medications and refills.</p>
        </div>
        
        <div className="bg-gray-100 p-1 rounded-xl flex items-center">
          {['active', 'past', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-white text-[#13c5dd] shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMeds.map((med) => (
            <motion.div 
              layout
              key={med.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-5">
                {/* Medicine Image */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <img 
                    src={med.image} 
                    alt={med.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{med.name}</h4>
                      <p className="text-sm text-[#13c5dd] font-medium">{med.strength} • {med.type}</p>
                    </div>
                    {med.status === 'active' ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                        Active
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                        Past
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <Clock size={14} className="text-[#13c5dd]" />
                      <span>{med.dosage}</span>
                    </div>
                    
                    {/* Schedule Pills */}
                    <div className="flex gap-2 flex-wrap">
                      {med.schedule.map((time, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-[#13c5dd]/10 text-[#13c5dd] px-2 py-1 rounded-md border border-[#13c5dd]/20">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                  <AlertCircle size={12} /> {med.duration}
                </span>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-[#13c5dd] hover:bg-[#13c5dd]/5 rounded-lg transition-colors" title="Prescription PDF">
                    <FileText size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#13c5dd] hover:bg-[#13c5dd]/5 rounded-lg transition-colors" title="Download">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredMeds.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
          <Pill size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">No prescriptions found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionsModule;