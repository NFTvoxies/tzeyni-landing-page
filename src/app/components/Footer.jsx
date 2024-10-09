'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const socialLinks = [
    { icon: 'fa-brands:facebook-f', href: '#', color: '#1877f2' },
    { icon: 'fa-brands:twitter', href: '#', color: '#1da1f2' },
    { icon: 'fa-brands:instagram', href: '#', color: '#e4405f' },
    { icon: 'fa-brands:linkedin-in', href: '#', color: '#0077b5' }
  ];

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Services', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="relative bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-10">
          {/* Logo Section */}
          <div className="space-y-6">
            <Image 
              src="/assets/image/WHITE_BACKGROUND-removebg-preview.png" 
              alt="Logo" 
              width={100} 
              height={100}
              className="object-contain"
            />
            <div>
              <h3 className="text-lg font-bold text-white">Beauty & More</h3>
              <p>Invest in your body!</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Icon icon="hugeicons:location-03" className="w-5 h-5 text-[#c2a33c]" />
                <p>Morocco, Casablanca</p>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="el:phone-alt" className="w-5 h-5 text-[#c2a33c]" />
                <p>0666876543</p>
              </div>
              <div className="flex items-center space-x-3">
                <Icon icon="ic:round-mail" className="w-5 h-5 text-[#c2a33c]" />
                <a href="mailto:Tzeyni@contact.com" className="hover:text-[#c2a33c]">Tzeyni@contact.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-[#c2a33c] transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="group relative"
                  onMouseEnter={() => setHoveredIcon(social.icon)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${hoveredIcon === social.icon ? 'bg-white scale-110' : 'bg-gray-700 hover:bg-gray-600'}`}>
                    <Icon 
                      icon={social.icon} 
                      className={`w-5 h-5 ${hoveredIcon === social.icon ? `text-[${social.color}]` : 'text-gray-400'}`}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Tzeyni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
