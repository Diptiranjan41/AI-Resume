import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Heart,
  Zap,
  Upload,
  X,
  FileText,
  CheckCircle,
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  TrendingUp,
  BarChart3,
  Filter,
  Download,
  Share2,
  Eye,
  Clock as ClockIcon,
  CheckSquare,
  XCircle,
  Award as AwardIcon,
  MessageSquare,
  Lock,
  Unlock,
  Users,
  Settings,
  Bell,
  Shield,
  Edit,
  Send,
  MoreVertical,
  Star,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Trash2,
  RotateCcw,
  BarChart,
  Target,
  PieChart,
  Activity,
  ChevronDown,
  ChevronUp,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Linkedin,
  Github,
  Globe,
  FileCode,
  Coffee,
  Rocket,
  Crown,
  Sparkles,
  Brain,
  Lightbulb,
  Shield as ShieldIcon,
  Zap as ZapIcon
} from 'lucide-react';

// --- Configuration Data & Dummy Content (40 Internships) ---
const baseInternshipList = [
  // Existing 6 Internships
  { id: 1, role: 'Data Analyst Intern', company: 'Tech Insights Co.', location: 'Remote', duration: '6 Months', stipend: '₹15,000/month', skills: ['Python', 'SQL', 'Tableau'], category: 'Data', paid: true, priority: 5 },
  { id: 2, role: 'Frontend Developer Intern', company: 'Innovate Labs', location: 'Bangalore', duration: '3 Months', stipend: '₹10,000/month', skills: ['React', 'JavaScript', 'Tailwind'], category: 'Engineering', paid: true, priority: 8 },
  { id: 3, role: 'UI/UX Design Intern', company: 'Creative Studio', location: 'Remote', duration: '6 Months', stipend: 'Unpaid', skills: ['Figma', 'Sketch', 'Prototyping'], category: 'Design', paid: false, priority: 3 },
  { id: 4, role: 'Marketing Intern (SEO)', company: 'Growth Hackers', location: 'Mumbai', duration: '4 Months', stipend: '₹8,000/month', skills: ['SEO', 'Content Creation'], category: 'Marketing', paid: true, priority: 6 },
  { id: 5, role: 'Cloud Engineering Intern', company: 'Global Cloud Services', location: 'Pune', duration: '6 Months', stipend: '₹20,000/month', skills: ['AWS', 'Docker', 'Linux'], category: 'Engineering', paid: true, priority: 9 },
  { id: 6, role: 'Human Resources Intern', company: 'HDFC Bank', location: 'New Delhi', duration: '4 Months', stipend: '₹8,000/month', skills: ['Communication', 'Excel', 'Recruitment'], category: 'HR', paid: true, priority: 4 },

  // Added 34 New Internships
  { id: 7, role: 'Product Manager Intern', company: 'Zenith Labs', location: 'Bangalore', duration: '6 Months', stipend: '₹22,000/month', skills: ['Agile', 'Jira', 'User Stories'], category: 'Product', paid: true, priority: 10 },
  { id: 8, role: 'Backend Developer Intern', company: 'Nexus Tech', location: 'Remote', duration: '4 Months', stipend: '₹18,000/month', skills: ['Node.js', 'Express', 'MongoDB'], category: 'Engineering', paid: true, priority: 7 },
  { id: 9, role: 'Financial Analyst Intern', company: 'Capital One', location: 'Mumbai', duration: '3 Months', stipend: '₹12,000/month', skills: ['Excel', 'Valuation', 'Forecasting'], category: 'Finance', paid: true, priority: 5 },
  { id: 10, role: 'Content Writer Intern', company: 'Buzz Media', location: 'Remote', duration: '6 Months', stipend: 'Unpaid', skills: ['Writing', 'Editing', 'SEO'], category: 'Marketing', paid: false, priority: 2 },
  { id: 11, role: 'DevOps Intern', company: 'Streamline Co.', location: 'Pune', duration: '6 Months', stipend: '₹25,000/month', skills: ['Kubernetes', 'Terraform', 'CI/CD'], category: 'Engineering', paid: true, priority: 9 },
  { id: 12, role: 'Data Scientist Intern', company: 'Algorithma', location: 'Bangalore', duration: '6 Months', stipend: '₹30,000/month', skills: ['Python', 'Machine Learning', 'TensorFlow'], category: 'Data', paid: true, priority: 10 },
  { id: 13, role: 'Motion Graphics Intern', company: 'Vivid Designs', location: 'Remote', duration: '3 Months', stipend: '₹10,000/month', skills: ['After Effects', 'Illustrator'], category: 'Design', paid: true, priority: 4 },
  { id: 14, role: 'Sales Development Intern', company: 'Outbound Leads', location: 'New Delhi', duration: '4 Months', stipend: '₹7,000/month + Bonus', skills: ['CRM', 'Cold Calling', 'Communication'], category: 'Sales', paid: true, priority: 3 },
  { id: 15, role: 'Mobile App Developer Intern', company: 'AppGenie', location: 'Pune', duration: '6 Months', stipend: '₹15,000/month', skills: ['React Native', 'Firebase'], category: 'Engineering', paid: true, priority: 8 },
  { id: 16, role: 'UX Researcher Intern', company: 'UserFocus', location: 'Bangalore', duration: '6 Months', stipend: '₹18,000/month', skills: ['Interviews', 'Surveys', 'Figma'], category: 'Design', paid: true, priority: 6 },
  { id: 17, role: 'Quality Assurance Intern', company: 'Bug Busters', location: 'Remote', duration: '4 Months', stipend: '₹10,000/month', skills: ['Manual Testing', 'JIRA'], category: 'Engineering', paid: true, priority: 5 },
  { id: 18, role: 'Social Media Intern', company: 'Digital Waves', location: 'Mumbai', duration: '3 Months', stipend: 'Unpaid', skills: ['Instagram', 'Content Planning'], category: 'Marketing', paid: false, priority: 2 },
  { id: 19, role: 'Investment Banking Intern', company: 'Peak Finance', location: 'Mumbai', duration: '6 Months', stipend: '₹25,000/month', skills: ['Financial Modeling', 'M&A'], category: 'Finance', paid: true, priority: 10 },
  { id: 20, role: 'Technical Writer Intern', company: 'DocuCore', location: 'Remote', duration: '6 Months', stipend: '₹12,000/month', skills: ['Markdown', 'API Documentation'], category: 'Content', paid: true, priority: 7 },
  { id: 21, role: 'Embedded Systems Intern', company: 'H/W Solutions', location: 'Pune', duration: '6 Months', stipend: '₹20,000/month', skills: ['C++', 'Microcontrollers'], category: 'Engineering', paid: true, priority: 9 },
  { id: 22, role: 'Business Analyst Intern', company: 'Strategy First', location: 'Bangalore', duration: '6 Months', stipend: '₹18,000/month', skills: ['SQL', 'Process Mapping'], category: 'Data', paid: true, priority: 8 },
  { id: 23, role: 'Graphic Design Intern', company: 'Brand Makers', location: 'Remote', duration: '3 Months', stipend: '₹8,000/month', skills: ['Photoshop', 'InDesign'], category: 'Design', paid: true, priority: 4 },
  { id: 24, role: 'Customer Success Intern', company: 'ClientCare', location: 'New Delhi', duration: '4 Months', stipend: '₹10,000/month', skills: ['Zendesk', 'Client Relations'], category: 'Operations', paid: true, priority: 6 },
  { id: 25, role: 'Cyber Security Intern', company: 'SecureNet', location: 'Pune', duration: '6 Months', stipend: '₹22,000/month', skills: ['Networking', 'Pen Testing'], category: 'Engineering', paid: true, priority: 10 },
  { id: 26, role: 'Market Research Intern', company: 'Insight Group', location: 'Mumbai', duration: '4 Months', stipend: '₹10,000/month', skills: ['Surveys', 'Data Analysis'], category: 'Marketing', paid: true, priority: 5 },
  { id: 27, role: 'Legal Intern', company: 'Lex Corp', location: 'New Delhi', duration: '6 Months', stipend: '₹15,000/month', skills: ['Contract Drafting', 'Legal Research'], category: 'Legal', paid: true, priority: 7 },
  { id: 28, role: 'Game Development Intern', company: 'Pixel Play', location: 'Remote', duration: '6 Months', stipend: '₹12,000/month', skills: ['Unity', 'C#'], category: 'Engineering', paid: true, priority: 9 },
  { id: 29, role: 'Recruitment Intern', company: 'Talent Hunt', location: 'Bangalore', duration: '3 Months', stipend: 'Unpaid', skills: ['ATS', 'Screening'], category: 'HR', paid: false, priority: 3 },
  { id: 30, role: 'Technical Support Intern', company: 'HelpDesk Pro', location: 'Remote', duration: '4 Months', stipend: '₹10,000/month', skills: ['Troubleshooting', 'Communication'], category: 'Engineering', paid: true, priority: 4 },
  { id: 31, role: 'Product Marketing Intern', company: 'LaunchPad', location: 'Mumbai', duration: '6 Months', stipend: '₹15,000/month', skills: ['Market Strategy', 'Copywriting'], category: 'Marketing', paid: true, priority: 7 },
  { id: 32, role: 'Machine Learning Intern', company: 'DeepThink AI', location: 'Pune', duration: '6 Months', stipend: '₹35,000/month', skills: ['PyTorch', 'NLP', 'Python'], category: 'Data', paid: true, priority: 10 },
  { id: 33, role: 'Brand Design Intern', company: 'Identity Studio', location: 'Bangalore', duration: '4 Months', stipend: '₹12,000/month', skills: ['Branding', 'Adobe Suite'], category: 'Design', paid: true, priority: 5 },
  { id: 34, role: 'HRIS Intern', company: 'WorkFlow Solutions', location: 'Remote', duration: '6 Months', stipend: '₹18,000/month', skills: ['SAP', 'Data Management'], category: 'HR', paid: true, priority: 8 },
  { id: 35, role: 'E-commerce Intern', company: 'ShopEasy', location: 'New Delhi', duration: '3 Months', stipend: '₹9,000/month', skills: ['Shopify', 'Analytics'], category: 'Marketing', paid: true, priority: 6 },
  { id: 36, role: 'Blockchain Intern', company: 'Crypto Chain', location: 'Pune', duration: '6 Months', stipend: '₹30,000/month', skills: ['Solidity', 'Web3'], category: 'Engineering', paid: true, priority: 10 },
  { id: 37, role: 'Biotech Data Intern', company: 'BioMetrics', location: 'Bangalore', duration: '6 Months', stipend: '₹20,000/month', skills: ['R', 'Bioinformatics'], category: 'Data', paid: true, priority: 9 },
  { id: 38, role: 'Digital Marketing Intern', company: 'AdVantage', location: 'Remote', duration: '4 Months', stipend: '₹10,000/month', skills: ['Google Ads', 'Analytics'], category: 'Marketing', paid: true, priority: 7 },
  { id: 39, role: 'Operations Intern', company: 'LogiFlow', location: 'Mumbai', duration: '6 Months', stipend: '₹12,000/month', skills: ['Supply Chain', 'Process Improvement'], category: 'Operations', paid: true, priority: 5 },
  { id: 40, role: 'Research Intern (AI Ethics)', company: 'Future Think', location: 'Remote', duration: '6 Months', stipend: '₹15,000/month', skills: ['Ethics', 'Writing', 'Research'], category: 'Product', paid: true, priority: 8 },
];

