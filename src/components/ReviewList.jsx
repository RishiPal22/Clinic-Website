import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Star } from "lucide-react"
import { supabase } from "./SupabaseClient"
// import Modal from "./Modal"
import Modal from "./Modal"

export default function ReviewList() {
  const [allReviews, setAllReviews] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [loading, setLoading] = useState(true)
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

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>
  }

  if (!allReviews.length) {
    return <div className="text-center py-8 text-gray-500">No reviews yet.</div>
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <Card key={review.id} className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-800 mb-3">
                {review.review_text.length > 120 ? (
                  <>
                    "{review.review_text.slice(0, 120)}..."
                    <button
                      className="ml-2 text-blue-600 underline font-semibold"
                      onClick={() => setViewReview(review)}
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  `"${review.review_text}"`
                )}
              </p>
              <div className="text-blue-700 font-semibold">{review.full_name}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {visibleCount < allReviews.length && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            See More
          </button>
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