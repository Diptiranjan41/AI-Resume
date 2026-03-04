import React, { useState, useRef } from 'react';
import { 
  Zap, 
  ArrowRight, 
  Cpu, 
  Briefcase, 
  Target,
  Users,
  Star,
  Award,
  CheckCircle,
  Play,
  Sparkles,
  Shield,
  FileText,
  Code,
  Video,
  X,
  Download,
  Upload,
  Search,
  TrendingUp,
  Clock,
  BookOpen,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Enhanced 3D Roadmap Component
const Roadmap3DAnimation = ({ rotationX, rotationY }) => {
  const dynamicStyle = {
    transform: `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
    transition: 'transform 0.1s ease-out',
    transformStyle: 'preserve-3d',
  };

  const PathPulseStyle = () => (
    <style>
      {`
        @keyframes path-pulse {
          0%, 100% { 
            opacity: 0.7;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes node-float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-8px) scale(1.05);
          }
        }
        
        @keyframes particle-float {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1);
            opacity: 0.3;
          }
          33% { 
            transform: translate(5px, -8px) scale(1.1);
            opacity: 0.6;
          }
          66% { 
            transform: translate(-3px, 6px) scale(0.9);
            opacity: 0.4;
          }
        }
        
        .animate-path-pulse {
          animation: path-pulse 3s ease-in-out infinite;
        }
        
        .animate-node-float {
          animation: node-float 4s ease-in-out infinite;
        }
        
        .animate-particle-float {
          animation: particle-float 5s ease-in-out infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}
    </style>
  );

  const milestones = [
    { 
      position: 'top-8 left-8', 
      icon: Cpu, 
      label: 'AI Assessment', 
      progress: 100,
      color: 'from-violet-600 to-purple-600',
      status: 'completed',
      description: 'Initial skills evaluation'
    },
    { 
      position: 'top-20 left-28', 
      icon: Target, 
      label: 'Skill Mapping', 
      progress: 80,
      color: 'from-blue-500 to-cyan-500',
      status: 'in-progress',
      description: 'Personalized learning path'
    },
    { 
      position: 'top-32 left-48', 
      icon: Users, 
      label: 'Mentor Match', 
      progress: 60,
      color: 'from-emerald-500 to-green-500',
      status: 'in-progress',
      description: 'Expert guidance'
    },
    { 
      position: 'top-28 left-68', 
      icon: Star, 
      label: 'Projects', 
      progress: 40,
      color: 'from-amber-500 to-orange-500',
      status: 'pending',
      description: 'Real-world experience'
    },
    { 
      position: 'top-12 left-88', 
      icon: Award, 
      label: 'Certification', 
      progress: 20,
      color: 'from-rose-500 to-pink-600',
      status: 'pending',
      description: 'Skill validation'
    },
    { 
      position: 'bottom-8 right-8', 
      icon: Briefcase, 
      label: 'Career Launch', 
      progress: 0,
      color: 'from-indigo-600 to-blue-700',
      status: 'upcoming',
      description: 'Job placement'
    }
  ];

  return (
    <div className="relative w-full h-96 flex justify-center items-center">
      <PathPulseStyle />
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-emerald-500/5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl h-80" style={dynamicStyle}>
        
        {/* Base Platform */}
        <div className="absolute inset-0 glass-effect rounded-3xl shadow-2xl"></div>

        {/* Curved SVG Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          <path
            d="M 60 80 Q 200 40, 340 80 Q 480 120, 620 80 Q 760 40, 900 80"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            strokeDasharray="10,6"
            className="animate-path-pulse"
          />
        </svg>

        {/* Milestones */}
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`absolute ${milestone.position} transform transition-all duration-300 hover:scale-110 group`}
          >
            {/* Progress Ring */}
            <div className="absolute -inset-3 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-violet-300/30"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="150.8"
                  strokeDashoffset={150.8 - (milestone.progress / 100) * 150.8}
                  className="text-violet-500 transition-all duration-1000"
                />
              </svg>
            </div>

            {/* Milestone Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} shadow-lg flex items-center justify-center relative z-10 group-hover:shadow-xl transition-all duration-300 animate-node-float`}
                 style={{ animationDelay: `${index * 0.2}s` }}>
              <milestone.icon size={20} className="text-white" />
              
              {milestone.status === 'completed' && (
                <CheckCircle size={12} className="text-white absolute -top-1 -right-1 bg-green-500 rounded-full" />
              )}
            </div>

            {/* Label */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
              <span className="text-xs font-semibold bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-gray-800 shadow-sm whitespace-nowrap">
                {milestone.label}
              </span>
              <div className="text-[10px] text-gray-600 mt-1 font-medium">
                {milestone.progress}%
              </div>
            </div>
          </div>
        ))}

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-blue-400 rounded-full blur-sm animate-particle-float pointer-events-none"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${30 + Math.sin(i) * 40}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/20">
          <div className="flex items-center space-x-3">
            <TrendingUp size={16} className="text-violet-600" />
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 to-blue-500 rounded-full transition-all duration-1000"
                style={{ width: '65%' }}
              ></div>
            </div>
            <span className="text-sm font-bold text-violet-600">65% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Demo Modal
const VideoDemoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Platform Demo</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={32} className="text-white ml-1" />
            </div>
            <p className="text-lg">Video demo would play here</p>
            <p className="text-sm text-gray-300 mt-2">Showing platform features and workflow</p>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-2">What you'll see:</h4>
          <ul className="text-gray-600 space-y-1">
            <li>• AI-powered career assessment</li>
            <li>• Personalized roadmap creation</li>
            <li>• ATS resume checking in action</li>
            <li>• Skill path selection process</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 });
  const [showVideoDemo, setShowVideoDemo] = useState(false);
  const heroRef = useRef(null);
  const rotationMax = 6;
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setContainerSize({ width: rect.width, height: rect.height });
        setMousePos({ x, y });
      }
    };

    const targetElement = heroRef.current;
    if (targetElement) {
      targetElement.addEventListener('mousemove', handleMouseMove);
      setContainerSize({ width: targetElement.clientWidth, height: targetElement.clientHeight });
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const normalizedX = (mousePos.x / containerSize.width) - 0.5;
  const normalizedY = (mousePos.y / containerSize.height) - 0.5;
  const rotationY = Math.min(Math.max(normalizedX * rotationMax * 2, -rotationMax), rotationMax) * -1;
  const rotationX = Math.min(Math.max(normalizedY * rotationMax * 2, -rotationMax), rotationMax);

  // Navigation handlers
  const handleATSChecker = () => {
    navigate('/ats-checker');
  };

  const handleSkillPath = () => {
    navigate('/skill-path');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 font-sans">
      {/* Hero Section */}
      <main className="pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Content Column */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-violet-700 shadow-lg mb-6 border border-white/20">
                <Sparkles size={16} className="mr-2" />
                AI-Powered Career Platform
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
                Your <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Dream Career</span> Starts Here
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Transform your career journey with personalized AI guidance, real-time skill mapping, and smart job matching.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* ATS Checker Button - Replaced Start Free Assessment */}
                <button 
                  onClick={handleATSChecker}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  <FileText size={20} className="mr-2" />
                  <span>AI ATS Checker</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                {/* Skill Path Button - Replaced Watch Demo */}
                <button 
                  onClick={handleSkillPath}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-violet-700 border-2 border-violet-200 rounded-2xl hover:border-violet-300 hover:bg-violet-50/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  <BookOpen size={20} className="mr-2" />
                  Explore Skill Paths
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-blue-500" />
                  <span>Secure & Private</span>
                </div>
                {/* Video Demo as small link */}
                <button 
                  onClick={() => setShowVideoDemo(true)}
                  className="flex items-center space-x-2 text-violet-600 hover:text-violet-700 transition-colors"
                >
                  <Video size={16} />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
            
            {/* Visual Column */}
            <div 
              ref={heroRef}
              className="hidden lg:col-span-6 xl:col-span-5 lg:flex justify-center items-center mt-12 lg:mt-0"
            >
              <div className="w-full max-w-4xl h-96 p-6 relative">
                <Roadmap3DAnimation rotationX={rotationX} rotationY={rotationY} />
              </div>
            </div>
          </div>

          {/* Removed the ATS Checker & Skill Paths Section from below */}
        </div>
      </main>

      {/* Video Demo Modal */}
      <VideoDemoModal isOpen={showVideoDemo} onClose={() => setShowVideoDemo(false)} />
    </div>
  );
};

export default App;