'use client'
import React from 'react';
import Link from 'next/link';
import { User, Briefcase, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ChooseLoginType = () => {
  return (
    <div className="min-h-screen bg-[#FCF9F5] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header with Tzeyni branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2 text-foreground">Rejoindre Tzeyni</h1>
          <p className="text-muted-foreground">Choisissez comment vous souhaitez commencer</p>
        </div>

        {/* Role selection cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Client Card */}
          <Card className="cursor-pointer rounded-[15px] hover:shadow-lg transition-all duration-300 hover:border-[#C6934F] flex flex-col h-full ">
            <CardHeader className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-[#C6934F]/10 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-[#C6934F]" />
              </div>
              <CardTitle>Je suis un Client</CardTitle>
              <CardDescription>Réserver des services de beauté à domicile</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Parcourir les professionnels vérifiés</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Réserver des services à votre convenance</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Paiements sécurisés</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Noter et évaluer les services</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/auth/login/client" className="w-full">
                <Button className="w-full bg-[#C6934F] hover:bg-[#B8854A]">
                  Continuer en tant que Client
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Professional Card */}
          <Card className="cursor-pointer rounded-[15px] hover:shadow-lg transition-all duration-300 hover:border-[#C6934F] flex flex-col h-full">
            <CardHeader className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-[#C6934F]/10 flex items-center justify-center mb-4">
                <Briefcase className="h-8 w-8 text-[#C6934F]" />
              </div>
              <CardTitle>Je suis un Professionnel</CardTitle>
              <CardDescription>Développer votre activité de beauté</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Définir votre propre emploi du temps</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Contrôler vos tarifs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Accéder aux clients vérifiés</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#C6934F]">✓</span>
                  <span>Construire votre réputation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/auth/login/professional" className="w-full hover:shadow-lg transition-all duration-300">
                <Button className="w-full bg-[#C6934F] hover:bg-[#B8854A]">
                  Continuer en tant que Professionnel
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChooseLoginType;
