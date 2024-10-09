'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const testimonials = [
    {
        id: 1,
        image: '/assets/image/testimonial1.jpeg',
        name: 'Sarah Johnson',
        pronoun: 'She/Her',
        location: 'Morocco, Casablanca',
        title: 'Tzeyni transformed my entire look',
        text: 'Absolutely thrilled with my experience at Tzeyni! The attention to detail and personalized care I received was exceptional. My stylist took the time to understand exactly what I wanted and delivered beyond my expectations. The atmosphere was luxurious and welcoming.',
        rating: 5,
        date: '2 weeks ago',
        serviceType: 'Hair Styling & Coloring'
    },
    {
        id: 2,
        image: '/assets/image/testimonial2.png',
        name: 'Michael Chen',
        pronoun: 'He/Him',
        location: 'Morocco, Rabat',
        title: 'Professional service that exceeds expectations',
        text:"The level of expertise at Tzeyni is unmatched. I've been to many salons, but none compare to the quality and professionalism I experienced here. The stylist's knowledge and technique were impressive, and the results speak for themselves.",
        rating: 4,
        date: '1 month ago',
        serviceType: 'Premium Haircut'
    },
    {
        id: 3,
        image: '/assets/image/testimonial3.png',
        name: 'Emma Martinez',
        pronoun: 'She/Her',
        location: 'Morocco, Marrakech',
        title: 'A truly luxurious experience',
        text: "From booking to the final result, everything was perfect. The stylist was not only skilled but also made great conversation and gave excellent advice for maintaining my new style. The salon's attention to detail is remarkable.",
        rating: 5,
        date: '3 weeks ago',
        serviceType: 'Full Beauty Treatment'
    }
];

const Testimonial = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <section className="bg-[#decbb7] py-20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L2c+PC9zdmc+')] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#6e563a] mb-6">
                        Client Testimonials
                        <br />
                        <span className="text-[#c2a33c]">What Our Customers Say</span>
                    </h2>
                    <p className="text-[#6e563a]/80 max-w-2xl mx-auto">
                        Real stories from our valued clients about their transformative experiences with us.
                    </p>
                </div>

                {/* Testimonial Card */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="relative bg-[#1f1f1f] rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                {/* Profile Section */}
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="relative w-32 h-32">
                                        <Image
                                            src={testimonials[activeIndex].image}
                                            alt={testimonials[activeIndex].name}
                                            fill
                                            className="rounded-full object-cover border-4 border-white"
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-[#e7d1b4] rounded-full p-2">
                                            <Icon icon="solar:verified-check-bold" className="w-6 h-6 text-[#1f1f1f]" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-white font-bold text-xl">{testimonials[activeIndex].name}</h3>
                                        <p className="text-[#e7d1b4] text-sm">{testimonials[activeIndex].pronoun}</p>
                                        <p className="text-gray-400 text-sm">{testimonials[activeIndex].location}</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                            <Icon key={i} icon="solar:star-bold" className="w-5 h-5 text-[#e7d1b4]" />
                                        ))}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 space-y-6">
                                    <div className="relative">
                                        <Icon 
                                            icon="solar:quote-up-square-bold" 
                                            className="absolute -top-4 -left-4 w-8 h-8 text-[#e7d1b4] opacity-50"
                                        />
                                        <h4 className="text-[#e7d1b4] text-2xl font-bold mb-4">
                                            {testimonials[activeIndex].title}
                                        </h4>
                                        <p className="text-gray-300 leading-relaxed">
                                            {testimonials[activeIndex].text}
                                        </p>
                                        <Icon 
                                            icon="solar:quote-down-square-bold" 
                                            className="absolute -bottom-4 -right-4 w-8 h-8 text-[#e7d1b4] opacity-50"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <span>{testimonials[activeIndex].serviceType}</span>
                                        <span>{testimonials[activeIndex].date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                        <button
                            onClick={handlePrev}
                            className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:bg-white/20"
                        >
                            <Icon icon="solar:arrow-left-bold" className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:bg-white/20"
                        >
                            <Icon icon="solar:arrow-right-bold" className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex justify-center space-x-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === activeIndex ? 'bg-[#c2a33c] w-6' : 'bg-[#6e563a]/30'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;