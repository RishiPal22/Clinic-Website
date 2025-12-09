const AboutPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafb" }}>
      {/* Hero Section */}
      <div
        className="relative text-white py-12"
        style={{
          background:
            "linear-gradient(135deg, #00799e 0%, #015a7d 50%, #031621 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: "#000" }}
        ></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3">About Us</h1>
          <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
            Transforming lives through comprehensive diabetes care and holistic
            wellness
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Our Story Section */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "#031621" }}
              >
                Our Story
              </h2>
              <div
                className="w-20 h-1 mb-6"
                style={{ backgroundColor: "#00799e" }}
              ></div>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#031621" }}
              >
                At{" "}
                <span
                  className="font-semibold"
                  style={{ color: "#00799e" }}
                >
                  Raj Clinic
                </span>
                , we believe in treating diabetes from all angles. Founded by Dr.
                Sanjay R Pal, with{" "}
                <span className="font-semibold">20 years of experience</span>,
                our practice is dedicated to reversing diabetes and improving
                overall well-being through a holistic approach.
              </p>
            </div>
            <div
              className="p-8 rounded-2xl shadow-lg"
              style={{ backgroundColor: "#b5e5ef" }}
            >
              <div className="text-center">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "#00799e" }}
                >
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#031621" }}
                >
                  20+ Years
                </h3>
                <p style={{ color: "#031621" }}>of Excellence in Healthcare</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Profile Section */}
        <div className="mb-16">
          <div
            className="rounded-3xl shadow-xl p-8 lg:p-12"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="relative">
                  <div
                    className="w-64 h-64 rounded-full mx-auto flex items-center justify-center shadow-2xl"
                    style={{ backgroundColor: "#00799e" }}
                  >
                    <img
                      src="/doctor.webp"
                      alt="Dr. Sanjay R Pal"
                      className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className="text-white px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: "#d2084f" }}
                    >
                      Diabetes Specialist
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h2
                  className="text-4xl font-bold mb-4"
                  style={{ color: "#031621" }}
                >
                  Dr. Sanjay Pal
                </h2>
                <div
                  className="w-20 h-1 mb-6"
                  style={{ backgroundColor: "#00799e" }}
                ></div>
                <p
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: "#031621" }}
                >
                  Dr. Sanjay Pal is a renowned doctor who has been
                  transforming lives with a unique, patient-centered approach to
                  diabetes management. By integrating traditional medical
                  practices with lifestyle modifications, Dr. Sanjay Pal has
                  achieved a remarkable success rate in diabetes reversal.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "#b5e5ef" }}
                  >
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: "#00799e" }}
                    >
                      Specialization
                    </h4>
                    <p style={{ color: "#031621" }} className="text-sm">
                      Diabetes Reversal
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "#f0e7ef" }}
                  >
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: "#d2084f" }}
                    >
                      Experience
                    </h4>
                    <p style={{ color: "#031621" }} className="text-sm">
                      20+ Years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#031621" }}
            >
              Our Philosophy
            </h2>
            <div
              className="w-20 h-1 mx-auto mb-6"
              style={{ backgroundColor: "#00799e" }}
            ></div>
          </div>

          <div
            className="rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #00799e 0%, #015a7d 50%, #031621 100%)",
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24"></div>
            <div className="relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-6 opacity-80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
                <p className="text-lg lg:text-xl leading-relaxed">
                  We understand that diabetes affects every aspect of your life.
                  That's why our approach is comprehensive, addressing not just
                  your blood sugar levels but your entire lifestyle. Our goal is
                  to help you achieve lasting health and wellness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#b5e5ef" }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "#00799e" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "#031621" }}
            >
              Holistic Approach
            </h3>
            <p style={{ color: "#031621" }}>
              Comprehensive care addressing all aspects of diabetes management
            </p>
          </div>

          <div
            className="text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#f0e7ef" }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "#d2084f" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "#031621" }}
            >
              Proven Results
            </h3>
            <p style={{ color: "#031621" }}>
              Remarkable success rate in diabetes reversal and management
            </p>
          </div>

          <div
            className="text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#b5e5ef" }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "#00799e" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "#031621" }}
            >
              Patient-Centered
            </h3>
            <p style={{ color: "#031621" }}>
              Personalized treatment plans tailored to individual needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
