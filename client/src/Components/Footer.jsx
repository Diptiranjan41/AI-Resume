import React from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  return (
    // Changed: bg-gray-900 to bg-white, text-gray-300 to text-gray-700, px-6 remains
    <footer className="bg-white text-gray-700 pt-16 pb-8 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* ---------- LOGO / ABOUT ---------- */}
        <div>
          {/* Changed: text-white to text-gray-900, text-indigo-500 to text-blue-600 */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
           BPUT Career Navigator <span className="text-blue-600">AI</span>
          </h2>
          {/* Changed: text-gray-400 to text-gray-600 */}
          <p className="text-gray-600 leading-relaxed mb-4">
            AI-Powered Career Recommendation & Internship Matching Platform
            helping students build future-ready careers.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              // Changed: bg-gray-800 to bg-blue-50, hover:bg-indigo-600 to hover:bg-blue-600, Added text-blue-600
              className="p-2 bg-blue-50 hover:bg-blue-600 rounded-full transition text-blue-600 hover:text-white"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-blue-50 hover:bg-blue-600 rounded-full transition text-blue-600 hover:text-white"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-blue-50 hover:bg-blue-600 rounded-full transition text-blue-600 hover:text-white"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* ---------- QUICK LINKS ---------- */}
        <div>
          {/* Changed: text-white to text-gray-900 */}
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h3>
          {/* Changed: text-gray-400 to text-gray-700 */}
          <ul className="space-y-2 text-gray-700">
            <li>
              {/* Changed: hover:text-indigo-400 to hover:text-blue-600 */}
              <a href="#home" className="hover:text-blue-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-blue-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-blue-600 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* ---------- OUR SERVICES ---------- */}
        <div>
          {/* Changed: text-white to text-gray-900 */}
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Services</h3>
          {/* Changed: text-gray-400 to text-gray-700, Added a slight hover effect to make them feel like links */}
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer transition">AI Career Recommendations</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Internship Matching</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Resume Builder</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Skill Development Tools</li>
          </ul>
        </div>

        {/* ---------- CONTACT INFO ---------- */}
        <div>
          {/* Changed: text-white to text-gray-900 */}
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Info</h3>
          {/* Changed: text-gray-400 to text-gray-700 */}
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              {/* Changed: text-indigo-500 to text-blue-600 */}
              <MapPin size={18} className="text-blue-600" />
              Bhubaneswar, Odisha, India
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-blue-600" />
              BPUT Career Navigator.ai@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-blue-600" />
              +91 98765 43210
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- COPYRIGHT BAR ---------- */}
      {/* Changed: border-gray-700 to border-gray-300, text-gray-500 to text-gray-500 */}
      <div className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BPUT Career Navigator. All rights reserved.  
        <span className="block md:inline mt-2 md:mt-0">
          {/* Kept heart color as is, but could be changed to a blue */}
          | Designed with ❤️ by Team Byte-Budies
          
        </span>
      </div>
    </footer>
  );
}

export default Footer;