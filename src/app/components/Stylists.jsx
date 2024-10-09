'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const stylistsData = [
  {
    id: 1,
    image: '/assets/image/professional.png',
    name: 'Alice Smith',
    experience: '10 years experience',
    rating: 4.9,
    reviews: 127,
    specialties: ['Hair Styling', 'Coloring', 'Extensions'],
    availability: 'Available Today',
    location: 'Central Paris',
    awards: 3
  },
  {
    id: 2,
    image: '/assets/image/professional2.png',
    name: 'Bob Johnson',
    experience: '8 years experience',
    rating: 4.8,
    reviews: 98,
    specialties: ['Makeup', 'Skincare', 'Bridal'],
    availability: 'Next Available: Tomorrow',
    location: 'West Paris',
    awards: 2
  },
  {
    id: 3,
    image: '/assets/image/professional1.png',
    name: 'Charlie Davis',
    experience: '15 years experience',
    rating: 5.0,
    reviews: 156,
    specialties: ['Massage', 'Spa', 'Aromatherapy'],
    availability: 'Available Today',
    location: 'South Paris',
    awards: 4
  },
];

const Stylists = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-[#323232] py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet The Talented Stylists
            <br />
            <span className="text-[#e7d1b4]">For this Month</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our hand-picked professionals bring years of expertise and passion to every service.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylistsData.map((stylist) => (
            <div
              key={stylist.id}
              className="relative group"
              onMouseEnter={() => setHoveredId(stylist.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative h-[400px] overflow-hidden">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Name and Rating */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{stylist.name}</h3>
                      <p className="text-[#e7d1b4] font-medium">{stylist.experience}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon icon="solar:star-bold-duotone" className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-bold text-gray-800">{stylist.rating}</span>
                      <span className="text-gray-500">({stylist.reviews})</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {stylist.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Icon icon="solar:calendar-broken" className="w-4 h-4" />
                      <span>{stylist.availability}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon icon="ri:map-pin-line" className="w-4 h-4" />
                      <span>{stylist.location}</span>
                    </div>
                  </div>

                  {/* Awards */}
                  <div className="flex items-center space-x-1">
                    {[...Array(stylist.awards)].map((_, i) => (
                      <Icon icon="flowbite:award-outline" key={i} className="w-4 h-4 text-[#e7d1b4]" />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-[#e7d1b4] text-gray-800 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-[#d4b794]">
                      Book Now
                    </button>
                    <button className="px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 hover:border-[#e7d1b4] hover:text-[#e7d1b4]">
                      <Icon icon="eva:message-circle-outline" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stylists;