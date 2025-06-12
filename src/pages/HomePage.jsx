"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Calendar, Shield, Heart, Users, Star, CheckCircle, Clock, Award } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import ReviewForm from "../components/ReviewForm"
import { supabase } from "../components/SupabaseClient"

export default function HomePage() {
  const [approvedReviews, setApprovedReviews] = useState([])
  const [stats, setStats] = useState({
    totalPatients: 500,
    averageRating: 4.9,
    totalReviews: 0,
  })

  // Fetch approved reviews from Supabase
  useEffect(() => {
    fetchApprovedReviews()
    fetchStats()
  }, [])

  const fetchApprovedReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(3)

      if (error) {
        console.error("Error fetching reviews:", error)
        // Use fallback reviews if database fetch fails
        setApprovedReviews(fallbackReviews)
      } else {
        setApprovedReviews(data.length > 0 ? data : fallbackReviews)
      }
    } catch (error) {
      console.error("Error:", error)
      setApprovedReviews(fallbackReviews)
    }
  }

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.from("reviews").select("rating").eq("is_approved", true)

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

  // Fallback reviews in case Supabase is not set up yet
  const fallbackReviews = [
    {
      id: 1,
      full_name: "Rohit Sharma",
      review_text: "Dr. Specialist helped me manage my diabetes without needing insulin. Truly life-changing!",
      rating: 5,
      created_at: "2024-01-15",
    },
    {
      id: 2,
      full_name: "Priya Mehta",
      review_text: "His cancer treatment plan was both advanced and compassionate. Highly recommended.",
      rating: 5,
      created_at: "2024-01-10",
    },
    {
      id: 3,
      full_name: "Anjali Desai",
      review_text: "His counseling sessions helped me overcome post-treatment anxiety. A wonderful human being!",
      rating: 5,
      created_at: "2024-01-05",
    },
  ]

  const getPatientType = (reviewText) => {
    if (reviewText.toLowerCase().includes("diabetes")) return "Diabetes Patient"
    if (reviewText.toLowerCase().includes("cancer")) return "Cancer Survivor"
    if (reviewText.toLowerCase().includes("counseling") || reviewText.toLowerCase().includes("anxiety"))
      return "Counseling Patient"
    return "Patient"
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

          <div className="grid md:grid-cols-3 gap-8">
            {approvedReviews.map((review, index) => (
              <Card key={review.id || index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                    "{review.review_text}"
                  </blockquote>
                  <div className="space-y-1">
                    <div className="font-bold text-gray-900 text-lg">{review.full_name}</div>
                    <div className="text-sm text-blue-600 font-medium">{getPatientType(review.review_text)}</div>
                    <div className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
