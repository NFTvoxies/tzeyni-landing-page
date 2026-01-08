"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  const values = [
    {
      icon: "solar:heart-bold",
      title: "Centrée sur le Client",
      description: "Nous priorisons votre confort et satisfaction dans chaque interaction et service.",
    },
    {
      icon: "solar:shield-check-bold",
      title: "Confiance & Sécurité",
      description: "Chaque professionnel est vérifié et assuré, garantissant votre tranquillité d'esprit.",
    },
    {
      icon: "solar:lightning-bold",
      title: "Efficacité",
      description: "Réservation fluide qui respecte votre temps et amène les services directement chez vous.",
    },
    {
      icon: "solar:users-group-two-rounded-bold",
      title: "Communauté",
      description: "Construire des connexions entre clients et professionnels passionnés de beauté.",
    },
  ];

  const stats = [
    { number: "1000+", label: "Clients Satisfaits" },
    { number: "50+", label: "Professionnels Vérifiés" },
    { number: "5000+", label: "Services Complétés" },
    { number: "4.9★", label: "Note Moyenne" },
  ];

  const features = [
    "Professionnels vérifiés avec certificats et avis",
    "Tarification transparente sans frais cachés",
    "Réservation en temps réel",
    "Support client 24/7",
    "Paiement sécurisé",
    "Couverture d'assurance pour tous les services",
  ];

  const team = [
    { name: "Achraf Bsibiss", role: "Co-Founder & Back-End Developer", expertise: "Software Engineer" },
    { name: "Youssef Lafkih", role: "Co-Founder & Front-End Developer", expertise: "Software Engineer" }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFF9F5]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#b57d56]/10" />
            <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-[#C4AB9A]/10" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mx-auto bg-[#C6934F] hover:bg-[#C6934F] text-white mb-4">
                Notre Histoire
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight mb-6">
                Redéfinir les Services de Beauté pour les Femmes Modernes
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                Tzeyni connecte les clients avec des professionnels de beauté vérifiés qui se déplacent directement à domicile.
                Profitez de services de beauté premium sans vous déplacer au salon.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-neutral-100">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Notre Mission</h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Autonomiser les professionnels de beauté indépendants tout en offrant des services de beauté exceptionnels
                  directement au domicile des clients. Nous croyons en l'accessibilité et la qualité.
                </p>
                <ul className="space-y-3">
                  {["Autonomiser les professionnels", "Améliorer la commodité client", "Construire la confiance communautaire"].map(
                    (item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-neutral-600">
                        <Icon icon="solar:check-circle-bold" className="h-5 w-5 text-[#C6934F] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Notre Vision</h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Devenir la plateforme de services de beauté à domicile la plus fiable au Maroc,
                  où les professionnels prospèrent et les clients vivent une expérience transformative.
                </p>
                <ul className="space-y-3">
                  {["S'étendre à 20+ villes marocaines", "Soutenir 1,000+ professionnels", "Servir 50,000+ clients"].map(
                    (item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-neutral-600">
                        <Icon icon="solar:check-circle-bold" className="h-5 w-5 text-[#C6934F] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 bg-white/40">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Nos Valeurs Fondamentales</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Tout ce que nous faisons est guidé par ces principes fondamentaux
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-neutral-100 hover:border-[#C6934F]/50 hover:shadow-lg transition-all h-full">
                    <CardHeader>
                      <Icon icon={value.icon} className="h-10 w-10 text-[#C6934F] mb-3" />
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* By The Numbers */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">En Chiffres</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                L'impact que nous créons dans l'industrie de la beauté
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center space-y-2 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-100"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#C6934F]">{stat.number}</div>
                  <p className="text-neutral-600 text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 bg-white/40">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Pourquoi Choisir Tzeyni?</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Découvrez la différence avec notre engagement envers l'excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-neutral-100 bg-white/60 h-full">
                    <CardContent className="pt-6 flex items-start gap-4">
                      <Icon icon="solar:medal-star-bold" className="h-6 w-6 text-[#C6934F] flex-shrink-0 mt-1" />
                      <p className="text-neutral-900 font-medium">{feature}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Créé par des Innovateurs Passionnés</h2>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                L'équipe Tzeyni est dédiée à révolutionner l'industrie des services de beauté.
                Avec des expériences en technologie, affaires et beauté, nous comprenons les besoins uniques de tous.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-neutral-100 bg-white/60 hover:shadow-lg transition-all">
                    <CardContent className="pt-8 text-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#C6934F] to-[#B8854A] rounded-full mx-auto flex items-center justify-center">
                        <Icon icon="solar:user-bold" className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-neutral-900">{member.name}</h3>
                        <p className="text-sm text-[#C6934F] font-medium">{member.role}</p>
                        <p className="text-sm text-neutral-600 mt-2">{member.expertise}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 bg-white/40">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Contactez-Nous</h2>
              <p className="text-lg text-neutral-600">
                Des questions? Nous serions ravis de vous entendre. Contactez-nous à tout moment.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "solar:map-point-bold", title: "Localisation", info: "Casablanca, Maroc" },
                { icon: "solar:phone-bold", title: "Téléphone", info: "+212 5XX-XXXXXX" },
                { icon: "solar:letter-bold", title: "Email", info: "contact@tzeyni.ma" },
              ].map((contact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-neutral-100 bg-white/60 hover:shadow-lg transition-all">
                    <CardContent className="pt-6 text-center space-y-3">
                      <Icon icon={contact.icon} className="h-8 w-8 text-[#C6934F] mx-auto" />
                      <h3 className="font-semibold text-neutral-900">{contact.title}</h3>
                      <p className="text-sm text-neutral-600">{contact.info}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#C6934F] to-[#B8854A] rounded-3xl p-12 text-center space-y-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Prêt à Transformer Votre Routine Beauté?
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Rejoignez des milliers de clients et professionnels satisfaits sur Tzeyni aujourd'hui
              </p>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button size="lg" className="bg-white text-[#C6934F] hover:bg-neutral-100 gap-2">
                  Réserver un Service
                  <Icon icon="solar:arrow-right-linear" className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login/professional">
                <Button size="lg" variant="default" className="border-white text-white hover:bg-white/20">
                  Devenir Professionnel
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}