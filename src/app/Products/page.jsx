"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock products data - in real app, fetch from API
const products = [
  {
    id: 1,
    name: "L'Oréal Paris Revitalift Cream",
    description: "Crème anti-rides et raffermissante pour le visage, 50ml.",
    price: 250,
    salePrice: null,
    category: "Soins Visage",
    badges: ["Anti-âge", "Best-seller"],
    image: "/assets/image/revitalift-front.png",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Neutrogena Hydro Boost Water Gel",
    description: "Gel hydratant pour peaux sèches, 50g.",
    price: 200,
    salePrice: 160,
    category: "Soins Visage",
    badges: ["Hydratant"],
    image: "/assets/image/hydro-boost-front.png",
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Olay Regenerist Micro-Sculpting",
    description: "Crème anti-âge avancée, 50g.",
    price: 300,
    salePrice: null,
    category: "Soins Visage",
    badges: ["Premium", "Anti-âge"],
    image: "/assets/image/regenerist-front.png",
    rating: 4.9,
    reviews: 156,
    inStock: true,
  },
  {
    id: 4,
    name: "Philips Norelco Electric Shaver",
    description: "Rasoir électrique humide et sec avec tondeuse de précision.",
    price: 1200,
    salePrice: null,
    category: "Appareils",
    badges: ["Électronique"],
    image: "/assets/image/norelco-front.png",
    rating: 4.5,
    reviews: 67,
    inStock: false,
  },
  {
    id: 5,
    name: "Dyson Supersonic Hair Dryer",
    description: "Séchage rapide, coiffage contrôlé, protection thermique.",
    price: 4000,
    salePrice: 3500,
    category: "Appareils",
    badges: ["Premium", "Best-seller"],
    image: "/assets/image/supersonic-front.png",
    rating: 4.9,
    reviews: 203,
    inStock: true,
  },
];

const categories = ["Tous", "Soins Visage", "Appareils", "Cheveux", "Corps"];

// Star Rating Component
function StarRating({ rating, size = "sm" }) {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          icon={star <= Math.floor(rating) ? "solar:star-bold" : "solar:star-linear"}
          className={`${sizeClass} ${star <= rating ? "text-amber-400" : "text-neutral-300"}`}
        />
      ))}
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group relative h-full overflow-hidden border-neutral-100 hover:border-[#C6934F]/30 hover:shadow-lg transition-all duration-300">
        {/* Sale Badge */}
        {product.salePrice && (
          <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-500 text-white border-none uppercase text-xs font-semibold">
            Promo
          </Badge>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Icon
            icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"}
            className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-neutral-600"}`}
          />
        </button>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="secondary" className="text-neutral-600 bg-neutral-200">
              Rupture de stock
            </Badge>
          </div>
        )}

        <CardContent className="p-0 flex flex-col h-full">
          {/* Product Image */}
          <Link href={`/products/${product.id}`}>
            <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="p-4 flex flex-col flex-1">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {product.badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs bg-[#C6934F]/10 text-[#C6934F] hover:bg-[#C6934F]/20 border-none"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Name */}
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-neutral-900 line-clamp-2 hover:text-[#C6934F] transition-colors mb-1">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-neutral-500">({product.reviews})</span>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-500 line-clamp-2 mb-4 flex-1">
              {product.description}
            </p>

            <Separator className="mb-4" />

            {/* Price & Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-xl font-bold text-neutral-900">
                      {product.salePrice} MAD
                    </span>
                    <span className="text-sm text-neutral-400 line-through">
                      {product.price} MAD
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-neutral-900">
                    {product.price} MAD
                  </span>
                )}
              </div>

              <Button
                size="icon"
                variant="outline"
                className="border-[#C6934F] text-[#C6934F] hover:bg-[#C6934F] hover:text-white transition-colors"
                disabled={!product.inStock}
              >
                <Icon icon="solar:bag-4-linear" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="col-span-full text-center py-16">
      <Icon icon="solar:box-minimalistic-linear" className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">Aucun produit trouvé</h3>
      <p className="text-neutral-500">Essayez de modifier vos filtres ou votre recherche.</p>
    </div>
  );
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("popular");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#FFF9F5] via-[#FFFCFA] to-white">
        {/* Hero Section */}
        <section className="pt-28 pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="mb-4 bg-[#C6934F]/10 text-[#C6934F] hover:bg-[#C6934F]/20 border-none">
                <Icon icon="solar:star-bold" className="h-3 w-3 mr-1" />
                Produits de qualité professionnelle
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Nos Produits
              </h1>
              <div className="w-16 h-1 bg-[#C6934F] mx-auto mb-4 rounded-full" />
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Découvrez notre sélection de produits de beauté et de bien-être
                soigneusement choisis par nos professionnels.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="sticky top-16 z-20 bg-white/80 backdrop-blur-md border-y border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Icon
                  icon="solar:magnifer-linear"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400"
                />
                <Input
                  type="text"
                  placeholder="Rechercher des produits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-neutral-50 border-neutral-200 focus:border-[#C6934F] focus:ring-[#C6934F]"
                />
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-center md:justify-end w-full md:w-auto">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[160px] bg-neutral-50 border-neutral-200">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] bg-neutral-50 border-neutral-200">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Populaires</SelectItem>
                    <SelectItem value="rating">Mieux notés</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results count */}
            <p className="text-sm text-neutral-500 mb-6">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${searchTerm}-${selectedCategory}-${sortBy}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <EmptyState />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
