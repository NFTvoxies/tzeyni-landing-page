// src/app/service/[id]/page.jsx
"use client";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Image from "next/image";
import BookingSection from "@/app/components/BookingSection";
import Navbar from "@/app/components/Navbar";

const services = [
  {
    id: 1,
    title: "Service de Coiffure",
    description:
      "Obtenez une coiffure professionnelle qui correspond parfaitement à vos goûts et à votre style. Nos coiffeurs experts utilisent des techniques modernes pour créer la coupe ou la coiffure idéale, que ce soit pour une occasion spéciale ou un rafraîchissement quotidien.",
    price: 150.0,
    image: "/assets/image/coiffure.png",
  },
  {
    id: 2,
    title: "Massage Relaxant",
    description:
      "Profitez d'un moment de détente absolue avec notre massage relaxant. Ce service utilise des techniques de relaxation pour apaiser vos muscles, libérer les tensions et réduire le stress. Idéal pour recharger votre énergie et vous offrir un moment de bien-être.",
    price: 200.0,
    image: "/assets/image/massage.png",
  },
  {
    id: 3,
    title: "Service de Maquillage",
    description:
      "Sublimez votre beauté naturelle avec un maquillage personnalisé pour toutes vos occasions. Que ce soit pour une soirée, un mariage ou un shooting photo, nos maquilleurs utilisent des produits haut de gamme pour vous offrir un look impeccable.",
    price: 100.0,
    image: "/assets/image/maquillage.png",
  },
  {
    id: 4,
    title: "Service de Manucure",
    description:
      "Prenez soin de vos ongles avec notre service de manucure complet. Nous offrons des soins des ongles, des cuticules et une application de vernis qui met en valeur la beauté naturelle de vos mains.",
    price: 50.0,
    image: "/assets/image/manucure.png",
  },
  {
    id: 5,
    title: "Service de Pédicure",
    description:
      "Offrez à vos pieds le soin qu'ils méritent avec une pédicure relaxante. Nous nettoyons, exfolions et hydratons vos pieds tout en donnant une forme parfaite à vos ongles pour un aspect impeccable.",
    price: 50.0,
    image: "/assets/image/pedicure.png",
  },
  {
    id: 6,
    title: "Service de Soin du Visage",
    description:
      "Redonnez de l'éclat à votre peau avec nos soins du visage adaptés à tous les types de peau. Nettoyage en profondeur, exfoliation et hydratation intense pour un teint lumineux et une peau saine.",
    price: 100.0,
    image: "/assets/image/soin-visage.png",
  },
  {
    id: 7,
    title: "Service de Soin du Corps",
    description:
      "Chouchoutez votre corps avec nos soins spécialisés qui revitalisent votre peau tout en vous procurant une sensation de bien-être général. Parfait pour adoucir, tonifier et hydrater votre peau.",
    price: 150.0,
    image: "/assets/image/soin-corps.png",
  },
  {
    id: 8,
    title: "Service de Soin des Cheveux",
    description:
      "Renforcez et nourrissez vos cheveux avec notre service de soin capillaire. Nos experts utilisent des produits de haute qualité pour revitaliser vos cheveux, qu'ils soient secs, abîmés ou en manque d'éclat.",
    price: 150.0,
    image: "/assets/image/soin-cheveux.png",
  },
];

export default function ServiceDetails({ params }) {
  const [service, setService] = useState(null);

  useEffect(() => {
    const serviceId = parseInt(params.id);
    const foundService = services.find(s => s.id === serviceId);
    setService(foundService);
  }, [params.id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="relative bg-gradient-to-b from-[#e1c7b3] via-[#FCF9F7] to-white min-h-screen pt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex gap-8">
            <div className="md:w-1/2">
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-[300px]"
              />
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{service.description}</p>
              <p className="text-2xl font-bold text-[#aa9270] mb-8">MAD {service.price.toFixed(2)}</p>

              {/* Additional Information Section */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Bénéfices</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Améliorez votre bien-être physique et mental.</li>
                  <li>Utilisation de produits de haute qualité.</li>
                  <li>Personnalisable selon vos besoins spécifiques.</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md mt-6 mb-3">
                <h3 className="text-lg font-semibold text-gray-700">Durée du Service</h3>
                <p className="text-gray-600">Environ 60-90 minutes, selon le traitement choisi.</p>
              </div>

              <BookingSection service={service} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

