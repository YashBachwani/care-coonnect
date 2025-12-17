import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Calendar, ChevronDown, ChevronUp, 
  CheckCircle, Clock, AlertCircle, TrendingUp 
} from 'lucide-react';

// --- SUB-COMPONENT: CIRCULAR PROGRESS CHART ---
const CircularProgress = ({ percentage, color = "#13c5dd" }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-700">{percentage}%</span>
    </div>
  );
};

// --- SUB-COMPONENT: SPARKLINE GRAPH (Recovery Trend) ---
const Sparkline = ({ data }) => {
  // Simple SVG graph generation
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / (max - min)) * 80 - 10; // Normalize to 10-90% height
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-24 h-12">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <polyline
          fill="none"
          stroke="#13c5dd"
          strokeWidth="3"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Area fill */}
        <polygon
          fill="rgba(19, 197, 221, 0.1)"
          points={`0,100 ${points} 100,100`}
        />
      </svg>
    </div>
  );
};

// --- MAIN COMPONENT ---
const TreatmentsModule = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [expandedId, setExpandedId] = useState(null);

  const treatments = [
    { 
      id: 1, 
      name: 'Invisalign Treatment', 
      type: 'Orthodontics',
      progress: 65, 
      status: 'active',
      nextSession: 'Nov 12, 2025', 
      recoveryTrend: [2, 4, 6, 7, 8, 9, 9], // Mock data for graph (1-10 scale)
      timeline: [
        { title: 'Initial Consultation', date: 'Aug 10', status: 'completed' },
        { title: '3D Scan & Planning', date: 'Aug 15', status: 'completed' },
        { title: 'First Set Fitting', date: 'Sep 01', status: 'completed' },
        { title: 'Adjustment #3', date: 'Nov 12', status: 'upcoming' },
        { title: 'Final Retainers', date: 'Jan 20', status: 'pending' },
      ]
    },
    { 
      id: 2, 
      name: 'Root Canal Therapy', 
      type: 'Endodontics',
      progress: 100, 
      status: 'completed',
      nextSession: 'Treatment Finished', 
      recoveryTrend: [1, 2, 5, 8, 10, 10], 
      timeline: [
        { title: 'Diagnosis & X-Ray', date: 'Sep 01', status: 'completed' },
        { title: 'Pulp Removal', date: 'Sep 02', status: 'completed' },
        { title: 'Filling & Sealing', date: 'Sep 10', status: 'completed' },
        { title: 'Permanent Crown', date: 'Sep 24', status: 'completed' },
      ]
    },
    { 
      id: 3, 
      name: 'Teeth Whitening', 
      type: 'Cosmetic',
      progress: 30, 
      status: 'active',
      nextSession: 'Oct 30, 2025', 
      recoveryTrend: [5, 6, 8, 8], 
      timeline: [
        { title: 'Shade Assessment', date: 'Oct 01', status: 'completed' },
        { title: 'Session 1', date: 'Oct 05', status: 'completed' },
        { title: 'Session 2', date: 'Oct 30', status: 'upcoming' },
      ]
    },
  ];

  const filteredTreatments = treatments.filter(t => 
    activeTab === 'all' ? true : t.status === activeTab
  );

  return (
    <div className="space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Treatment Progress</h2>
          <p className="text-gray-500 text-sm">Track your ongoing procedures and recovery.</p>
        </div>
        
        {/* Custom Tabs */}
        <div className="bg-gray-100 p-1 rounded-xl flex items-center">
          {['active', 'completed', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
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
      <div className="grid lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTreatments.map((t) => (
            <motion.div 
              layout
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-3xl p-6 shadow-sm border transition-all hover:shadow-md ${
                expandedId === t.id ? 'border-[#13c5dd] ring-1 ring-[#13c5dd]/20' : 'border-gray-100'
              }`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#13c5dd]/10 text-[#13c5dd] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {t.type}
                    </span>
                    {t.status === 'completed' && (
                      <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle size={10} /> Done
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{t.name}</h3>
                </div>
                
                {/* Circular Graph */}
                <div className="flex-shrink-0">
                  <CircularProgress percentage={t.progress} />
                </div>
              </div>

              {/* Data Row: Next Session & Graph */}
              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 mb-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Next Session</p>
                  <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                    <Calendar size={16} className="text-[#13c5dd]" />
                    {t.nextSession}
                  </div>
                </div>
                
                {/* Sparkline Graph */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <TrendingUp size={12} className="text-green-500" />
                    <p className="text-xs text-gray-400 uppercase font-bold">Comfort Trend</p>
                  </div>
                  <Sparkline data={t.recoveryTrend} />
                </div>
              </div>

              {/* Toggle Details Button */}
              <button 
                onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#13c5dd] transition-colors py-2 border-t border-gray-100"
              >
                {expandedId === t.id ? 'Hide Details' : 'View Timeline & Details'}
                {expandedId === t.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Expanded Section (Timeline) */}
              <AnimatePresence>
                {expandedId === t.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-gray-100 mt-2">
                      <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Activity size={16} className="text-[#13c5dd]" /> Treatment Roadmap
                      </h4>
                      
                      <div className="space-y-0 pl-2">
                        {t.timeline.map((step, index) => (
                          <div key={index} className="flex gap-4 relative pb-6 last:pb-0">
                            {/* Vertical Line */}
                            {index !== t.timeline.length - 1 && (
                              <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-gray-100" />
                            )}
                            
                            {/* Dot Indicator */}
                            <div className={`z-10 w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 ${
                              step.status === 'completed' 
                                ? 'bg-[#13c5dd] border-[#13c5dd]' 
                                : step.status === 'upcoming' 
                                ? 'bg-white border-[#13c5dd] animate-pulse' 
                                : 'bg-gray-100 border-gray-300'
                            }`} />
                            
                            {/* Content */}
                            <div>
                              <p className={`text-sm font-medium ${
                                step.status === 'completed' ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {step.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {t.status === 'active' && (
                        <button className="w-full mt-6 bg-[#13c5dd]/10 text-[#13c5dd] font-bold py-3 rounded-xl hover:bg-[#13c5dd] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
                          <Clock size={16} /> Reschedule Next Session
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTreatments.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
          <AlertCircle size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">No treatments found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default TreatmentsModule;