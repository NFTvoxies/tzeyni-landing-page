"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { mockProfessionals, mockCategories } from "@/lib/mockData";

export default function BrowseProfessionals() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    const filteredProfessionals = useMemo(() => {
        return mockProfessionals.filter((pro) => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                pro.full_name.toLowerCase().includes(searchLower) ||
                pro.specialties.some((s) => s.toLowerCase().includes(searchLower));

            const matchesCategory =
                selectedCategory === "all" ||
                pro.specialties.some((s) =>
                    s.toLowerCase().includes(selectedCategory.toLowerCase())
                );

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                        Parcourir les Professionnels
                    </h1>
                    <p className="text-neutral-600">
                        Trouvez le professionnel de beauté parfait pour vos besoins
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    <div className="relative flex-1">
                        <Icon
                            icon="solar:magnifer-linear"
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400"
                        />
                        <Input
                            placeholder="Rechercher par nom ou spécialité..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white border-neutral-200 focus:border-[#C6934F] focus:ring-[#C6934F]"
                        />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full md:w-[200px] bg-white border-neutral-200">
                            <SelectValue placeholder="Tous les services" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les Services</SelectItem>
                            {mockCategories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* Results Grid */}
                {filteredProfessionals.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProfessionals.map((professional, index) => (
                            <motion.div
                                key={professional.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                            >
                                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-neutral-100 group">
                                    {/* Image Container */}
                                    <div className="relative aspect-square overflow-hidden">
                                        <Image
                                            src={professional.avatar}
                                            alt={professional.full_name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Favorite Button */}
                                        <button
                                            onClick={() => toggleFavorite(professional.id)}
                                            className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors z-10"
                                        >
                                            <Icon
                                                icon={favorites.includes(professional.id) ? "solar:heart-bold" : "solar:heart-linear"}
                                                className={`h-5 w-5 ${favorites.includes(professional.id) ? "text-red-500" : "text-neutral-600"}`}
                                            />
                                        </button>
                                        {/* Verified Badge */}
                                        {professional.isVerified && (
                                            <Badge className="absolute top-3 left-3 bg-[#C6934F] hover:bg-[#C6934F] text-white border-none">
                                                <Icon icon="solar:verified-check-bold" className="h-3 w-3 mr-1" />
                                                Vérifié
                                            </Badge>
                                        )}
                                    </div>

                                    <CardContent className="p-5">
                                        {/* Name and Specialties */}
                                        <div className="mb-3">
                                            <h3 className="font-semibold text-lg text-neutral-900 mb-1">
                                                {professional.full_name}
                                            </h3>
                                            <p className="text-sm text-[#C6934F]">
                                                {professional.specialties.join(", ")}
                                            </p>
                                        </div>

                                        {/* Rating and Distance */}
                                        <div className="flex items-center gap-4 mb-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Icon
                                                    icon="solar:star-bold"
                                                    className="h-4 w-4 text-amber-400"
                                                />
                                                <span className="font-medium text-neutral-900">
                                                    {professional.rating}
                                                </span>
                                                <span className="text-neutral-500">
                                                    ({professional.reviews})
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-neutral-500">
                                                <Icon icon="solar:map-point-linear" className="h-4 w-4" />
                                                <span>{professional.distance}</span>
                                            </div>
                                        </div>

                                        {/* Price and CTA */}
                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                            <div>
                                                <span className="text-sm text-neutral-500">À partir de</span>
                                                <p className="font-semibold text-lg text-neutral-900">
                                                    {professional.minPrice} MAD
                                                </p>
                                            </div>
                                            <Link href={`/professional/${professional.id}`}>
                                                <Button className="bg-[#C6934F] hover:bg-[#B8854A] text-white">
                                                    Voir Profil
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <Icon
                            icon="solar:user-search-linear"
                            className="h-16 w-16 text-neutral-300 mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold text-neutral-700 mb-2">
                            Aucun professionnel trouvé
                        </h3>
                        <p className="text-neutral-500">
                            Essayez d'ajuster vos filtres de recherche
                        </p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
