"use client";
import React, { useState } from 'react';

const ProductFilter = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleDropdown = (filter) => () => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const FunnelIcon = () => (
    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const FilterButton = ({ onClick, children, isActive }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full rounded-t-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-[#b57d56] text-white'
          : 'bg-white text-gray-800 hover:bg-[#b57d56] hover:text-white'
      }`}
    >
      <span className="flex items-center">
        <FunnelIcon />
        {children}
      </span>
      <ChevronDownIcon />
    </button>
  );

  const FilterContent = ({ children, isActive }) => (
    <div className={`${isActive ? 'block' : 'hidden'} w-full bg-white p-4 rounded-b-lg shadow-md`}>
      {children}
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-r from-[#FCF9F7] to-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Filter Products</h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md">
          <FilterButton onClick={toggleDropdown('brand')} isActive={activeFilter === 'brand'}>
            With Brands
          </FilterButton>
          <FilterContent isActive={activeFilter === 'brand'}>
            <p className="text-gray-800">Brand options go here</p>
          </FilterContent>
        </div>

        <div className="flex-1 min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md">
          <FilterButton onClick={toggleDropdown('price')} isActive={activeFilter === 'price'}>
            With Price
          </FilterButton>
          <FilterContent isActive={activeFilter === 'price'}>
            <p className="text-gray-800">Price range options go here</p>
          </FilterContent>
        </div>

        <div className="flex-1 min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md">
          <FilterButton onClick={toggleDropdown('rating')} isActive={activeFilter === 'rating'}>
            With Rating
          </FilterButton>
          <FilterContent isActive={activeFilter === 'rating'}>
            <p className="text-gray-800">Rating options go here</p>
          </FilterContent>
        </div>

        <div className="flex-1 min-w-[200px] bg-white rounded-lg overflow-hidden shadow-md">
          <FilterButton onClick={toggleDropdown('shipping')} isActive={activeFilter === 'shipping'}>
            With Shipping
          </FilterButton>
          <FilterContent isActive={activeFilter === 'shipping'}>
            <p className="text-gray-800">Shipping options go here</p>
          </FilterContent>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
