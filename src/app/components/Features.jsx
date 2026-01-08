"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const featuresData = [
  {
    image: "/assets/image/téléchargement.jpg",
    title: "Balinese Massage",
    description: "Détente profonde, Amélioration de la circulation, Équilibre énergétique",
  },
  {
    image: "/assets/image/images.jpg",
    title: "Waxing Full Body",
    description: "Épilation durable, Peau douce et lisse, Réduction des poils incarnés",
  },
  {
    image: "/assets/image/images (1).jpg",
    title: "Glow Peel",
    description: "Éclat instantané, Réduction des imperfections, Hydratation",
  },
  {
    image: "/assets/image/71qX8NpAHVL._AC_UF1000,1000_QL80_.jpg",
    title: "Keratin Hair Spa",
    description: "Lissage durable, Hydratation intense, Protection",
  },
  {
    image: "/assets/image/6-manfaat-manicure-pedicure-bagi-kesehatan.jpg",
    title: "Menipedi",
    description: "Soins des ongles, Hydratation de la peau, Détente et relaxation",
  },
];

const Features = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

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
    <section className="relative bg-[#FAF8F5] py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#C6934F]/10 blur-3xl" />
        <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-[#B8854A]/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-[#C6934F]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="mx-auto bg-[#C6934F] hover:bg-[#C6934F] text-white mb-4">
            Services Premium
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
            Caractéristiques Spéciales
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 text-lg">
            Tzeyni apporte l'expérience du salon à vous, où que vous soyez. Dites
            adieu aux tracas de la prise de rendez-vous et des déplacements vers un salon.
          </p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          {/* Left Navigation Button */}
          <motion.button
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon icon="solar:alt-arrow-left-bold" className="w-6 h-6 text-[#C6934F]" />
          </motion.button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-[280px] snap-start"
              >
                <Card className="group h-full bg-white/70 backdrop-blur-sm border-neutral-200 hover:border-[#C6934F]/50 transition-all duration-300 hover:shadow-xl">
                  {/* Compact Image - Smaller height */}
                  <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>

                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-lg font-bold text-neutral-900 group-hover:text-[#C6934F] transition-colors line-clamp-1">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <CardDescription className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="pt-0 pb-4">
                    <Button
                      className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white shadow-sm hover:shadow-md transition-all duration-300 group/btn h-9 text-sm"
                    >
                      <span>Réserver</span>
                      <Icon
                        icon="solar:arrow-right-linear"
                        className="ml-1 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <motion.button
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <Icon icon="solar:alt-arrow-right-bold" className="w-6 h-6 text-[#C6934F]" />
          </motion.button>
        </div>

        {/* View All Services Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a href="/service">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#C6934F] text-[#C6934F] hover:bg-[#C6934F] hover:text-white transition-all duration-300 px-8 group"
            >
              <span className="font-semibold">Voir Tous les Services</span>
              <Icon
                icon="solar:arrow-right-linear"
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
