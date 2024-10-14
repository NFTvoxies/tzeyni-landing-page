'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRouteHome, setIsRouteHome] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsRouteHome(window.location.pathname === '/home' || window.location.pathname === '/');
  }, []);

  const navLinks = [
    { href: '/home', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/service', label: 'Services' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
    { href: '/auth/login', label: 'Connexion' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isRouteHome ? 'bg-transparent' : 'bg-black/75 backdrop-blur-sm shadow-md' 
    } ${isScrolled ? 'bg-black/75 backdrop-blur-sm shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image 
              src="/assets/image/WHITE_BACKGROUND-removebg-preview.png" 
              alt="Tzeyni Logo" 
              width={70} 
              height={70}
              className="w-auto h-12"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#aa9270] ${
                  index === navLinks.length - 1
                    ? 'px-6 py-2 border-2 border-[#aa9270] text-[#aa9270] rounded-full hover:bg-[#aa9270] hover:text-white'
                    : isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-md ${
                    isScrolled ? 'text-white' : 'text-white'
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white transition-opacity">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Image 
                      src="/assets/image/WHITE_BACKGROUND-removebg-preview.png" 
                      alt="Tzeyni Logo" 
                      width={80} 
                      height={80}
                      className="w-auto h-12"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={`px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                        index === navLinks.length - 1
                          ? 'text-center border-2 border-[#aa9270] text-[#aa9270] hover:bg-[#aa9270] hover:text-white'
                          : 'text-gray-800 hover:bg-gray-100 hover:text-[#aa9270]'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;