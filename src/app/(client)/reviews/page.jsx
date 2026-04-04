"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock reviews data
const initialReviews = [
    {
        id: 1,
        professional: "Sarah Martinez",
        service: "Coiffure & Coloration",
        date: "2024-12-20",
        rating: 5,
        title: "Absolument parfait !",
        comment:
            "Sarah a fait un travail incroyable avec mes cheveux. La couleur est encore mieux que ce que j'espérais, et elle était très professionnelle et sympathique tout au long du rendez-vous.",
        helpful: 24,
        professionalImage: "/assets/image/professionals/hairstylist.jpg",
    },
    {
        id: 2,
        professional: "Emily Chen",
        service: "Manucure & Nail Art",
        date: "2024-12-10",
        rating: 4,
        title: "Excellent service",
        comment:
            "Emily était très compétente et attentive. Le seul bémol est que le rendez-vous a duré un peu plus longtemps que prévu, mais le résultat en valait la peine !",
        helpful: 12,
        professionalImage: "/assets/image/professionals/nail-tech.jpg",
    },
    {
        id: 3,
        professional: "Jessica Williams",
        service: "Maquillage",
        date: "2024-11-28",
        rating: 5,
        title: "La meilleure maquilleuse de la ville",
        comment:
            "Jessica a créé le look parfait pour mon mariage. Elle était à l'écoute de mes besoins et m'a fait sentir belle et confiante. Je recommande vivement !",
        helpful: 45,
        professionalImage: "/assets/image/professionals/makeup-artist.jpg",
    },
];

// Star Rating Component
const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
            <Icon
                key={i}
                icon="solar:star-bold"
                className={`w-4 h-4 ${i < rating
                        ? "text-[#C6934F]"
                        : "text-neutral-200"
                    }`}
            />
        ))}
    </div>
);

// Review Card Component
const ReviewCard = ({ review, onDelete, onEdit }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <Card className="border-neutral-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                    {/* Header with professional info */}
                    <div className="flex gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                            <Image
                                src={review.professionalImage || "/assets/image/default-avatar.png"}
                                alt={review.professional}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold text-lg text-neutral-900">
                                        {review.professional}
                                    </h3>
                                    <p className="text-sm text-[#C6934F]">{review.service}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onEdit(review.id)}
                                        className="text-neutral-500 hover:text-[#C6934F] hover:bg-[#FFF4E6]"
                                    >
                                        <Icon icon="solar:pen-linear" className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onDelete(review.id)}
                                        className="text-neutral-500 hover:text-red-500 hover:bg-red-50"
                                    >
                                        <Icon icon="solar:trash-bin-trash-linear" className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <StarRating rating={review.rating} />
                                <span className="text-xs text-neutral-500">
                                    {new Date(review.date).toLocaleDateString("fr-FR", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Review content */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-neutral-900 mb-1">{review.title}</h4>
                        <p className="text-neutral-600 leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Footer with helpful count */}
                    <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-neutral-500 hover:text-[#C6934F] hover:bg-[#FFF4E6]"
                        >
                            <Icon icon="solar:like-linear" className="w-4 h-4 mr-2" />
                            Utile ({review.helpful})
                        </Button>
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
                    <Icon icon="solar:chat-round-like-linear" className="w-10 h-10 text-[#C6934F]" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-neutral-900">
                    Aucun avis pour le moment
                </h2>
                <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                    Complétez un service et laissez un avis pour partager votre expérience avec d'autres clients
                </p>
                <Link href="/dashboard">
                    <Button className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                        Retour au tableau de bord
                    </Button>
                </Link>
            </CardContent>
        </Card>
    </motion.div>
);

export default function ClientReviews() {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState(initialReviews);

    const handleDeleteReview = (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) {
            setReviews(reviews.filter((review) => review.id !== id));
        }
    };

    const handleEditReview = (id) => {
        // For now, just show an alert - can be expanded to a modal or edit page
        alert(`L'édition de l'avis #${id} sera bientôt disponible`);
    };

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                        Mes avis
                    </h1>
                    <p className="text-neutral-500">
                        {reviews.length} {reviews.length === 1 ? "avis partagé" : "avis partagés"} • Aidez d'autres clients à découvrir les meilleurs professionnels
                    </p>
                </motion.div>

                {/* Reviews List */}
                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ReviewCard
                                    review={review}
                                    onDelete={handleDeleteReview}
                                    onEdit={handleEditReview}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </main>
    );
}
