import React from 'react';
import logo from '../../assets/jobhunt.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Logo and Description */}
          <div>
          <img 
      src={logo} 
      alt="Company Logo" 
      className=" h-16 w-auto max-w-full p-2 hover:scale-105 transition-transform duration-300" 
    />
            <p className="text-gray-400">
              Building a bridge between job seekers and employers with a modern, user-friendly platform.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2 hover:text-gray-300"><a href="/">Home</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/">About Us</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/jobs">Jobs</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul>
              <li className="mb-2 hover:text-gray-300"><a href="/">Blog</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/">Privacy Policy</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/">Terms of Service</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="/" className="hover:text-gray-400 flex items-center"><i className="fab fa-facebook-f mr-1"></i> Facebook</a>
              <a href="/" className="hover:text-gray-400 flex items-center"><i className="fab fa-twitter mr-1"></i> Twitter</a>
              <a href="/" className="hover:text-gray-400 flex items-center"><i className="fab fa-instagram mr-1"></i> Instagram</a>
              <a href="https://www.linkedin.com/in/subodhkangale07052004/" className="hover:text-gray-400 flex items-center"><i className="fab fa-linkedin mr-1"></i> LinkedIn</a>
            </div>
          </div>

        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
