'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { mockSearch } from '@/lib/mockApi';

const Hero = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handler to perform the search request
  const handleSearch = async () => {
    if (!searchTerm || !locationTerm) {
      setErrorMessage('Veuillez remplir les deux champs.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await mockSearch(searchTerm, locationTerm);

      if (result.data && result.data.length > 0) {
        // Handle the success response
        console.log('Search results:', result.data);
        // You can redirect to results page or display results
        // Example: router.push(`/search-results?service=${searchTerm}&location=${locationTerm}`);
      } else {
        setErrorMessage('Aucun service correspondant à votre recherche.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/image/tzeyni header bg.png"
          alt="Fond du Héros"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[90vh] flex flex-col justify-center">
        {/* Hero text */}
        <div className="max-w-3xl space-y-6 animate-fade-in-up mt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Tzeyni</span>
            <br />
            <span className="bg-gradient-to-r from-[#aa9270] to-[#d4bd9c] text-transparent bg-clip-text">
              Votre Évasion Beauté chez Vous !
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Découvrez Votre Coiffeur Parfait pour une Beauté Sans Effort à Domicile
          </p>

          {/* Search container */}
          <div className="mt-8 w-full max-w-3xl">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Service search */}
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du Service
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Réservez votre service..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#aa9270] focus:ring-[#aa9270] transition-all duration-300 pr-10"
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <Icon icon="icon-park-outline:search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                {/* Location search */}
                <div className={`relative transition-all duration-300 ${isLocationFocused ? 'scale-[1.02]' : ''}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localisation
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={locationTerm}
                      onChange={(e) => setLocationTerm(e.target.value)}
                      placeholder="Où..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#aa9270] focus:ring-[#aa9270] transition-all duration-300 pr-10"
                      onFocus={() => setIsLocationFocused(true)}
                      onBlur={() => setIsLocationFocused(false)}
                    />
                    <Icon icon="ph:map-pin-duotone" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="w-full md:w-auto mt-4 px-8 py-3 bg-[#aa9270] hover:bg-[#8e7a5d] text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>{loading ? 'Recherche en cours...' : 'Trouvez Votre Coiffeur'}</span>
                <Icon icon="typcn:arrow-right-outline" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Error message */}
              {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
            </div>
          </div>

          {/* Additional features */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-2 h-2 bg-[#aa9270] rounded-full" />
              <span>Coiffeurs Professionnels</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-2 h-2 bg-[#aa9270] rounded-full" />
              <span>Avis Vérifiés</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <div className="w-2 h-2 bg-[#aa9270] rounded-full" />
              <span>Réservation Sécurisée</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
