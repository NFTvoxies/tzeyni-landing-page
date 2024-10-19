// src/app/components/ServicesList.jsx
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: "Service de Coiffure",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 150.00,
    image: "/assets/image/coiffure.png"
  },
  {
    id: 2,
    title: "Massage Relaxant",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 200.00,
    image: "/assets/image/massage.png"
  },
    {
    id: 3,
    title: "Service de Maquillage",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 100.00,
    image: "/assets/image/maquillage.png"
    },
    {
    id: 4,
    title: "Service de Manucure",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 50.00,
    image: "/assets/image/manucure.png"
    },
    {
    id: 5,
    title: "Service de Pédicure",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 50.00,
    image: "/assets/image/pedicure.png"
    },
    {
    id: 6,
    title: "Service de Soin du Visage",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 100.00,
    image: "/assets/image/soin-visage.png"
    },
    {
    id: 7,
    title: "Service de Soin du Corps",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 150.00,
    image: "/assets/image/soin-corps.png"
    },
    {
    id: 8,
    title: "Service de Soin des Cheveux",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 150.00,
    image: "/assets/image/soin-cheveux.png"
    }
  // Add more services here...
];

const ServicesList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-3/4">
      {services.map((service) => (
        <Link href={`/service/${service.id}`} key={service.id}>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative h-48">
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#aa9270]">MAD {service.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ServicesList;