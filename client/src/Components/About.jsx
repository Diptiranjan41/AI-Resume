import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Rocket } from "lucide-react";

function About() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-6"
        >
          About <span className="text-indigo-600">CareerBridge AI</span>
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          CareerBridge AI is an intelligent platform that bridges the gap between
          students, universities, and industries by providing personalized career
          recommendations, AI-driven internship matching, and real-time job
          readiness insights.
        </p>

        {/* Mission, Vision, Values Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
          >
            <div className="flex justify-center mb-4">
              <Target className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Empower every learner with data-driven career insights and connect
              them with meaningful opportunities that align with their skills and
              aspirations.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
          >
            <div className="flex justify-center mb-4">
              <Lightbulb className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become the global standard for AI-powered career growth —
              helping millions discover their potential and thrive in the future
              of work.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
          >
            <div className="flex justify-center mb-4">
              <Users className="h-10 w-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Our Values
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Innovation, transparency, and inclusion guide every decision we
              make. We believe in building tools that truly make careers
              accessible and equitable for everyone.
            </p>
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <Rocket className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Join the Future of Career Growth
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start your journey with AI-powered insights and personalized career
            pathways.
          </p>
          <a
            href="/register"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
