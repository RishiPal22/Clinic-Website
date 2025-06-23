"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Lock, User, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react"
import { supabase } from "../components/SupabaseClient"

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "admin@rajclinic.com",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setDebugInfo("")

    try {
      console.log("Attempting login with:", formData.email)

      // Step 1: Try to sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        console.error("Auth error:", authError)
        setError(`Authentication failed: ${authError.message}`)
        return
      }

      console.log("Auth successful, checking admin privileges...")
      setDebugInfo("Authentication successful, checking admin privileges...")

      // Step 2: Check if user exists in admin_users table (use select instead of insert)
      const { data: profile, error: profileError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", formData.email)
        .maybeSingle() // Use maybeSingle to avoid errors when no rows found

      console.log("Admin check result:", { profile, profileError })

      if (profileError && profileError.code !== "PGRST116") {
        // Handle actual database errors (not "no rows" error)
        console.error("Profile error:", profileError)
        await supabase.auth.signOut()
        setError(`Database error: ${profileError.message}`)
        return
      }

      if (!profile) {
        // User not in admin_users table
        await supabase.auth.signOut()
        setError("Access denied. This user is not registered as an admin. Please contact the system administrator.")
        setDebugInfo(`User ${formData.email} exists in Auth but not in admin_users table.`)
        return
      }

      console.log("Admin access granted:", profile)

      // Step 3: Store admin info and redirect
      localStorage.setItem("isAdmin", "true")
      localStorage.setItem("adminUser", JSON.stringify(profile))

      setDebugInfo("Login successful! Redirecting...")

      // Small delay to show success message
      setTimeout(() => {
        window.location.href = "/admin/dashboard"
      }, 1000)
    } catch (error) {
      console.error("Login error:", error)
      setError(`An unexpected error occurred: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
          <p className="text-gray-600">Access the clinic administration panel</p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 mb-6">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-red-800 text-sm font-medium">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {debugInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-3 mb-6">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <p className="text-blue-800 text-sm">{debugInfo}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@rajclinic.com"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Website
            </a>
          </div>
        </CardContent>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 mb-3">
            <strong>First Time Setup:</strong>
          </p>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Run the "simple-admin-setup.sql" script in your Supabase SQL editor</li>
            <li>2. Create an auth user in Supabase Auth with email: admin@rajclinic.com</li>
            <li>3. Use that password to login here</li>
          </ol>
        </div>
      </Card>
    </div>
  )
}
