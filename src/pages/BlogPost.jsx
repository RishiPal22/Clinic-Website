"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { supabase } from "../components/SupabaseClient"

export default function BlogPost() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchBlog()
    }
  }, [slug])

  const fetchBlog = async () => {
    try {
      // Extract ID from slug (format: title-slug-id)
      const blogId = slug.split("-").pop()

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .eq("is_published", true)
        .single()

      if (error) {
        console.error("Error fetching blog:", error)
      } else {
        setBlog(data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <a href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Blog
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <a href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </a>
        </div>

        {/* Blog Post */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {blog.featured_image && (
            <img
              src={blog.featured_image || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}

          <div className="p-8 md:p-12">
            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>

            {/* Excerpt */}
            {blog.excerpt && <p className="text-xl text-gray-600 mb-8 leading-relaxed">{blog.excerpt}</p>}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {blog.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Medical Consultation?</h3>
          <p className="text-gray-600 mb-6">
            Schedule an appointment with Dr. Sanjay Pal for personalized healthcare advice.
          </p>
          <a
            href="/appointment"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  )
}
