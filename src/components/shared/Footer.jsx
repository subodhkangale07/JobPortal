import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">YourLogo</h2>
            <p className="text-gray-400">
              Building a bridge between job seekers and employers with a modern, user-friendly platform.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2 hover:text-gray-300"><a href="/">Home</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/about">About Us</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/jobs">Jobs</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul>
              <li className="mb-2 hover:text-gray-300"><a href="/blog">Blog</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/privacy">Privacy Policy</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/terms">Terms of Service</a></li>
              <li className="mb-2 hover:text-gray-300"><a href="/faq">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i> Facebook</a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i> Twitter</a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i> Instagram</a>
              <a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin"></i> LinkedIn</a>
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
