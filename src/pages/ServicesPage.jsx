import { useNavigate } from 'react-router-dom';


const ServicesPage = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Comprehensive healthcare solutions tailored to your unique needs
          </p>
        </div>
      </div>

      {/* Services Overview */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Diabetes Care</h3>
            <p className="text-gray-600">Comprehensive diabetes reversal through holistic lifestyle management</p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Cancer Care</h3>
            <p className="text-gray-600">Supportive cancer treatment with focus on patient well-being and recovery</p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Counselling</h3>
            <p className="text-gray-600">
              Professional psychological support for mental health and emotional well-being
            </p>
          </div>
        </div>

        {/* Diabetes Section */}
        <div className="mb-20" id="diabetes">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Diabetes Reversal Program</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            {/* Mental Stress Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                Mental Stress Management
              </h3>
              <p className="text-gray-700 mb-6">
                Understanding and managing mental stress that can cause or increase diabetes:
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                  <h4 className="font-bold text-red-800 mb-4">Fasting Related Stress</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Losing sweetness in life (disgusting feeling)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Having no enthusiasm or zeal in life
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Bitterness in relation with loved ones
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Stress about loved ones
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-400">
                  <h4 className="font-bold text-orange-800 mb-4">Post Lunch Related Stress</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Want of energy or power
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Too much of work load
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Resistance, hurdle, obstacle or struggle in work
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Money or finance related stress
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Position, designation or progress related stress
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Property related stress (expansion or threat)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                Lifestyle Management
              </h3>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-bold text-green-800 mb-4">Sleep Guidelines</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Avoid sleeping at wrong times
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Sleep 6-8 hours daily
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Follow natural sleep cycle
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-4">Meal Timing</h4>
                  <p className="text-gray-700 mb-4">
                    Having meals at wrong time affects metabolism and increases diabetes.
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">
                    Follow the law of nature: Sleep at night, be awake in the day time.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-6 text-center">Ideal Daily Schedule</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-2">11:00 PM</div>
                    <div className="text-sm opacity-90">Sleep Time</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-2">7:00 AM</div>
                    <div className="text-sm opacity-90">Wake Up</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-2">9:00 AM</div>
                    <div className="text-sm opacity-90">Breakfast</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-2">1:00 PM</div>
                    <div className="text-sm opacity-90">Lunch</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-2">4:30 PM</div>
                    <div className="text-sm opacity-90">Evening Snacks</div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold mb-2">8:00 PM</div>
                    <div className="text-sm opacity-90">Dinner</div>
                  </div>
                </div>
                <p className="text-center mt-6 text-sm opacity-90">
                  <strong>Note:</strong> Half an hour fluctuation in the above timing is acceptable, not more than that.
                </p>
              </div>
            </div>

            {/* Activity and Exercise Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                Activity and Exercise
              </h3>

              <div className="bg-purple-50 p-6 rounded-xl mb-6">
                <p className="text-lg text-gray-700 mb-4">
                  <strong className="text-purple-800">
                    Activity increases insulin sensitivity and reverses diabetes fastest.
                  </strong>
                </p>
                <p className="text-gray-700">
                  Everyone should exercise at least 1 hour for health out of 24 hours in a day.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
                  <h4 className="font-bold text-purple-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Walking & Jogging Program
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Do 60 to 90 minutes of alternate walking (10 minutes) and jogging (2 minutes)
                  </p>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <p className="text-sm text-purple-800 font-semibold">
                      You will see a huge difference in your metabolism and diabetes only in 3 months!
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
                  <h4 className="font-bold text-purple-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    Alternative Activities
                  </h4>
                  <p className="text-gray-700 mb-4">Do 60 to 90 minutes of any of these activities:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Gym workouts
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Cycling
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Swimming
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Outdoor sports activities
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
                <h4 className="text-xl font-bold mb-2">Expected Results</h4>
                <p>Significant reduction in HbA1c and number of medicines required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancer Section */}
        <div className="mb-20" id="cancer">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Cancer Care & Support</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Cancer Support</h3>
                <p className="text-gray-700 mb-6">
                  Our cancer care program focuses on providing holistic support throughout your journey, combining
                  medical expertise with emotional and psychological care.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Personalized treatment planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Nutritional guidance and support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Pain management strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Family counseling and support</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-4">Our Approach</h4>
                <p className="text-gray-700 mb-4">
                  We believe in treating the whole person, not just the disease. Our integrated approach combines:
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg">Medical Care</div>
                  <div className="bg-white p-3 rounded-lg">Emotional Support</div>
                  <div className="bg-white p-3 rounded-lg">Lifestyle Guidance</div>
                  <div className="bg-white p-3 rounded-lg">Family Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counselling Section */}
        <div className="mb-16" id="counselling">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Professional Counselling</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Individual Therapy</h3>
                <p className="text-gray-600">One-on-one sessions tailored to your specific needs and concerns</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Family Counselling</h3>
                <p className="text-gray-600">Helping families navigate challenges and strengthen relationships</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Stress Management</h3>
                <p className="text-gray-600">Techniques and strategies for managing stress and anxiety effectively</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Our Counselling Services?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Professional Expertise</h4>
                  <p className="text-sm opacity-90">Licensed and experienced counselors with specialized training</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Confidential Environment</h4>
                  <p className="text-sm opacity-90">Safe, non-judgmental space for open communication</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Personalized Approach</h4>
                  <p className="text-sm opacity-90">Treatment plans tailored to your unique situation and goals</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Holistic Care</h4>
                  <p className="text-sm opacity-90">Addressing mental, emotional, and physical well-being</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Health Journey?</h2>
          <p className="text-xl opacity-90 mb-8">Book a consultation with Dr. Sanjay R Pal today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            onClick={() => navigate('/appointment')}>
              Book Appointment
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
