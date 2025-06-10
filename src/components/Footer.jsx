// src/components/Footer.jsx
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Raj Clinic</h2>
          <p className="text-sm text-gray-300">Diabetes & Cancer Counseling</p>
          <p className="text-xs text-gray-400 mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-1 text-sm items-center md:items-start">
          <div className="flex items-center gap-2">
            <FaPhone /> <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope /> <span>dr.sanjaypal@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp /> <span>+91 98765 43210</span>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex gap-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <FaFacebookF />
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
            <FaWhatsapp />
          </a>
          {/* You can add more like LinkedIn, Instagram etc. */}
        </div>
      </div>

      {/* Optional Scroll to Top */}
      <div className="mt-4 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm text-yellow-300 hover:underline"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
