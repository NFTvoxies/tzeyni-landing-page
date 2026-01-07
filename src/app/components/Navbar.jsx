'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const Navbar = ({ userType }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRouteHome, setIsRouteHome] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  // Determine user type from session or prop
  const currentUserType = userType || session?.user?.role || 'client';
  const isProfessional = currentUserType === 'professional';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsRouteHome(pathname === '/home' || pathname === '/');
  }, [pathname]);

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  // Navigation links based on user type
  const publicNavLinks = [
    { href: '/home', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/browse', label: 'Services' },
    { href: '/Products', label: 'Produits' },
    { href: '/pricing', label: 'Abonnement' },
    { href: '/FAQ', label: 'FAQ' },
    { href: '/contact', label: 'Contact' }
  ];

  const clientNavLinks = [
    { href: '/home', label: 'Accueil' },
    { href: '/dashboard', label: 'Tableau de bord' },
    { href: '/browse', label: 'Professionnels' },
    { href: '/bookings', label: 'Mes réservations' },
    { href: '/contact', label: 'Contact' }
  ];

  const professionalNavLinks = [
    { href: '/pro/dashboard', label: 'Tableau de bord' },
    { href: '/pro/calendar', label: 'Calendrier' },
    { href: '/pro/bookings', label: 'Réservations' },
    { href: '/pro/services', label: 'Mes services' },
    { href: '/pro/earnings', label: 'Gains' }
  ];

  // Get appropriate links based on state
  const getNavLinks = () => {
    if (!session) return publicNavLinks;
    return isProfessional ? professionalNavLinks : clientNavLinks;
  };

  const navLinks = getNavLinks();

  // Profile menu items
  const clientMenuItems = [
    { href: '/profile', label: 'Mon profil', icon: 'solar:user-linear' },
    { href: '/dashboard', label: 'Tableau de bord', icon: 'solar:widget-linear' },
    { href: '/bookings', label: 'Mes réservations', icon: 'solar:calendar-linear' },
    { href: '/favorites', label: 'Mes favoris', icon: 'solar:heart-linear' },
    { href: '/settings', label: 'Paramètres', icon: 'solar:settings-linear' }
  ];

  const professionalMenuItems = [
    { href: '/pro/profile', label: 'Mon profil', icon: 'solar:user-linear' },
    { href: '/pro/dashboard', label: 'Tableau de bord', icon: 'solar:widget-linear' },
    { href: '/pro/services', label: 'Mes services', icon: 'solar:clipboard-list-linear' },
    { href: '/pro/calendar', label: 'Calendrier', icon: 'solar:calendar-linear' },
    { href: '/pro/earnings', label: 'Mes gains', icon: 'solar:wallet-linear' },
    { href: '/pro/settings', label: 'Paramètres', icon: 'solar:settings-linear' }
  ];

  const menuItems = isProfessional ? professionalMenuItems : clientMenuItems;

  // Navbar style - consistent light theme with amber accent
  const navbarBg = isRouteHome && !isScrolled && !isProfessional
    ? 'bg-transparent'
    : 'bg-white/60 backdrop-blur-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]';
  //bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100

  const textColor = isRouteHome && !isScrolled && !isProfessional
    ? 'text-white'
    : 'text-neutral-700';

  const activeColor = 'text-amber-600';

  return (
    <nav className={`fixed w-full z-navbar transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={isRouteHome && !isScrolled && !isProfessional
                ? "/assets/image/logo/tzeyni-new-logo.png"
                : "/assets/image/logo/tzeyni-new-logo.png"}
              alt="Tzeyni Logo"
              width={130}
              height={130}
              className="mt-4 cursor-pointer hover:opacity-80"
              onClick={() => router.push(isProfessional ? '/pro/dashboard' : '/home')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-amber-600 ${pathname === link.href
                  ? 'text-amber-600'
                  : isRouteHome && !isScrolled && !isProfessional
                    ? 'text-white'
                    : 'text-neutral-700'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {session ? (
              <div className="relative">
                <HeadlessMenu>
                  <HeadlessMenu.Button className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${isRouteHome && !isScrolled && !isProfessional
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}>
                    <Image
                      src={session.user?.avatar || "/assets/image/profile-icon.png"}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                    <span className={`text-sm hidden lg:block ${isRouteHome && !isScrolled && !isProfessional ? 'text-white' : 'text-neutral-700'
                      }`}>
                      {session.user?.name?.split(' ')[0]}
                    </span>
                    <Icon icon="solar:alt-arrow-down-linear" className={`w-4 h-4 ${isRouteHome && !isScrolled && !isProfessional ? 'text-white' : 'text-neutral-500'
                      }`} />
                  </HeadlessMenu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                      {/* User info header */}
                      <div className="px-4 py-3 bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                        {isProfessional && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-[#aa9270] text-white rounded-full">
                            Professionnel
                          </span>
                        )}
                      </div>

                      <div className="py-1">
                        {menuItems.map((item, index) => (
                          <HeadlessMenu.Item key={index}>
                            {({ active }) => (
                              <Link
                                href={item.href}
                                className={`${active ? 'bg-[#aa9270]/10 text-[#aa9270]' : 'text-gray-700'
                                  } group flex items-center gap-3 px-4 py-2 text-sm`}
                              >
                                <Icon icon={item.icon} className="w-4 h-4" />
                                {item.label}
                              </Link>
                            )}
                          </HeadlessMenu.Item>
                        ))}
                      </div>

                      <div className="py-1">
                        <HeadlessMenu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${active ? 'bg-red-50 text-red-600' : 'text-gray-700'
                                } group flex w-full items-center gap-3 px-4 py-2 text-sm`}
                            >
                              <Icon icon="solar:logout-2-linear" className="w-4 h-4" />
                              Déconnexion
                            </button>
                          )}
                        </HeadlessMenu.Item>
                      </div>
                    </HeadlessMenu.Items>
                  </Transition>
                </HeadlessMenu>
              </div>
            ) : (
              <Link
                href="/auth/choose-login"
                className="px-6 py-2 border-2 border-[#aa9270] text-[#aa9270] rounded-full hover:bg-[#aa9270] hover:text-white transition duration-200"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md text-white">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white transition-opacity">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Image
                      src="/assets/image/logo/tzeyni-new-logo.png"
                      alt="Tzeyni Logo"
                      width={100}
                      height={100}
                      className="w-auto h-12"
                    />
                  </SheetTitle>
                </SheetHeader>

                {/* User info in mobile */}
                {session && (
                  <div className="flex items-center gap-3 mt-6 p-4 bg-gray-50 rounded-xl">
                    <Image
                      src={session.user?.avatar || "/assets/image/profile-icon.png"}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">
                        {isProfessional ? 'Professionnel' : 'Client'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col space-y-2 mt-6">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={`px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${pathname === link.href
                        ? 'bg-[#aa9270]/10 text-[#aa9270]'
                        : 'text-gray-800 hover:bg-gray-100'
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {session ? (
                    <>
                      <hr className="my-2" />
                      {menuItems.slice(0, 3).map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg"
                        >
                          <Icon icon={item.icon} className="w-5 h-5 text-gray-500" />
                          {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 mt-4 text-center border-2 border-red-500 text-red-500 px-4 py-3 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
                      >
                        <Icon icon="solar:logout-2-linear" className="w-5 h-5" />
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/choose-login"
                      className="text-center border-2 border-[#aa9270] text-[#aa9270] px-4 py-3 rounded-lg hover:bg-[#aa9270] hover:text-white transition duration-200 mt-4"
                    >
                      Connexion
                    </Link>
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