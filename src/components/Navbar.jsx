import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Dr. Sharma's Clinic
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/services" className="hover:text-blue-600">Services</Link>
          <Link to="/appointment" className="hover:text-blue-600">Appointment</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow">
          <Link to="/" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/services" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/appointment" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Appointment</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
