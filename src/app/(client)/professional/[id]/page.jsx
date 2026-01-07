"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { mockProfessionals, mockProfessionalServices } from "@/lib/mockData";

export default function ProfessionalProfile() {
    const params = useParams();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedService, setSelectedService] = useState("");

    // Find professional by ID
    const professional = useMemo(() => {
        return mockProfessionals.find((p) => p.id === params.id);
    }, [params.id]);

    // Get services for this professional
    const professionalServices = useMemo(() => {
        return mockProfessionalServices.filter((s) => s.professionalId === params.id);
    }, [params.id]);

    if (!professional) {
        return (
            <main className="min-h-screen bg-[#FFF9F5] pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 text-center py-16">
                    <Icon icon="solar:user-cross-linear" className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Professionnel non trouvé</h1>
                    <p className="text-neutral-600 mb-6">Ce profil n'existe pas ou a été supprimé.</p>
                    <Link href="/browse">
                        <Button className="bg-[#C6934F] hover:bg-[#B8854A] text-white">
                            Retour aux Professionnels
                        </Button>
                    </Link>
                </div>
            </main>
        );
    }

    const handleBooking = () => {
        if (selectedService && selectedDate && selectedTime) {
            // Mock booking - in real app, this would call an API
            alert(`Réservation confirmée !\n\nService: ${selectedService}\nDate: ${selectedDate.toLocaleDateString('fr-FR')}\nHeure: ${selectedTime}`);
            router.push("/dashboard");
        }
    };

    return (
        <main className="min-h-screen bg-[#FFF9F5] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/browse">
                    <Button variant="ghost" size="sm" className="mb-6 text-neutral-600 hover:text-neutral-900">
                        <Icon icon="solar:arrow-left-linear" className="h-4 w-4 mr-2" />
                        Retour aux Professionnels
                    </Button>
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Header Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="border-neutral-100 overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Avatar */}
                                        <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={professional.avatar}
                                                alt={professional.full_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3 mb-3">
                                                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                                                    {professional.full_name}
                                                </h1>
                                                {professional.isVerified && (
                                                    <Badge className="bg-[#C6934F] hover:bg-[#C6934F] text-white border-none mt-1">
                                                        <Icon icon="solar:shield-check-bold" className="h-3 w-3 mr-1" />
                                                        Vérifié
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-lg text-[#C6934F] mb-3">
                                                {professional.specialties.join(", ")}
                                            </p>

                                            <div className="flex flex-wrap gap-4 mb-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Icon icon="solar:star-bold" className="h-5 w-5 text-amber-400" />
                                                    <span className="font-semibold text-neutral-900">{professional.rating}</span>
                                                    <span className="text-neutral-500">({professional.reviews} avis)</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-neutral-500">
                                                    <Icon icon="solar:map-point-linear" className="h-5 w-5" />
                                                    <span>{professional.distance}</span>
                                                </div>
                                            </div>

                                            <p className="text-neutral-600 leading-relaxed">
                                                {professional.bio}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Services Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="border-neutral-100">
                                <CardHeader>
                                    <CardTitle>Services Proposés</CardTitle>
                                    <CardDescription>Choisissez le service qui vous intéresse</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {professionalServices.map((service) => (
                                            <div
                                                key={service.id}
                                                className="flex items-center justify-between p-4 border border-neutral-100 rounded-xl hover:border-[#C6934F]/30 transition-colors"
                                            >
                                                <div>
                                                    <h4 className="font-semibold text-neutral-900">{service.name}</h4>
                                                    <p className="text-sm text-neutral-500 flex items-center gap-1 mt-1">
                                                        <Icon icon="solar:clock-circle-linear" className="h-4 w-4" />
                                                        {service.duration} min
                                                    </p>
                                                </div>
                                                <p className="font-semibold text-lg text-neutral-900">
                                                    {service.price} MAD
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Portfolio Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="border-neutral-100">
                                <CardHeader>
                                    <CardTitle>Portfolio</CardTitle>
                                    <CardDescription>Travaux récents et exemples de réalisations</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {professional.portfolio?.map((image, index) => (
                                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                                                <Image
                                                    src={image}
                                                    alt={`Travail ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Booking */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            <Card className="border-neutral-100 sticky top-24">
                                <CardHeader>
                                    <CardTitle>Réserver un Rendez-vous</CardTitle>
                                    <CardDescription>Sélectionnez votre date et heure préférées</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Service Selection */}
                                    <div>
                                        <Label className="mb-3 block font-medium">Sélectionner le Service</Label>
                                        <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                                            {professionalServices.map((service) => (
                                                <div key={service.id} className="flex items-center space-x-3 py-2">
                                                    <RadioGroupItem value={service.name} id={service.id} />
                                                    <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                                                        <div className="flex justify-between">
                                                            <span className="text-neutral-700">{service.name}</span>
                                                            <span className="font-semibold text-neutral-900">{service.price} MAD</span>
                                                        </div>
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    <Separator />

                                    {/* Date Selection */}
                                    <div>
                                        <Label className="mb-3 block font-medium">Sélectionner la Date</Label>
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            disabled={(date) => date < new Date()}
                                            className="rounded-xl border border-neutral-100"
                                        />
                                    </div>

                                    <Separator />

                                    {/* Time Selection */}
                                    <div>
                                        <Label className="mb-3 block font-medium">Sélectionner l'Heure</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {professional.availableSlots?.map((time) => (
                                                <Button
                                                    key={time}
                                                    variant={selectedTime === time ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setSelectedTime(time)}
                                                    className={
                                                        selectedTime === time
                                                            ? "bg-[#C6934F] hover:bg-[#B8854A] text-white"
                                                            : "bg-white hover:bg-neutral-50 border-neutral-200"
                                                    }
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Book Button */}
                                    <Button
                                        onClick={handleBooking}
                                        disabled={!selectedService || !selectedDate || !selectedTime}
                                        className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white disabled:opacity-50"
                                        size="lg"
                                    >
                                        <Icon icon="solar:calendar-add-linear" className="h-5 w-5 mr-2" />
                                        Confirmer la Réservation
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
