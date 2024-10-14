import Head from "next/head";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import ProductFilter from "../components/ProductFilter";
import Footer from "../components/Footer";

const products = [
  {
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

export default function Products() {
  return (
    <>
      <Head>
        <title>TZEYNI | Products</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <Navbar />
      <main className="relative bg-gradient-to-b from-[#e1c7b3] via-[#FCF9F7] to-white min-h-screen pt-20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#b57d56]/10" />
          <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-[#C4AB9A]/10" />
          <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-[#b57d56]/5" />
        </div>
        <div className="absolute inset-0 bg-[url('/assets/image/pattern.png')] opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Nos Produits</h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#b57d56] to-[#C4AB9A] mx-auto mb-8 rounded-full"></div>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 font-semibold leading-relaxed">
              Découvrez notre sélection de produits de beauté et de bien-être
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <ProductFilter />
          </div>
          {/* Render ProductList, using Flexbox for layout */}
          <div className="flex flex-wrap mt-5">
            {products.map((product, index) => (
              <div className="w-full sm:w-1/2 lg:w-1/3 p-2" key={index}>
                <ProductList product={product} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
