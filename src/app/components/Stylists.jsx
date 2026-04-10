'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const stylistsData = [
  {
    id: 1,
    image: '/assets/image/professional.png',
    name: 'Alice Smith',
    experience: "10 ans d'expérience",
    rating: 4.9,
    reviews: 127,
    specialties: ['Coiffure', 'Coloration', 'Extensions'],
    availability: "Disponible Aujourd'hui",
    location: 'Casablanca',
    awards: 3,
    verified: true,
  },
  {
    id: 2,
    image: '/assets/image/professional2.png',
    name: 'Marie Johnson',
    experience: "8 ans d'expérience",
    rating: 4.8,
    reviews: 98,
    specialties: ['Maquillage', 'Soins Visage', 'Mariage'],
    availability: 'Disponible Demain',
    location: 'Rabat',
    awards: 2,
    verified: true,
  },
  {
    id: 3,
    image: '/assets/image/professional1.png',
    name: 'Carla Brown',
    experience: "5 ans d'expérience",
    rating: 4.7,
    reviews: 156,
    specialties: ['Massage', 'Spa', 'Aromathérapie'],
    availability: "Disponible Aujourd'hui",
    location: 'Marrakech',
    awards: 4,
    verified: true,
  },
];

const Stylists = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="relative bg-gradient-to-b from-[#141414] via-[#1A1A1A] to-[#0D0D0D] py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-b from-[#C6934F]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-gradient-to-t from-[#C6934F]/5 to-transparent rounded-full blur-3xl" />
        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-[#E8C98A] text-sm font-medium mb-6">
            <Icon icon="solar:verified-check-bold" className="w-4 h-4" />
            Professionnels Vérifiés
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-4">
            Rencontrez Nos{' '}
            <span className="text-gradient-gold">Talents</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Nos professionnels triés sur le volet apportent des années d'expertise et de passion à chaque service.
          </p>
        </motion.div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylistsData.map((stylist, idx) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="group relative"
              onMouseEnter={() => setHoveredId(stylist.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative bg-[#1E1E1E] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C6934F]/30 transition-all duration-500 hover:shadow-glow">
                {/* Image Container - shorter */}
                <div className="relative h-[320px] overflow-hidden">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent" />

                  {/* Verified badge */}
                  {stylist.verified && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-white text-xs font-medium">
                        <Icon icon="solar:verified-check-bold" className="w-4 h-4 text-[#E8C98A]" />
                        Vérifiée
                      </div>
                    </div>
                  )}

                  {/* Availability badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium backdrop-blur-sm border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {stylist.availability}
                    </div>
                  </div>

                  {/* Rating floating badge */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full glass text-white text-sm font-bold">
                      <Icon icon="solar:star-bold" className="w-4 h-4 text-[#E8C98A]" />
                      {stylist.rating}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Name & Experience */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E8C98A] transition-colors duration-300">
                      {stylist.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#C6934F] text-sm font-medium">{stylist.experience}</span>
                      <span className="text-white/20">•</span>
                      <div className="flex items-center gap-1 text-white/40 text-sm">
                        <Icon icon="solar:map-point-bold-duotone" className="w-3.5 h-3.5" />
                        {stylist.location}
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {stylist.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass-gold rounded-full text-[#E8C98A] text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Awards */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(stylist.awards)].map((_, i) => (
                        <Icon key={i} icon="solar:medal-star-bold-duotone" className="w-4 h-4 text-[#C6934F]" />
                      ))}
                    </div>
                    <span className="text-white/30 text-xs">{stylist.reviews} avis</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Link href="/browse" className="flex-1">
                      <button className="w-full py-3 bg-gradient-to-r from-[#C6934F] to-[#B8854A] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-glow active:scale-[0.98] text-sm">
                        Réserver
                      </button>
                    </Link>
                    <button className="px-4 py-3 glass rounded-xl transition-all duration-300 hover:border-[#C6934F]/30 group/msg">
                      <Icon icon="solar:chat-round-dots-bold-duotone" className="w-5 h-5 text-white/50 group-hover/msg:text-[#C6934F] transition-colors" />
                    </button>
                    <button className="px-4 py-3 glass rounded-xl transition-all duration-300 hover:border-red-500/30 group/fav">
                      <Icon icon="solar:heart-bold-duotone" className="w-5 h-5 text-white/50 group-hover/fav:text-red-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all professionals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link href="/browse">
            <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-[#C6934F]/50 text-[#C6934F] rounded-full font-semibold hover:bg-[#C6934F] hover:text-white hover:border-[#C6934F] transition-all duration-300 hover:shadow-glow">
              <span>Voir Tous les Professionnels</span>
              <Icon icon="solar:arrow-right-linear" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Stylists;