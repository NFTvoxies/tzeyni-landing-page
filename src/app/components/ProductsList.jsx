"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductList = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log("hello")
    console.table(product)
    router.push(`/Products/${product.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 m-4 p-6 w-full">
      {/* Carousel Wrapper */}
      <div className="relative mb-4 min-h-72 overflow-hidden rounded-lg">
        {product.images.map((image, idx) => (
          <div key={idx} className={`hidden duration-1000 ease-in-out ${idx === 0 ? 'block' : ''}`} data-carousel-item={idx === 0 ? 'active' : ''}>
            <Image
              src={image}
              alt={`Product image ${idx + 1}`}
              fill
              className="object-cover absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>

      {/* Product Info */}
      <div>
        <h2 className="text-lg font-semibold leading-tight text-gray-900 hover:underline">{product.name}</h2>
        <p className="mt-2 text-base font-normal text-gray-500">{product.description}</p>
      </div>

      {/* Price & Color Options */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <p className="text-2xl font-extrabold text-gray-900">{product.price}</p>
        <div className="flex items-center gap-2">
          {product.colors.map((color, idx) => (
            <span key={idx} className={`h-7 w-7 rounded-full border border-opacity-10 bg-${color.toLowerCase()}`}></span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="bg-[#aa9270] text-white py-2 px-4 rounded-lg hover:bg-[#8f8262] transition duration-300">Add to Wishlist</button>
        <button className="bg-[#b57d56] text-white py-2 px-4 rounded-lg hover:bg-[#a5673f] transition duration-300">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductList;