"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FAQ = () => {
  const faqCategories = [
    {
      category: "Général",
      icon: "solar:question-circle-bold",
      color: "#C6934F",
      questions: [
        {
          question: "Comment fonctionne Tzeyni ?",
          answer: "Tzeyni vous met en relation avec des professionnels de beauté vérifiés qui offrent des services à domicile. Il vous suffit de réserver un service via notre plateforme, et un professionnel viendra directement chez vous à l'heure prévue.",
        },
        {
          question: "Dans quelles villes Tzeyni est-il disponible ?",
          answer: "Tzeyni est actuellement disponible à Casablanca, Rabat et Marrakech. Nous prévoyons de nous étendre à d'autres villes marocaines prochainement. Utilisez notre fonction de recherche pour vérifier la disponibilité dans votre zone.",
        },
        {
          question: "Les professionnels Tzeyni sont-ils certifiés ?",
          answer: "Oui, absolument ! Tous les professionnels sur Tzeyni sont minutieusement vérifiés. Nous vérifions leurs certifications, leur expérience et leurs références pour garantir des services de qualité professionnelle.",
        },
      ],
    },
    {
      category: "Réservations",
      icon: "solar:calendar-mark-bold",
      color: "#C6934F",
      questions: [
        {
          question: "Comment puis-je réserver un service ?",
          answer: "La réservation est simple ! Parcourez les professionnels disponibles, sélectionnez le service souhaité, choisissez une date et heure qui vous conviennent, puis confirmez votre réservation. Vous recevrez une confirmation instantanée.",
        },
        {
          question: "Que faire si je dois annuler ou reprogrammer ?",
          answer: "Vous pouvez annuler ou reprogrammer gratuitement jusqu'à 24 heures avant le rendez-vous. Pour les annulations tardives (moins de 24h), des frais d'annulation de 30% peuvent s'appliquer pour compenser le professionnel.",
        },
        {
          question: "Puis-je choisir mon professionnel ?",
          answer: "Oui ! Vous pouvez parcourir les profils détaillés, consulter les avis clients, voir les portfolios et choisir le professionnel qui correspond le mieux à vos besoins et préférences.",
        },
        {
          question: "Puis-je réserver pour un groupe ou un événement ?",
          answer: "Absolument ! Tzeyni propose des services de groupe pour mariages, soirées entre amis, événements d'entreprise. Contactez notre service client pour des arrangements personnalisés et des tarifs de groupe.",
        },
      ],
    },
    {
      category: "Services & Tarifs",
      icon: "solar:dollar-minimalistic-bold",
      color: "#C6934F",
      questions: [
        {
          question: "Quels types de services proposez-vous ?",
          answer: "Nous offrons une gamme complète : coupes, coiffures, coloration, maquillage, manucure, pédicure, soins du visage, épilation, massages et plus encore. Consultez notre page Services pour la liste complète.",
        },
        {
          question: "Comment sont fixés les prix ?",
          answer: "Les prix varient selon le service et l'expérience du professionnel. Tous les tarifs sont affichés clairement avant la réservation, sans frais cachés. Nous appliquons une commission de 12-15% sur chaque service.",
        },
        {
          question: "Dois-je fournir du matériel ou des produits ?",
          answer: "Non, votre professionnel apportera tout l'équipement et les produits professionnels nécessaires. Si vous préférez utiliser vos propres produits, n'hésitez pas à en informer le professionnel à l'avance.",
        },
      ],
    },
    {
      category: "Paiements & Sécurité",
      icon: "solar:shield-check-bold",
      color: "#C6934F",
      questions: [
        {
          question: "Quels modes de paiement acceptez-vous ?",
          answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), les paiements mobiles, et travaillons avec CMI et Stripe pour garantir des transactions sécurisées. Le paiement est effectué après le service.",
        },
        {
          question: "Puis-je donner un pourboire ?",
          answer: "Les pourboires ne sont pas obligatoires mais toujours appréciés ! Vous pouvez ajouter un pourboire lors du paiement (10-20% suggéré) ou donner directement au professionnel en espèces.",
        },
        {
          question: "Comment garantissez-vous la sécurité ?",
          answer: "La sécurité est notre priorité. Tous les professionnels sont vérifiés avec vérification d'identité, antécédents vérifiés, et assurance professionnelle. Les paiements sont sécurisés et vos données personnelles protégées.",
        },
      ],
    },
    {
      category: "Devenir Professionnel",
      icon: "solar:star-bold",
      color: "#C6934F",
      questions: [
        {
          question: "Comment devenir professionnel Tzeyni ?",
          answer: "Visitez notre page 'Devenir Professionnel', remplissez le formulaire de candidature avec vos certifications et portfolio. Notre équipe examinera votre candidature et vous contactera dans les 48 heures.",
        },
        {
          question: "Quels sont les critères pour rejoindre Tzeyni ?",
          answer: "Vous devez avoir une certification professionnelle valide, au moins 2 ans d'expérience, un portfolio de travaux récents, et fournir des références vérifiables. Nous valorisons le professionnalisme et l'excellence du service.",
        },
        {
          question: "Quels sont les avantages pour les professionnels ?",
          answer: "Flexibilité totale de votre emploi du temps, accès à une large clientèle, paiements garantis et rapides, aucun frais d'inscription, support marketing et visibilité en ligne, ainsi que notre système de notation pour construire votre réputation.",
        },
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF9F5] via-[#FFFCFA] to-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#C6934F]/10" />
          <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-[#C4AB9A]/10" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mx-auto bg-[#C6934F]/10 text-[#C6934F] hover:bg-[#C6934F]/20 border-none mb-4">
              <Icon icon="solar:help-bold" className="h-3 w-3 mr-1" />
              Centre d'Aide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight mb-6">
              Foire Aux Questions
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Trouvez rapidement des réponses à vos questions les plus fréquentes sur Tzeyni.
              Notre équipe est là pour vous aider.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="border-neutral-100 bg-white/60 backdrop-blur-sm overflow-hidden">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-[#C6934F]/10 to-transparent p-6 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#C6934F]/10 rounded-lg">
                      <Icon icon={category.icon} className="h-6 w-6 text-[#C6934F]" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                      {category.category}
                    </h2>
                  </div>
                </div>

                {/* Questions Accordion */}
                <div className="p-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={categoryIndex === 0 ? "item-0" : undefined}
                  >
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-neutral-100 last:border-0"
                      >
                        <AccordionTrigger className="text-left hover:text-[#C6934F] transition-colors py-4 text-lg font-semibold text-neutral-900">
                          <span className="flex items-start gap-3">
                            <Icon
                              icon="solar:question-circle-linear"
                              className="h-5 w-5 text-[#C6934F] mt-1 flex-shrink-0"
                            />
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-600 leading-relaxed pl-8 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="border-neutral-100 bg-gradient-to-br from-[#C6934F] to-[#B8854A] text-white">
            <div className="p-8 md:p-12 text-center space-y-6">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <Icon icon="solar:chat-round-dots-bold" className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold">Vous ne trouvez pas de réponse ?</h3>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Notre équipe de support est disponible pour répondre à toutes vos questions.
                Contactez-nous et nous vous répondrons dans les plus brefs délais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-[#C6934F] hover:bg-neutral-100 gap-2"
                  >
                    <Icon icon="solar:letter-bold" className="h-5 w-5" />
                    Nous Contacter
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button
                    size="lg"
                    variant="default"
                    className="border-white text-white hover:bg-white/20 gap-2"
                  >
                    <Icon icon="solar:calendar-add-bold" className="h-5 w-5" />
                    Réserver un Service
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;