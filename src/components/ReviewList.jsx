import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Star, Quote, User, Calendar, Heart } from "lucide-react"
import { supabase } from "./SupabaseClient"
// import Modal from "./Modal"
import Modal from "./Modal"

export default function ReviewList() {
  const [allReviews, setAllReviews] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [loading, setLoading] = useState(true)
  const [hoveredReview, setHoveredReview] = useState(null)
  const [viewReview, setViewReview] = useState(null) // Modal state


   useEffect(() => {
    if (viewReview) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [viewReview])
  
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setAllReviews(data)
      }
      setLoading(false)
    }
    fetchReviews()
  }, [])

  const visibleReviews = allReviews.slice(0, visibleCount)

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <p className="text-gray-800 mb-3">
                <span className="bg-gray-200 rounded w-full h-4 inline-block animate-pulse"></span>
              </p>
              <div className="text-blue-700 font-semibold">
                <span className="bg-gray-200 rounded w-24 h-4 inline-block animate-pulse"></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!allReviews.length) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Quote className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
          <p className="text-gray-500">Be the first to share your experience with our clinic!</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleReviews.map((review, index) => (
          <Card 
            key={review.id} 
            className={`group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-blue-50/30 hover:from-blue-50 hover:to-blue-100/50 relative ${
              hoveredReview === review.id ? 'ring-2 ring-blue-200' : ''
            }`}
            onMouseEnter={() => setHoveredReview(review.id)}
            onMouseLeave={() => setHoveredReview(null)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative quote icon */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              <Quote className="h-12 w-12 text-blue-600" />
            </div>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <CardContent className="p-6 relative z-10">
              {/* Rating and Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 transition-all duration-200 ${
                        i < review.rating 
                          ? "fill-yellow-400 text-yellow-400 group-hover:scale-110" 
                          : "text-gray-300"
                      }`}
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(review.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-sm group-hover:text-gray-900 transition-colors duration-300">
                  "{review.review_text}"
                </p>
              </div>

              {/* Patient Name */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300">
                    {review.full_name}
                  </div>
                  <div className="text-xs text-gray-500">Verified Patient</div>
                </div>
                <div className="ml-auto">
                  <Heart className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* Hover effect indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < allReviews.length && (
        <div className="flex justify-center mt-12">
          <button
            className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => setVisibleCount((prev) => prev + 6)}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Load More Reviews</span>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:animate-none"></div>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      )}

      {/* Reviews Summary */}
      {allReviews.length > 0 && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full border border-blue-100">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">
                {allReviews.length} Reviews
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <span className="text-sm text-gray-600">
              Average Rating: {(allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length).toFixed(1)}/5
            </span>
          </div>
        </div>
      )}
      {/* Modal for full review */}
      {viewReview && (
        <Modal>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 z-10 flex flex-col max-h-[90vh]"
              style={{ overflow: "auto" }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setViewReview(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < viewReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {new Date(viewReview.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{viewReview.full_name}</h3>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{viewReview.review_text}</p>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => setViewReview(null)}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}