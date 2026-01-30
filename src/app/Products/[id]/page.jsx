"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Mock products data - same as in the list page
const products = [
  {
    id: 1,
    name: "L'Oréal Paris Revitalift Cream",
    description: "Crème anti-rides et raffermissante pour le visage, 50ml.",
    longDescription: "Cette crème de jour anti-rides et raffermissante de L'Oréal Paris est enrichie en Pro-Retinol et Centella Asiatica. Elle aide à réduire visiblement les rides et raffermit la peau jour après jour. Sa texture onctueuse pénètre rapidement et laisse la peau douce et confortable.",
    price: 250,
    salePrice: null,
    category: "Soins Visage",
    badges: ["Anti-âge", "Best-seller"],
    images: [
      "/assets/image/revitalift-front.png",
      "/assets/image/revitalift-back.png",
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    features: [
      "Anti-rides visible dès 4 semaines",
      "Raffermit la peau",
      "Hydratation 24h",
      "Texture non grasse",
    ],
    ingredients: "Aqua, Glycerin, Isohexadecane, Niacinamide, Pentaerythrityl Tetraethylhexanoate...",
    usage: "Appliquer matin et soir sur le visage et le cou propres. Masser délicatement jusqu'à absorption complète.",
  },
  {
    id: 2,
    name: "Neutrogena Hydro Boost Water Gel",
    description: "Gel hydratant pour peaux sèches, 50g.",
    longDescription: "Le gel-crème Hydro Boost de Neutrogena est formulé avec de l'acide hyaluronique purifiée. Il hydrate instantanément et en continu pendant 48 heures. Sa texture gel unique apporte fraîcheur et confort sans effet gras.",
    price: 200,
    salePrice: 160,
    category: "Soins Visage",
    badges: ["Hydratant"],
    images: [
      "/assets/image/hydro-boost-front.png",
      "/assets/image/hydro-boost-back.png",
    ],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    features: [
      "Hydratation 48h",
      "Acide hyaluronique",
      "Texture gel fraîche",
      "Sans huile",
    ],
    ingredients: "Aqua, Dimethicone, Glycerin, Sodium Hyaluronate...",
    usage: "Appliquer généreusement sur le visage après le nettoyage. Utiliser matin et soir.",
  },
  {
    id: 3,
    name: "Olay Regenerist Micro-Sculpting",
    description: "Crème anti-âge avancée, 50g.",
    longDescription: "La crème Regenerist Micro-Sculpting d'Olay est notre hydratant anti-âge le plus avancé. Formulée avec un complexe amino-peptide et de la niacinamide, elle pénètre profondément dans les couches superficielles de la peau pour cibler les rides et ridules.",
    price: 300,
    salePrice: null,
    category: "Soins Visage",
    badges: ["Premium", "Anti-âge"],
    images: [
      "/assets/image/regenerist-front.png",
      "/assets/image/regenerist-back.png",
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    features: [
      "Complexe amino-peptide",
      "Niacinamide (Vitamine B3)",
      "Anti-rides avancé",
      "Raffermit et lisse",
    ],
    ingredients: "Aqua, Niacinamide, Glycerin, Isohexadecane, Palmitoyl Pentapeptide-4...",
    usage: "Appliquer sur visage et cou matin et soir. Masser en mouvements ascendants.",
  },
  {
    id: 4,
    name: "Philips Norelco Electric Shaver",
    description: "Rasoir électrique humide et sec avec tondeuse de précision.",
    longDescription: "Le rasoir électrique Philips Norelco offre un rasage doux et précis grâce à ses têtes flexibles qui s'adaptent aux contours du visage. Utilisable sur peau sèche ou avec mousse/gel. Étanche pour un rinçage facile. Autonomie de 60 minutes.",
    price: 1200,
    salePrice: null,
    category: "Appareils",
    badges: ["Électronique"],
    images: [
      "/assets/image/norelco-front.png",
      "/assets/image/norelco-back.png",
    ],
    rating: 4.5,
    reviews: 67,
    inStock: false,
    features: [
      "Têtes flexibles 5D",
      "Rasage humide et sec",
      "Autonomie 60 min",
      "Tondeuse de précision incluse",
    ],
    ingredients: null,
    usage: "Charger complètement avant la première utilisation. Utiliser sur peau propre, sèche ou humide.",
  },
  {
    id: 5,
    name: "Dyson Supersonic Hair Dryer",
    description: "Séchage rapide, coiffage contrôlé, protection thermique.",
    longDescription: "Le sèche-cheveux Dyson Supersonic utilise Air Multiplier™ pour un séchage ultra rapide sans chaleur extrême. Le capteur intelligent mesure la température de l'air 40 fois par seconde pour protéger vos cheveux. Livré avec 5 embouts de coiffage magnétiques.",
    price: 4000,
    salePrice: 3500,
    category: "Appareils",
    badges: ["Premium", "Best-seller"],
    images: [
      "/assets/image/supersonic-front.png",
      "/assets/image/supersonic-back.png",
    ],
    rating: 4.9,
    reviews: 203,
    inStock: true,
    features: [
      "Moteur numérique V9",
      "Contrôle thermique intelligent",
      "Séchage 2x plus rapide",
      "5 embouts magnétiques",
    ],
    ingredients: null,
    usage: "Utilisez les différents embouts selon le style souhaité. Ne pas utiliser sur cheveux mouillés avec l'embout lissant.",
  },
];

// Star Rating Component
function StarRating({ rating, size = "md" }) {
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6";
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

// Related Products Component
function RelatedProducts({ currentId, category }) {
  const related = products.filter(p => p.id !== currentId && p.category === category).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Produits similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="h-full hover:shadow-lg hover:border-[#C6934F]/30 transition-all duration-300">
              <CardContent className="p-4">
                <div className="relative w-full aspect-square mb-4 bg-neutral-50 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="font-semibold text-neutral-900 line-clamp-1 mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#C6934F]">
                    {product.salePrice || product.price} MAD
                  </span>
                  <StarRating rating={product.rating} size="sm" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Find product by ID
  const product = useMemo(() => {
    return products.find((p) => p.id === parseInt(params.id));
  }, [params.id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FFF9F5] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <Icon icon="solar:box-minimalistic-broken" className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Produit non trouvé</h1>
          <p className="text-neutral-600 mb-6">Ce produit n'existe pas ou a été supprimé.</p>
          <Link href="/products">
            <Button className="bg-[#C6934F] hover:bg-[#B8854A] text-white">
              Retour aux Produits
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    // Mock add to cart - in real app, this would call an API or context
    alert(`${quantity}x ${product.name} ajouté au panier !`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#FFF9F5] via-[#FFFCFA] to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/products">
            <Button variant="ghost" size="sm" className="mb-6 text-neutral-600 hover:text-neutral-900">
              <Icon icon="solar:arrow-left-linear" className="h-4 w-4 mr-2" />
              Retour aux Produits
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <Card className="border-neutral-100 overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Sale Badge */}
                  {product.salePrice && (
                    <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-500 text-white border-none uppercase text-xs font-semibold">
                      Promo
                    </Badge>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  >
                    <Icon
                      icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"}
                      className={`h-6 w-6 ${isFavorite ? "text-red-500" : "text-neutral-600"}`}
                    />
                  </button>

                  <div className="relative w-full aspect-square bg-gradient-to-b from-neutral-50 to-white rounded-xl">
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                      ? "border-[#C6934F] shadow-md"
                      : "border-neutral-200 hover:border-neutral-300"
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge, idx) => (
                  <Badge
                    key={idx}
                    className="bg-[#C6934F]/10 text-[#C6934F] hover:bg-[#C6934F]/20 border-none"
                  >
                    {badge}
                  </Badge>
                ))}
                <Badge variant="secondary" className="bg-neutral-100 text-neutral-600">
                  {product.category}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} size="lg" />
                <span className="font-semibold text-neutral-900">{product.rating}</span>
                <span className="text-neutral-500">({product.reviews} avis)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                {product.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-[#C6934F]">
                      {product.salePrice} MAD
                    </span>
                    <span className="text-xl text-neutral-400 line-through">
                      {product.price} MAD
                    </span>
                    <Badge className="bg-red-500/10 text-red-600 border-none">
                      -{Math.round((1 - product.salePrice / product.price) * 100)}%
                    </Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-neutral-900">
                    {product.price} MAD
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <Icon icon="solar:check-circle-bold" className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium">En stock</span>
                  </>
                ) : (
                  <>
                    <Icon icon="solar:close-circle-bold" className="h-5 w-5 text-red-500" />
                    <span className="text-red-600 font-medium">Rupture de stock</span>
                  </>
                )}
              </div>

              <Separator />

              {/* Description */}
              <p className="text-neutral-600 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Features */}
              {product.features && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-neutral-900">Caractéristiques :</h3>
                  <ul className="space-y-1.5">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-neutral-600">
                        <Icon icon="solar:check-circle-linear" className="h-5 w-5 text-[#C6934F]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Separator />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="font-medium text-neutral-700">Quantité :</span>
                  <div className="flex items-center border border-neutral-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-neutral-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Icon icon="solar:minus-linear" className="h-5 w-5 text-neutral-600" />
                    </button>
                    <span className="px-4 font-semibold text-neutral-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-neutral-100 transition-colors"
                    >
                      <Icon icon="solar:add-linear" className="h-5 w-5 text-neutral-600" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-[#C6934F] hover:bg-[#B8854A] text-white disabled:opacity-50"
                    size="lg"
                  >
                    <Icon icon="solar:bag-4-linear" className="h-5 w-5 mr-2" />
                    Ajouter au panier
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#C6934F] text-[#C6934F] hover:bg-[#C6934F]/10"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Icon
                      icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"}
                      className={`h-5 w-5 ${isFavorite ? "text-red-500" : ""}`}
                    />
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <Card className="border-neutral-100 bg-neutral-50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:delivery-linear" className="h-5 w-5 text-[#C6934F]" />
                    <span className="text-neutral-700">Livraison gratuite à partir de 500 MAD</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:refresh-linear" className="h-5 w-5 text-[#C6934F]" />
                    <span className="text-neutral-700">Retours gratuits sous 14 jours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:shield-check-linear" className="h-5 w-5 text-[#C6934F]" />
                    <span className="text-neutral-700">Produits 100% authentiques</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <Tabs defaultValue="usage" className="w-full">
              <TabsList className="w-full justify-start bg-neutral-100 p-1 rounded-xl">
                <TabsTrigger value="usage" className="rounded-lg">Mode d'emploi</TabsTrigger>
                {product.ingredients && (
                  <TabsTrigger value="ingredients" className="rounded-lg">Ingrédients</TabsTrigger>
                )}
                <TabsTrigger value="reviews" className="rounded-lg">Avis ({product.reviews})</TabsTrigger>
              </TabsList>
              <TabsContent value="usage" className="mt-6">
                <Card className="border-neutral-100">
                  <CardContent className="p-6">
                    <p className="text-neutral-600 leading-relaxed">{product.usage}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              {product.ingredients && (
                <TabsContent value="ingredients" className="mt-6">
                  <Card className="border-neutral-100">
                    <CardContent className="p-6">
                      <p className="text-neutral-600 text-sm leading-relaxed">{product.ingredients}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
              <TabsContent value="reviews" className="mt-6">
                <Card className="border-neutral-100">
                  <CardContent className="p-6 text-center py-12">
                    <Icon icon="solar:chat-round-dots-linear" className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-500">Les avis clients seront bientôt disponibles.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          <RelatedProducts currentId={product.id} category={product.category} />
        </div>
      </main>
      <Footer />
    </>
  );
}