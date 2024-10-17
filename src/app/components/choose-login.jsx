'use client'
import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ChooseLoginType = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1c7b3] via-[#FCF9F7] to-[#C4AB9A] flex items-center justify-center relative">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/assets/image/pattern.png')] opacity-5"></div>
      <div className="relative max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Choisissez Votre Type de Connexion
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Connectez-vous en tant que client ou professionnel pour accéder à votre compte.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <LoginCard
            title="Client Login"
            icon={<Icon icon="solar:user-broken" className="text-6xl mb-4 text-[#d2966c]" />}
            description="Accédez à votre compte personnel pour gérer vos rendez-vous et vos informations."
            linkHref="/auth/login/client"
          />
          <LoginCard
            title="Professional Login"
            icon={<Icon icon="map:beauty-salon" className="text-6xl mb-4 text-[#d2966c]" />}
            description="Connectez-vous à votre tableau de bord professionnel et gérez votre activité."
            linkHref="/auth/login/professional"
          />
        </div>
      </div>
    </div>
  );
};

const LoginCard = ({ title, icon, description, linkHref }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center justify-between h-full border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      {icon}
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        href={linkHref}
        className="bg-gradient-to-r from-[#b57d56] to-[#C4AB9A] text-white font-bold py-2 px-6 rounded-full hover:opacity-90 transition duration-300 shadow-md"
      >
        Connexion
      </Link>
    </motion.div>
  );
};

export default ChooseLoginType;