// --- Framer Motion Variants ---
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// --- Application Status Tracking System ---
const ApplicationStatus = {
  APPLIED: 'applied',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
  SELECTED: 'selected',
  UNDER_REVIEW: 'under_review',
  INTERVIEW_SCHEDULED: 'interview_scheduled',
  INTERVIEW_COMPLETED: 'interview_completed',
  OFFER_EXTENDED: 'offer_extended',
  OFFER_ACCEPTED: 'offer_accepted'
};

const StatusConfig = {
  [ApplicationStatus.APPLIED]: {
    label: 'Applied',
    color: 'bg-blue-100 text-blue-800',
    icon: ClockIcon,
    description: 'Application submitted'
  },
  [ApplicationStatus.UNDER_REVIEW]: {
    label: 'Under Review',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Eye,
    description: 'Application being reviewed'
  },
  [ApplicationStatus.SHORTLISTED]: {
    label: 'Shortlisted',
    color: 'bg-purple-100 text-purple-800',
    icon: CheckSquare,
    description: 'You have been shortlisted'
  },
  [ApplicationStatus.INTERVIEW_SCHEDULED]: {
    label: 'Interview Scheduled',
    color: 'bg-indigo-100 text-indigo-800',
    icon: Calendar,
    description: 'Interview round scheduled'
  },
  [ApplicationStatus.INTERVIEW_COMPLETED]: {
    label: 'Interview Completed',
    color: 'bg-orange-100 text-orange-800',
    icon: CheckCircle,
    description: 'Interview completed - awaiting results'
  },
  [ApplicationStatus.SELECTED]: {
    label: 'Selected',
    color: 'bg-green-100 text-green-800',
    icon: AwardIcon,
    description: 'Congratulations! You are selected'
  },
  [ApplicationStatus.OFFER_EXTENDED]: {
    label: 'Offer Extended',
    color: 'bg-teal-100 text-teal-800',
    icon: Send,
    description: 'Offer letter has been sent'
  },
  [ApplicationStatus.OFFER_ACCEPTED]: {
    label: 'Offer Accepted',
    color: 'bg-emerald-100 text-emerald-800',
    icon: ThumbsUp,
    description: 'Offer accepted by candidate'
  },
  [ApplicationStatus.REJECTED]: {
    label: 'Rejected',
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
    description: 'Application not selected'
  }
};

