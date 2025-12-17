import React, { useState } from 'react';
import { Star, Send, User } from 'lucide-react';
import { toast } from 'sonner';

// Mock list of all 4 doctors
const doctorsList = [
  { id: 1, name: 'Dr. Sarah Smith', specialty: 'Dentist' },
  { id: 2, name: 'Dr. John Doe', specialty: 'Orthodontist' },
  { id: 3, name: 'Dr. Emily White', specialty: 'Pediatric Dentist' },
  { id: 4, name: 'Dr. Michael Brown', specialty: 'Oral Surgeon' },
];

const ReviewsModule = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsList[0].id);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Thank you for your feedback!');
    setRating(0);
    setReview('');
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Review Your Doctor</h2>
        <p className="text-gray-500 text-sm mt-1">Your feedback helps us improve our care.</p>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Doctor Selection Grid */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Select Doctor</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctorsList.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    selectedDoctor === doc.id 
                      ? 'border-[#13c5dd] bg-[#13c5dd]/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedDoctor === doc.id ? 'bg-[#13c5dd] text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <User size={20} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${selectedDoctor === doc.id ? 'text-gray-900' : 'text-gray-600'}`}>
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-400">{doc.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Rate your experience</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setRating(star)} 
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    size={36} 
                    className={`transition-colors ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              {rating === 5 ? "Excellent!" : rating === 4 ? "Good" : rating === 3 ? "Average" : rating > 0 ? "Poor" : "Select a rating"}
            </p>
          </div>

          {/* Text Review */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Your Review</label>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#13c5dd] focus:ring-2 focus:ring-[#13c5dd]/20 resize-none transition-all"
              placeholder="Tell us about your experience..."
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#13c5dd] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#0fb3ca] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#13c5dd]/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} /> Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModule;