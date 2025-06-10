// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // install react-icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1'
      : 'hover:text-yellow-300 transition duration-200';

  return (
    <nav className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src="https://media.istockphoto.com/id/1448657772/vector/diabetes-care-vector-element-concept-design-template.jpg?s=612x612&w=0&k=20&c=cajECTOIVSy1PlvYJOyzN30Mfjp8EBbXsMsE6Cs6-Fo="
            alt="Clinic Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <NavLink to="/" className="font-bold text-xl tracking-wide hover:text-yellow-300">
            Raj's Clinic
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/appointment" className={navLinkClass}>Appointment</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/signup" className={navLinkClass}>SignUp</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3 text-sm font-medium">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/services" className={navLinkClass} onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/appointment" className={navLinkClass} onClick={() => setIsOpen(false)}>Appointment</NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
          <NavLink to="/signup" className={navLinkClass} onClick={() => setIsOpen(false)}>SignUp</NavLink>
        </div>
      )}
    </nav>
  );
}