// --- Admin Configuration ---
const ADMIN_PASSWORD = "admin123";
const ADMIN_USERS = [
  { id: 1, name: "Admin User", email: "admin@careernavigator.com", role: "super_admin" },
  { id: 2, name: "HR Manager", email: "hr@careernavigator.com", role: "hr_manager" },
  { id: 3, name: "Recruiter", email: "recruiter@careernavigator.com", role: "recruiter" }
];

// --- Advanced Analytics and Tracking System ---
class ApplicationAnalytics {
  static generateApplicationId() {
    return 'APP' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  static calculateSkillsMatch(userSkills, requiredSkills) {
    const userSkillSet = new Set(userSkills.split(',').map(s => s.trim().toLowerCase()));
    const requiredSkillSet = new Set(requiredSkills.map(s => s.toLowerCase()));
    
    const intersection = [...userSkillSet].filter(skill => requiredSkillSet.has(skill));
    const matchPercentage = (intersection.length / requiredSkillSet.size) * 100;
    
    return Math.min(Math.round(matchPercentage), 95); // Cap at 95% for realism
  }

  static getApplicationTrends(applications) {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const recentApplications = applications.filter(app => 
      new Date(app.appliedDate) >= last30Days
    );

    const statusDistribution = {};
    Object.values(ApplicationStatus).forEach(status => {
      statusDistribution[status] = applications.filter(app => app.status === status).length;
    });

    const companyStats = {};
    applications.forEach(app => {
      if (!companyStats[app.company]) {
        companyStats[app.company] = { applications: 0, selected: 0 };
      }
      companyStats[app.company].applications++;
      if ([ApplicationStatus.SELECTED, ApplicationStatus.OFFER_ACCEPTED].includes(app.status)) {
        companyStats[app.company].selected++;
      }
    });

    return {
      totalApplications: applications.length,
      recentApplications: recentApplications.length,
      statusDistribution,
      companyStats,
      successRate: applications.length > 0 ? 
        (applications.filter(app => 
          [ApplicationStatus.SELECTED, ApplicationStatus.OFFER_ACCEPTED].includes(app.status)
        ).length / applications.length) * 100 : 0
    };
  }
}

// --- Advanced Storage Management ---
class ApplicationStorage {
  static STORAGE_KEYS = {
    APPLICATIONS: 'career_navigator_applications_v3', // Version updated
    USER_PROFILE: 'career_navigator_user_profile',
    ANALYTICS: 'career_navigator_analytics'
  };

