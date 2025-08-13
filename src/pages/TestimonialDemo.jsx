import React from 'react';
import TestimonialSlider from '@/components/ui/testimonial-slider';

export default function TestimonialDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Testimonial Slider Demo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This is a demonstration of the professional testimonial slider component 
            integrated into your clinic website. The component features smooth animations, 
            responsive design, and interactive controls.
          </p>
        </div>
        
        <TestimonialSlider />
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Component Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-blue-600 mb-2">Responsive Design</h3>
              <p className="text-gray-600 text-sm">
                Automatically adjusts to show 1, 2, or 3 testimonials based on screen size
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-blue-600 mb-2">Smooth Animations</h3>
              <p className="text-gray-600 text-sm">
                Powered by Framer Motion for fluid transitions and hover effects
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-blue-600 mb-2">Interactive Controls</h3>
              <p className="text-gray-600 text-sm">
                Navigation buttons, auto-play, and touch/swipe support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
