// src/pages/Home.jsx
export default function Home() {
  return (
    <div className="flex flex-col gap-16">

      {/* Hero Section */}
      <section className="bg-blue-900 text-white text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Raj. Clinic</h1>
        <p className="text-lg md:text-xl mb-6">
          Comprehensive Care in <strong>Diabetes</strong>, <strong>Cancer Treatment</strong>, and <strong>Counseling</strong>
        </p>
        <a
          href="/appointment"
          className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-300 transition"
        >
          Book an Appointment
        </a>
      </section>

      {/* Doctor Info */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <img src="/doctor.webp" alt="Dr. Specialist" className="w-full rounded-lg shadow-lg object-cover max-h-[400px]" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Meet Dr. Sanjay Pal</h2>
          <p className="text-gray-700 mb-2">
            With over 20 years of experience, Dr. Sanjay Pal is a highly respected physician specializing in Diabetes management, Cancer treatment strategies, and Mental Health Counseling.
          </p>
          <p className="text-gray-600">
            His integrative approach has helped hundreds of patients through early diagnosis, effective treatment planning, and emotional recovery—ensuring long-term health and well-being.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Our Specialized Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Diabetes Treatment */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Diabetes Treatment</h3>
              <p className="text-gray-700 mb-2">
                Evidence-based plans to manage and reverse diabetes with lifestyle changes, medications, and monitoring.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Type 1 & Type 2 Diabetes</li>
                <li>Continuous Glucose Monitoring</li>
                <li>Insulin Management</li>
              </ul>
            </div>

            {/* Cancer Treatment */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Cancer Treatment</h3>
              <p className="text-gray-700 mb-2">
                Advanced medical care for various cancers using modern diagnostic tools and holistic treatment support.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Diagnosis & Staging</li>
                <li>Radiation & Chemotherapy Planning</li>
                <li>Post-treatment Monitoring</li>
              </ul>
            </div>

            {/* Counseling Services */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Mental Health Counseling</h3>
              <p className="text-gray-700 mb-2">
                One-on-one psychological support for patients struggling with chronic conditions, stress, and anxiety.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Illness-related Anxiety</li>
                <li>Emotional Recovery</li>
                <li>Therapeutic Conversations</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Patients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Rohit Sharma',
              feedback: 'Dr. Specialist helped me manage my diabetes without needing insulin. Truly life-changing!',
            },
            {
              name: 'Priya Mehta',
              feedback: 'His cancer treatment plan was both advanced and compassionate. Highly recommended.',
            },
            {
              name: 'Anjali Desai',
              feedback: 'His counseling sessions helped me overcome post-treatment anxiety. A wonderful human being!',
            },
          ].map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-700 mb-4">"{review.feedback}"</p>
              <p className="font-semibold text-blue-800">- {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-yellow-400 text-blue-900 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Take Charge of Your Health</h2>
        <p className="mb-4">We’re here to support your journey toward physical and mental wellness. Reach out today.</p>
        <a
          href="/appointment"
          className="inline-block bg-blue-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition"
        >
          Book an Appointment
        </a>
      </section>

    </div>
  );
}
