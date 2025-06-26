"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Heart,
  Users,
  Star,
  CheckCircle,
  Clock,
  Award,
  FileText,
  ArrowRight,
  User,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import ReviewForm from "../components/ReviewForm"
import { supabase } from "../components/SupabaseClient"
import ReviewList from "@/components/ReviewList"

export default function HomePage() {
  const [approvedReviews, setApprovedReviews] = useState([])
  const [stats, setStats] = useState({
    totalPatients: 500,
    averageRating: 4.9,
    totalReviews: 0,
  })

  const [blogs, setBlogs] = useState([])
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true)

  // Fetch approved reviews from Supabase
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3)

        if (error) {
          console.error("Error fetching reviews:", error)
          setApprovedReviews([])
        } else {
          setApprovedReviews(data)
        }
      } catch (error) {
        console.error("Error:", error)
        setApprovedReviews([])
      }
    }

    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.from("reviews").select("rating")

        if (error) {
          console.error("Error fetching stats:", error)
        } else if (data && data.length > 0) {
          const totalReviews = data.length
          const averageRating = data.reduce((sum, review) => sum + review.rating, 0) / totalReviews

          setStats((prev) => ({
            ...prev,
            totalReviews,
            averageRating: Math.round(averageRating * 10) / 10,
          }))
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(5)

        if (error) {
          console.error("Error fetching blogs:", error)
          setBlogs([])
        } else {
          setBlogs(data || [])
        }
      } catch (error) {
        console.error("Error:", error)
        setBlogs([])
      } finally {
        setIsLoadingBlogs(false)
      }
    }

    fetchApprovedReviews()
    fetchStats()
    fetchBlogs()
  }, [])

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  const getReadingTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content ? content.split(" ").length : 0
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  const getCategoryColor = (category) => {
    const colors = {
      "Diabetes Care": "bg-blue-100 text-blue-700 border-blue-200",
      "Cancer Treatment": "bg-purple-100 text-purple-700 border-purple-200",
      "Mental Health": "bg-green-100 text-green-700 border-green-200",
      "General Health": "bg-orange-100 text-orange-700 border-orange-200",
      Nutrition: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Prevention: "bg-indigo-100 text-indigo-700 border-indigo-200",
    }
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-200">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Trusted Healthcare Provider</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    Raj Clinic
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Comprehensive Care in <span className="font-semibold text-yellow-300">Diabetes</span>,{" "}
                  <span className="font-semibold text-yellow-300">Cancer Treatment</span>, and{" "}
                  <span className="font-semibold text-yellow-300">Counseling</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-blue-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => (window.location.href = "/appointment")}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book an Appointment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-gradient-to-r from-yellow-300 to-red-400 hover:from-yellow-500 hover:to-orange-500 text-blue-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => (window.location.href = "tel:+919876543210")}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-white"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-blue-200">{stats.totalPatients}+ Happy Patients</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-blue-200 ml-2">{stats.averageRating}/5 Rating</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-2xl"></div>
              <img
                src="/clinic.webp"
                alt="Modern medical facility"
                className="rounded-2xl shadow-2xl object-cover w-full h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl opacity-10"></div>
              <img
                src="/doctor.webp"
                alt="Dr. Sanjay Pal"
                className="relative rounded-2xl shadow-2xl object-cover w-full max-h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center space-x-2">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="font-bold text-gray-900">20+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wide">Meet Your Doctor</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Dr. Sanjay Pal</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  With over 20 years of experience, Dr. Sanjay Pal is a highly respected physician specializing in
                  Diabetes management, Cancer treatment strategies, and Mental Health Counseling.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  His integrative approach has helped hundreds of patients through early diagnosis, effective treatment
                  planning, and emotional recovery—ensuring long-term health and well-being.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">{stats.totalPatients}+</div>
                  <div className="text-sm text-gray-600">Patients Treated</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Board Certified", "20+ Years Experience", "Holistic Approach", "Patient-Centered Care"].map(
                  (badge) => (
                    <span key={badge} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {badge}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Our Services</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Specialized Medical Care</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions tailored to your unique needs with cutting-edge treatments and
              compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Diabetes Treatment */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Diabetes Treatment</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Evidence-based plans to manage and reverse diabetes with lifestyle changes, medications, and
                    monitoring.
                  </p>
                  <ul className="space-y-2">
                    {["Type 1 & Type 2 Diabetes", "Continuous Glucose Monitoring", "Insulin Management"].map((item) => (
                      <li key={item} className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cancer Treatment */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Cancer Treatment</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Advanced medical care for various cancers using modern diagnostic tools and holistic treatment
                    support.
                  </p>
                  <ul className="space-y-2">
                    {["Diagnosis & Staging", "Radiation & Chemotherapy Planning", "Post-treatment Monitoring"].map(
                      (item) => (
                        <li key={item} className="flex items-center space-x-2 text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Counseling Services */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Mental Health Counseling</h3>
                  <p className="text-gray-600 leading-relaxed">
                    One-on-one psychological support for patients struggling with chronic conditions, stress, and
                    anxiety.
                  </p>
                  <ul className="space-y-2">
                    {["Illness-related Anxiety", "Emotional Recovery", "Therapeutic Conversations"].map((item) => (
                      <li key={item} className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Patient Reviews</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Real stories from real patients who have experienced our care</p>
            {stats.totalReviews > 0 && (
              <p className="text-sm text-gray-500">Based on {stats.totalReviews} verified reviews</p>
            )}
          </div>
          {/* Only this line for reviews */}
          <ReviewList />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide">Health & Wellness</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Latest Health Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with expert advice on diabetes management, cancer treatment, and mental health from Dr.
              Sanjay Pal
            </p>
          </div>

          {isLoadingBlogs ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {blogs.slice(0, 5).map((blog, index) => (
                <Card
                  key={blog.id}
                  className={`group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 ${
                    index === 0 ? "md:col-span-2 lg:col-span-2 xl:col-span-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.featured_image || "/placeholder.svg?height=300&width=400"}
                      alt={blog.title}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        index === 0 ? "h-64" : "h-48"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(blog.category || "General Health")}`}
                      >
                        {blog.category || "Health Tips"}
                      </span>
                    </div>

                    {/* Reading Time */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1 text-xs text-gray-700 font-medium">
                        <Clock className="h-3 w-3" />
                        <span>{getReadingTime(blog.content)}</span>
                      </div>
                    </div>

                    {/* Featured Badge for first blog */}
                    {index === 0 && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className={`space-y-4 ${index === 0 ? "p-8" : "p-6"}`}>
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(blog.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 ${
                        index === 0 ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className={`text-gray-600 leading-relaxed ${
                        index === 0 ? "line-clamp-4 text-lg" : "line-clamp-3"
                      }`}
                    >
                      {blog.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="pt-4">
                      <Button
                        onClick={() => (window.location.href = `/blog/${createSlug(blog.title)}-${blog.id}`)}
                        variant="ghost"
                        className="group/btn p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 hover:bg-transparent"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                  </CardContent>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 border-2 border-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600">Check back soon for health and wellness articles!</p>
            </div>
          )}

          {blogs.length > 0 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => (window.location.href = "/blog")}
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 group"
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">Take Charge of Your Health</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                We're here to support your journey toward physical and mental wellness. Schedule your consultation today
                and take the first step towards better health.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-blue-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => (window.location.href = "/appointment")}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book an Appointment
              </Button>
              <div className="flex items-center space-x-4 text-blue-200">
                <Clock className="h-5 w-5" />
                <span>Available 24/7 for emergencies</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6 text-yellow-400" />
                <div className="text-left">
                  <div className="font-semibold">Call Us</div>
                  <div className="text-blue-200">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6 text-yellow-400" />
                <div className="text-left">
                  <div className="font-semibold">Email Us</div>
                  <div className="text-blue-200">info@rajclinic.com</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-yellow-400" />
                <div className="text-left">
                  <div className="font-semibold">Visit Us</div>
                  <div className="text-blue-200">123 Health Street</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewForm />
        </div>
      </section>
    </div>
  )
}
