"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProfessionals } from "@/lib/mockData";


// Mock favorites data
const initialFavorites = [
    {
        id: 1,
        name: "Sarah Martinez",
        specialty: "Coiffure & Coloration",
        rating: 4.9,
        reviews: 127,
        price: "À partir de 150 MAD",
        location: "Casablanca, Maarif",
        image: "/assets/image/professionals/hairstylist.jpg",
    },
    {
        id: 2,
        name: "Emily Chen",
        specialty: "Nail Art & Manucure",
        rating: 4.8,
        reviews: 95,
        price: "À partir de 100 MAD",
        location: "Casablanca, Racine",
        image: "/assets/image/professionals/nail-tech.jpg",
    },
    {
        id: 3,
        name: "Jessica Williams",
        specialty: "Maquillage & Mariée",
        rating: 5.0,
        reviews: 156,
        price: "À partir de 200 MAD",
        location: "Casablanca, Anfa",
        image: "/assets/image/professionals/makeup-artist.jpg",
    },
    {
        id: 4,
        name: "Dr. Lisa Anderson",
        specialty: "Soins de la peau",
        rating: 4.7,
        reviews: 82,
        price: "À partir de 180 MAD",
        location: "Casablanca, Gauthier",
        image: "/assets/image/professionals/skincare.jpg",
    },
];

// Star Rating Component
const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
            <Icon
                key={i}
                icon="solar:star-bold"
                className={`w-4 h-4 ${i < Math.floor(rating)
                    ? "text-[#C6934F]"
                    : "text-neutral-200"
                    }`}
            />
        ))}
    </div>
);

// Professional Card Component
const ProfessionalCard = ({ professional, onRemove }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                className="border-neutral-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section */}
                <div className="relative h-48 bg-neutral-100 overflow-hidden">
                    <Image
                        src={professional.image || "/assets/image/default-avatar.png"}
                        alt={professional.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                    {/* Heart Button */}
                    <button
                        onClick={() => onRemove(professional.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm group"
                    >
                        <Icon
                            icon="solar:heart-bold"
                            className="w-5 h-5 text-[#C6934F] group-hover:text-red-500 transition-colors"
                        />
                    </button>
                </div>

                {/* Content Section */}
                <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="mb-3">
                        <h3 className="font-semibold text-xl text-neutral-900 mb-1">
                            {professional.name}
                        </h3>
                        <Badge
                            variant="secondary"
                            className="bg-[#FFF4E6] text-[#8B5E34] hover:bg-[#FFE5CC] border-none font-medium"
                        >
                            {professional.specialty}
                        </Badge>
                    </div>

                    <div className="space-y-2 mb-4 flex-1">
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <StarRating rating={professional.rating} />
                            <span className="text-sm font-medium text-neutral-900">
                                {professional.rating}
                            </span>
                            <span className="text-xs text-neutral-500">
                                ({professional.reviews} avis)
                            </span>
                        </div>

                        {/* Location */}
                        <p className="flex items-center gap-2 text-sm text-neutral-500">
                            <Icon icon="solar:map-point-linear" className="w-4 h-4" />
                            {professional.location}
                        </p>

                        {/* Price */}
                        <p className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                            <Icon icon="solar:tag-price-linear" className="w-4 h-4 text-[#C6934F]" />
                            {professional.price}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-neutral-200 hover:border-[#C6934F] hover:text-[#C6934F] hover:bg-[#FFF4E6]"
                        >
                            <Icon icon="solar:chat-round-linear" className="w-4 h-4 mr-2" />
                            Message
                        </Button>
                        <Link href={`/professional/pro-00${professional.id}`} className="flex-1">
                            <Button
                                size="sm"
                                className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white border-none"
                            >
                                Réserver
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Empty State Component
const EmptyState = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
    >
        <Card className="border-neutral-100">
            <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-[#FFF4E6] flex items-center justify-center mx-auto mb-4">
                    <Icon icon="solar:heart-linear" className="w-10 h-10 text-[#C6934F]" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-neutral-900">
                    Aucun favori pour le moment
                </h2>
                <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                    Commencez à ajouter vos professionnels préférés pour y accéder rapidement plus tard
                </p>
                <Link href="/browse">
                    <Button className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                        Découvrir des professionnels
                    </Button>
                </Link>
            </CardContent>
        </Card>
    </motion.div>
);

export default function ClientFavorites() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState(initialFavorites);

    const handleRemoveFavorite = (id) => {
        if (confirm("Voulez-vous retirer ce professionnel de vos favoris ?")) {
            setFavorites(favorites.filter((fav) => fav.id !== id));
        }
    };

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                        Mes favoris
                    </h1>
                    <p className="text-neutral-500">
                        {favorites.length} {favorites.length === 1 ? "professionnel enregistré" : "professionnels enregistrés"}
                    </p>
                </motion.div>

                {/* Favorites Grid */}
                {favorites.length > 0 ? (
                    <motion.div
                        layout
                        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {favorites.map((professional, index) => (
                                <motion.div
                                    key={professional.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ProfessionalCard
                                        professional={professional}
                                        onRemove={handleRemoveFavorite}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </main>
    );
}
