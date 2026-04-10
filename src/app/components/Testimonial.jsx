'use client'
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        image: '/assets/image/testimonial1.jpeg',
        name: 'Sarah Johnson',
        pronoun: 'Elle',
        location: 'Casablanca',
        title: 'Tzeyni a transformé mon look entier',
        text: "Absolument ravie de mon expérience chez Tzeyni ! L'attention aux détails et les soins personnalisés que j'ai reçus étaient exceptionnels. Mon styliste a pris le temps de comprendre exactement ce que je voulais et a dépassé mes attentes.",
        rating: 5,
        date: 'il y a 2 semaines',
        serviceType: 'Coiffure & Coloration'
    },
    {
        id: 2,
        image: '/assets/image/testimonial2.png',
        name: 'Marie Chen',
        pronoun: 'Elle',
        location: 'Rabat',
        title: 'Service professionnel qui dépasse les attentes',
        text: "Le niveau d'expertise chez Tzeyni est inégalé. J'ai été dans de nombreux salons, mais aucun ne se compare à la qualité et au professionnalisme. La connaissance et la technique de la styliste étaient impressionnantes.",
        rating: 5,
        date: 'il y a 1 mois',
        serviceType: 'Soins Cheveux Premium'
    },
    {
        id: 3,
        image: '/assets/image/testimonial3.png',
        name: 'Emma Martinez',
        pronoun: 'Elle',
        location: 'Marrakech',
        title: 'Une expérience vraiment luxueuse',
        text: "De la réservation au résultat final, tout était parfait. La styliste était non seulement compétente mais aussi très agréable et a donné d'excellents conseils pour entretenir mon nouveau style.",
        rating: 5,
        date: 'il y a 3 semaines',
        serviceType: 'Traitement Beauté Complet'
    }
];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 200 : -200,
        opacity: 0,
        scale: 0.95,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? -200 : 200,
        opacity: 0,
        scale: 0.95,
    }),
};

const Testimonial = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    const handleNext = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, []);

    // Auto-slide
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(handleNext, 6000);
        return () => clearInterval(interval);
    }, [isPaused, handleNext]);

    const currentTestimonial = testimonials[activeIndex];

    return (
        <section className="relative bg-gradient-to-b from-[#F8F5F0] via-[#F5F1ED] to-[#FBF8F4] py-24 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-[#C6934F]/5 blur-3xl" />
                <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-[#B8854A]/5 blur-3xl" />
                {/* Large quote decoration */}
                <div className="absolute top-20 left-10 text-[200px] font-serif text-[#C6934F]/[0.03] leading-none select-none">"</div>
                <div className="absolute bottom-20 right-10 text-[200px] font-serif text-[#C6934F]/[0.03] leading-none select-none rotate-180">"</div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6934F]/10 text-[#C6934F] text-sm font-medium mb-6">
                        <Icon icon="solar:chat-round-like-bold" className="w-4 h-4" />
                        Témoignages
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 font-playfair mb-4">
                        Ce Que Disent{' '}
                        <span className="text-gradient-gold">Nos Clients</span>
                    </h2>
                    <p className="text-neutral-500 max-w-2xl mx-auto">
                        Des histoires réelles de nos précieux clients sur leurs expériences transformantes.
                    </p>
                </motion.div>

                {/* Testimonial Card */}
                <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.3 }
                                }}
                                className="p-8 md:p-12"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    {/* Profile Section */}
                                    <div className="flex flex-col items-center space-y-4 flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#C6934F]/20 ring-offset-4 ring-offset-white">
                                                <Image
                                                    src={currentTestimonial.image}
                                                    alt={currentTestimonial.name}
                                                    width={112}
                                                    height={112}
                                                    className="rounded-full object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#C6934F] to-[#E8C98A] rounded-full p-1.5 shadow-lg">
                                                <Icon icon="solar:verified-check-bold" className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-neutral-900 font-bold text-lg">{currentTestimonial.name}</h3>
                                            <p className="text-[#C6934F] text-sm font-medium">{currentTestimonial.location}</p>
                                        </div>
                                        {/* Rating stars */}
                                        <div className="flex items-center gap-1">
                                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <Icon icon="solar:star-bold" className="w-5 h-5 text-[#E8C98A]" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 space-y-4">
                                        <div className="relative">
                                            <Icon
                                                icon="solar:quotes-bold"
                                                className="w-10 h-10 text-[#C6934F]/15 mb-2"
                                            />
                                            <h4 className="text-neutral-900 text-xl md:text-2xl font-bold font-playfair mb-4">
                                                {currentTestimonial.title}
                                            </h4>
                                            <p className="text-neutral-600 leading-relaxed text-base">
                                                {currentTestimonial.text}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between text-sm pt-4 border-t border-neutral-100">
                                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#C6934F]/10 text-[#C6934F] rounded-full text-xs font-medium">
                                                <Icon icon="solar:scissors-bold-duotone" className="w-3.5 h-3.5" />
                                                {currentTestimonial.serviceType}
                                            </span>
                                            <span className="text-neutral-400">{currentTestimonial.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-5 -right-5 flex justify-between pointer-events-none">
                        <motion.button
                            onClick={handlePrev}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="pointer-events-auto w-12 h-12 bg-white shadow-xl border border-neutral-100 text-neutral-600 hover:text-[#C6934F] rounded-full flex items-center justify-center transition-all hover:border-[#C6934F]/30"
                        >
                            <Icon icon="solar:arrow-left-bold" className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="pointer-events-auto w-12 h-12 bg-white shadow-xl border border-neutral-100 text-neutral-600 hover:text-[#C6934F] rounded-full flex items-center justify-center transition-all hover:border-[#C6934F]/30"
                        >
                            <Icon icon="solar:arrow-right-bold" className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > activeIndex ? 1 : -1);
                                setActiveIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? 'bg-[#C6934F] w-8'
                                    : 'bg-neutral-300 w-2 hover:bg-[#C6934F]/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;