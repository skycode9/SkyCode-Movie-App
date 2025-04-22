import React, { useState } from "react";

import Sidebar from "./templates/Sidebar";
import Topbar from "./templates/Topbar";

const Contact = () => {
  document.title = "SkyCode | Contact Us";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: "",
      });
    }, 5000);
  };

  return (
    <>
      <Sidebar />
      <div className="w-[77%] h-screen overflow-y-auto">
        <Topbar />
        <div className="p-8 md:p-12 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center">
            <i className="ri-phone-fill text-[#6556CD] mr-3"></i>
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-800 rounded-xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Get In Touch
              </h2>

              {formStatus.submitted && (
                <div
                  className={`p-4 mb-6 rounded-md ${
                    formStatus.success
                      ? "bg-green-900/50 text-green-200"
                      : "bg-red-900/50 text-red-200"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-zinc-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-zinc-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-zinc-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-zinc-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6556CD]"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#6556CD] hover:bg-[#5447b0] text-white py-2 px-6 rounded-md transition-colors duration-300 flex items-center"
                >
                  <i className="ri-send-plane-fill mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <div className="bg-zinc-800 rounded-xl p-6 md:p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Contact Information
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start text-zinc-300">
                    <i className="ri-map-pin-fill text-[#6556CD] text-xl mr-3 mt-1"></i>
                    <div>
                      <p className="font-medium">Address</p>
                      <p>123 Movie Street, Hollywood</p>
                      <p>Los Angeles, CA 90001</p>
                    </div>
                  </li>
                  <li className="flex items-start text-zinc-300">
                    <i className="ri-mail-fill text-[#6556CD] text-xl mr-3 mt-1"></i>
                    <div>
                      <p className="font-medium">Email</p>
                      <p>contact@movieapp.com</p>
                      <p>support@movieapp.com</p>
                    </div>
                  </li>
                  <li className="flex items-start text-zinc-300">
                    <i className="ri-phone-fill text-[#6556CD] text-xl mr-3 mt-1"></i>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>+1 (555) 555-5555</p>
                      <p>+1 (333) 333-3333</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-800 rounded-xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Connect With Us
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white hover:bg-[#6556CD] transition-colors duration-300"
                  >
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white hover:bg-[#6556CD] transition-colors duration-300"
                  >
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white hover:bg-[#6556CD] transition-colors duration-300"
                  >
                    <i className="ri-instagram-fill"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white hover:bg-[#6556CD] transition-colors duration-300"
                  >
                    <i className="ri-youtube-fill"></i>
                  </a>
                </div>
                <div className="mt-6 text-zinc-400 text-sm">
                  <p>
                    Follow us on social media for updates on new releases, movie
                    news, and more!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
