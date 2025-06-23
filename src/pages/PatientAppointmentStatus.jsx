"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Calendar, Clock, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Search } from "lucide-react"
import { supabase } from "../components/SupabaseClient"

export default function PatientAppointmentStatus() {
  const [searchData, setSearchData] = useState({
    email: "",
    phone: "",
  })
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
    rescheduled: "bg-purple-100 text-purple-800",
  }

  const statusIcons = {
    pending: Clock,
    confirmed: CheckCircle,
    cancelled: XCircle,
    completed: CheckCircle,
    rescheduled: Calendar,
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const searchAppointments = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setAppointments([])

    if (!searchData.email && !searchData.phone) {
      setError("Please enter either email or phone number")
      setIsLoading(false)
      return
    }

    try {
      let query = supabase.from("appointments").select("*")

      if (searchData.email) {
        query = query.eq("email", searchData.email.toLowerCase())
      } else if (searchData.phone) {
        query = query.eq("phone", searchData.phone)
      }

      const { data, error: queryError } = await query.order("created_at", { ascending: false })

      if (queryError) {
        console.error("Error searching appointments:", queryError)
        setError("Error searching for appointments")
      } else if (data && data.length > 0) {
        setAppointments(data)
      } else {
        setError("No appointments found with the provided information")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("An error occurred while searching")
    } finally {
      setIsLoading(false)
    }
  }

  const getServiceName = (serviceType) => {
    const services = {
      diabetes: "Diabetes Treatment",
      cancer: "Cancer Treatment Consultation",
      counseling: "Mental Health Counseling",
      general: "General Consultation",
    }
    return services[serviceType] || serviceType
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
            <Search className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wide">Appointment Status</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Check Your Appointment</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your email or phone number to view your appointment status and details.
          </p>
        </div>

        {/* Search Form */}
        <Card className="shadow-xl border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Find Your Appointment</CardTitle>
            <p className="text-gray-600">Enter the email or phone number you used when booking</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={searchAppointments} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={searchData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone"
                      value={searchData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Enter either email OR phone number (not both)</p>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Find Appointments
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <p className="font-medium">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appointments Results */}
        {appointments.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Appointments</h2>
            {appointments.map((appointment) => {
              const StatusIcon = statusIcons[appointment.status]
              return (
                <Card key={appointment.id} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {getServiceName(appointment.service_type)}
                        </h3>
                        <p className="text-gray-600">with Dr. Sanjay Pal</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-5 w-5" />
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                            statusColors[appointment.status]
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Requested Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(appointment.preferred_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{appointment.preferred_time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <User className="h-4 w-4 mr-2" />
                            <span>{appointment.full_name}</span>
                          </div>
                        </div>
                      </div>

                      {(appointment.confirmed_date || appointment.status === "confirmed") && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-green-700">Confirmed Details</h4>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>
                                {appointment.confirmed_date
                                  ? new Date(appointment.confirmed_date).toLocaleDateString()
                                  : new Date(appointment.preferred_date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{appointment.confirmed_time || appointment.preferred_time}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {appointment.message && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Your Message</h4>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{appointment.message}</p>
                      </div>
                    )}

                    {appointment.notes && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Clinic Notes</h4>
                        <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Appointment requested on {new Date(appointment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Contact Information */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have questions about your appointment or need to make changes, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a href="tel:+919876543210" className="flex items-center text-blue-600 hover:text-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                +91 98765 43210
              </a>
              <a href="mailto:info@rajclinic.com" className="flex items-center text-blue-600 hover:text-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                info@rajclinic.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
