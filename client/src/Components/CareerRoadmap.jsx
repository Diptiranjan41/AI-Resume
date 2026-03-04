import React, { useState, useEffect, useRef } from "react";

const roadmapSteps = [
  {
    title: "Self Assessment",
    description: "Understand your strengths, weaknesses, and career interests. Identify the skills you already have and the skills you need to develop.",
    icon: "🔍",
    color: "from-blue-500 to-purple-600",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600"
  },
  {
    title: "Skill Development",
    description: "Learn relevant technical and soft skills for your desired job role. Use online courses, tutorials, and hands-on projects.",
    icon: "🚀",
    color: "from-blue-400 to-purple-500",
    gradient: "bg-gradient-to-r from-blue-400 to-purple-500"
  },
  {
    title: "Resume & Portfolio",
    description: "Build a strong resume highlighting your skills and achievements. Create a portfolio showcasing your projects and accomplishments.",
    icon: "📄",
    color: "from-blue-300 to-white",
    gradient: "bg-gradient-to-r from-blue-300 to-white"
  },
  {
    title: "Networking",
    description: "Connect with professionals in your field. Attend webinars, meetups, and LinkedIn networking events.",
    icon: "🌐",
    color: "from-white to-blue-500",
    gradient: "bg-gradient-to-r from-white to-blue-500"
  },
  {
    title: "Mock Interviews",
    description: "Practice interviews using mock sessions. Get feedback to improve your answers, confidence, and body language.",
    icon: "💬",
    color: "from-purple-500 to-blue-500",
    gradient: "bg-gradient-to-r from-purple-500 to-blue-500"
  },
  {
    title: "Job Applications",
    description: "Apply to relevant job openings and internships. Tailor your resume and cover letter for each application.",
    icon: "📨",
    color: "from-blue-200 to-purple-400",
    gradient: "bg-gradient-to-r from-blue-200 to-purple-400"
  },
  {
    title: "Interview Preparation",
    description: "Research companies, practice common interview questions, and prepare for technical assessments.",
    icon: "🎯",
    color: "from-purple-400 to-blue-300",
    gradient: "bg-gradient-to-r from-purple-400 to-blue-300"
  },
  {
    title: "Offer & Negotiation",
    description: "Evaluate job offers, negotiate salary and benefits, and make informed decisions.",
    icon: "💰",
    color: "from-white to-blue-400",
    gradient: "bg-gradient-to-r from-white to-blue-400"
  },
  {
    title: "Onboarding & Growth",
    description: "Start your new job, adapt to the company culture, and continue learning to grow professionally.",
    icon: "📈",
    color: "from-blue-500 to-white",
    gradient: "bg-gradient-to-r from-blue-500 to-white"
  },
];

const CareerRoadmap = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const roadmapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (roadmapRef.current) {
      observer.observe(roadmapRef.current);
    }

    return () => {
      if (roadmapRef.current) {
        observer.unobserve(roadmapRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % roadmapSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={roadmapRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-6 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-50 animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Career Roadmap to Success
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Follow this interactive roadmap to navigate your career journey from self-assessment to professional growth
          </p>
        </div>

        {/* Main Roadmap Container */}
        <div className="relative">
          {/* Central Timeline with 3D Effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-600 rounded-full shadow-xl shadow-blue-400/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-600 rounded-full blur-sm opacity-60"></div>
          </div>

          {/* Animated Progress Line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-300 via-purple-400 to-blue-500 rounded-full shadow-lg shadow-blue-400/20 transition-all duration-1000 ease-out"
            style={{ 
              height: `${(activeStep / (roadmapSteps.length - 1)) * 100}%`,
              top: '0%'
            }}
          ></div>

          {/* Steps */}
          <div className="space-y-24">
            {roadmapSteps.map((step, index) => {
              const isActive = index === activeStep;
              const isLeft = index % 2 === 0;
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {/* Left Side Content */}
                  {isLeft && (
                    <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0">
                      <div className={`p-8 rounded-2xl backdrop-blur-sm bg-white/80 border border-blue-200/50 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 ${
                        isActive ? 'scale-105 shadow-blue-500/20 border-blue-300' : ''
                      }`}>
                        <div className="flex items-center mb-4">
                          <div className={`w-14 h-14 rounded-xl ${step.gradient} flex items-center justify-center text-2xl shadow-lg mr-4 transform transition-transform duration-300 ${
                            isActive ? 'rotate-12 scale-110' : ''
                          }`}>
                            {step.icon}
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800">{step.title}</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {step.description}
                        </p>
                        <div className={`mt-4 w-20 h-1 ${step.gradient} rounded-full transition-all duration-500 ${
                          isActive ? 'w-32' : 'w-20'
                        }`}></div>
                      </div>
                    </div>
                  )}

                  {/* Step Number with 3D Effect */}
                  <div className="relative z-20 flex-shrink-0">
                    <div className={`relative w-16 h-16 rounded-2xl ${step.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-500 transform ${
                      isActive 
                        ? 'scale-125 rotate-12 shadow-blue-500/30' 
                        : 'scale-100 rotate-0'
                    }`}>
                      {index + 1}
                      {/* 3D Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 transform -rotate-12"></div>
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/30"></div>
                    </div>
                    
                    {/* Connection Line */}
                    {index < roadmapSteps.length - 1 && (
                      <div className={`absolute left-1/2 top-full w-1 h-12 bg-gradient-to-b ${step.color} transform -translate-x-1/2 transition-all duration-500 ${
                        isActive ? 'opacity-100 scale-y-100' : 'opacity-60 scale-y-75'
                      }`}></div>
                    )}
                  </div>

                  {/* Right Side Content */}
                  {!isLeft && (
                    <div className="md:w-1/2 md:pl-16 mt-8 md:mt-0">
                      <div className={`p-8 rounded-2xl backdrop-blur-sm bg-white/80 border border-blue-200/50 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 ${
                        isActive ? 'scale-105 shadow-blue-500/20 border-blue-300' : ''
                      }`}>
                        <div className="flex items-center mb-4">
                          <div className={`w-14 h-14 rounded-xl ${step.gradient} flex items-center justify-center text-2xl shadow-lg mr-4 transform transition-transform duration-300 ${
                            isActive ? 'rotate-12 scale-110' : ''
                          }`}>
                            {step.icon}
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800">{step.title}</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {step.description}
                        </p>
                        <div className={`mt-4 w-20 h-1 ${step.gradient} rounded-full transition-all duration-500 ${
                          isActive ? 'w-32' : 'w-20'
                        }`}></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-blue-200/50 shadow-lg">
            <span className="text-gray-700 font-semibold">Current Step:</span>
            <span className="text-blue-600 font-bold text-lg">
              {roadmapSteps[activeStep].title}
            </span>
            <div className="flex space-x-1">
              {roadmapSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeStep 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-blue-200 hover:bg-blue-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl border border-blue-200/50 hover:bg-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={activeStep === 0}
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveStep(prev => Math.min(roadmapSteps.length - 1, prev + 1))}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl border border-blue-400/50 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeStep === roadmapSteps.length - 1}
          >
            Next →
          </button>
        </div>

        {/* Completion Message */}
        {activeStep === roadmapSteps.length - 1 && (
          <div className="mt-12 text-center animate-bounce">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-xl">
              <span className="text-2xl">🎉</span>
              <span className="font-bold text-lg">Congratulations! You've completed the roadmap!</span>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CareerRoadmap;