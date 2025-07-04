"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "./components/SupabaseClient"

// Import all your pages
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import ContactPage from "./pages/ContactPage"
import AppointmentPage from "./pages/AppointmentPage"
import PatientAppointmentStatus from "./pages/PatientAppointmentStatus"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

// Import admin pages
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
// Remove this import
// import AppointmentManagement from "./pages/AppointmentManagement"
import BlogEditor from "./pages/BlogEditor"
import BlogPage from "./pages/BlogPage"
import BlogPost from "./pages/BlogPost"

// Import components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"

import "./App.css"
import ForgotPasswordPage from "./pages/ForgotPassword"
import ResetPasswordPage from "./pages/ResetPassword"

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <AboutPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <ServicesPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <ContactPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/appointment"
          element={
            <>
              <Navbar />
              <AppointmentPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/appointment-status"
          element={
            <>
              <Navbar />
              <PatientAppointmentStatus />
              <Footer />
            </>
          }
        />

        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <BlogPage />
              <Footer />
            </>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <>
              <Navbar />
              <BlogPost />
              <Footer />
            </>
          }
        />

        <Route
          path="/signin"
          element={
            <>
              <Navbar />
              <Signin />
              <Footer />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Signup />
              <Footer />
            </>
          }
        />

        {/* Admin Routes (No Navbar/Footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Remove this route
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <AppointmentManagement />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/admin/blog/new"
          element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />

        <Route
          path="/admin/blog/edit/:id"
          element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          }
        />

        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Go Home
                  </a>
                </div>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
