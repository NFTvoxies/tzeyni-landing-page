'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const stylistsData = [
  {
    id: 1,
    image: '/assets/image/professional.png',
    name: 'Alice Smith',
    experience: '10 ans d\'expérience',
    rating: 4.9,
    reviews: 127,
    specialties: ['Coiffure', 'Coloration', 'Extensions'],
    availability: 'Disponible Aujourd\'hui',
    location: 'Centre de Paris',
    awards: 3
  },
  {
    id: 2,
    image: '/assets/image/professional2.png',
    name: 'Marie Johnson',
    experience: '8 ans d\'expérience',
    rating: 4.8,
    reviews: 98,
    specialties: ['Maquillage', 'Soins de la peau', 'Mariage'],
    availability: 'Prochaine disponibilité : Demain',
    location: 'Ouest de Paris',
    awards: 2
  },
  {
    id: 3,
    image: '/assets/image/professional1.png',
    name: 'Carla Brown',
    experience: '5 ans d\'expérience',
    rating: 4.0,
    reviews: 156,
    specialties: ['Massage', 'Spa', 'Aromathérapie'],
    availability: 'Disponible Aujourd\'hui',
    location: 'Sud de Paris',
    awards: 4
  },
];

const Stylists = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-[#323232] py-20 relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section d'en-tête */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Rencontrez les Talents Stylists
            <br />
            <span className="text-[#e7d1b4]">Pour ce Mois</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Nos professionnels triés sur le volet apportent des années d'expertise et de passion à chaque service.
          </p>
        </div>

        {/* Grille des stylistes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylistsData.map((stylist) => (
            <div
              key={stylist.id}
              className="relative group"
              onMouseEnter={() => setHoveredId(stylist.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
                {/* Conteneur d'image */}
                <div className="relative h-[400px] overflow-hidden">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Superposition */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Contenu */}
                <div className="p-6 space-y-4">
                  {/* Nom et évaluation */}
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

                  {/* Spécialités */}
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

                  {/* Informations supplémentaires */}
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

                  {/* Récompenses */}
                  <div className="flex items-center space-x-1">
                    {[...Array(stylist.awards)].map((_, i) => (
                      <Icon icon="flowbite:award-outline" key={i} className="w-4 h-4 text-[#e7d1b4]" />
                    ))}
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-[#e7d1b4] text-gray-800 py-3 rounded-xl font-medium transition-all duration-300 hover:bg-[#d4b794]">
                      Réserver Maintenant
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