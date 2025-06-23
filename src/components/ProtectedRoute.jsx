"use client"

import { useEffect, useState } from "react"
import { supabase } from "./SupabaseClient"

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // First check if user is logged in
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        window.location.href = "/admin/login"
        return
      }

      // Check localStorage first (faster)
      const isAdmin = localStorage.getItem("isAdmin")
      const adminUser = localStorage.getItem("adminUser")

      if (isAdmin === "true" && adminUser) {
        const user = JSON.parse(adminUser)
        if (user.email === session.user.email) {
          setIsAuthorized(true)
          setIsLoading(false)
          return
        }
      }

      // If localStorage check fails, verify with database
      const { data: adminUserData, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", session.user.email)
        .single()

      if (error || !adminUserData) {
        console.error("Admin verification failed:", error)
        await supabase.auth.signOut()
        localStorage.removeItem("isAdmin")
        localStorage.removeItem("adminUser")
        window.location.href = "/admin/login"
        return
      }

      // Update localStorage with fresh data
      localStorage.setItem("isAdmin", "true")
      localStorage.setItem("adminUser", JSON.stringify(adminUserData))
      setIsAuthorized(true)
    } catch (error) {
      console.error("Auth check error:", error)
      localStorage.removeItem("isAdmin")
      localStorage.removeItem("adminUser")
      window.location.href = "/admin/login"
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  return isAuthorized ? children : null
}
