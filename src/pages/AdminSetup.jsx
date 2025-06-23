"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Lock, User, AlertCircle, Eye, EyeOff, CheckCircle, Settings } from "lucide-react"
import { supabase } from "../components/SupabaseClient"

export default function AdminSetup() {
  const [formData, setFormData] = useState({
    email: "admin@rajclinic.com",
    password: "",
    confirmPassword: "",
    fullName: "Dr. Sanjay Pal",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [existingAdmins, setExistingAdmins] = useState([])

  useEffect(() => {
    checkExistingAdmins()
  }, [])

  const checkExistingAdmins = async () => {
    try {
      const { data, error } = await supabase.from("admin_users").select("email, full_name, created_at")

      if (!error && data) {
        setExistingAdmins(data)
      }
    } catch (error) {
      console.log("Could not check existing admins:", error)
    }
  }

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
    setSuccess("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: "admin",
          },
        },
      })

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError("This email is already registered. Try logging in instead.")
        } else {
          setError(`Failed to create auth user: ${authError.message}`)
        }
        return
      }

      // Step 2: Add user to admin_users table
      const { data: profileData, error: profileError } = await supabase
        .from("admin_users")
        .insert({
          email: formData.email,
          full_name: formData.fullName,
          role: "admin",
        })
        .select()

      if (profileError) {
        if (profileError.code === "23505") {
          // Unique constraint violation
          setError("An admin with this email already exists.")
        } else {
          setError(`Failed to create admin profile: ${profileError.message}`)
        }
        return
      }

      setSuccess(
        "Admin user created successfully! You can now login with these credentials. " +
          (authData.user?.email_confirmed_at ? "" : "Please check your email for confirmation if required."),
      )

      // Clear form
      setFormData({
        email: "admin@rajclinic.com",
        password: "",
        confirmPassword: "",
        fullName: "Dr. Sanjay Pal",
      })

      // Refresh existing admins list
      checkExistingAdmins()
    } catch (error) {
      console.error("Setup error:", error)
      setError(`An unexpected error occurred: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Existing Admins */}
        {existingAdmins.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Existing Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {existingAdmins.map((admin, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{admin.full_name}</p>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                    </div>
                    <p className="text-sm text-gray-500">Created: {new Date(admin.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a href="/admin/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Login with existing account →
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Setup Form */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {existingAdmins.length > 0 ? "Add Another Admin" : "Admin Setup"}
            </CardTitle>
            <p className="text-gray-600">
              {existingAdmins.length > 0
                ? "Create an additional admin account"
                : "Create your first admin account for the clinic"}
            </p>
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

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 mb-6">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-green-800 text-sm font-medium">Success!</p>
                  <p className="text-green-700 text-sm">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Dr. Sanjay Pal"
                    className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

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
                    className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
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
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Admin...
                  </>
                ) : (
                  "Create Admin Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <a href="/admin/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium block">
                Already have an account? Login here
              </a>
              <a href="/" className="text-sm text-gray-600 hover:text-gray-700">
                ← Back to Website
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
