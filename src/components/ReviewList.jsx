import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Star } from "lucide-react"
import { supabase } from "./SupabaseClient"

export default function ReviewList({ fallbackReviews = [] }) {
  const [reviews, setReviews] = useState(fallbackReviews)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data && data.length > 0) {
        setReviews(data)
      }
      setLoading(false)
    }
    fetchReviews()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>
  }

  if (!reviews.length) {
    return <div className="text-center py-8 text-gray-500">No reviews yet.</div>
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {reviews.map((review) => (
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
            <p className="text-gray-800 mb-3">"{review.review_text}"</p>
            <div className="text-blue-700 font-semibold">{review.full_name}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}