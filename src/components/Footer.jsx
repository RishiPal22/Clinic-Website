"use client"

import {
  Facebook,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  ArrowUp,
  Stethoscope,
  Shield,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-r from-[#00799e] via-[#015a7d] to-[#031621] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#b5e5ef] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#d2084f] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#b5e5ef] rounded-full blur-2xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d2084f] to-[#b5e5ef] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-white to-[#b5e5ef] rounded-full flex items-center justify-center shadow-lg">
                    <Stethoscope className="h-5 w-5 text-[#00799e]" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-[#b5e5ef] to-[#d2084f] bg-clip-text text-transparent">
                    Raj Clinic
                  </h2>
                  <p className="text-[#b5e5ef] font-medium text-sm">Healthcare Excellence Since 2003</p>
                </div>
              </div>

              <p className="text-[#b5e5ef]/80 leading-relaxed max-w-md text-sm">
                Providing comprehensive healthcare services in Diabetes management, Cancer treatment, and Health
                counseling with compassionate care and cutting-edge medical expertise.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Shield, text: "Trusted Care" },
                  { icon: Heart, text: "Compassionate" },
                  { icon: Users, text: "500+ Patients" },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full border border-[#b5e5ef]/30 hover:border-[#d2084f]/50 transition-colors duration-300"
                  >
                    <badge.icon className="h-3 w-3 text-[#d2084f]" />
                    <span className="text-xs font-medium text-white">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
              <div className="space-y-1">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Services", href: "/services" },
                  { name: "Book Appointment", href: "/appointment" },
                  { name: "Health Blog", href: "/blog" },
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="block text-[#b5e5ef] hover:text-[#d2084f] transition-all duration-300 transform hover:translate-x-2 hover:scale-105 group text-sm"
                  >
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-[#d2084f] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{link.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Contact Info</h3>
              <div className="space-y-1">
                <div className="flex items-start space-x-2 group">
                  <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-[#d2084f]/20 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-[#d2084f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Phone</p>
                    <p className="text-[#b5e5ef]/80 text-xs">+91 9987127646</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 group">
                  <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-[#d2084f]/20 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-[#d2084f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Email</p>
                    <p className="text-[#b5e5ef]/80 text-xs">dr.sanjaypal@rajclinic.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 group">
                  <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-[#d2084f]/20 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-[#d2084f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Address</p>
                    <p className="text-[#b5e5ef]/80 text-xs">
                      7/8, Samruddhi Shopping Centre, M.G Road, Landmark :Near Nirmal College
                      <br />
                      Kandivali (W), Mumai 400 067
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 group">
                  <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-[#d2084f]/20 transition-colors duration-300">
                    <Clock className="h-4 w-4 text-[#d2084f]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Hours</p>
                    <p className="text-[#b5e5ef]/80 text-xs">
                      Morning 10AM-1PM
                      <br />
                      Evening 6:00pm-10:pm
                      <br />
                      Sunday Closed
                      <br />
                      Emergency: 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#b5e5ef]/20 bg-[#031621]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-3">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-[#b5e5ef]/80 text-sm">
                  &copy; {new Date().getFullYear()} Raj Clinic. All rights reserved.
                </p>
                <p className="text-xs text-[#b5e5ef]/60 mt-1">
                  Designed with <Heart className="inline h-3 w-3 text-[#d2084f]" /> for better healthcare
                </p>
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-2">
                <span className="text-[#b5e5ef]/80 text-xs font-medium">Follow Us:</span>
                <div className="flex space-x-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-[#00799e] rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Facebook className="h-4 w-4 text-white group-hover:text-[#b5e5ef]" />
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-[#d2084f] rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  >
                    <MessageCircle className="h-4 w-4 text-white group-hover:text-[#b5e5ef]" />
                  </a>
                  <a
                    href="mailto:dr.sanjaypal@rajclinic.com"
                    className="p-2 bg-white/10 hover:bg-[#00799e] rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Mail className="h-4 w-4 text-white group-hover:text-[#b5e5ef]" />
                  </a>
                </div>
              </div>

              {/* Scroll to Top */}
              <Button
                onClick={scrollToTop}
                variant="outline"
                className="border-[#b5e5ef]/30 text-white hover:bg-[#d2084f]/20 hover:border-[#d2084f] backdrop-blur-sm rounded-full p-2 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group bg-transparent"
              >
                <ArrowUp className="h-4 w-4 group-hover:animate-bounce" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}