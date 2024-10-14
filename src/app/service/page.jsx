// src/app/services/page.jsx
import Head from "next/head";
import Navbar from "../components/Navbar";
import ServicesList from "../components/ServicesList";
import ServiceFilter from "../components/ServiceFilter";
import Footer from "../components/Footer";

export default function Services() {
  return (
    <>
      <Head>
        <title>TZEYNI | Services</title>
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
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Nos Services</h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#b57d56] to-[#C4AB9A] mx-auto mb-8 rounded-full"></div>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 font-semibold leading-relaxed">
              Découvrez notre large gamme de services de beauté et de bien-être
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <ServiceFilter />
            <ServicesList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}