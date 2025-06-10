import React from 'react'

const ContactPage = () => {
  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Contact Us</h2>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea className="w-full border border-gray-300 p-2 rounded" rows="4" required></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="mt-8 text-center text-gray-600">
        <p>📍 Location: 123 Clinic Street, Mumbai</p>
        <p>📞 Phone: +91 9876543210</p>
        <p>📧 Email: clinic@example.com</p>
      </div>
    </div>
  )
}

export default ContactPage
