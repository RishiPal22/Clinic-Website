"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Save, Eye, ArrowLeft } from "lucide-react"
import { supabase } from "../components/SupabaseClient"

export default function BlogEditor() {
  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    featured_image: "",
    is_published: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      window.location.href = "/admin/login"
      return
    }

    // Get admin user info
    const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}")
    setBlogData((prev) => ({
      ...prev,
      author: adminUser.full_name || "Admin",
    }))
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBlogData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSave = async (publish = false) => {
    setIsSaving(true)

    try {
      const blogToSave = {
        ...blogData,
        is_published: publish,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase.from("blogs").insert([blogToSave])

      if (error) {
        console.error("Error saving blog:", error)
        alert("Error saving blog post")
        return
      }

      alert(publish ? "Blog post published successfully!" : "Blog post saved as draft!")
      window.location.href = "/admin/dashboard"
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button onClick={() => (window.location.href = "/admin/dashboard")} variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Blog Editor</h1>
                <p className="text-gray-600">Create a new blog post</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => handleSave(false)} disabled={isSaving} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => handleSave(true)} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                <Eye className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Blog Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title *</label>
              <Input
                name="title"
                value={blogData.title}
                onChange={handleInputChange}
                placeholder="Enter blog post title"
                className="text-lg font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Excerpt</label>
              <Textarea
                name="excerpt"
                value={blogData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of the blog post..."
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Featured Image URL</label>
              <Input
                name="featured_image"
                value={blogData.featured_image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Content *</label>
              <Textarea
                name="content"
                value={blogData.content}
                onChange={handleInputChange}
                placeholder="Write your blog post content here..."
                className="min-h-[400px]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Author</label>
              <Input name="author" value={blogData.author} onChange={handleInputChange} placeholder="Author name" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
