import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ServicesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafb" }}>
      {/* Hero Section */}
      <div className="relative text-white py-20" style={{ background: "linear-gradient(135deg, #00799e 0%, #015a7d 50%, #031621 100%)" }}>
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
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#00799e" }}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#031621" }}>Diabetes Care</h3>
            <p style={{ color: "#031621" }}>Comprehensive diabetes reversal through holistic lifestyle management</p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#d2084f" }}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#031621" }}>Cancer Care</h3>
            <p style={{ color: "#031621" }}>Supportive cancer treatment with focus on patient well-being and recovery</p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#b5e5ef" }}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#00799e" }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#031621" }}>Counselling</h3>
            <p style={{ color: "#031621" }}>
              Professional psychological support for mental health and emotional well-being
            </p>
          </div>
        </div>

        {/* Diabetes Section */}
        <div className="mb-20" id="diabetes">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#00799e" }}>
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#031621" }}>Diabetes Reversal Program</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: "#00799e" }}></div>
            </div>

            {/* Mental Stress Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: "#031621" }}>
                <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#d2084f" }}>
                  1
                </div>
                Mental Stress Management
              </h3>
              <p className="mb-6" style={{ color: "#031621" }}>
                Understanding and managing mental stress that can cause or increase diabetes:
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl border-l-4" style={{ backgroundColor: "#f0e7ef", borderColor: "#d2084f" }}>
                  <h4 className="font-bold mb-4" style={{ color: "#d2084f" }}>Fasting Related Stress</h4>
                  <ul className="space-y-2" style={{ color: "#031621" }}>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#d2084f" }}></span>
                      Losing sweetness in life (disgusting feeling)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#d2084f" }}></span>
                      Having no enthusiasm or zeal in life
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#d2084f" }}></span>
                      Bitterness in relation with loved ones
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#d2084f" }}></span>
                      Stress about loved ones
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl border-l-4" style={{ backgroundColor: "#b5e5ef", borderColor: "#00799e" }}>
                  <h4 className="font-bold mb-4" style={{ color: "#00799e" }}>Post Lunch Related Stress</h4>
                  <ul className="space-y-2" style={{ color: "#031621" }}>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Want of energy or power
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Too much of work load
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Resistance, hurdle, obstacle or struggle in work
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Money or finance related stress
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Position, designation or progress related stress
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Property related stress (expansion or threat)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: "#031621" }}>
                <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#00799e" }}>
                  2
                </div>
                Lifestyle Management
              </h3>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="p-6 rounded-xl" style={{ backgroundColor: "#b5e5ef" }}>
                  <h4 className="font-bold mb-4" style={{ color: "#00799e" }}>Sleep Guidelines</h4>
                  <ul className="space-y-2" style={{ color: "#031621" }}>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Avoid sleeping at wrong times
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Sleep 6-8 hours daily
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2" style={{ backgroundColor: "#00799e" }}></span>
                      Follow natural sleep cycle
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl" style={{ backgroundColor: "#f0e7ef" }}>
                  <h4 className="font-bold mb-4" style={{ color: "#d2084f" }}>Meal Timing</h4>
                  <p className="mb-4" style={{ color: "#031621" }}>
                    Having meals at wrong time affects metabolism and increases diabetes.
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "#d2084f" }}>
                    Follow the law of nature: Sleep at night, be awake in the day time.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #00799e 0%, #015a7d 50%, #031621 100%)" }}>
                <h4 className="text-2xl font-bold mb-6 text-center">Ideal Daily Schedule</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                    <div className="text-2xl font-bold mb-2">11:00 PM</div>
                    <div className="text-sm opacity-90">Sleep Time</div>
                  </div>
                  <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                    <div className="text-2xl font-bold mb-2">7:00 AM</div>
                    <div className="text-sm opacity-90">Wake Up</div>
                  </div>
                  <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                    <div className="text-2xl font-bold mb-2">9:00 AM</div>
                    <div className="text-sm opacity-90">Breakfast</div>
                  </div>
                  <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                    <div className="text-2xl font-bold mb-2">1:00 PM</div>
                    <div className="text-sm opacity-90">Lunch</div>
                  </div>
                  <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                    <div className="text-2xl font-bold mb-2">4:30 PM</div>
                    <div className="text-sm opacity-90">Evening Snacks</div>
                  </div>
                  <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
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
              <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: "#031621" }}>
                <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#d2084f" }}>
                  3
                </div>
                Activity and Exercise
              </h3>

              <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: "#f0e7ef" }}>
                <p className="text-lg mb-4" style={{ color: "#031621" }}>
                  <strong style={{ color: "#d2084f" }}>
                    Activity increases insulin sensitivity and reverses diabetes fastest.
                  </strong>
                </p>
                <p style={{ color: "#031621" }}>
                  Everyone should exercise at least 1 hour for health out of 24 hours in a day.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl" style={{ backgroundColor: "#ffffff", borderLeft: "4px solid #d2084f" }}>
                  <h4 className="font-bold mb-4 flex items-center" style={{ color: "#d2084f" }}>
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
                  <p className="mb-4" style={{ color: "#031621" }}>
                    Do 60 to 90 minutes of alternate walking (10 minutes) and jogging (2 minutes)
                  </p>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: "#f0e7ef" }}>
                    <p className="text-sm font-semibold" style={{ color: "#d2084f" }}>
                      You will see a huge difference in your metabolism and diabetes only in 3 months!
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-xl" style={{ backgroundColor: "#ffffff", borderLeft: "4px solid #00799e" }}>
                  <h4 className="font-bold mb-4 flex items-center" style={{ color: "#00799e" }}>
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
                  <p className="mb-4" style={{ color: "#031621" }}>Do 60 to 90 minutes of any of these activities:</p>
                  <ul className="space-y-2" style={{ color: "#031621" }}>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#00799e" }}></span>
                      Gym workouts
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#00799e" }}></span>
                      Cycling
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#00799e" }}></span>
                      Swimming
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: "#00799e" }}></span>
                      Outdoor sports activities
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-6 rounded-xl text-white text-center" style={{ backgroundColor: "#00799e" }}>
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
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#d2084f" }}>
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#031621" }}>Cancer Care & Support</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: "#d2084f" }}></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#031621" }}>Comprehensive Cancer Support</h3>
                <p className="mb-6" style={{ color: "#031621" }}>
                  Our cancer care program focuses on providing holistic support throughout your journey, combining
                  medical expertise with emotional and psychological care.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: "#d2084f" }}></span>
                    <span style={{ color: "#031621" }}>Personalized treatment planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: "#d2084f" }}></span>
                    <span style={{ color: "#031621" }}>Nutritional guidance and support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: "#d2084f" }}></span>
                    <span style={{ color: "#031621" }}>Pain management strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: "#d2084f" }}></span>
                    <span style={{ color: "#031621" }}>Family counseling and support</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: "#b5e5ef" }}>
                <h4 className="font-bold mb-4" style={{ color: "#00799e" }}>Our Approach</h4>
                <p className="mb-4" style={{ color: "#031621" }}>
                  We believe in treating the whole person, not just the disease. Our integrated approach combines:
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg" style={{ color: "#031621" }}>Medical Care</div>
                  <div className="bg-white p-3 rounded-lg" style={{ color: "#031621" }}>Emotional Support</div>
                  <div className="bg-white p-3 rounded-lg" style={{ color: "#031621" }}>Lifestyle Guidance</div>
                  <div className="bg-white p-3 rounded-lg" style={{ color: "#031621" }}>Family Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counselling Section */}
        <div className="mb-16" id="counselling">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: "#b5e5ef" }}>
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#00799e" }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#031621" }}>Professional Counselling</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: "#00799e" }}></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "#b5e5ef" }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#00799e" }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#031621" }}>Individual Therapy</h3>
                <p style={{ color: "#031621" }}>One-on-one sessions tailored to your specific needs and concerns</p>
              </div>

              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "#f0e7ef" }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#d2084f" }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#031621" }}>Family Counselling</h3>
                <p style={{ color: "#031621" }}>Helping families navigate challenges and strengthen relationships</p>
              </div>

              <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "#b5e5ef" }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "#00799e" }}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#031621" }}>Stress Management</h3>
                <p style={{ color: "#031621" }}>Techniques and strategies for managing stress and anxiety effectively</p>
              </div>
            </div>

            <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #d2084f 0%, #a00640 100%)" }}>
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
        <div className="text-center rounded-3xl p-12 text-white" style={{ background: "linear-gradient(135deg, #00799e 0%, #015a7d 50%, #031621 100%)" }}>
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Health Journey?</h2>
          <p className="text-xl opacity-90 mb-8">Book a consultation with Dr. Sanjay Pal today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: "#d2084f" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a00640")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d2084f")}
              onClick={() => navigate('/appointment')}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
