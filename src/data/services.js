import { 
  Heart, 
  Smile, 
  Sparkles, 
  Shield, 
  Video, 
  Search, 
  Zap, 
  Users 
} from "lucide-react";

export const services = [
  {
    id: "root-canal",
    name: "Root Canal",
    shortDescription:
      "Painless root canal treatment with modern techniques and equipment for lasting relief.",
    fullDescription:
      "Our advanced root canal therapy removes infected pulp tissue while preserving your natural tooth. Using state-of-the-art rotary instruments and digital imaging, we ensure a comfortable, efficient procedure.",
    icon: Heart,
    category: "Restorative Care",
    duration: "60-90 mins",
    price: "₹8,000",
    benefits: [
      "Preserves natural tooth",
      "Eliminates pain and infection",
      "Prevents extraction",
      "High success rate (95%+)"
    ],
    steps: [
      "Digital X-ray and diagnosis",
      "Local anesthesia administration",
      "Pulp removal and cleaning",
      "Canal shaping and disinfection",
      "Filling and sealing",
      "Crown placement (if needed)"
    ],
    faqs: [
      {
        question: "Is root canal painful?",
        answer:
          "With modern anesthesia, root canals are virtually painless. Most patients compare it to getting a filling."
      },
      {
        question: "How long does recovery take?",
        answer:
          "Most patients return to normal activities the next day. Minor sensitivity may last a few days."
      }
    ]
  },

  {
    id: "teeth-alignment",
    name: "Teeth Alignment",
    shortDescription:
      "Invisible aligners and braces for a perfectly straight, confident smile.",
    fullDescription:
      "Transform your smile with our comprehensive orthodontic solutions. Choose from traditional braces, ceramic braces, or virtually invisible clear aligners for discreet treatment.",
    icon: Smile,
    category: "Orthodontics",
    duration: "6-18 months",
    price: "₹45,000",
    benefits: [
      "Improved smile aesthetics",
      "Better oral hygiene access",
      "Corrected bite issues",
      "Boosted confidence"
    ],
    steps: [
      "Initial consultation and 3D scan",
      "Custom treatment plan creation",
      "Aligner/brace fitting",
      "Regular progress check-ups",
      "Refinement adjustments",
      "Retainer fitting"
    ],
    faqs: [
      {
        question: "Are clear aligners effective?",
        answer:
          "Yes! Clear aligners can treat most mild to moderate alignment issues with the same effectiveness as traditional braces."
      },
      {
        question: "How often do I need check-ups?",
        answer:
          "Typically every 4-6 weeks to monitor progress and receive new aligners."
      }
    ]
  },

  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    shortDescription:
      "Veneers, bonding, and whitening to enhance your natural beauty.",
    fullDescription:
      "Achieve your dream smile with our cosmetic treatments. From professional whitening to porcelain veneers, we craft personalized solutions for stunning, natural-looking results.",
    icon: Sparkles,
    category: "Cosmetic Dentistry",
    duration: "1-3 visits",
    price: "₹15,000",
    benefits: [
      "Dramatically improved appearance",
      "Long-lasting results",
      "Stain-resistant materials",
      "Natural-looking aesthetics"
    ],
    steps: [
      "Smile analysis consultation",
      "Digital smile design preview",
      "Tooth preparation (if needed)",
      "Custom veneer/crown fabrication",
      "Final placement and adjustments",
      "Aftercare guidance"
    ],
    faqs: [
      {
        question: "How long do veneers last?",
        answer:
          "With proper care, porcelain veneers typically last 10-15 years or longer."
      },
      {
        question: "Will my teeth look natural?",
        answer:
          "Absolutely! We customize shade, shape, and translucency to match your natural teeth perfectly."
      }
    ]
  },

  {
    id: "oral-hygiene",
    name: "Oral Hygiene",
    shortDescription:
      "Professional cleaning and preventive care for optimal dental health.",
    fullDescription:
      "Maintain excellent oral health with our comprehensive hygiene services. Our skilled hygienists provide thorough cleanings, fluoride treatments, and personalized home care instructions.",
    icon: Shield,
    category: "Preventive Care",
    duration: "30-45 mins",
    price: "₹1,500",
    benefits: [
      "Removes plaque and tartar",
      "Prevents gum disease",
      "Freshens breath",
      "Early problem detection"
    ],
    steps: [
      "Oral health assessment",
      "Ultrasonic scaling",
      "Hand scaling and polishing",
      "Fluoride application",
      "Home care instructions",
      "Next visit scheduling"
    ],
    faqs: [
      {
        question: "How often should I get cleaning?",
        answer:
          "We recommend professional cleaning every 6 months, or more frequently if you have gum disease."
      },
      {
        question: "Does scaling damage teeth?",
        answer:
          "No, professional scaling removes harmful deposits without damaging your enamel."
      }
    ]
  },

  {
    id: "live-advisory",
    name: "Live Advisory",
    shortDescription:
      "Virtual consultations with our experts from the comfort of your home.",
    fullDescription:
      "Connect with our dental specialists through secure video consultations. Get professional advice, treatment recommendations, and follow-up care without leaving your home.",
    icon: Video,
    category: "Digital / Online Care",
    duration: "20-30 mins",
    price: "₹500",
    benefits: [
      "Convenient home consultations",
      "Quick professional advice",
      "No travel required",
      "Secure video platform"
    ],
    steps: [
      "Book online appointment",
      "Receive video link",
      "Connect at scheduled time",
      "Discuss concerns with dentist",
      "Receive treatment recommendations",
      "Schedule in-person visit if needed"
    ],
    faqs: [
      {
        question: "What issues can be addressed online?",
        answer:
          "We can provide advice on pain, emergencies, second opinions, and post-treatment follow-ups."
      },
      {
        question: "Do I need special software?",
        answer:
          "No, our platform works in your web browser on any device with a camera."
      }
    ]
  },

  {
    id: "cavity-inspection",
    name: "Cavity Inspection",
    shortDescription:
      "Advanced digital diagnosis to detect cavities early and prevent damage.",
    fullDescription:
      "Our comprehensive cavity detection uses digital X-rays and intraoral cameras to identify decay at its earliest stages, allowing for minimally invasive treatment.",
    icon: Search,
    category: "Preventive Care",
    duration: "30 mins",
    price: "₹800",
    benefits: [
      "Early cavity detection",
      "Low radiation X-rays",
      "Prevents extensive damage",
      "Visual explanation with images"
    ],
    steps: [
      "Visual examination",
      "Digital X-ray imaging",
      "Intraoral camera inspection",
      "Findings discussion",
      "Treatment plan if needed",
      "Prevention recommendations"
    ],
    faqs: [
      {
        question: "Are digital X-rays safe?",
        answer:
          "Yes, digital X-rays use up to 90% less radiation than traditional X-rays."
      },
      {
        question: "How often should I get checked?",
        answer:
          "We recommend cavity checks during your regular 6-month check-ups."
      }
    ]
  },

  {
    id: "dental-implants",
    name: "Dental Implants",
    shortDescription:
      "Permanent tooth replacement that looks, feels, and functions like natural teeth.",
    fullDescription:
      "Replace missing teeth with titanium implants that fuse with your jawbone. Our implants provide a stable foundation for crowns, bridges, or dentures.",
    icon: Zap,
    category: "Restorative Care",
    duration: "3-6 months",
    price: "₹35,000",
    benefits: [
      "Permanent solution",
      "Preserves bone structure",
      "Natural appearance",
      "Easy maintenance"
    ],
    steps: [
      "3D CT scan and planning",
      "Implant placement surgery",
      "Healing period (osseointegration)",
      "Abutment placement",
      "Crown fabrication",
      "Final restoration"
    ],
    faqs: [
      {
        question: "How long do implants last?",
        answer:
          "With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years."
      },
      {
        question: "Am I a candidate for implants?",
        answer:
          "Most adults with healthy gums and adequate bone are good candidates. We'll assess during consultation."
      }
    ]
  },

  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    shortDescription:
      "Gentle, friendly dental care designed especially for children.",
    fullDescription:
      "Create positive dental experiences for your little ones. Our child-friendly approach, colorful environment, and gentle techniques make visits fun and stress-free.",
    icon: Users,
    category: "Preventive Care",
    duration: "30-45 mins",
    price: "₹1,200",
    benefits: [
      "Child-friendly environment",
      "Gentle, patient approach",
      "Preventive focus",
      "Parent education"
    ],
    steps: [
      "Welcome and familiarization",
      "Gentle examination",
      "Age-appropriate cleaning",
      "Fluoride treatment",
      "Fun rewards and stickers",
      "Parent guidance session"
    ],
    faqs: [
      {
        question: "At what age should my child first visit?",
        answer:
          "We recommend the first visit by age 1, or within 6 months of the first tooth appearing."
      },
      {
        question: "How do you handle anxious children?",
        answer:
          "Our team is specially trained in gentle techniques, distraction methods, and creating a calm, fun environment."
      }
    ]
  }
];

export const categories = [
  "All",
  "Preventive Care",
  "Restorative Care",
  "Cosmetic Dentistry",
  "Orthodontics",
  "Digital / Online Care"
];