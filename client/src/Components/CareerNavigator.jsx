import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ Added Link import
import {
  Briefcase,
  Code,
  Feather,
  Target,
  BarChart3,
  GraduationCap,
  Rocket,
  MessageCircle,
} from 'lucide-react';

// --- Configuration Data ---
const careerCards = [
  {
    icon: Briefcase,
    title: 'Data Scientist',
    description: 'Analyze complex data, build predictive models, and extract actionable insights.',
  },
  {
    icon: Code,
    title: 'Software Engineer',
    description: 'Design, develop, and test scalable software applications and robust systems.',
  },
  {
    icon: Feather,
    title: 'UI/UX Designer',
    description: 'Create intuitive, accessible, and aesthetically pleasing user experiences.',
  },
  {
    icon: Target,
    title: 'Product Manager',
    description: 'Guide the strategy, roadmap, and feature definition for a product or product line.',
  },
  {
    icon: BarChart3,
    title: 'Financial Analyst',
    description: 'Evaluate financial data, predict market trends, and advise on investment strategies.',
  },
  {
    icon: GraduationCap,
    title: 'AI/ML Researcher',
    description: 'Explore new algorithms and develop cutting-edge models for intelligent systems.',
  },
];

const careerRoadmap = [
  { icon: Target, title: 'Identify Your Interests' },
  { icon: BarChart3, title: 'Analyze Your Skills' },
  { icon: GraduationCap, title: 'Learn & Build Portfolio' },
  { icon: Rocket, title: 'Apply for Internships' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
// --- Components ---

const CareerCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 border border-gray-100 dark:border-gray-700
               hover:-translate-y-1 hover:shadow-2xl transition duration-300 group cursor-pointer"
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 rounded-full bg-blue-50 dark:bg-gray-700 text-indigo-600 dark:text-blue-400">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">
        {title}
      </h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed min-h-[4rem]">
      {description}
    </p>
    <Link
      to="/chatbot" // ✅ Changed to Link component
      className="mt-4 inline-flex items-center text-indigo-600 dark:text-blue-400 font-semibold group-hover:underline"
    >
      Explore Path &rarr;
    </Link>
  </motion.div>
);

const RoadmapStep = ({ icon: Icon, title, isLast }) => (
  <div className="flex-1 min-w-[200px] relative">
    <div className="flex flex-col items-center p-4">
      <div className="p-4 rounded-full bg-indigo-600 text-white shadow-xl mb-4">
        <Icon size={32} />
      </div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>
    </div>
    {/* Connecting Line (Hidden on Mobile, Visible on Desktop for flow) */}
    {!isLast && (
      <div
        className="hidden md:block absolute top-1/2 -right-[15%] w-[30%] h-1 bg-blue-200 dark:bg-gray-700
                 transform -translate-y-1/2 z-0"
      ></div>
    )}
  </div>
);

// --- Main AICareerNavigator Component ---
const AICareerNavigator = () => {
  // Static readiness data for the indicator
  const readiness = { career: 'Data Science', percentage: 82 };

  return (
    <div className="relative py-20 px-6 overflow-hidden bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Subtle Background Gradient Blur */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10">
          <div className="w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute top-10 left-1/4 animate-blob"></div>
          <div className="w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute bottom-1/4 right-1/4 animate-blob animation-delay-4000"></div>
        </div>

        {/* 1. Intro Block */}
        <motion.header
          className="text-center mb-16 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.h1
            variants={textVariants}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4"
          >
            AI Career <span className="text-indigo-600">Navigator</span>
          </motion.h1>

          {/* Subtitle/Tagline */}
          <motion.p
            variants={textVariants}
            className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium mb-6"
          >
            Discover your best-fit career using AI recommendations.
          </motion.p>

          {/* Short paragraph */}
          <motion.p
            variants={textVariants}
            className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300"
          >
            Our intelligent system analyzes your skills, interests, and academic
            data to guide you toward the most suitable career options in the
            modern job market.
          </motion.p>
        </motion.header>

        {/* 2. Career Recommendation Cards Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {careerCards.map((card, index) => (
            <CareerCard key={index} {...card} />
          ))}
        </motion.div>

        {/* 3. Skill Readiness Indicator */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Skill Readiness Check
          </h2>
          <p className="text-center text-xl font-medium text-gray-700 dark:text-gray-200 mb-6">
            You're <span className="text-indigo-600 font-extrabold">{readiness.percentage}%</span>{' '}
            ready for a career in **{readiness.career}**.
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-indigo-600 h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              whileInView={{ width: `${readiness.percentage}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            ></motion.div>
          </div>
        </motion.div>

        {/* 4. Career Roadmap */}
        <div className="mt-20 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Your Future-Ready Roadmap
          </h2>
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-between items-stretch relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {careerRoadmap.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex-1"
              >
                <RoadmapStep
                  {...step}
                  isLast={index === careerRoadmap.length - 1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 5. AI Assistant Callout */}
        <motion.div
          className="mt-20 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-indigo-600 text-white rounded-3xl p-8 text-center shadow-2xl hover:bg-indigo-700 transition duration-300">
            <MessageCircle className="mx-auto mb-4" size={40} />
            <p className="text-2xl font-semibold mb-4">
              Ask our AI Mentor what career suits you best!
            </p>
            <Link
              to="/chatbot" // ✅ Changed to Link component
              className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition inline-block"
            >
              Chat with AI &rarr;
            </Link>
          </div>
        </motion.div>

        {/* 6. Call to Action (CTA) */}
        <motion.div
          className="text-center mt-16 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/chatbot" // ✅ Changed to Link component
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg
                       px-10 py-4 rounded-xl shadow-xl transition transform hover:scale-[1.02] inline-block"
          >
            Start Your Career Journey
          </Link>
        </motion.div>
      </div>
      {/* Required for Framer Motion and other utilities to work correctly */}
      <style>
        {`
        /* Minimal keyframes for the subtle background glow/blob effect */
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        /* Fix for mobile responsiveness of roadmap line */
        @media (max-width: 767px) {
          .flex-1 > div:last-child {
            display: none !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default AICareerNavigator;