'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: 'ri:facebook-fill', href: '#', color: '#1877f2', label: 'Facebook' },
    { icon: 'ri:twitter-x-fill', href: '#', color: '#000', label: 'Twitter' },
    { icon: 'ri:instagram-fill', href: '#', color: '#e4405f', label: 'Instagram' },
    { icon: 'ri:linkedin-fill', href: '#', color: '#0077b5', label: 'LinkedIn' },
  ];

  const navLinks = [
    { name: 'Accueil', href: '/home' },
    { name: 'Services', href: '/browse' },
    { name: 'Abonnement', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Conditions d\'utilisation', href: '#' },
    { name: 'Politique de confidentialité', href: '#' },
    { name: 'Mentions légales', href: '#' },
  ];

  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* Wave separator */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,0 C300,60 900,0 1200,40 L1200,0 L0,0 Z" fill="currentColor" className="text-[#F8F5F0]" />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C6934F]/3 rounded-full blur-[100px]" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-[#C6934F]/2 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Image
              src="/assets/image/WHITE_BACKGROUND-removebg-preview.png"
              alt="Tzeyni Logo"
              width={120}
              height={120}
              className="object-contain"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              La plateforme beauté #1 au Maroc. Des services professionnels à domicile, réservés en quelques clics.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-10 h-10 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ '--hover-color': social.color }}
                >
                  <Icon
                    icon={social.icon}
                    className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300"
                  />
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${social.color}20` }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/40 hover:text-[#E8C98A] transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-[#C6934F] group-hover:w-3 transition-all duration-300" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C6934F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon icon="solar:map-point-bold-duotone" className="w-4 h-4 text-[#C6934F]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Maroc, Casablanca</p>
                  <p className="text-white/30 text-xs">Boulevard Mohammed V</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C6934F]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:phone-bold-duotone" className="w-4 h-4 text-[#C6934F]" />
                </div>
                <p className="text-white/60 text-sm">+212 666 876 543</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C6934F]/10 flex items-center justify-center flex-shrink-0">
                  <Icon icon="solar:letter-bold-duotone" className="w-4 h-4 text-[#C6934F]" />
                </div>
                <a href="mailto:contact@tzeyni.com" className="text-white/60 text-sm hover:text-[#E8C98A] transition-colors">
                  contact@tzeyni.com
                </a>
              </div>
            </div>
          </div>

          {/* Legal & App */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Informations</h3>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/40 hover:text-[#E8C98A] transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-[#C6934F] group-hover:w-3 transition-all duration-300" />
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Download badges placeholder */}
            <div className="pt-2 space-y-3">
              <p className="text-white/30 text-xs">Bientôt disponible sur</p>
              <div className="flex gap-2">
                <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 cursor-default">
                  <Icon icon="ri:apple-fill" className="w-5 h-5 text-white/50" />
                  <div>
                    <p className="text-[10px] text-white/30 leading-none">App Store</p>
                    <p className="text-xs text-white/70 font-medium leading-tight">iOS</p>
                  </div>
                </div>
                <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 cursor-default">
                  <Icon icon="ri:google-play-fill" className="w-5 h-5 text-white/50" />
                  <div>
                    <p className="text-[10px] text-white/30 leading-none">Google Play</p>
                    <p className="text-xs text-white/70 font-medium leading-tight">Android</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Tzeyni. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <span>Fait avec</span>
            <Icon icon="solar:heart-bold" className="w-3 h-3 text-[#C6934F]" />
            <span>au Maroc</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
