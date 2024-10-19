// src/app/components/ContactHero.jsx
'use client'
import Image from 'next/image';

const ContactHero = () => {
  return (
    <div className="relative min-h-[60vh] w-full pt-60">  {/* Added pt-40 for top padding */}
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/image/tzeyni header bg.png"
          alt="Contact Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60vh] flex flex-col">
        {/* Hero Text */}
        <div className="max-w-3xl space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Contact</span>
            <br />
            <span className="bg-gradient-to-r from-[#aa9270] to-[#d4bd9c] text-transparent bg-clip-text">
              TZEYNI
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl ">
          Nous sommes là pour vous aider. N'hésitez pas à nous contacter si vous avez des questions, des préoccupations ou des commentaires.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;