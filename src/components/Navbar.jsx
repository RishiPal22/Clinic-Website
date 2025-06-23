import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1'
      : 'text-white hover:text-yellow-300 transition duration-200';

  return (
    <nav className="backdrop-blur-md bg-blue-900/70 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src="https://media.istockphoto.com/id/1448657772/vector/diabetes-care-vector-element-concept-design-template.jpg?s=612x612&w=0&k=20&c=cajECTOIVSy1PlvYJOyzN30Mfjp8EBbXsMsE6Cs6-Fo="
            alt="Clinic Logo"
            className="w-10 h-10 rounded-full shadow-md"
          />
          <NavLink
            to="/"
            className="font-extrabold text-2xl tracking-wide bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent"
          >
            Raj Clinic
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/appointment" className={navLinkClass}>Appointment</NavLink>
          <NavLink to="/Blog" className={navLinkClass}>Blogs</NavLink>
          <NavLink
            to="/signup"
            className="bg-yellow-400 text-blue-900 px-4 py-1.5 rounded-full hover:bg-yellow-300 transition font-bold"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden p-2 rounded-md bg-blue-700/60 hover:bg-blue-600 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6 text-yellow-300" />
          ) : (
            <FaBars className="w-6 h-6 text-yellow-300" />
          )}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-blue-800/95 backdrop-blur-md px-6 py-4 text-base font-medium rounded-b-xl shadow-md`}
      >
        <div className="flex flex-col space-y-4">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/services" className={navLinkClass} onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/appointment" className={navLinkClass} onClick={() => setIsOpen(false)}>Appointment</NavLink>
          <NavLink to="/Blog" className={navLinkClass} onClick={() => setIsOpen(false)}>Blogs</NavLink>
          <NavLink
            to="/signup"
            className="block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full hover:bg-yellow-300 font-bold text-center transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
