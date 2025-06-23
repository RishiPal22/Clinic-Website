"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import { supabase } from "../components/SupabaseClient"

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching blogs:", error)
      } else {
        setBlogs(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest insights on diabetes management, cancer treatment, and mental health from Dr.
            Sanjay Pal
          </p>
        </div>

        {/* Blog Posts Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600">Check back soon for health and wellness articles!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  {blog.featured_image && (
                    <img
                      src={blog.featured_image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{blog.title}</h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                    <a
                      href={`/blog/${createSlug(blog.title)}-${blog.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
