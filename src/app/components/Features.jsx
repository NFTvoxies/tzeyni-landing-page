"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

const featuresData = [
  {
    image: "/assets/image/téléchargement.jpg",
    title: "Massage Balinais",
    description: "Détente profonde, amélioration de la circulation, équilibre énergétique",
    price: "199",
    duration: "45 min",
    category: "Massage",
  },
  {
    image: "/assets/image/images.jpg",
    title: "Épilation Complète",
    description: "Épilation durable, peau douce et lisse, réduction des poils incarnés",
    price: "129",
    duration: "65 min",
    category: "Soins Corps",
  },
  {
    image: "/assets/image/images (1).jpg",
    title: "Glow Peel",
    description: "Éclat instantané, réduction des imperfections, hydratation profonde",
    price: "80",
    duration: "30 min",
    category: "Soins Visage",
  },
  {
    image: "/assets/image/71qX8NpAHVL._AC_UF1000,1000_QL80_.jpg",
    title: "Soin Kératine",
    description: "Lissage durable, hydratation intense, protection longue durée",
    price: "55",
    duration: "15 min",
    category: "Cheveux",
  },
  {
    image: "/assets/image/6-manfaat-manicure-pedicure-bagi-kesehatan.jpg",
    title: "Manucure & Pédicure",
    description: "Soins des ongles, hydratation de la peau, détente et relaxation",
    price: "199",
    duration: "65 min",
    category: "Ongles",
  },
];

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative bg-gradient-to-b from-[#FBF8F4] via-[#FDFCF8] to-[#F8F5F0] py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#C6934F]/8 to-transparent blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#B8854A]/6 to-transparent blur-3xl" />
        {/* Decorative lines */}
        <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C6934F]/10 to-transparent" />
        <div className="absolute bottom-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C6934F]/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6934F]/10 text-[#C6934F] text-sm font-medium">
            <Icon icon="solar:star-shine-bold" className="w-4 h-4" />
            Services Premium
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 font-playfair">
            Nos Services{' '}
            <span className="text-gradient-gold">d&apos;Exception</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-500 text-lg">
            Tzeyni apporte l'expérience du salon chez vous. Dites adieu aux tracas et profitez de services premium à domicile.
          </p>
        </motion.div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative ${index === 0 ? 'lg:row-span-2' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-[#C6934F]/20 ${index === 0 ? 'h-full' : ''}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${index === 0 ? 'h-64 lg:h-[55%]' : 'h-48'}`}>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#C6934F] shadow-sm backdrop-blur-sm">
                      {feature.category}
                    </span>
                  </div>

                  {/* Quick book button on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 z-10"
                  >
                    <Link href="/browse" className="block w-full py-3 bg-white/95 backdrop-blur-sm text-[#C6934F] rounded-xl text-center font-semibold text-sm hover:bg-white transition-colors shadow-lg">
                      Réserver maintenant →
                    </Link>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#C6934F] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>

                  {/* Price & Duration bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                      <Icon icon="solar:clock-circle-bold-duotone" className="w-4 h-4 text-[#C6934F]/60" />
                      <span>{feature.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-neutral-400">À partir de</span>
                      <span className="text-lg font-bold text-[#C6934F]">{feature.price}</span>
                      <span className="text-xs text-neutral-400">MAD</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/browse">
            <button className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-[#C6934F] text-[#C6934F] rounded-full font-semibold hover:bg-[#C6934F] hover:text-white transition-all duration-300 hover:shadow-glow">
              <span>Voir Tous les Services</span>
              <Icon
                icon="solar:arrow-right-linear"
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
