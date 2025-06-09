import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <!-- Header Section --> */}
<header class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-4">
      
      {/* <!-- Logo --> */}
      <div class="flex-shrink-0">
        <a href="#" class="text-2xl font-bold text-blue-600">MyWebsite</a>
      </div>

      {/* <!-- Desktop Nav --> */}
      <nav class="hidden md:flex space-x-6">
        <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
        <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
        <a href="#" class="text-gray-700 hover:text-blue-600">Services</a>
        <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
      </nav>

      {/* <!-- Mobile Menu Button --> */}
      <div class="md:hidden">
        <button id="menu-button" class="text-gray-700 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    {/* <!-- Mobile Nav (hidden by default) --> */}
    <div id="mobile-menu" class="md:hidden hidden">
      <a href="#" class="block py-2 text-gray-700 hover:text-blue-600">Home</a>
      <a href="#" class="block py-2 text-gray-700 hover:text-blue-600">About</a>
      <a href="#" class="block py-2 text-gray-700 hover:text-blue-600">Services</a>
      <a href="#" class="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
    </div>
  </div>
</header>

{/* <!-- Script to toggle mobile menu --> */}


    </>
  )
}

export default App
