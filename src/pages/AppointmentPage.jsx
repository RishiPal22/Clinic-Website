import React, { useState } from 'react'

const AppointmentPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    gender: '',
    email: '',
    consultationType: '',
    date: '',
    time: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking Data:', form)
    // 🔜 Later: Connect to Supabase here
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Book an Appointment</h2>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Email', name: 'email', type: 'email' },
          ].map((input, i) => (
            <div className="mb-4" key={i}>
              <label className="block text-gray-700 mb-1">{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={form[input.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Type of Consultation</label>
            <select name="consultationType" value={form.consultationType} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select</option>
              <option>Diabetes</option>
              <option>Cancer</option>
              <option>Counseling</option>
            </select>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            Book Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default AppointmentPage
