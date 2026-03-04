import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components import (correct paths)
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Testimonials from "./Components/Testimonials";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import CareerNavigator from "./Components/CareerNavigator";
import Internships from "./Components/Internships";
import Chatbot from "./Components/Chatbot";
import SkillPath from "./Components/SkillPath"; // ✅ fixed capitalization
import ATSChecker from "./Components/ATSChecker";
import CareerRoadmap from "./Components/CareerRoadmap";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
// import Profile from "./Components/Profile"; // ❌ removed
import ForgotPassword from "./Components/ForgotPassword";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career-navigator" element={<CareerNavigator />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/skill-path" element={<SkillPath />} /> {/* ✅ matches import */}
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="/career-roadmap" element={<CareerRoadmap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
