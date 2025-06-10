
import './App.css'
import {Routes,Route}from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import AppointmentPage from './pages/AppointmentPage'
import ContactPage from './pages/ContactPage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {
  

  return (
    <>
     <Navbar />
     <Routes>
       <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
     </Routes>
     <Footer/>


    </>
  )
}

export default App
