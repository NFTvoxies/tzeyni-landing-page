"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const featuresData = [
  {
    image: "/assets/image/téléchargement.jpg",
    title: "Balinese Massage",
    description:
      "Détente profonde, Amélioration de la circulation, Équilibre énergétique, Soulagement des douleurs musculaires",
  },
  {
    image: "/assets/image/images.jpg",
    title: "Waxing Full Body",
    description:
      "Épilation durable, Peau douce et lisse, Réduction des poils incarnés",
  },
  {
    image: "/assets/image/images (1).jpg",
    title: "Glow Peel",
    description: "Éclat instantané, Réduction des imperfections, Hydratation",
  },
  {
    image: "/assets/image/71qX8NpAHVL._AC_UF1000,1000_QL80_.jpg",
    title: "Keratin Hair Spa",
    description:
      "Lissage durable, Hydratation intense, Protection, Résultats instantanés",
  },
  {
    image: "/assets/image/6-manfaat-manicure-pedicure-bagi-kesehatan.jpg",
    title: "Menipedi",
    description:
      "Soins des ongles, Hydratation de la peau, Détente et relaxation, Élimination des callosités",
  },
];

const Features = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });

      setScrollPosition(scrollTo);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#ab9e85] to-[#998b73] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-lg font-medium text-white/80">Services</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Special Features
          </h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Tzeyni brings the salon experience to you, wherever you are. Say
            goodbye to the hassle of scheduling appointments and traveling to a
            salon.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={scrollPosition <= 0}
          >
            <Icon
              icon="octicon:chevron-left-12"
              className="w-6 h-6 text-[#ab9e85]"
            />
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuresData.map((feature, index) => (
              <div
                key={index}
                className="relative flex-none w-[300px] snap-start"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-[400px] bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                      {feature.description}
                    </p>

                    <button className="w-full bg-[#ab9e85] text-white py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#8a7d64] flex items-center justify-center space-x-2 group">
                      <span>Book Now</span>
                      <Icon
                        icon="solar:arrow-right-broken"
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon
              icon="octicon:chevron-right-12"
              className="w-6 h-6 text-[#ab9e85]"
            />
          </button>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center space-x-2 px-8 py-3 border-2 border-white text-white rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-[#ab9e85] group"
          >
            <span>View All Services</span>
            <Icon
              icon="raphael:arrowright"
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
