import React from 'react';
import logo from '../../assets/logo.png';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Footer Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Logo and Description */}
          <div>
            <div className="mb-6">
              <img 
                src={logo} 
                alt="JobHunt Logo" 
                className="h-12 w-auto max-w-full hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <p className="text-gray-400 mb-6">
              Building bridges between talent and opportunity, making job searching and hiring simpler, faster, and more effective.
            </p>

          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-500 z-0"></span>
            </h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Jobs', 'Contact Us'].map((item, index) => (
                <li key={index}>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Resources</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-500 z-0"></span>
            </h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Help Center', 'For Employers'].map((item, index) => (
                <li key={index}>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-4 w-4 mr-2 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="relative z-10">Follow Us</span>
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-purple-500 z-0"></span>
            </h3>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="/" className="bg-gray-800 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="/" className="bg-gray-800 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="/" className="bg-gray-800 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/subodhkangale07052004/" className="bg-gray-800 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} JobHunt. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</Link>
              <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</Link>
              <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;