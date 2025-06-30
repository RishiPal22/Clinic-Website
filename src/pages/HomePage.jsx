"use client";

import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Heart,
  Users,
  Star,
  CheckCircle,
  Clock,
  Award,
  FileText,
  ArrowRight,
  User,
  Sparkles,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReviewForm from "@/components/ReviewForm";
import { supabase } from "@/components/SupabaseClient";
import ReviewList from "@/components/ReviewList";
import ElfsightWidget from "../components/ElfsightWidget";

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

export default function HomePage() {
  const [approvedReviews, setApprovedReviews] = useState([]);
  const [stats, setStats] = useState({
    totalPatients: 500,
    averageRating: 4.9,
    totalReviews: 0,
  });
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    totalPatients: 0,
    averageRating: 0,
    totalReviews: 0,
  });

  // Intersection observer refs
  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1 });
  const [doctorRef, doctorInView] = useIntersectionObserver({ threshold: 0.2 });
  const [servicesRef, servicesInView] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [reviewsRef, reviewsInView] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [blogRef, blogInView] = useIntersectionObserver({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useIntersectionObserver({ threshold: 0.1 });

  // Animate stats when in view
  useEffect(() => {
    if (doctorInView) {
      const animateValue = (start, end, duration, setter, key) => {
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = start + (end - start) * progress;
          setter((prev) => ({
            ...prev,
            [key]:
              key === "averageRating"
                ? Math.round(current * 10) / 10
                : Math.floor(current),
          }));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      };

      animateValue(
        0,
        stats.totalPatients,
        2000,
        setAnimatedStats,
        "totalPatients"
      );
      animateValue(
        0,
        stats.averageRating,
        2000,
        setAnimatedStats,
        "averageRating"
      );
      animateValue(
        0,
        stats.totalReviews,
        2000,
        setAnimatedStats,
        "totalReviews"
      );
    }
  }, [doctorInView, stats]);

  // Fetch data
  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error fetching reviews:", error);
          setApprovedReviews([]);
        } else {
          setApprovedReviews(data);
        }
      } catch (error) {
        console.error("Error:", error);
        setApprovedReviews([]);
      }
    };

    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.from("reviews").select("rating");

        if (error) {
          console.error("Error fetching stats:", error);
        } else if (data && data.length > 0) {
          const totalReviews = data.length;
          const averageRating =
            data.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
          setStats((prev) => ({
            ...prev,
            totalReviews,
            averageRating: Math.round(averageRating * 10) / 10,
          }));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) {
          console.error("Error fetching blogs:", error);
          setBlogs([]);
        } else {
          setBlogs(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
        setBlogs([]);
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchApprovedReviews();
    fetchStats();
    fetchBlogs();
  }, []);

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content ? content.split(" ").length : 0;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Diabetes Care":
        "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200",
      "Cancer Treatment":
        "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200",
      "Mental Health":
        "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200",
      "General Health":
        "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-orange-200",
      Nutrition:
        "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200",
      Prevention:
        "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border-indigo-200",
    };
    return (
      colors[category] ||
      "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-x-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden min-h-screen flex items-center"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1000"></div>
            <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping delay-2000"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                heroInView
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-blue-200 group">
                  <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">
                    Trusted Healthcare Provider Since 2003
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  Welcome to{" "}
                  <span className="relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
                      Raj Clinic
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform scale-x-0 animate-pulse"></div>
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Comprehensive Care in{" "}
                  <span className="font-semibold text-yellow-300 relative">
                    Diabetes
                    <Sparkles className="inline h-5 w-5 ml-1 animate-spin" />
                  </span>
                  ,{" "}
                  <span className="font-semibold text-yellow-300 relative">
                    Cancer Treatment
                    <Heart className="inline h-5 w-5 ml-1 animate-pulse" />
                  </span>
                  , and{" "}
                  <span className="font-semibold text-yellow-300 relative">
                    Mental Wellness
                    <Activity className="inline h-5 w-5 ml-1 animate-bounce" />
                  </span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-blue-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
                  onClick={() => (window.location.href = "/appointment")}
                >
                  <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Book an Appointment
                  <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
                  onClick={() => (window.location.href = "tel:+919876543210")}
                >
                  <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Call Now
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="flex items-center space-x-3 group">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-3 border-white shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                        style={{ animationDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-blue-200">
                    <div className="font-semibold text-white">
                      {animatedStats.totalPatients}+
                    </div>
                    <div className="text-sm">Happy Patients</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 group">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <div className="text-blue-200">
                    <div className="font-semibold text-white">
                      {animatedStats.averageRating}/5
                    </div>
                    <div className="text-sm">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative lg:block hidden transition-all duration-1000 delay-300 ${
                heroInView
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-purple-600/20 to-transparent rounded-3xl transform -rotate-3"></div>
              <img
                src="/clinic.webp"
                alt="Modern medical facility"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[600px] transform hover:scale-105 transition-transform duration-700 hover:rotate-1"
              />
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Info */}
      <section
        ref={doctorRef}
        className="py-24 bg-gradient-to-b from-white to-gray-50 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`relative transition-all duration-1000 ${
                doctorInView
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 blur-xl"></div>
              <div className="relative group">
                <img
                  src="/doctor.webp"
                  alt="Dr. Sanjay Pal"
                  className="relative rounded-3xl shadow-2xl object-cover w-full max-h-[500px] transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300 group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-2xl">20+</div>
                    <div className="text-sm text-gray-600 font-medium">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`space-y-8 transition-all duration-1000 delay-300 ${
                doctorInView
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-blue-600 group">
                  <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                    <Heart className="h-5 w-5 group-hover:animate-pulse" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Meet Your Doctor
                  </span>
                </div>

                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                  Dr. Sanjay Pal
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed">
                  With over{" "}
                  <span className="font-bold text-blue-600">20 years</span> of
                  experience, Dr. Sanjay Pal is a highly respected physician
                  specializing in Diabetes management, Cancer treatment
                  strategies, and Mental Health Counseling.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  His integrative approach has helped{" "}
                  <span className="font-semibold text-green-600">
                    hundreds of patients
                  </span>{" "}
                  through early diagnosis, effective treatment planning, and
                  emotional recovery—ensuring long-term health and well-being.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl transform hover:scale-105 transition-transform duration-300 group">
                  <div className="text-4xl font-bold text-blue-600 group-hover:animate-pulse">
                    {animatedStats.totalPatients}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Patients Treated
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transform hover:scale-105 transition-transform duration-300 group">
                  <div className="text-4xl font-bold text-green-600 group-hover:animate-pulse">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Success Rate
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "Board Certified",
                  "20+ Years Experience",
                  "Holistic Approach",
                  "Patient-Centered Care",
                ].map((badge, index) => (
                  <span
                    key={badge}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium transform hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="py-24 bg-gradient-to-b from-gray-50 to-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-6 mb-20 transition-all duration-1000 ${
              servicesInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center space-x-3 text-blue-600 group">
              <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                <Users className="h-5 w-5 group-hover:animate-pulse" />
              </div>
              <span className="text-sm font-medium uppercase tracking-wide">
                Our Services
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              Specialized Medical Care
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive healthcare solutions tailored to your unique needs
              with cutting-edge treatments and compassionate care that puts your
              well-being first.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Diabetes Treatment */}
            <Card
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50 hover:from-blue-50 hover:to-blue-100/50 ${
                servicesInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <CardContent className="p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Heart className="h-10 w-10 text-white group-hover:animate-pulse" />
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Diabetes Treatment
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Evidence-based plans to manage and reverse diabetes with
                    lifestyle changes, medications, and continuous monitoring
                    for optimal health outcomes.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Type 1 & Type 2 Diabetes",
                      "Continuous Glucose Monitoring",
                      "Insulin Management",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center space-x-3 text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        <div className="p-1 bg-green-100 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cancer Treatment */}
            <Card
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50 hover:from-purple-50 hover:to-purple-100/50 ${
                servicesInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              <CardContent className="p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Shield className="h-10 w-10 text-white group-hover:animate-pulse" />
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    Cancer Treatment
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Advanced medical care for various cancers using modern
                    diagnostic tools and holistic treatment support with
                    personalized care plans.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Diagnosis & Staging",
                      "Radiation & Chemotherapy Planning",
                      "Post-treatment Monitoring",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center space-x-3 text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        <div className="p-1 bg-green-100 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Counseling Services */}
            <Card
              className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50 hover:from-green-50 hover:to-green-100/50 ${
                servicesInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: "400ms" }}
            >
              <CardContent className="p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Users className="h-10 w-10 text-white group-hover:animate-pulse" />
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    Mental Health Counseling
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    One-on-one psychological support for patients struggling
                    with chronic conditions, stress, and anxiety with
                    evidence-based therapeutic approaches.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Illness-related Anxiety",
                      "Emotional Recovery",
                      "Therapeutic Conversations",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center space-x-3 text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        <div className="p-1 bg-green-100 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section
        ref={reviewsRef}
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-6 mb-20 transition-all duration-1000 ${
              reviewsInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center space-x-3 text-blue-600 group">
              <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                <Star className="h-5 w-5 group-hover:animate-pulse" />
              </div>
              <span className="text-sm font-medium uppercase tracking-wide">
                Patient Reviews
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              What Our Patients Say
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Real stories from real patients who have experienced our
              compassionate care and professional treatment
            </p>

            {stats.totalReviews > 0 && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span>
                  Based on {animatedStats.totalReviews} verified reviews
                </span>
              </div>
            )}
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              reviewsInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <ReviewList />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        ref={blogRef}
        className="py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center space-y-6 mb-20 transition-all duration-1000 ${
              blogInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center space-x-3 text-blue-600 group">
              <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                <FileText className="h-5 w-5 group-hover:animate-pulse" />
              </div>
              <span className="text-sm font-medium uppercase tracking-wide">
                Health & Wellness
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              Latest Health Insights
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stay informed with expert advice on diabetes management, cancer
              treatment, and mental health from Dr. Sanjay Pal and our medical
              team.
            </p>
          </div>

          {isLoadingBlogs ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="overflow-hidden shadow-lg">
                  <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {blogs.slice(0, 5).map((blog, index) => (
                <Card
                  key={blog.id}
                  className={`group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border-0 bg-gradient-to-br from-white to-gray-50/50 hover:from-gray-50 hover:to-gray-100/50 ${
                    index === 0
                      ? "md:col-span-2 lg:col-span-2 xl:col-span-2"
                      : ""
                  } ${
                    blogInView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        blog.featured_image ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={blog.title}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                        index === 0 ? "h-64" : "h-48"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getCategoryColor(
                          blog.category || "General Health"
                        )}`}
                      >
                        {blog.category || "Health Tips"}
                      </span>
                    </div>

                    {/* Reading Time */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <div className="flex items-center space-x-1 text-xs text-gray-700 font-medium">
                        <Clock className="h-3 w-3" />
                        <span>{getReadingTime(blog.content)}</span>
                      </div>
                    </div>

                    {/* Featured Badge for first blog */}
                    {index === 0 && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg animate-pulse">
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent
                    className={`space-y-4 ${
                      index === 0 ? "p-8" : "p-6"
                    } relative`}
                  >
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(blog.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 ${
                        index === 0 ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className={`text-gray-600 leading-relaxed ${
                        index === 0 ? "line-clamp-4 text-lg" : "line-clamp-3"
                      }`}
                    >
                      {blog.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="pt-4">
                      <Button
                        onClick={() =>
                          (window.location.href = `/blog/${createSlug(
                            blog.title
                          )}-${blog.id}`)
                        }
                        variant="ghost"
                        className="group/btn p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 hover:bg-transparent transition-all duration-300"
                      >
                        <span>Read Full Article</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 border-2 border-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="p-6 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                No blog posts yet
              </h3>
              <p className="text-gray-600 text-lg">
                Check back soon for health and wellness articles!
              </p>
            </div>
          )}

          {blogs.length > 0 && (
            <div className="text-center mt-16">
              <Button
                onClick={() => (window.location.href = "/blog")}
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-500 group transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={ctaRef}
        className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white/40 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping delay-3000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div
            className={`space-y-10 transition-all duration-1000 ${
              ctaInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Take Charge of Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse">
                  Health Journey
                </span>
              </h2>
              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                We're here to support your journey toward physical and mental
                wellness. Schedule your consultation today and take the first
                step towards a healthier, happier life with personalized care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-blue-900 font-semibold px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 group relative overflow-hidden"
                onClick={() => (window.location.href = "/appointment")}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                Book Your Appointment
              </Button>

              <div className="flex items-center space-x-4 text-blue-200 group">
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300">
                  <Clock className="h-6 w-6 group-hover:animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Available 24/7</div>
                  <div className="text-sm">for emergencies</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
              <div className="flex items-center justify-center space-x-4 group">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300 group-hover:scale-110">
                  <Phone className="h-6 w-6 text-yellow-400 group-hover:animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Call Us</div>
                  <div className="text-blue-200">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 group">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6 text-yellow-400 group-hover:animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Email Us</div>
                  <div className="text-blue-200">info@rajclinic.com</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 group">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300 group-hover:scale-110">
                  <MapPin className="h-6 w-6 text-yellow-400 group-hover:animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Visit Us</div>
                  <div className="text-blue-200">123 Health Street</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="transform hover:scale-105 transition-transform duration-500">
            <ReviewForm />
          </div>
          
        </div>
      </section>
    </div>
  );
}
