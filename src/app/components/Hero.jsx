'use client'
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockSearch } from '@/lib/mockApi';

// Typing animation words
const typingWords = ['Coiffure', 'Maquillage', 'Massage', 'Manucure', 'Soins Visage'];

const Hero = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Only update when hero is visible
        if (rect.bottom > 0) {
          requestAnimationFrame(() => {
            setScrollY(window.scrollY);
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentWord = typingWords[currentWordIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  const handleSearch = async () => {
    if (!searchTerm || !locationTerm) {
      setErrorMessage('Veuillez remplir les deux champs.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await mockSearch(searchTerm, locationTerm);

      if (result.data && result.data.length > 0) {
        console.log('Search results:', result.data);
      } else {
        setErrorMessage('Aucun service correspondant à votre recherche.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const trustBadges = [
    { icon: 'solar:verified-check-bold', text: 'Profils Vérifiés', count: '500+' },
    { icon: 'solar:star-bold', text: 'Avis 5 Étoiles', count: '2000+' },
    { icon: 'solar:shield-check-bold', text: 'Paiement Sécurisé', count: '100%' },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          willChange: 'transform',
        }}
      >
        <Image
          src="/assets/image/tzeyni_header_2.webp"
          alt="Fond du Héros"
          fill
          className="object-cover scale-110"
          priority
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-[#C6934F]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Animated floating orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-[#C6934F]/20 to-[#E8C98A]/10 blur-3xl animate-float" />
        <div className="absolute top-[60%] left-[5%] w-96 h-96 rounded-full bg-gradient-to-tr from-[#B8854A]/15 to-[#D4A574]/10 blur-3xl animate-float-slow" />
        <div className="absolute top-[30%] right-[30%] w-48 h-48 rounded-full bg-[#C6934F]/10 blur-2xl animate-float-delayed" />

        {/* Sparkle particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#E8C98A] rounded-full animate-sparkle"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 16}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative grid pattern overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-5 gap-12 items-center pt-24 pb-12">
          {/* Left content — 3 cols */}
          <div className="lg:col-span-3 space-y-8">
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                La plateforme beauté #1 au Maroc
              </span>
            </motion.div>

            {/* Main heading with typing effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-white font-playfair">La beauté à</span>
              <br />
              <span className="text-white font-playfair">domicile, </span>
              <span className="text-gradient-gold font-playfair">simplement.</span>
            </motion.h1>

            {/* Typing subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 text-xl md:text-2xl text-white/60"
            >
              <span>Réservez votre</span>
              <span className="text-[#E8C98A] font-semibold min-w-[180px]">
                {displayText}
                <span className="animate-blink text-[#C6934F]">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/70 max-w-xl leading-relaxed"
            >
              Des professionnelles vérifiées, chez vous, au créneau qui vous convient.
              Coiffure, maquillage, soins — tout en quelques clics.
            </motion.p>

            {/* Glassmorphic Search container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="w-full max-w-2xl"
            >
              <div className="glass-light rounded-2xl p-2 shadow-2xl shadow-black/20 transition-all duration-500 hover:shadow-glow-lg">
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Service input */}
                  <div className={`relative flex-1 transition-all duration-300 ${isSearchFocused ? 'scale-[1.01]' : ''}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Icon icon="solar:magnifer-bold-duotone" className="w-5 h-5 text-[#C6934F]" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Quel service ?"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 border border-transparent focus:border-[#C6934F]/50 focus:bg-white focus:ring-2 focus:ring-[#C6934F]/20 transition-all duration-300 text-gray-800 placeholder-gray-400 outline-none"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                  </div>

                  {/* Location input */}
                  <div className={`relative flex-1 transition-all duration-300 ${isLocationFocused ? 'scale-[1.01]' : ''}`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Icon icon="solar:map-point-bold-duotone" className="w-5 h-5 text-[#C6934F]" />
                    </div>
                    <input
                      type="text"
                      value={locationTerm}
                      onChange={(e) => setLocationTerm(e.target.value)}
                      placeholder="Ville ou quartier"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 border border-transparent focus:border-[#C6934F]/50 focus:bg-white focus:ring-2 focus:ring-[#C6934F]/20 transition-all duration-300 text-gray-800 placeholder-gray-400 outline-none"
                      onFocus={() => setIsLocationFocused(true)}
                      onBlur={() => setIsLocationFocused(false)}
                    />
                  </div>

                  {/* Search button */}
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-[#C6934F] to-[#B8854A] hover:from-[#B8854A] hover:to-[#9A6F3A] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-glow active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    {loading ? (
                      <Icon icon="solar:spinner-bold" className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span className="hidden sm:inline">Rechercher</span>
                        <Icon icon="solar:arrow-right-bold" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm px-4 pt-2"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Popular searches */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-2 mt-4"
              >
                <span className="text-white/40 text-sm">Populaire :</span>
                {['Brushing', 'Massage', 'Coloration', 'Nail Art'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white/70 bg-white/10 hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10"
                  >
                    {tag}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right side — Trust badges & stats (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-2 hidden lg:flex flex-col gap-5"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.15 }}
                whileHover={{ x: -5, scale: 1.02 }}
                className="glass rounded-2xl p-5 flex items-center gap-4 cursor-default group transition-all duration-300 hover:border-[#C6934F]/30"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C6934F] to-[#E8C98A] flex items-center justify-center shadow-lg group-hover:animate-pulse-glow transition-all duration-300">
                  <Icon icon={badge.icon} className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-lg">{badge.count}</p>
                  <p className="text-white/60 text-sm">{badge.text}</p>
                </div>
                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 text-white/30 group-hover:text-[#C6934F] transform group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}

            {/* Floating review card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="glass rounded-2xl p-5 mt-2"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {['/assets/image/testimonial1.jpeg', '/assets/image/testimonial2.png', '/assets/image/testimonial3.png'].map((src, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden">
                      <Image src={src} alt="Client" width={32} height={32} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
                <span className="text-white/80 text-sm font-medium">+1000 clients satisfaits</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="solar:star-bold" className="w-4 h-4 text-[#E8C98A]" />
                ))}
                <span className="text-white/60 text-sm ml-2">4.9/5 note moyenne</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-[#C6934F]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