  static saveApplications(applications) {
    try {
      console.log('Saving applications to localStorage:', applications);
      localStorage.setItem(this.STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
      this.updateAnalytics(applications);
      return true;
    } catch (error) {
      console.error('Failed to save applications:', error);
      return false;
    }
  }

  static loadApplications() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEYS.APPLICATIONS);
      console.log('Loaded applications from localStorage:', saved);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('Parsed applications:', parsed);
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Failed to load applications:', error);
      return [];
    }
  }

  static updateAnalytics(applications) {
    const analytics = ApplicationAnalytics.getApplicationTrends(applications);
    localStorage.setItem(this.STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  }

  static getAnalytics() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEYS.ANALYTICS);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  }

  static exportApplications() {
    const applications = this.loadApplications();
    const dataStr = JSON.stringify(applications, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `career_applications_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static importApplications(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const applications = JSON.parse(e.target.result);
          if (Array.isArray(applications)) {
            this.saveApplications(applications);
            resolve(applications);
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }
}

// --- Resume Upload Modal Component ---
const ResumeUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Resume</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                type="file"
                id="file-input"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
              />
              
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <Upload className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {selectedFile ? selectedFile.name : 'Drop your resume here'}
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {selectedFile 
                  ? 'Click to change file' 
                  : 'or click to browse files (PDF, DOC, DOCX, TXT)'
                }
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle size={16} className="text-green-500" />
                <span>We'll extract skills and suggest matching internships</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Shield size={16} className="text-blue-500" />
                <span>Your data is secure and private</span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
              >
                Analyze Resume
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Application Form Modal Component ---
const ApplicationFormModal = ({ isOpen, onClose, internship, onProceed }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    university: '',
    graduationYear: '',
    skills: '',
    coverLetter: '',
    portfolioUrl: '',
    linkedinUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProceed(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Apply for {internship?.role}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-600 dark:text-blue-400" size={20} />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    {internship?.company} - {internship?.role}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {internship?.location} • {internship?.duration} • {internship?.stipend}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Education Level *
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  >
                    <option value="">Select education level</option>
                    <option value="High School">High School</option>
                    <option value="Associate Degree">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University/College *
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="Enter your university"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Graduation Year *
                  </label>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  >
                    <option value="">Select graduation year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills (comma separated) *
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="e.g., React, Python, JavaScript, SQL"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  List your technical skills separated by commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="Tell us why you're interested in this position and what makes you a good fit..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Portfolio URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
                >
                  Proceed to Resume Upload
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Resume Upload Modal for Application ---
const ResumeUploadModalMain = ({ isOpen, onClose, internship, formData, onSubmit }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Resume</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                <X size={24} />
              </button>
            </div>

            {internship && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
                <p className="font-semibold text-blue-900 dark:text-blue-100">
                  {internship.company} - {internship.role}
                </p>
              </div>
            )}

            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('resume-file-input').click()}
            >
              <input
                type="file"
                id="resume-file-input"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
              />
              
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <Upload className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {selectedFile ? selectedFile.name : 'Drop your resume here'}
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {selectedFile 
                  ? 'Click to change file' 
                  : 'or click to browse files (PDF, DOC, DOCX, TXT)'
                }
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle size={16} className="text-green-500" />
                <span>We'll analyze your resume for skills matching</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Shield size={16} className="text-blue-500" />
                <span>Your resume will be securely stored</span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
              >
                Submit Application
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Application Success Modal ---
const ApplicationSuccessModal = ({ isOpen, onClose, internship, applicationId }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Application Submitted!
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Your application for <strong>{internship?.role}</strong> at <strong>{internship?.company}</strong> has been submitted successfully.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
              <p className="text-sm font-mono text-gray-900 dark:text-white">
                Application ID: {applicationId}
              </p>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2 justify-center">
                <Clock size={16} />
                <span>You'll hear back within 5-7 business days</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Bell size={16} />
                <span>We'll notify you of any updates</span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
            >
              Track Your Application
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Internship Card Component ---
const InternshipCard = ({ 
  id, 
  role, 
  company, 
  location, 
  duration, 
  stipend, 
  skills, 
  category, 
  paid, 
  isRecommended,
  onApply 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
        isRecommended 
          ? 'border-yellow-400 dark:border-yellow-500' 
          : 'border-transparent hover:border-indigo-200 dark:hover:border-gray-600'
      }`}
    >
      {isRecommended && (
        <div className="bg-yellow-500 text-white px-4 py-1 rounded-t-2xl flex items-center gap-2 text-sm font-semibold">
          <Zap size={16} className="fill-current" />
          AI Recommended
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
              {role}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
              {company}
            </p>
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-lg transition ${
              isLiked 
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <DollarSign size={16} />
            <span className={paid ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
              {stipend}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, isExpanded ? skills.length : 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2.5 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                {isExpanded ? 'Show less' : `+${skills.length - 3} more`}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {category}
          </span>
          <button
            onClick={onApply}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition transform hover:scale-105 active:scale-95"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Advanced Analytics Dashboard Component ---
const AnalyticsDashboard = ({ applications, onClose }) => {
  const analytics = useMemo(() => ApplicationAnalytics.getApplicationTrends(applications), [applications]);
  const [timeRange, setTimeRange] = useState('all'); // '30days', '90days', 'all'

  const filteredApplications = useMemo(() => {
    if (timeRange === 'all') return applications;
    
    const cutoffDate = new Date();
    if (timeRange === '30days') {
      cutoffDate.setDate(cutoffDate.getDate() - 30);
    } else if (timeRange === '90days') {
      cutoffDate.setDate(cutoffDate.getDate() - 90);
    }
    
    return applications.filter(app => new Date(app.appliedDate) >= cutoffDate);
  }, [applications, timeRange]);

  const filteredAnalytics = useMemo(() => 
    ApplicationAnalytics.getApplicationTrends(filteredApplications), 
    [filteredApplications]
  );

  const getStatusProgress = (status) => {
    const total = filteredApplications.length;
    const count = filteredApplications.filter(app => app.status === status).length;
    return total > 0 ? (count / total) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Career Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced insights and performance metrics for your internship applications
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Applications
          </button>
        </div>

        {/* Time Range Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Time Range</h2>
            <div className="flex gap-2">
              {[
                { label: '30 Days', value: '30days' },
                { label: '90 Days', value: '90days' },
                { label: 'All Time', value: 'all' }
              ].map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    timeRange === range.value
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Applications',
              value: filteredAnalytics.totalApplications,
              icon: BarChart3,
              color: 'bg-blue-500',
              change: '+12%'
            },
            {
              label: 'Success Rate',
              value: `${filteredAnalytics.successRate.toFixed(1)}%`,
              icon: TrendingUp,
              color: 'bg-green-500',
              change: '+5%'
            },
            {
              label: 'Interviews',
              value: filteredApplications.filter(app => 
                [ApplicationStatus.INTERVIEW_SCHEDULED, ApplicationStatus.INTERVIEW_COMPLETED].includes(app.status)
              ).length,
              icon: Calendar,
              color: 'bg-purple-500',
              change: '+8%'
            },
            {
              label: 'Selected',
              value: filteredApplications.filter(app => 
                [ApplicationStatus.SELECTED, ApplicationStatus.OFFER_ACCEPTED].includes(app.status)
              ).length,
              icon: AwardIcon,
              color: 'bg-emerald-500',
              change: '+15%'
            }
          ].map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`${metric.color} text-white p-3 rounded-xl`} size={32} />
                <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                  {metric.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Application Status Distribution
            </h3>
            <div className="space-y-4">
              {Object.entries(StatusConfig).map(([status, config]) => {
                const count = filteredApplications.filter(app => app.status === status).length;
                const percentage = filteredApplications.length > 0 ? 
                  (count / filteredApplications.length) * 100 : 0;
                const StatusIcon = config.icon;

                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.color}`}>
                        <StatusIcon size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {config.label}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {config.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">{count}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Progress Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Application Progress
            </h3>
            <div className="space-y-4">
              {Object.entries(StatusConfig).map(([status, config]) => {
                const progress = getStatusProgress(status);
                const StatusIcon = config.icon;

                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                        <StatusIcon size={16} />
                        {config.label}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${config.color.split(' ')[0]}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Company Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Company Performance
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {Object.entries(filteredAnalytics.companyStats)
                .sort(([,a], [,b]) => b.applications - a.applications)
                .slice(0, 10)
                .map(([company, stats]) => {
                  const successRate = stats.applications > 0 ? 
                    (stats.selected / stats.applications) * 100 : 0;

                  return (
                    <div key={company} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stats.applications} applications
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          {successRate.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Success rate
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Skills Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Skills Performance
            </h3>
            <div className="space-y-4">
              {(() => {
                const skillPerformance = {};
                filteredApplications.forEach(app => {
                  app.skills.forEach(skill => {
                    if (!skillPerformance[skill]) {
                      skillPerformance[skill] = { count: 0, selected: 0 };
                    }
                    skillPerformance[skill].count++;
                    if ([ApplicationStatus.SELECTED, ApplicationStatus.OFFER_ACCEPTED].includes(app.status)) {
                      skillPerformance[skill].selected++;
                    }
                  });
                });

                return Object.entries(skillPerformance)
                  .sort(([,a], [,b]) => b.selected - a.selected)
                  .slice(0, 8)
                  .map(([skill, stats]) => {
                    const successRate = stats.count > 0 ? (stats.selected / stats.count) * 100 : 0;

                    return (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {stats.count} apps
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            successRate >= 50 ? 'bg-green-100 text-green-800' :
                            successRate >= 25 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {successRate.toFixed(0)}% success
                          </span>
                        </div>
                      </div>
                    );
                  });
              })()}
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Application Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Applied', 'Shortlisted', 'Interview', 'Selected'].map((stage, index) => {
              const counts = filteredApplications.reduce((acc, app) => {
                const month = new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short' });
                if (!acc[month]) acc[month] = 0;
                
                if (
                  (stage === 'Applied' && app.status === ApplicationStatus.APPLIED) ||
                  (stage === 'Shortlisted' && app.status === ApplicationStatus.SHORTLISTED) ||
                  (stage === 'Interview' && [ApplicationStatus.INTERVIEW_SCHEDULED, ApplicationStatus.INTERVIEW_COMPLETED].includes(app.status)) ||
                  (stage === 'Selected' && [ApplicationStatus.SELECTED, ApplicationStatus.OFFER_ACCEPTED].includes(app.status))
                ) {
                  acc[month]++;
                }
                return acc;
              }, {});

              return (
                <div key={stage} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{stage}</h4>
                  <div className="space-y-2">
                    {Object.entries(counts).slice(-6).map(([month, count]) => (
                      <div key={month} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{month}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Enhanced Admin Login Modal ---
const AdminLoginModal = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const adminUser = ADMIN_USERS.find(user => user.email === email);
    
    if (adminUser && password === ADMIN_PASSWORD) {
      onLogin(adminUser);
      setPassword('');
      setEmail('');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Access the admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Admin Email
                </label>
                <select
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                >
                  <option value="">Select Admin User</option>
                  {ADMIN_USERS.map(user => (
                    <option key={user.id} value={user.email}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  placeholder="Enter admin password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg transition"
                >
                  Login as Admin
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                <strong>Demo Credentials:</strong><br />
                Use any admin email + password: <code>admin123</code>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Enhanced Admin Dashboard Component ---
const AdminDashboard = ({ applications, onStatusUpdate, onClose, currentAdmin }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [bulkActions, setBulkActions] = useState([]);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesSearch = app.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [applications, statusFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === ApplicationStatus.APPLIED).length;
    const underReview = applications.filter(app => app.status === ApplicationStatus.UNDER_REVIEW).length;
    const shortlisted = applications.filter(app => app.status === ApplicationStatus.SHORTLISTED).length;
    const interview = applications.filter(app => 
      [ApplicationStatus.INTERVIEW_SCHEDULED, ApplicationStatus.INTERVIEW_COMPLETED].includes(app.status)
    ).length;
    const selected = applications.filter(app => 
      [ApplicationStatus.SELECTED, ApplicationStatus.OFFER_EXTENDED, ApplicationStatus.OFFER_ACCEPTED].includes(app.status)
    ).length;
    const rejected = applications.filter(app => app.status === ApplicationStatus.REJECTED).length;

    return { total, applied, underReview, shortlisted, interview, selected, rejected };
  }, [applications]);

  const handleStatusChange = (applicationId, newStatus, feedbackText = '') => {
    onStatusUpdate(applicationId, newStatus, feedbackText, currentAdmin.name);
  };

  const scheduleInterview = (applicationId) => {
    if (interviewDate && interviewTime) {
      const interviewDateTime = `${interviewDate}T${interviewTime}`;
      handleStatusChange(applicationId, ApplicationStatus.INTERVIEW_SCHEDULED, 
        `Interview scheduled for ${new Date(interviewDateTime).toLocaleString()}`);
      setShowInterviewModal(false);
      setInterviewDate('');
      setInterviewTime('');
    }
  };

  const StatusActionButtons = ({ application }) => {
    const getNextActions = (currentStatus) => {
      switch (currentStatus) {
        case ApplicationStatus.APPLIED:
          return [
            { label: 'Mark Under Review', status: ApplicationStatus.UNDER_REVIEW, color: 'bg-yellow-500' },
            { label: 'Shortlist', status: ApplicationStatus.SHORTLISTED, color: 'bg-purple-500' },
            { label: 'Reject', status: ApplicationStatus.REJECTED, color: 'bg-red-500' }
          ];
        case ApplicationStatus.UNDER_REVIEW:
          return [
            { label: 'Shortlist', status: ApplicationStatus.SHORTLISTED, color: 'bg-purple-500' },
            { label: 'Reject', status: ApplicationStatus.REJECTED, color: 'bg-red-500' }
          ];
        case ApplicationStatus.SHORTLISTED:
          return [
            { label: 'Schedule Interview', status: ApplicationStatus.INTERVIEW_SCHEDULED, color: 'bg-indigo-500' },
            { label: 'Reject', status: ApplicationStatus.REJECTED, color: 'bg-red-500' }
          ];
        case ApplicationStatus.INTERVIEW_SCHEDULED:
          return [
            { label: 'Mark Interview Done', status: ApplicationStatus.INTERVIEW_COMPLETED, color: 'bg-orange-500' },
            { label: 'Select', status: ApplicationStatus.SELECTED, color: 'bg-green-500' },
            { label: 'Reject', status: ApplicationStatus.REJECTED, color: 'bg-red-500' }
          ];
        case ApplicationStatus.INTERVIEW_COMPLETED:
          return [
            { label: 'Select', status: ApplicationStatus.SELECTED, color: 'bg-green-500' },
            { label: 'Reject', status: ApplicationStatus.REJECTED, color: 'bg-red-500' }
          ];
        case ApplicationStatus.SELECTED:
          return [
            { label: 'Extend Offer', status: ApplicationStatus.OFFER_EXTENDED, color: 'bg-teal-500' }
          ];
        case ApplicationStatus.OFFER_EXTENDED:
          return [
            { label: 'Mark Offer Accepted', status: ApplicationStatus.OFFER_ACCEPTED, color: 'bg-emerald-500' }
          ];
        default:
          return [];
      }
    };

    const actions = getNextActions(application.status);

    return (
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => {
              if (action.status === ApplicationStatus.INTERVIEW_SCHEDULED) {
                setSelectedApplication(application);
                setShowInterviewModal(true);
              } else {
                handleStatusChange(application.id, action.status, feedback);
                setFeedback('');
              }
            }}
            className={`px-3 py-2 ${action.color} text-white rounded-lg text-sm font-medium hover:opacity-90 transition`}
          >
            {action.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {currentAdmin.name} ({currentAdmin.role})
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            >
              Exit Admin Mode
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'bg-blue-500', icon: BarChart3 },
          { label: 'Applied', value: stats.applied, color: 'bg-blue-500', icon: ClockIcon },
          { label: 'Under Review', value: stats.underReview, color: 'bg-yellow-500', icon: Eye },
          { label: 'Shortlisted', value: stats.shortlisted, color: 'bg-purple-500', icon: CheckSquare },
          { label: 'Interview', value: stats.interview, color: 'bg-indigo-500', icon: Calendar },
          { label: 'Selected', value: stats.selected, color: 'bg-green-500', icon: AwardIcon },
          { label: 'Rejected', value: stats.rejected, color: 'bg-red-500', icon: XCircle }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
              <stat.icon className={`${stat.color} text-white p-2 rounded-lg`} size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Applications
            </button>
            {Object.entries(StatusConfig).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  statusFilter === status
                    ? `${config.color} border-2 border-current`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <config.icon size={16} />
                {config.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => {
          const statusConfig = StatusConfig[application.status];
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Application Details */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {application.company[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {application.role}
                      </h3>
                      <p className="text-indigo-600 font-medium mb-2">{application.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {application.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {application.stipend}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          Applied: {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                      <StatusIcon size={16} />
                      {statusConfig.label}
                    </div>
                    
                    <StatusActionButtons application={application} />
                  </div>

                  {/* Admin Feedback */}
                  {application.adminFeedback && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Admin Note:</strong> {application.adminFeedback}
                      </p>
                      {application.updatedBy && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Updated by: {application.updatedBy}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedApplication(application);
                      setShowApplicationDetails(true);
                    }}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleStatusChange(application.id, ApplicationStatus.REJECTED, 'Application rejected by admin')}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Skills Match */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Skills Match</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {application.skillsMatch}% match
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${application.skillsMatch}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredApplications.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Briefcase className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Applications Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No applications match your current filters.
            </p>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      <AnimatePresence>
        {showApplicationDetails && selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Application Details
                </h3>
                <button
                  onClick={() => setShowApplicationDetails(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Candidate Information
                  </h4>
                  {selectedApplication.formData && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                        <p className="text-gray-900 dark:text-white">{selectedApplication.formData.fullName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                        <p className="text-gray-900 dark:text-white">{selectedApplication.formData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                        <p className="text-gray-900 dark:text-white">{selectedApplication.formData.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Education</label>
                        <p className="text-gray-900 dark:text-white">{selectedApplication.formData.education}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">University</label>
                        <p className="text-gray-900 dark:text-white">{selectedApplication.formData.university}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Application Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Application ID</label>
                      <p className="font-mono text-gray-900 dark:text-white">{selectedApplication.applicationId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Applied Date</label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedApplication.appliedDate).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedApplication.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Skills</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedApplication.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedApplication.formData?.coverLetter && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Cover Letter</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedApplication.formData.coverLetter}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interview Scheduling Modal */}
      <AnimatePresence>
        {showInterviewModal && selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Schedule Interview
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Interview Time
                  </label>
                  <input
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Add any additional notes for the candidate..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => scheduleInterview(selectedApplication.id)}
                  disabled={!interviewDate || !interviewTime}
                  className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition"
                >
                  Schedule Interview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Enhanced Applications Tracking Component ---
const ApplicationsTracking = ({ applications, onStatusUpdate, onWithdrawApplication, onAdminLogin, onShowAnalytics }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = applications;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Sort applications
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      } else if (sortBy === 'company') {
        return a.company.localeCompare(b.company);
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'skills') {
        return b.skillsMatch - a.skillsMatch;
      }
      return 0;
    });
    
    return filtered;
  }, [applications, statusFilter, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === ApplicationStatus.APPLIED).length;
    const shortlisted = applications.filter(app => app.status === ApplicationStatus.SHORTLISTED).length;
    const interview = applications.filter(app => 
      [ApplicationStatus.INTERVIEW_SCHEDULED, ApplicationStatus.INTERVIEW_COMPLETED].includes(app.status)
    ).length;
    const selected = applications.filter(app => 
      [ApplicationStatus.SELECTED, ApplicationStatus.OFFER_EXTENDED, ApplicationStatus.OFFER_ACCEPTED].includes(app.status)
    ).length;
    const rejected = applications.filter(app => app.status === ApplicationStatus.REJECTED).length;

    return {
      total,
      applied,
      shortlisted,
      interview,
      selected,
      rejected,
      successRate: total > 0 ? Math.round((selected / total) * 100) : 0
    };
  }, [applications]);

  const handleExport = () => {
    ApplicationStorage.exportApplications();
    setShowExportModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'bg-blue-500', icon: BarChart3 },
          { label: 'Applied', value: stats.applied, color: 'bg-blue-500', icon: ClockIcon },
          { label: 'Shortlisted', value: stats.shortlisted, color: 'bg-purple-500', icon: CheckSquare },
          { label: 'Interview', value: stats.interview, color: 'bg-indigo-500', icon: Calendar },
          { label: 'Selected', value: stats.selected, color: 'bg-green-500', icon: AwardIcon },
          { label: 'Rejected', value: stats.rejected, color: 'bg-red-500', icon: XCircle },
          { label: 'Success Rate', value: `${stats.successRate}%`, color: 'bg-green-500', icon: TrendingUp }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
              <stat.icon className={`${stat.color} text-white p-2 rounded-lg`} size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold mb-2">Admin Access</h3>
              <p className="opacity-90">Manage applications and update status</p>
            </div>
            <button
              onClick={() => setShowAdminLogin(true)}
              className="mt-4 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <Shield size={20} />
              Access Admin Dashboard
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="opacity-90">Advanced insights and performance metrics</p>
            </div>
            <button
              onClick={onShowAnalytics}
              className="mt-4 px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <BarChart size={20} />
              View Analytics
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold mb-2">Export Data</h3>
              <p className="opacity-90">Download your application history</p>
            </div>
            <button
              onClick={() => setShowExportModal(true)}
              className="mt-4 px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <Download size={20} />
              Export Applications
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Applications
            </button>
            {Object.entries(StatusConfig).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  statusFilter === status
                    ? `${config.color} border-2 border-current`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <config.icon size={16} />
                {config.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="newest">Newest First</option>
            <option value="company">Company Name</option>
            <option value="status">Status</option>
            <option value="skills">Skills Match</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => {
            const statusConfig = StatusConfig[application.status];
            const StatusIcon = statusConfig.icon;
            const isExpanded = expandedApplication === application.id;
            
            return (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Application Details */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {application.company[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {application.role}
                        </h3>
                        <p className="text-indigo-600 font-medium mb-2">{application.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} />
                            {application.stipend}
                          </span>
                          <span className="flex itemsCenter gap-1">
                            <Calendar size={14} />
                            Applied: {new Date(application.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span>Application Status</span>
                        <span>{statusConfig.description}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            application.status === ApplicationStatus.APPLIED ? 'bg-blue-500 w-1/8' :
                            application.status === ApplicationStatus.UNDER_REVIEW ? 'bg-yellow-500 w-2/8' :
                            application.status === ApplicationStatus.SHORTLISTED ? 'bg-purple-500 w-3/8' :
                            application.status === ApplicationStatus.INTERVIEW_SCHEDULED ? 'bg-indigo-500 w-4/8' :
                            application.status === ApplicationStatus.INTERVIEW_COMPLETED ? 'bg-orange-500 w-5/8' :
                            application.status === ApplicationStatus.SELECTED ? 'bg-green-500 w-6/8' :
                            application.status === ApplicationStatus.OFFER_EXTENDED ? 'bg-teal-500 w-7/8' :
                            application.status === ApplicationStatus.OFFER_ACCEPTED ? 'bg-emerald-500 w-full' :
                            'bg-red-500 w-full'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Admin Feedback */}
                    {application.adminFeedback && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <strong>Admin Note:</strong> {application.adminFeedback}
                        </p>
                        {application.updatedBy && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            Updated by: {application.updatedBy}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Expandable Details */}
                    {isExpanded && application.formData && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Application Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Name:</strong> {application.formData.fullName}</p>
                            <p><strong>Email:</strong> {application.formData.email}</p>
                            <p><strong>Phone:</strong> {application.formData.phone}</p>
                          </div>
                          <div>
                            <p><strong>Education:</strong> {application.formData.education}</p>
                            <p><strong>University:</strong> {application.formData.university}</p>
                            <p><strong>Graduation:</strong> {application.formData.graduationYear}</p>
                          </div>
                        </div>
                        {application.formData.coverLetter && (
                          <div className="mt-3">
                            <p><strong>Cover Letter:</strong></p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 whitespace-pre-wrap">
                              {application.formData.coverLetter}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col gap-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                      <StatusIcon size={16} />
                      {statusConfig.label}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpandedApplication(isExpanded ? null : application.id)}
                        className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition flex items-center gap-1"
                      >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {isExpanded ? 'Less' : 'More'}
                      </button>
                      <button
                        onClick={() => onWithdrawApplication(application.id)}
                        disabled={![ApplicationStatus.APPLIED, ApplicationStatus.UNDER_REVIEW].includes(application.status)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Application ID:</span>
                      <p className="font-mono text-gray-900 dark:text-white">{application.applicationId}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(application.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Skills Match:</span>
                      <p className="text-gray-900 dark:text-white">
                        {application.skillsMatch}% match
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Briefcase className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Applications Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {statusFilter === 'all' 
                ? "You haven't applied to any internships yet."
                : `No applications with status "${StatusConfig[statusFilter]?.label}" found.`
              }
            </p>
            <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition font-semibold">
              Browse Internships
            </button>
          </div>
        )}
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={onAdminLogin}
      />

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Export Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will download a JSON file containing all your application data, including your personal information and application history.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition"
                >
                  Export Data
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---
const InternshipSection = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    duration: '',
    paid: false,
  });

  const [targetSkills, setTargetSkills] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Application flow states
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationFormData, setApplicationFormData] = useState(null);
  const [applicationId, setApplicationId] = useState('');
  
  // Application tracking state
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'applications'
  
  // Admin state
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  
  // Analytics state
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Load applications from localStorage on component mount
  useEffect(() => {
    const savedApplications = ApplicationStorage.loadApplications();
    console.log('Loaded applications on mount:', savedApplications);
    setApplications(savedApplications);
  }, []);

  // Save applications to localStorage whenever applications change
  useEffect(() => {
    console.log('Applications changed, saving to localStorage:', applications);
    ApplicationStorage.saveApplications(applications);
  }, [applications]);

  const { filterOptions, filteredInternships, recommendedInternships } = useMemo(() => {
    // 1. Apply user filters
    let currentList = baseInternshipList.filter(item => {
      const matchesSearch = item.role.toLowerCase().includes(filters.search.toLowerCase()) || 
                            item.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesLocation = !filters.location || item.location === filters.location;
      const matchesDuration = !filters.duration || item.duration === filters.duration;
      const matchesPaid = !filters.paid || item.paid;
      return matchesSearch && matchesCategory && matchesLocation && matchesDuration && matchesPaid;
    });

    // 2. Apply target skills filter (if set)
    if (targetSkills.length > 0) {
      currentList = currentList.filter(item => 
        targetSkills.some(skill => item.skills.includes(skill))
      );
      
      // Sort by number of matching skills and priority
      currentList.sort((a, b) => {
        const aMatches = a.skills.filter(s => targetSkills.includes(s)).length;
        const bMatches = b.skills.filter(s => targetSkills.includes(s)).length;
        if (bMatches !== aMatches) return bMatches - aMatches;
        return b.priority - a.priority;
      });
    }

    // 3. Generate Filter Options
    const options = {
      category: [...new Set(baseInternshipList.map(i => i.category))].sort(),
      location: [...new Set(baseInternshipList.map(i => i.location))].sort(),
      duration: [...new Set(baseInternshipList.map(i => i.duration))].sort(),
    };

    // 4. Determine AI Recommendations
    const recommendations = targetSkills.length > 0
      ? baseInternshipList
          .filter(i => targetSkills.some(skill => i.skills.includes(skill)))
          .sort((a, b) => {
            const aMatches = a.skills.filter(s => targetSkills.includes(s)).length;
            const bMatches = b.skills.filter(s => targetSkills.includes(s)).length;
            if (bMatches !== aMatches) return bMatches - aMatches;
            return b.priority - a.priority;
          })
          .slice(0, 3)
      : baseInternshipList.filter(i => i.priority >= 9).slice(0, 3);

    return {
      filterOptions: options,
      filteredInternships: currentList,
      recommendedInternships: recommendations
    };
  }, [filters, targetSkills]);

  // Function to simulate resume upload and skill extraction
  const handleResumeUpload = () => {
    // Simulate different user profiles based on random selection
    const userProfiles = [
      { skills: ['React', 'JavaScript', 'CSS', 'HTML'], role: 'Frontend Developer' },
      { skills: ['Python', 'SQL', 'Machine Learning', 'Pandas'], role: 'Data Scientist' },
      { skills: ['Node.js', 'Express', 'MongoDB', 'AWS'], role: 'Backend Developer' },
      { skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'], role: 'UI/UX Designer' },
      { skills: ['Java', 'Spring Boot', 'Microservices', 'SQL'], role: 'Software Engineer' }
    ];

    const randomProfile = userProfiles[Math.floor(Math.random() * userProfiles.length)];
    setTargetSkills(randomProfile.skills);
    
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  // Application flow handlers
  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setShowApplicationForm(true);
  };

  const handleFormProceed = (formData) => {
    setApplicationFormData(formData);
    setShowApplicationForm(false);
    setShowResumeUpload(true);
  };

  const handleApplicationSubmit = () => {
    // Generate application ID and calculate skills match
    const newApplicationId = ApplicationAnalytics.generateApplicationId();
    const skillsMatch = ApplicationAnalytics.calculateSkillsMatch(
      applicationFormData.skills,
      selectedInternship.skills
    );

    setApplicationId(newApplicationId);
    
    // Add to applications tracking
    const newApplication = {
      id: Date.now(),
      applicationId: newApplicationId,
      role: selectedInternship.role,
      company: selectedInternship.company,
      location: selectedInternship.location,
      stipend: selectedInternship.stipend,
      skills: selectedInternship.skills,
      status: ApplicationStatus.APPLIED,
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      skillsMatch: skillsMatch,
      formData: applicationFormData,
      adminFeedback: '',
      updatedBy: ''
    };

    setApplications(prev => [newApplication, ...prev]);
    setShowResumeUpload(false);
    setShowSuccessModal(true);
  };

  // Application tracking handlers
  const handleStatusUpdate = (applicationId, newStatus, feedbackText = '', updatedBy = '') => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { 
            ...app, 
            status: newStatus, 
            lastUpdated: new Date().toISOString(),
            adminFeedback: feedbackText,
            updatedBy: updatedBy
          }
        : app
    ));
  };

  const handleWithdrawApplication = (applicationId) => {
    setApplications(prev => prev.filter(app => app.id !== applicationId));
  };

  // Admin handlers
  const handleAdminLogin = (adminUser) => {
    setCurrentAdmin(adminUser);
    setIsAdminMode(true);
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
    setCurrentAdmin(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const uploadBtnText = targetSkills.length > 0 ? 'Resume Uploaded' : 'Upload Resume';
  const uploadBtnColor = targetSkills.length > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700';

  // If in analytics mode, show analytics dashboard
  if (showAnalytics) {
    return (
      <AnalyticsDashboard
        applications={applications}
        onClose={() => setShowAnalytics(false)}
      />
    );
  }

  // If in admin mode, show admin dashboard
  if (isAdminMode) {
    return (
      <AdminDashboard
        applications={applications}
        onStatusUpdate={handleStatusUpdate}
        onClose={handleAdminLogout}
        currentAdmin={currentAdmin}
      />
    );
  }

  return (
    <div className="relative py-20 px-6 bg-white dark:bg-gray-900 font-sans min-h-screen">
      {/* Modals */}
      <ResumeUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleResumeUpload}
      />

      <ApplicationFormModal
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        internship={selectedInternship}
        onProceed={handleFormProceed}
      />

      <ResumeUploadModalMain
        isOpen={showResumeUpload}
        onClose={() => setShowResumeUpload(false)}
        internship={selectedInternship}
        formData={applicationFormData}
        onSubmit={handleApplicationSubmit}
      />

      <ApplicationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        internship={selectedInternship}
        applicationId={applicationId}
      />

      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 flex">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'browse'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              🔍 Browse Internships
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                activeTab === 'applications'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              📊 My Applications
              {applications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {applications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'browse' ? (
          <>
            {/* Hero Header */}
            <motion.header
              className="text-center mb-16 relative z-10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                <span className="text-indigo-600">🎓 Explore</span> AI-Matched Internships
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-8 max-w-4xl mx-auto">
                Find internships that align with your skills, goals, and career path — powered by AI.
              </p>
              
              <div className="relative inline-block">
                <button
                  className={`${uploadBtnColor} text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02] flex items-center justify-center`}
                  onClick={() => setShowUploadModal(true)}
                >
                  <Upload size={20} className="mr-2" />
                  {uploadBtnText}
                </button>
                
                {/* Success Message */}
                {showSuccessMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-3 w-full bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-sm shadow-md"
                  >
                    ✅ Resume analyzed! Showing personalized matches based on your skills.
                  </motion.div>
                )}
              </div>
            </motion.header>

            {/* Smart Filter Bar */}
            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-inner mb-12 border border-gray-200 dark:border-gray-700 relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Smart Filters</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Search Bar */}
                <div className="md:col-span-2 relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by role or company..."
                    value={filters.search}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                  />
                </div>

                {/* Dropdown Filters */}
                {['category', 'location', 'duration'].map(key => (
                  <select
                    key={key}
                    name={key}
                    value={filters[key]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white text-gray-700 transition"
                  >
                    <option value="">{`All ${key.charAt(0).toUpperCase() + key.slice(1)}`}</option>
                    {filterOptions[key].map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}

                {/* Paid Toggle */}
                <div className="flex items-center justify-center p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  <label htmlFor="paid" className="flex items-center cursor-pointer text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      id="paid"
                      name="paid"
                      checked={filters.paid}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    Paid Only
                  </label>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-10">
              {/* Main Internship Cards */}
              <motion.div
                className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
              >
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship) => (
                    <InternshipCard 
                      key={internship.id} 
                      {...internship} 
                      isRecommended={targetSkills.length > 0 && recommendedInternships.some(r => r.id === internship.id)}
                      onApply={() => handleApplyClick(internship)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-lg sm:col-span-2 lg:col-span-3">
                    No internships found matching your filters{targetSkills.length > 0 ? ' AND your resume skills' : ''}. Try adjusting your search!
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:col-span-2 lg:col-span-3">
                    Showing {filteredInternships.length} of {baseInternshipList.length} internships.
                </p>
              </motion.div>

              {/* AI Recommendations Box */}
              <motion.div
                className="lg:col-span-1 bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-indigo-200 dark:border-gray-700 h-fit sticky top-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4 text-indigo-600">
                  <Zap size={24} className="mr-2 fill-current" />
                  <h3 className="text-xl font-bold">Recommended for You</h3>
                </div>
                
                {/* Recommendation Source Message */}
                {targetSkills.length > 0 ? (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm font-semibold">
                    Based on your uploaded resume ({targetSkills.join(', ')}).
                  </p>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    Upload your resume to receive personalized, AI-driven matches!
                  </p>
                )}

                <div className="space-y-4">
                  {recommendedInternships.map(item => (
                    <div key={item.id} className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-100 dark:border-gray-600">
                      <p className="font-semibold text-gray-900 dark:text-white">{item.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.company} &middot; {item.location}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.skills.filter(s => targetSkills.includes(s)).map(s => (
                          <span key={s} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                      <button className="text-indigo-600 text-sm font-medium hover:underline mt-2">
                        Quick View &rarr;
                      </button>
                    </div>
                  ))}
                  
                  {recommendedInternships.length === 0 && targetSkills.length > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No high-priority roles found matching your specific skills. Try adjusting your filters in the main section!
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          /* Applications Tracking Tab */
          <ApplicationsTracking
            applications={applications}
            onStatusUpdate={handleStatusUpdate}
            onWithdrawApplication={handleWithdrawApplication}
            onAdminLogin={handleAdminLogin}
            onShowAnalytics={() => setShowAnalytics(true)}
          />
        )}
      </div>
    </div>
  );
};

export default InternshipSection;