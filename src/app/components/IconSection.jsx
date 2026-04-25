'use client'

import { Icon } from "@iconify/react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MotionCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 200,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
};

const IconSection = () => {
  const features = [
    {
      icon: "solar:crown-bold-duotone",
      title: "Qualité Premium",
      description: "Services et produits de beauté certifiés, sélectionnés avec soin",
      gradient: "from-[#C6934F] to-[#E8C98A]",
    },
    {
      icon: "solar:verified-check-bold-duotone",
      title: "Professionnels Certifiés",
      description: "Chaque styliste est vérifiée et certifiée par notre équipe",
      gradient: "from-[#B8854A] to-[#D4A574]",
    },
    {
      icon: "solar:star-ring-bold-duotone",
      title: "Avis Excellents",
      description: "Les mieux notées du pays avec 4.9/5 de moyenne",
      gradient: "from-[#9A6F3A] to-[#C6934F]",
    },
  ];

  const stats = [
    { label: "Clients Satisfaits", value: 1000, suffix: "+", icon: "solar:users-group-rounded-bold-duotone" },
    { label: "Stylistes Experts", value: 50, suffix: "+", icon: "solar:star-shine-bold-duotone" },
    { label: "Services Disponibles", value: 100, suffix: "+", icon: "solar:clipboard-list-bold-duotone" },
    { label: "Ans d'Expérience", value: 5, suffix: "+", icon: "solar:medal-ribbons-star-bold-duotone" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0D0D0D] via-[#141414] to-[#1A1A1A] py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#C6934F]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C6934F]/5 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
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
            <Icon icon="solar:star-bold" className="w-4 h-4" />
            Nos Atouts
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-playfair mb-4">
            Pourquoi Choisir{' '}
            <span className="text-gradient-gold">Tzeyni</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            L'excellence au service de votre beauté, chaque jour
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="relative glass rounded-2xl p-8 h-full transition-all duration-500 hover:border-[#C6934F]/30 hover:bg-white/[0.06]">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#C6934F]/0 to-[#C6934F]/0 group-hover:from-[#C6934F]/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                  {/* Icon Container with animated border */}
                  <div className="relative">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-glow transition-all duration-500`}>
                      <Icon icon={feature.icon} className="w-8 h-8 text-white" />
                    </div>
                    {/* Ping effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-[#C6934F]/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E8C98A] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="group relative glass-gold rounded-2xl p-6 text-center transition-all duration-300 cursor-default hover:border-[#C6934F]/40"
            >
              <div className="flex justify-center mb-3">
                <Icon icon={stat.icon} className="w-6 h-6 text-[#C6934F] group-hover:text-[#E8C98A] transition-colors" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <MotionCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconSection;
