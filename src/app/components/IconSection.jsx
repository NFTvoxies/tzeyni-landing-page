'use client'

import { Icon } from "@iconify/react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

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
      icon: "mage:gem-stone",
      title: "Quality Product",
      description: "Premium beauty services and products",
      gradient: "from-[#AA9270] to-[#AA9270]",
    },
    {
      icon: "bx:bxs-badge-check",
      title: "Personal Certificate",
      description: "Certified professional stylists",
      gradient: "from-[#AA9270] to-[#AA9270]",
    },
    {
      icon: "bx:bxs-award",
      title: "Best Reviews",
      description: "Highest rated in the country",
      gradient: "from-[#AA9270] to-[#AA9270]",
    },
  ];

  return (
    <section className="relative bg-gradient-to-r from-zinc-900 via-zinc-950 to-stone-950 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSJjdXJyZW50Q29sb3IiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/20"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon Container */}
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} transform transition-transform duration-300 group-hover:scale-110 shadow-lg`}
                >
                  <Icon icon={feature.icon} className="w-8 h-8 text-white" />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 text-sm group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white/90">
          {[
            { label: "Happy Clients", value: 1000, suffix: "+" },
            { label: "Expert Stylists", value: 50, suffix: "+" },
            { label: "Services", value: 100, suffix: "+" },
            { label: "Years Experience", value: 5, suffix: "+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold">
                <MotionCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IconSection;
