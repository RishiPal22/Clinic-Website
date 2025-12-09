import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import SignOut from '@/pages/SignOut';
import { supabase } from './SupabaseClient';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      subscription?.unsubscribe();
    };
  },[])

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-bold border-b-2 border-white pb-1'
      : 'text-white/80 hover:text-white transition duration-200';

  return (
    <nav className="backdrop-blur-md text-white shadow-lg sticky top-0 z-50" style={{ backgroundColor: 'rgba(0, 121, 158, 0.95)' }}>
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
            className="font-extrabold text-2xl tracking-wide bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
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
          {user ? (
            <SignOut />
          ) : (
            <NavLink
              to="/signup"
              className="text-white font-bold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: '#d2084f',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a00640')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d2084f')}
            >
              Sign Up
            </NavLink>
          )}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden p-2 rounded-md transition"
          style={{ backgroundColor: 'rgba(210, 8, 79, 0.3)' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6 text-white" />
          ) : (
            <FaBars className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } backdrop-blur-md px-6 py-4 text-base font-medium rounded-b-xl shadow-md`}
        style={{ backgroundColor: 'rgba(1, 90, 125, 0.98)' }}
      >
        <div className="flex flex-col space-y-4">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/services" className={navLinkClass} onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/appointment" className={navLinkClass} onClick={() => setIsOpen(false)}>Appointment</NavLink>
          <NavLink to="/Blog" className={navLinkClass} onClick={() => setIsOpen(false)}>Blogs</NavLink>
          {user ? (
            <SignOut mobile onClick={() => setIsOpen(false)} />
          ) : (
            <NavLink
              to="/signup"
              className="block text-white px-4 py-2 rounded-full font-bold text-center transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#d2084f' }}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a00640')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#d2084f')}
            >
              Sign Up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
