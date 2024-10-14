"use client";
import { useState } from "react";
import Image from "next/image";

const AboutHero = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#e1c7b3] via-[#FCF9F7] to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#b57d56]/10" />
        <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-[#C4AB9A]/10" />
        <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-[#b57d56]/5" />
      </div>

      {/* Header Section with enhanced styling */}
      <div className="relative">
        <div className="text-center py-24 px-4 sm:px-6 lg:px-8">
          <div className="relative inline-block">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              À propos de Tzeyni
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#b57d56] to-[#C4AB9A] mx-auto mb-8 rounded-full"></div>
          </div>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 font-semibold leading-relaxed">
            Le projet Tzeyni vise à révolutionner le secteur de la coiffure et
            de la beauté en créant une plateforme numérique innovante
          </p>
        </div>
      </div>

      {/* Features Grid with enhanced cards */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="h-16 w-16 mx-auto mb-6 bg-[#b57d56]/10 rounded-full p-3 group-hover:bg-[#b57d56]/20 transition-colors duration-300">
              <Image
                src="/assets/image/fidelity-icon.png"
                alt="Fidélité"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#b57d56] mb-4 text-center group-hover:text-[#915f3f] transition-colors duration-300">
              ACCÉDEZ FACILEMENT À VOTRE ESPACE FIDÉLITÉ
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              L'application vous permet d'accéder facilement à votre espace
              fidélité, où vous retrouverez votre solde de points et toutes les
              offres dont vous bénéficiez.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="h-16 w-16 mx-auto mb-6 bg-[#C4AB9A]/10 rounded-full p-3 group-hover:bg-[#C4AB9A]/20 transition-colors duration-300">
              <Image
                src="/assets/image/appointment-icon.png"
                alt="Rendez-vous beauté"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#b57d56] mb-4 text-center group-hover:text-[#915f3f] transition-colors duration-300">
              VOS RENDEZ-VOUS BEAUTÉ OÙ VOUS VOULEZ
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Réservez votre rendez-vous chez le coiffeur, votre épilation ou
              votre manucure en quelques clics grâce à notre plateforme
              innovante.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="h-16 w-16 mx-auto mb-6 bg-[#b57d56]/10 rounded-full p-3 group-hover:bg-[#b57d56]/20 transition-colors duration-300">
              <Image
                src="/assets/image/mobile-icon.png"
                alt="Application mobile"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-[#b57d56] mb-4 text-center group-hover:text-[#915f3f] transition-colors duration-300">
              POURQUOI VOUS ALLEZ AIMER L'APPLICATION
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              En quelques clics et grâce à la géolocalisation, réservez votre
              rendez-vous en ligne dans le salon de coiffure ou l'institut de
              beauté qui vous convient.
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Section with enhanced styling */}
      <div className="relative bg-gradient-to-br from-[#C4AB9A] to-[#b57d56] py-24">
        <div className="absolute inset-0 bg-[url('/assets/image/pattern.png')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-lg"></div>
                <Image
                  src="/assets/image/contact-peyrefitte-esthetique.png"
                  alt="Réservation en ligne"
                  width={500}
                  height={400}
                  className="relative rounded-xl shadow-2xl"
                />
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-white mb-6">
                Réservez à tout moment votre RDV coiffure
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Profitez du savoir-faire et de l'expertise des salons et des
                services de coiffeuse à domicile! Où que vous soyez, 24h/24,
                7j/7, réservez votre RDV coiffure ou esthétique et gérez votre
                <span className="font-semibold"> COMPTE FIDÉLITÉ</span>.
              </p>
              <button className="mt-8 px-8 py-3 bg-white text-[#b57d56] rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl">
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
