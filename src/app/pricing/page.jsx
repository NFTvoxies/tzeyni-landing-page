// src/app/pricing/page.jsx
"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";

const PricingPage = () => {
  const handleButtonClick = () => {
    window.location.href = "/subscribe";
  };

  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-b from-[#e1c7b3] via-[#FCF9F7] to-white py-20 lg:py-40">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#b57d56]/10" />
          <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-[#C4AB9A]/10" />
          <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-[#b57d56]/5" />
        </div>

        <div className="relative container mx-auto">
          <div className="flex text-center justify-center items-center gap-4 flex-col">
            <Badge>Tarifs</Badge>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-bold">
                Des prix qui ont du sens !
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-gray-600 max-w-xl text-center">
                Gérer votre travail aujourd'hui est déjà difficile. Nous
                vous facilitons la tâche avec des tarifs simples et transparents.
              </p>
            </div>

            {/* Pricing cards */}
            <div className="grid pt-20 text-left grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
              {/* Startup Plan */}
              <Card className="w-full rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#b57d56] mb-4 text-center">
                    Startup
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    Idéal pour les petites professionnels en pleine croissance qui
                    veulent un démarrage rapide.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 justify-start">
                    <p className="flex flex-row items-center justify-center gap-2 text-xl">
                      <span className="text-4xl">60 MAD</span>
                      <span className="text-sm text-gray-500">/ mois</span>
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row gap-4">
                        <Icon
                          icon="bi-check"
                          className="w-4 h-4 mt-2 text-[#b57d56]"
                        />
                        <div>
                          <p>Accès complet à la plateforme</p>
                          <p className="text-sm text-gray-600">
                            Toutes les fonctionnalités de base pour commencer.
                          </p>
                        </div>
                      </div>
                      
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 gap-4 text-[#b57d56] border-[#b57d56]"
                      onClick={handleButtonClick}
                    >
                      Inscrivez-vous <Icon icon="bi-arrow-bar-right" className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Plan */}
              <Card className="w-full rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#b57d56] mb-4 text-center">
                    Professionnel
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    Parfait pour les professionnels en pleine expansion qui ont
                    besoin de plus de fonctionnalités et de soutien.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 justify-start">
                    <p className="flex flex-row items-center justify-center gap-2 text-xl">
                      <span className="text-4xl">100 MAD</span>
                      <span className="text-sm text-gray-500">/ mois</span>
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row gap-4">
                        <Icon
                          icon="bi-check"
                          className="w-4 h-4 mt-2 text-[#b57d56]"
                        />
                        <div>
                          <p>Accès premium aux outils avancés</p>
                          <p className="text-sm text-gray-600">
                            Fonctionnalités pour une gestion efficace.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Icon
                          icon="bi-check"
                          className="w-4 h-4 mt-2 text-[#b57d56]"
                        />
                        <div>
                          <p>Soutien technique prioritaire</p>
                          <p className="text-sm text-gray-600">
                            Assistance technique dédiée.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="mt-4 gap-4 bg-[#b57d56] text-white"
                      onClick={handleButtonClick}
                    >
                      Inscrivez-vous <Icon icon="bi-arrow-bar-right" className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="w-full rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#b57d56] mb-4 text-center">
                    Enterprise
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    La solution tout-en-un pour les grandes salons ayant
                    besoin de solutions sur mesure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 justify-start">
                    <p className="flex flex-row items-center justify-center gap-2 text-xl">
                      <span className="text-4xl">250 MAD</span>
                      <span className="text-sm text-gray-500">/ mois</span>
                    </p>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row gap-4">
                        <Icon
                          icon="bi-check"
                          className="w-4 h-4 mt-2 text-[#b57d56]"
                        />
                        <div>
                          <p>Solutions personnalisées</p>
                          <p className="text-sm text-gray-600">
                            Adaptées à vos besoins d'entreprise.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-4">
                        <Icon
                          icon="bi-check"
                          className="w-4 h-4 mt-2 text-[#b57d56]"
                        />
                        <div>
                          <p>Service client dédié</p>
                          <p className="text-sm text-gray-600">
                            Support disponible 24/7.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 gap-4 text-[#b57d56] border-[#b57d56]"
                      onClick={handleButtonClick}
                    >
                      Contactez-nous <Icon icon="bi-phone" className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
