'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const ServiceFilter = () => {
  const [priceFilters, setPriceFilters] = useState({
    Tout: true,
    '0-100': false,
    '100-200': false,
    '200-300': false,
    '300-400': false,
    '400-500': false,
  });

  const [categoryFilters, setCategoryFilters] = useState({
    Tout: true,
    beauté: false,
    bienêtre: false,
    coiffure: false,
  });

  const handlePriceFilterChange = (filter) => {
    setPriceFilters(prev => ({
      ...Object.fromEntries(Object.entries(prev).map(([key]) => [key, false])),
      [filter]: true
    }));
  };

  const handleCategoryFilterChange = (filter) => {
    setCategoryFilters(prev => ({
      ...Object.fromEntries(Object.entries(prev).map(([key]) => [key, false])),
      [filter]: true
    }));
  };

  const Checkbox = ({ checked, onChange, label }) => (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded transition-colors duration-300 ease-in-out ${
          checked ? 'bg-[#b57d56] border-[#b57d56]' : 'border-gray-300'
        }`}>
          {checked && (
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
      <span className={`ml-3 ${
        checked ? 'text-[#b57d56] font-semibold' : 'text-gray-700'
      } group-hover:text-[#b57d56] transition-colors duration-300`}>
        {label}
      </span>
    </label>
  );

  return (
    <div className="w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-xl mb-8 lg:mb-0 lg:mr-8 border border-[#C4AB9A]/20">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#b57d56] mb-4 flex items-center">
          Prix
        </h3>
        <div className="space-y-2">
          {Object.entries(priceFilters).map(([key, value]) => (
            <Checkbox
              key={key}
              checked={value}
              onChange={() => handlePriceFilterChange(key)}
              label={key === 'Tout' ? 'Tous les prix' : `MAD ${key.split('-').join(' - MAD ')}`}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#b57d56] mb-4 flex items-center">
          <Icon icon="mdi:category" className="mr-2 h-6 w-6" />
          Catégories
        </h3>
        <div className="space-y-2">
          {Object.entries(categoryFilters).map(([key, value]) => (
            <Checkbox
              key={key}
              checked={value}
              onChange={() => handleCategoryFilterChange(key)}
              label={key === 'Tout' ? 'Toutes les catégories' : key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFilter;