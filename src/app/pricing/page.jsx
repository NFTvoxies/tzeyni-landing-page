"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Plan data
const plans = [
  {
    id: "basique",
    name: "Basique",
    price: 0,
    description: "Parfait pour découvrir la plateforme",
    commission: 15,
    bookingsLimit: "10 réservations/mois",
    features: [
      { text: "Profil vérifié", included: true },
      { text: "10 réservations par mois", included: true },
      { text: "Commission de 15% par service", included: true },
      { text: "Support par email", included: true },
      { text: "Badge prioritaire", included: false },
      { text: "Statistiques avancées", included: false },
      { text: "Position boost", included: false },
      { text: "Support prioritaire 24/7", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    description: "Idéal pour les professionnelles en croissance",
    commission: 12,
    bookingsLimit: "Réservations illimitées",
    popular: true,
    features: [
      { text: "Profil vérifié", included: true },
      { text: "Réservations illimitées", included: true },
      { text: "Commission de 12% par service", included: true },
      { text: "Support par email", included: true },
      { text: "Badge prioritaire", included: true },
      { text: "Statistiques", included: true },
      { text: "Position boost", included: false },
      { text: "Support prioritaire 24/7", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    description: "Maximum de visibilité et d'avantages",
    commission: 10,
    bookingsLimit: "Réservations illimitées",
    features: [
      { text: "Profil vérifié", included: true },
      { text: "Réservations illimitées", included: true },
      { text: "Commission de 10% par service", included: true },
      { text: "Support par email", included: true },
      { text: "Badge prioritaire", included: true },
      { text: "Statistiques avancées", included: true },
      { text: "Position boost", included: true },
      { text: "Support prioritaire 24/7", included: true },
    ],
  },
];

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const handleSubscribe = () => {
    window.location.href = `/subscribe?plan=${selectedPlan}`;
  };

  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-b from-[#FFF4E6] via-[#FCF9F7] to-white min-h-screen">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C6934F]/10 blur-3xl" />
          <div className="absolute top-60 -left-20 w-72 h-72 rounded-full bg-[#C6934F]/5 blur-2xl" />
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-[#D4A574]/10 blur-2xl" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#C6934F]/10 text-[#C6934F] hover:bg-[#C6934F]/20 border-none">
              Abonnements Pro
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Choisissez le forfait adapté à votre activité
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Des formules flexibles pour accompagner votre croissance.
              Moins de commission, plus de visibilité avec nos forfaits premium.
            </p>
          </motion.div>

          {/* Main Pricing Section */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Plan Selector (Left Side) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-neutral-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Sélectionnez votre forfait</CardTitle>
                  <CardDescription>
                    Comparez les fonctionnalités et choisissez le plan qui vous convient
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedPlan}
                    onValueChange={setSelectedPlan}
                    className="space-y-3"
                  >
                    {plans.map((plan) => (
                      <div key={plan.id}>
                        <Label
                          htmlFor={plan.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedPlan === plan.id
                            ? "border-[#C6934F] bg-[#FFF4E6]/50"
                            : "border-neutral-200 hover:border-[#C6934F]/50 hover:bg-neutral-50"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={plan.id}
                              id={plan.id}
                              className="border-[#C6934F] text-[#C6934F]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-900">
                                  {plan.name}
                                </span>
                                {plan.popular && (
                                  <Badge className="bg-[#C6934F] text-white border-none text-xs">
                                    Populaire
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-neutral-500">
                                {plan.bookingsLimit}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-neutral-900">
                              {plan.price === 0 ? "Gratuit" : `${plan.price}`}
                            </span>
                            {plan.price > 0 && (
                              <span className="text-sm text-neutral-500 ml-1">
                                MAD/mois
                              </span>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <Separator className="my-6" />

                  {/* Commission Info */}
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon icon="solar:tag-price-linear" className="w-5 h-5 text-[#C6934F]" />
                      <span className="font-medium text-neutral-900">
                        Commission sur les services
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Une commission de{" "}
                      <span className="font-bold text-[#C6934F]">
                        {selectedPlanData?.commission}%
                      </span>{" "}
                      est prélevée sur chaque service réservé via Tzeyni.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plan Details (Right Side) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card
                className={`h-full border-2 shadow-lg ${selectedPlanData?.popular
                  ? "border-[#C6934F] bg-gradient-to-br from-[#FFF4E6]/50 to-white"
                  : "border-neutral-200"
                  }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-neutral-900">
                        {selectedPlanData?.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {selectedPlanData?.description}
                      </CardDescription>
                    </div>
                    {selectedPlanData?.popular && (
                      <Badge className="bg-[#C6934F] text-white border-none">
                        Recommandé
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-neutral-900">
                      {selectedPlanData?.price === 0
                        ? "0"
                        : selectedPlanData?.price}
                    </span>
                    <span className="text-xl text-neutral-500 ml-2">
                      MAD/mois
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {selectedPlanData?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.included
                            ? "bg-[#C6934F]/20"
                            : "bg-neutral-100"
                            }`}
                        >
                          <Icon
                            icon={
                              feature.included
                                ? "solar:check-circle-bold"
                                : "solar:close-circle-linear"
                            }
                            className={`w-4 h-4 ${feature.included
                              ? "text-[#C6934F]"
                              : "text-neutral-400"
                              }`}
                          />
                        </div>
                        <span
                          className={
                            feature.included
                              ? "text-neutral-700"
                              : "text-neutral-400"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={handleSubscribe}
                    className={`w-full py-6 text-lg font-semibold ${selectedPlanData?.popular
                      ? "bg-[#C6934F] hover:bg-[#B8854A] text-white"
                      : "bg-neutral-900 hover:bg-neutral-800 text-white"
                      }`}
                  >
                    {selectedPlanData?.price === 0
                      ? "Commencer gratuitement"
                      : "S'abonner maintenant"}
                    <Icon
                      icon="solar:arrow-right-linear"
                      className="w-5 h-5 ml-2"
                    />
                  </Button>

                  <p className="text-center text-sm text-neutral-500 mt-4">
                    Annulation possible à tout moment
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* For Clients Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-[#C6934F]/30 bg-gradient-to-r from-[#FFF4E6] to-[#FCF9F7] shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C6934F]/20 flex items-center justify-center flex-shrink-0">
                    <Icon
                      icon="solar:users-group-rounded-bold"
                      className="w-8 h-8 text-[#C6934F]"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      Pour les clientes : C'est 100% gratuit !
                    </h3>
                    <p className="text-neutral-600">
                      Pas d'abonnement, pas de frais cachés. Payez uniquement
                      les services que vous réservez directement auprès de la
                      professionnelle.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#C6934F] text-[#C6934F] hover:bg-[#C6934F] hover:text-white px-6"
                    onClick={() => (window.location.href = "/browse")}
                  >
                    Découvrir les services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-neutral-500">
              <div className="flex items-center gap-2">
                <Icon icon="solar:shield-check-bold" className="w-5 h-5 text-[#C6934F]" />
                <span className="text-sm">Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="solar:card-bold" className="w-5 h-5 text-[#C6934F]" />
                <span className="text-sm">CMI & cartes bancaires</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="solar:lock-bold" className="w-5 h-5 text-[#C6934F]" />
                <span className="text-sm">Données protégées</span>
              </div>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center text-neutral-900 mb-4">
              Comparaison détaillée
            </h2>
            <p className="text-center text-neutral-600 mb-10 max-w-2xl mx-auto">
              Découvrez en détail les avantages de chaque forfait
            </p>

            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-700">
                      Fonctionnalités
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className={`text-center py-4 px-4 font-semibold ${plan.popular
                          ? "text-[#C6934F]"
                          : "text-neutral-700"
                          }`}
                      >
                        {plan.name}
                        {plan.popular && (
                          <Badge className="ml-2 bg-[#C6934F] text-white border-none text-xs">
                            ★
                          </Badge>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 px-4 text-neutral-600">Prix mensuel</td>
                    <td className="py-4 px-4 text-center font-semibold">Gratuit</td>
                    <td className="py-4 px-4 text-center font-semibold text-[#C6934F]">
                      99 MAD
                    </td>
                    <td className="py-4 px-4 text-center font-semibold">199 MAD</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50">
                    <td className="py-4 px-4 text-neutral-600">Commission</td>
                    <td className="py-4 px-4 text-center">15%</td>
                    <td className="py-4 px-4 text-center text-[#C6934F]">12%</td>
                    <td className="py-4 px-4 text-center font-semibold text-green-600">
                      10%
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 px-4 text-neutral-600">Réservations</td>
                    <td className="py-4 px-4 text-center">10/mois</td>
                    <td className="py-4 px-4 text-center text-[#C6934F]">Illimitées</td>
                    <td className="py-4 px-4 text-center">Illimitées</td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50">
                    <td className="py-4 px-4 text-neutral-600">Badge prioritaire</td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:close-circle-linear"
                        className="w-5 h-5 text-neutral-400 mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-5 h-5 text-[#C6934F] mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-5 h-5 text-[#C6934F] mx-auto"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 px-4 text-neutral-600">Statistiques avancées</td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:close-circle-linear"
                        className="w-5 h-5 text-neutral-400 mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-5 h-5 text-[#C6934F] mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-5 h-5 text-[#C6934F] mx-auto"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-100 bg-neutral-50/50">
                    <td className="py-4 px-4 text-neutral-600">Position boost</td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:close-circle-linear"
                        className="w-5 h-5 text-neutral-400 mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:close-circle-linear"
                        className="w-5 h-5 text-neutral-400 mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-5 h-5 text-[#C6934F] mx-auto"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-4 px-4 text-neutral-600">Support prioritaire 24/7</td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:close-circle-linear"
                        className="w-5 h-5 text-neutral-400 mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:close-circle-linear"
                        className="w-5 h-5 text-neutral-400 mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Icon
                        icon="solar:check-circle-bold"
                        className="w-5 h-5 text-[#C6934F] mx-auto"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-neutral-900 mb-10">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Puis-je changer de forfait à tout moment ?",
                  a: "Oui, vous pouvez upgrader ou downgrader votre forfait à tout moment. Les changements prennent effet immédiatement.",
                },
                {
                  q: "Comment fonctionne la commission ?",
                  a: "La commission est prélevée automatiquement sur chaque paiement reçu via la plateforme. Le reste est versé directement sur votre compte.",
                },
                {
                  q: "Y a-t-il un engagement minimum ?",
                  a: "Non, tous nos forfaits sont sans engagement. Vous pouvez annuler à tout moment sans frais.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-neutral-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-neutral-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
