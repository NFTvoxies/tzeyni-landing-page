'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const Hero = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);

  return (
    <div className="relative min-h-[90vh] w-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/image/tzeyni header bg.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh] flex flex-col justify-center">
        {/* Hero Text */}
        <div className="max-w-3xl space-y-6 animate-fade-in-up mt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Hair & Beauty</span>
            <br />
            <span className="bg-gradient-to-r from-[#aa9270] to-[#d4bd9c] text-transparent bg-clip-text">
              Delivered to Your Doorstep
            </span>
            <br />
            <span className="text-white">Welcome to Tzeyni!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Discover Your Perfect Stylist for Effortless Beauty at Home
          </p>

          {/* Search Container */}
          <div className="mt-8 w-full max-w-3xl">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Service Search */}
                <div className={`relative transition-all duration-300 ${
                  isSearchFocused ? 'scale-[1.02]' : ''
                }`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Book your service..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#aa9270] focus:ring-[#aa9270] transition-all duration-300 pr-10"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <Icon icon="icon-park-outline:search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                {/* Location Search */}
                <div className={`relative transition-all duration-300 ${
                  isLocationFocused ? 'scale-[1.02]' : ''
                }`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Where..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#aa9270] focus:ring-[#aa9270] transition-all duration-300 pr-10"
                      onFocus={() => setIsLocationFocused(true)}
                      onBlur={() => setIsLocationFocused(false)}
                    />
                    <Icon icon="ph:map-pin-duotone" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full md:w-auto mt-4 px-8 py-3 bg-[#aa9270] hover:bg-[#8e7a5d] text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group">
                <span>Find Your Stylist</span>
                <Icon icon="typcn:arrow-right-outline" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-2 h-2 bg-[#aa9270] rounded-full" />
              <span>Professional Stylists</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-2 h-2 bg-[#aa9270] rounded-full" />
              <span>Verified Reviews</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-2 h-2 bg-[#aa9270] rounded-full" />
              <span>Secure Booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;