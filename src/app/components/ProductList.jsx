"use client";
import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const ProductList = ({ product }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 m-4 p-6 w-full">
      {/* Carousel Wrapper */}
      <div className="relative mb-4 min-h-72 overflow-hidden rounded-lg">
        {product.images.map((image, idx) => (
          <div key={idx} className={`hidden duration-1000 ease-in-out ${idx === 0 ? 'block' : ''}`} data-carousel-item={idx === 0 ? 'active' : ''}>
            <Image
              src={image}
              alt={`Product image ${idx + 1}`}
              layout="fill"
              objectFit="cover"
              className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>

      {/* Product Info */}
      <div>
        <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">{product.name}</a>
        <p className="mt-2 text-base font-normal text-gray-500">{product.description}</p>
      </div>

      {/* Price & Color Options */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <p className="text-2xl font-extrabold text-gray-900">{product.price}</p>
        <div className="flex items-center gap-2">
          {product.colors.map((color, idx) => (
            <label key={idx} className="relative flex items-center justify-center p-0.5 rounded-full focus:outline-none">
              <input type="radio" name="color-choice" value={color} className="sr-only" />
              <span className={`h-7 w-7 rounded-full border border-opacity-10 bg-${color.toLowerCase()}`}></span>
            </label>
          ))}
        </div>
      </div>

      {/* Wishlist & Buy Now Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="bg-[#aa9270] text-white py-2 px-4 rounded-lg hover:bg-[#8f8262] transition duration-300">Add to Wishlist</button>
        <button className="bg-[#b57d56] text-white py-2 px-4 rounded-lg hover:bg-[#a5673f] transition duration-300">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductList;
