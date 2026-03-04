import React from 'react';

// Sample data for the BPUT Career Navigator testimonials
const testimonialData = [
  {
    quote: "The personalized roadmap was a game-changer. It told me exactly which skills to focus on for my target role, and the AI mock interviews boosted my confidence immensely. I landed my dream role at a FAANG company!",
    name: 'Priya Sharma',
    title: 'Software Engineer, Google',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?fit=crop&w=80&h=80&q=80',
  },
  {
    quote: "BPUT Career Navigator cut through the noise. Instead of endless searching, I got curated resources and focused practice. The ROI on my time was incredible. Highly recommend this for any serious tech aspirant.",
    name: 'Arjun Reddy',
    title: 'Data Scientist, Microsoft',
    image: 'https://images.unsplash.com/photo-1507003211169-0a812d80f81d?fit=crop&w=80&h=80&q=80',
  },
  {
    quote: "I was struggling to switch from mechanical to software, but the AI guidance gave me a structured learning path. I secured a role as a Backend Developer in just six months. Thank you, BPUT Navigator!",
    name: 'Vishal Singh',
    title: 'Backend Developer, TechCorp Innovations',
    image: 'https://images.unsplash.com/photo-1519244706279-af8857321596?fit=crop&w=80&h=80&q=80',
  },
  {
    quote: "The detailed interview feedback from the AI was brutally honest and exactly what I needed. It pinpointed my weaknesses in system design, allowing me to focus my prep effectively.",
    name: 'Neha Gupta',
    title: 'Product Analyst, Cloud Solutions',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=80&h=80&q=80',
  },
];

const BPUTTestimonials = () => {
  return (
    <>
      {/* Load Inter font and Tailwind CSS */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="min-h-screen font-sans">
        <section className="bg-white py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            
            {/* Header Section */}
            <div className="mx-auto max-w-2xl text-center">
              {/* Updated: Accent color changed to indigo-600 */}
              <p className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                Success Stories
              </p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                The AI-Powered Path Works.
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Don't just take our word for it—read how BPUT Career Navigator launched careers.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-900 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:gap-x-16">
              {testimonialData.map((testimonial, index) => (
                <figure
                  key={index}
                  // Updated: Hover ring color changed to indigo-300
                  className="rounded-3xl bg-white p-10 shadow-xl ring-1 ring-gray-100 transition duration-300 hover:shadow-2xl hover:ring-indigo-300"
                >
                  {/* Quote Icon */}
                  <svg
                    // Updated: Icon color changed to indigo-600
                    className="h-10 w-10 mb-6 opacity-90 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.232.518-3.375 2.542-3.646 4.92.105.628.18 1.295.18 1.959 0 4.14-3.52 7.47-7.868 7.47H13V14.725zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.232.518-3.375 2.542-3.646 4.92.105.628.18 1.295.18 1.959 0 4.14-3.52 7.47-7.868 7.47H0V14.725z" />
                  </svg>

                  {/* Quote Text */}
                  <blockquote className="text-gray-800">
                    <p className="text-lg font-medium italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author Info */}
                  <figcaption className="mt-8 flex items-center gap-x-4">
                    <img
                      // Updated: Ring color changed to indigo-600
                      className="h-12 w-12 flex-none rounded-full bg-white object-cover ring-2 ring-indigo-600 p-0.5"
                      src={testimonial.image}
                      alt={`Profile picture of ${testimonial.name}`}
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/F5F5F5/808080?text=👤" }}
                    />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      {/* Updated: Title text color changed to indigo-600 */}
                      <div className="text-indigo-600">
                        <cite className="not-italic font-medium">{testimonial.title}</cite>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BPUTTestimonials;
