import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", college: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* ---------- LEFT SIDE INFO ---------- */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-indigo-200 dark:bg-indigo-800 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-6 leading-tight">
            Let’s <span className="text-indigo-600">Connect</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Have a question, suggestion, or partnership idea?  
            We’d love to hear from you! Reach out to our team — we’re here to
            help you grow your career with AI-powered insights.
          </p>

          <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md space-y-2">
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              📧 <span className="font-medium">BPUT Career Navigator.ai@gmail.com</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              📍 <span>Bhubaneswar, Odisha, India</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              ⏰ <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
            </p>
          </div>
        </div>

        {/* ---------- RIGHT SIDE CONTACT FORM ---------- */}
        <div>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300"
            >
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center tracking-tight">
                Contact <span className="text-indigo-600">Us</span>
              </h3>

              {/* Name */}
              <div className="mb-5">
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* College */}
              <div className="mb-5">
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold tracking-wide">
                  College / Organization (optional)
                </label>
                <input
                  type="text"
                  name="college"
                  placeholder="Your college or organization"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold tracking-wide">
                  Message / Query
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-3 rounded-lg shadow-lg transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-2xl shadow-lg p-10 text-center transition-all duration-500">
              <h3 className="text-3xl font-bold mb-4">✅ Thank you!</h3>
              <p className="text-lg">We’ll get back to you soon.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
