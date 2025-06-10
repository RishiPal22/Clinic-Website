import React from 'react'

const ServicesPage = () => {
  const services = [
    {
      title: 'Diabetes Management',
      desc: 'Personalized lifestyle plans, glucose monitoring, and insulin therapy.',
    },
    {
      title: 'Cancer Consultation',
      desc: 'Expert second opinions, treatment planning, and emotional support.',
    },
    {
      title: 'Counseling Services',
      desc: 'Mental health support for anxiety, stress, and emotional well-being.',
    },
    {
      title: 'Preventive Checkups',
      desc: 'Regular health screenings tailored to age and condition.',
    },
    {
      title: 'Teleconsultation',
      desc: 'Online video consultations from the comfort of your home.',
    },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">Our Services</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div key={i} className="bg-white rounded shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesPage
