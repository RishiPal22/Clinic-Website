"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { FileText, Calendar, Star, Plus, Eye, Trash2, LogOut, BarChart3 } from "lucide-react"
import { supabase } from "../components/SupabaseClient"
import { Send, Mail, Phone, User, Edit, CheckCircle, XCircle, Clock } from "lucide-react"
import { Textarea } from "../components/ui/textarea"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalReviews: 0,
    pendingReviews: 0,
    totalAppointments: 0,
    totalBlogs: 0,
  })
  const [reviews, setReviews] = useState([])
  const [appointments, setAppointments] = useState([])
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [appointmentForm, setAppointmentForm] = useState({
    status: "confirmed",
    confirmedDate: "",
    confirmedTime: "",
    notes: "",
  })
  const [isUpdatingAppointment, setIsUpdatingAppointment] = useState(false)
  const [appointmentFilter, setAppointmentFilter] = useState("all")
  const [filteredAppointments, setFilteredAppointments] = useState([])

  const [viewBlog, setViewBlog] = useState(null)
  const [isDeletingBlog, setIsDeletingBlog] = useState(false)

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ]

  // Filter appointments based on selected filter
  useEffect(() => {
    if (appointmentFilter === "all") {
      setFilteredAppointments(appointments)
    } else {
      setFilteredAppointments(appointments.filter((apt) => apt.status === appointmentFilter))
    }
  }, [appointments, appointmentFilter])

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      window.location.href = "/admin/login"
      return
    }

    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch reviews
      const { data: reviewsData } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch blogs
      const { data: blogsData } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })

      setReviews(reviewsData || [])
      setAppointments(appointmentsData || [])
      setBlogs(blogsData || [])

      // Calculate stats
      setStats({
        totalReviews: reviewsData?.length || 0,
        pendingReviews: reviewsData?.filter((r) => !r.is_approved).length || 0,
        totalAppointments: appointmentsData?.length || 0,
        totalBlogs: blogsData?.length || 0,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("adminUser")
    window.location.href = "/admin/login"
  }

  const approveReview = async (reviewId) => {
    try {
      await supabase.from("reviews").update({ is_approved: true }).eq("id", reviewId)
      fetchDashboardData()
    } catch (error) {
      console.error("Error approving review:", error)
    }
  }

  const rejectReview = async (reviewId) => {
    try {
      await supabase.from("reviews").delete().eq("id", reviewId)
      fetchDashboardData()
    } catch (error) {
      console.error("Error rejecting review:", error)
    }
  }

  const StatCard = ({ title, value, icon: Icon, color = "blue" }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
          </div>
          <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const getServiceName = (serviceType) => {
    const services = {
      diabetes: "Diabetes Treatment",
      cancer: "Cancer Treatment",
      counseling: "Mental Health Counseling",
      general: "General Consultation",
    }
    return services[serviceType] || serviceType
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      rescheduled: "bg-purple-100 text-purple-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const openAppointmentModal = (appointment) => {
    setSelectedAppointment(appointment)
    setAppointmentForm({
      status: appointment.status,
      confirmedDate: appointment.confirmed_date || appointment.preferred_date,
      confirmedTime: appointment.confirmed_time || appointment.preferred_time,
      notes: appointment.notes || "",
    })
  }

  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const quickStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", appointmentId)

      if (error) {
        console.error("Error updating status:", error)
      } else {
        fetchDashboardData()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const updateAppointment = async () => {
    if (!selectedAppointment) return

    setIsUpdatingAppointment(true)

    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          status: appointmentForm.status,
          confirmed_date: appointmentForm.confirmedDate,
          confirmed_time: appointmentForm.confirmedTime,
          notes: appointmentForm.notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedAppointment.id)

      if (error) {
        console.error("Error updating appointment:", error)
        alert("Error updating appointment")
      } else {
        // Send confirmation email (placeholder)
        console.log("Sending confirmation email to:", selectedAppointment.email)

        alert("Appointment updated successfully!")
        setSelectedAppointment(null)
        fetchDashboardData()
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred")
    } finally {
      setIsUpdatingAppointment(false)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return
    setIsDeletingBlog(true)
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", blogId)
      if (error) {
        alert("Error deleting blog post")
        console.error(error)
      } else {
        fetchDashboardData()
      }
    } catch (err) {
      alert("An error occurred")
      console.error(err)
    } finally {
      setIsDeletingBlog(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Raj Clinic Management System</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "reviews", label: "Reviews", icon: Star },
              { id: "appointments", label: "Appointments", icon: Calendar },
              { id: "blogs", label: "Blogs", icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Reviews" value={stats.totalReviews} icon={Star} color="yellow" />
              <StatCard title="Pending Reviews" value={stats.pendingReviews} icon={Clock} color="orange" />
              <StatCard title="Appointments" value={stats.totalAppointments} icon={Calendar} color="green" />
              <StatCard title="Blog Posts" value={stats.totalBlogs} icon={FileText} color="purple" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Recent Reviews</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{review.full_name}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{review.review_text}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          {!review.is_approved && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Recent Appointments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.slice(0, 5).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{appointment.full_name}</p>
                          <p className="text-sm text-gray-600">{appointment.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{appointment.preferred_date}</p>
                          <p className="text-sm text-gray-600">{appointment.preferred_time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Manage Reviews</h2>
            </div>

            <div className="grid gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className={`${!review.is_approved ? "border-orange-200 bg-orange-50" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="font-semibold text-gray-900">{review.full_name}</h3>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          {!review.is_approved && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              Pending Approval
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-2">{review.review_text}</p>
                        <p className="text-sm text-gray-500">{review.email}</p>
                        <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        {!review.is_approved && (
                          <>
                            <Button
                              onClick={() => approveReview(review.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => rejectReview(review.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Appointment Management</h2>
              <div className="flex space-x-3">
                <select
                  value={appointmentFilter}
                  onChange={(e) => setAppointmentFilter(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Patient Info */}
                        <div>
                          <h3 className="font-semibold text-gray-900">{appointment.full_name}</h3>
                          <div className="space-y-1 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 mr-2" />
                              {appointment.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              {appointment.phone}
                            </div>
                            {appointment.age && (
                              <div className="flex items-center text-sm text-gray-600">
                                <User className="h-4 w-4 mr-2" />
                                Age: {appointment.age}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Service & Date */}
                        <div>
                          <p className="font-medium text-gray-900">{getServiceName(appointment.service_type)}</p>
                          <div className="space-y-1 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(appointment.preferred_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              {appointment.preferred_time}
                            </div>
                            {appointment.confirmed_date && (
                              <div className="mt-2 p-2 bg-green-50 rounded">
                                <p className="text-sm font-medium text-green-700">Confirmed:</p>
                                <p className="text-sm text-green-600">
                                  {new Date(appointment.confirmed_date).toLocaleDateString()} at{" "}
                                  {appointment.confirmed_time}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status & Message */}
                        <div>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              appointment.status,
                            )}`}
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                          {appointment.message && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                              <p className="text-sm text-gray-600 line-clamp-2">{appointment.message}</p>
                            </div>
                          )}
                          {appointment.notes && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                              <p className="text-sm text-gray-600">{appointment.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          onClick={() => openAppointmentModal(appointment)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Manage
                        </Button>

                        {appointment.status === "pending" && (
                          <>
                            <Button
                              onClick={() => quickStatusUpdate(appointment.id, "confirmed")}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                            <Button
                              onClick={() => quickStatusUpdate(appointment.id, "cancelled")}
                              size="sm"
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}

                        {appointment.status === "confirmed" && (
                          <Button
                            onClick={() => quickStatusUpdate(appointment.id, "completed")}
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Blog Management</h2>
              <Button
                onClick={() => (window.location.href = "/admin/blog/new")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Blog Post
              </Button>
            </div>

            <div className="grid gap-6">
              {blogs.map((blog) => (
                <Card key={blog.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {blog.author}</span>
                          <span>•</span>
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                          <span>•</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${blog.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {blog.is_published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewBlog(blog)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => (window.location.href = `/admin/blog/edit/${blog.id}`)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteBlog(blog.id)}
                          disabled={isDeletingBlog}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          {isDeletingBlog ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Blog View Modal */}
            {viewBlog && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-gray-300 shadow-2xl bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{viewBlog.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                      <span>By {viewBlog.author}</span>
                      <span>•</span>
                      <span>{new Date(viewBlog.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-gray-700 whitespace-pre-line">
                      {viewBlog.content || viewBlog.excerpt}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setViewBlog(null)}>
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Appointment Management Modal */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Manage Appointment</CardTitle>
                <p className="text-gray-600">
                  Patient: {selectedAppointment.full_name} | Service: {getServiceName(selectedAppointment.service_type)}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={appointmentForm.status}
                      onChange={handleAppointmentFormChange}
                      className="w-full h-10 border border-gray-200 rounded-md px-3 bg-white"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="rescheduled">Rescheduled</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirmed Date</label>
                    <input
                      type="date"
                      name="confirmedDate"
                      value={appointmentForm.confirmedDate}
                      onChange={handleAppointmentFormChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full h-10 border border-gray-200 rounded-md px-3 bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirmed Time</label>
                    <select
                      name="confirmedTime"
                      value={appointmentForm.confirmedTime}
                      onChange={handleAppointmentFormChange}
                      className="w-full h-10 border border-gray-200 rounded-md px-3 bg-white"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Notes</label>
                  <Textarea
                    name="notes"
                    value={appointmentForm.notes}
                    onChange={handleAppointmentFormChange}
                    placeholder="Add any notes or special instructions..."
                    className="min-h-[100px]"
                  />
                </div>

                {selectedAppointment.message && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Patient Message</label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-700">{selectedAppointment.message}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <Button onClick={() => setSelectedAppointment(null)} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    onClick={updateAppointment}
                    disabled={isUpdatingAppointment}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isUpdatingAppointment ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Update & Notify Patient
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
