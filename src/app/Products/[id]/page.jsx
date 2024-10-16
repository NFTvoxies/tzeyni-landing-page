"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Footer from '../../components/Footer';
import { Heart, ShoppingBag, Star } from 'lucide-react';

// This would typically come from an API or database, but for a static site, we'll keep it here
const products = [
  {
    id:1,
    name: "Apple iMac 27\"",
    description: "Apple M3 Octa Core, 27-inch Retina 5K display, RAM 8GB, SSD 256GB.",
    price: "$1,799",
    colors: ["Silver", "Space Gray"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-back.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side.svg",
    ],
  },
  {
    id:2,
    name: "Samsung Galaxy S21",
    description: "6.2-inch display, 128GB storage, triple camera setup, 4000mAh battery.",
    price: "$799",
    colors: ["Phantom Gray", "Phantom White", "Phantom Violet"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/samsung-s21-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/samsung-s21-back.svg",
    ],
  },
  {
    id:3,
    name: "Sony WH-1000XM4 Headphones",
    description: "Industry-leading noise cancellation, up to 30 hours of battery life, touch sensor controls.",
    price: "$348",
    colors: ["Black", "Silver"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/sony-headphones.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/sony-headphones-angle.svg",
    ],
  },
  {
    id:4,
    name: "Apple MacBook Pro 14\"",
    description: "Apple M1 Pro chip, 16GB RAM, 512GB SSD, Liquid Retina XDR display.",
    price: "$1,999",
    colors: ["Silver", "Space Gray"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-side.svg",
    ],
  },
  {
    id:5,
    name: "Nikon D5600 Camera",
    description: "24.2MP DSLR, Full HD video recording, 3.2-inch touchscreen, built-in Wi-Fi.",
    price: "$699",
    colors: ["Black"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/nikon-camera.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/nikon-camera-side.svg",
    ],
  },
  {
    id:6,
    name: "Fitbit Charge 5",
    description: "Fitness tracker with built-in GPS, heart rate monitor, sleep tracking.",
    price: "$179",
    colors: ["Black", "Lunar White", "Steel Blue"],
    images: [
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/fitbit-charge5-front.svg",
      "https://flowbite.s3.amazonaws.com/blocks/e-commerce/fitbit-charge5-back.svg",
    ],
  },
];

export default function ProductPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productId = parseInt(params.id);
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push('/404'); // Redirect to 404 page if product not found
    }
  }, [params.id, router]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-[#e1c7b3] via-[#FCF9F7] to-white min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      <span className="sr-only">
                        {product.name} image {index + 1}
                      </span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <Image src={image} alt="" className="w-full h-full object-center object-cover" layout="fill" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full aspect-w-1 aspect-h-1">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                  layout="fill"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">{product.price}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-gray-700">{product.description}</div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <h3 className="text-sm text-gray-600">Color:</h3>
                  <div className="ml-4 flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-8 w-8 rounded-full border border-black border-opacity-10 bg-${color.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex sm:flex-col1">
                <button
                  type="button"
                  className="max-w-xs flex-1 bg-[#b57d56] border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-[#a5673f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#b57d56] sm:w-full"
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}