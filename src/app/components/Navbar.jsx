'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRouteHome, setIsRouteHome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: session } = useSession();

  useEffect(() => {
    setIsRouteHome(window.location.pathname === '/home' || window.location.pathname === '/');
  }, []);

  const handleLogout = () => {
    signOut();
  };

  const navLinks = [
    { href: '/home', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/service', label: 'Services' },
    { href: '/FAQ', label: 'FAQ' },
    { href: '/contact', label: 'Contact' }
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
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}

            {session ? (
              <div className="relative">
                <HeadlessMenu>
                  <HeadlessMenu.Button className="flex items-center">
                    <Image
                      src="/assets/image/profile-icon.png"
                      alt="Profile Icon"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </HeadlessMenu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${
                                active ? 'bg-[#aa9270] text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Profile
                            </Link>
                          )}
                        </HeadlessMenu.Item>
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <Link
                              href="/dashboard"
                              className={`${
                                active ? 'bg-[#aa9270] text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Dashboard
                            </Link>
                          )}
                        </HeadlessMenu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-[#aa9270] text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Logout
                            </button>
                          )}
                        </HeadlessMenu.Item>
                      </div>
                    </HeadlessMenu.Items>
                  </Transition>
                </HeadlessMenu>
              </div>
            ) : (
              <a
                href="/auth/choose-login"
                className="px-6 py-2 border-2 border-[#aa9270] text-[#aa9270] rounded-full hover:bg-[#aa9270] hover:text-white transition duration-200"
              >
                Connexion
              </a>
            )}
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
                        'text-gray-800 hover:bg-gray-100 hover:text-[#aa9270]'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                  {session ? (
                    <>
                      <Link href="/profile" className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-[#aa9270] transition-all duration-200 rounded-lg">
                        Profile
                      </Link>
                      <Link href="/dashboard" className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-[#aa9270] transition-all duration-200 rounded-lg">
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-center border-2 border-[#aa9270] text-[#aa9270] px-4 py-3 hover:bg-[#aa9270] hover:text-white transition duration-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <a
                      href="/auth/choose-login"
                      className="text-center border-2 border-[#aa9270] text-[#aa9270] px-4 py-3 hover:bg-[#aa9270] hover:text-white transition duration-200"
                    >
                      Connexion
                    </a>
                  )}
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