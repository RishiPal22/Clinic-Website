"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Star, Send, CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "./SupabaseClient"

export default function ReviewForm() {
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    review: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null

  useEffect(() => {
    // Check auth state on mount
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) setShowModal(true)
    }
    getUser()
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setShowModal(!session?.user)
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.review || rating === 0) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const { data, error } = await supabase.from("reviews").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          rating: rating,
          review_text: formData.review,
          created_at: new Date().toISOString(),
          // is_approved: false, // Reviews need approval before showing
        },
      ])

      if (error) {
        console.error("Error submitting review:", error)
        setSubmitStatus("error")
      } else {
        console.log("Review submitted successfully:", data)
        setSubmitStatus("success")
        // Reset form
        setFormData({ fullName: "", email: "", review: "" })
        setRating(0)
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
    {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Sign Up or Log In</h2>
            <p className="mb-6 text-gray-700">You need to be logged in to submit a review.</p>
            <a
              href="/signup"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-2"
            >
              Sign Up
            </a>
            <br />
            <a
              href="/signin"
              className="inline-block text-blue-600 font-semibold hover:underline"
            >
              Already have an account? Log In
            </a>
          </div>
        </div>
      )}
    <Card className="shadow-xl border-0">
      <CardHeader className="text-center space-y-4 pb-8">
        <CardTitle className="text-3xl font-bold text-gray-900">Share Your Experience</CardTitle>
        <p className="text-gray-600 text-lg">
          Your feedback helps us improve our services and helps other patients make informed decisions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {submitStatus === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">Thank you for your review!</p>
              <p className="text-green-600 text-sm">
                Your review has been submitted and will be published after approval.
              </p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">Please fill in all fields</p>
              <p className="text-red-600 text-sm">Make sure to provide your name, email, rating, and review.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address *</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Rate Your Experience *</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform duration-200"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors duration-200 ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-4 text-sm text-gray-600">
                {rating > 0 && (
                  <>
                    {rating} star{rating !== 1 ? "s" : ""} -{rating === 5 && " Excellent!"}
                    {rating === 4 && " Very Good!"}
                    {rating === 3 && " Good"}
                    {rating === 2 && " Fair"}
                    {rating === 1 && " Poor"}
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Your Review *</label>
            <Textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Share your experience with Dr. Sanjay Pal and our clinic..."
              className="min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Review
              </>
            )}
          </Button>
          <div>
            <a
            href="https://search.google.com/local/writereview?placeid=ChIJSaS4hHW35zsRQigVcYFuWk0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Leave Us a Review on Google
          </a>
          </div>
          
        </form>
      </CardContent>
    </Card>
    </>
  )
}
