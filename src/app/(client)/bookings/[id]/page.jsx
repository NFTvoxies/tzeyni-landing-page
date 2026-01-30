"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockBookings, mockProfessionals } from "@/lib/mockData";

// Mock booking data - in real app, fetch from API based on id
const getMockBooking = (id) => {
    const booking = mockBookings.find(b => b.id === id) || mockBookings[0];
    const professional = mockProfessionals.find(p => p.id === booking?.professionalId) || mockProfessionals[0];

    return {
        id: id,
        service: booking?.serviceName || "Coiffure & Coloration",
        professional: professional?.full_name || "Sarah Martinez",
        professionalImage: professional?.avatar || "/assets/image/professionals/hairstylist.jpg",
        status: booking?.status || "confirmed",
        date: booking?.date || "2025-01-15",
        time: booking?.time || "10:00",
        duration: "2 heures",
        location: "123 Rue Principale, Apt 4B, Maarif, Casablanca",
        price: booking?.price || 150,
        notes: "La cliente a demandé un balayage avec un traitement en profondeur",
        clientAddress: "456 Avenue des Palmiers, Apt 2C",
        clientPhone: "+212 6 12 34 56 78",
        clientEmail: "client@example.com",
        cancellationPolicy: "Annulation gratuite jusqu'à 24 heures avant le rendez-vous",
        paymentStatus: "En attente",
        paymentMethod: "Carte de crédit",
    };
};

// Status badge styling
const getStatusStyles = (status) => {
    switch (status) {
        case "confirmed":
            return "bg-[#C6934F] text-white hover:bg-[#C6934F] border-none";
        case "pending":
            return "bg-[#FFE5CC] text-[#8B5E34] hover:bg-[#FFE5CC] border-none";
        case "cancelled":
            return "bg-red-100 text-red-700 hover:bg-red-100 border-none";
        case "completed":
            return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none";
        default:
            return "";
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case "confirmed": return "Confirmé";
        case "pending": return "En attente";
        case "cancelled": return "Annulé";
        case "completed": return "Terminé";
        default: return status;
    }
};

export default function BookingDetails() {
    const { data: session } = useSession();
    const params = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        // Simulate fetching booking data
        const bookingData = getMockBooking(params.id);
        setBooking(bookingData);
    }, [params.id]);

    if (!booking) {
        return (
            <main className="min-h-screen bg-[--background] pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
                        <div className="h-64 bg-neutral-200 rounded"></div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link href="/bookings" className="inline-block mb-6">
                        <Button variant="ghost" size="sm" className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100">
                            <Icon icon="solar:arrow-left-linear" className="w-4 h-4 mr-2" />
                            Retour aux réservations
                        </Button>
                    </Link>
                </motion.div>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                            Détails de la réservation
                        </h1>
                        <Badge className={`text-sm px-4 py-1.5 ${getStatusStyles(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                        </Badge>
                    </div>
                    <p className="text-neutral-500">ID de réservation: #{booking.id}</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Alert */}
                        {booking.status === "confirmed" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="border-[#C6934F]/30 bg-[#FFF4E6]">
                                    <CardContent className="p-4 flex items-start gap-3">
                                        <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-[#C6934F] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-neutral-900">Réservation confirmée</p>
                                            <p className="text-sm text-neutral-600">
                                                Votre rendez-vous est confirmé. Le professionnel arrivera à l'heure prévue.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* Service & Professional */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="border-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-lg">Détails du service</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Professional Info */}
                                    <div className="flex gap-4 pb-6 border-b border-neutral-100">
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                                            <Image
                                                src={booking.professionalImage}
                                                alt={booking.professional}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-neutral-900 mb-1">
                                                {booking.service}
                                            </h3>
                                            <p className="text-neutral-500 mb-3">{booking.professional}</p>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-neutral-200 hover:border-[#C6934F] hover:text-[#C6934F] hover:bg-[#FFF4E6]"
                                            >
                                                <Icon icon="solar:chat-round-linear" className="w-4 h-4 mr-2" />
                                                Contacter le professionnel
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Date & Duration */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-semibold uppercase text-neutral-500 mb-2 block">
                                                Date & Heure
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[#FFF4E6] flex items-center justify-center">
                                                    <Icon icon="solar:calendar-linear" className="w-5 h-5 text-[#C6934F]" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-neutral-900">
                                                        {new Date(booking.date).toLocaleDateString("fr-FR", {
                                                            weekday: "long",
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                    <p className="text-sm text-neutral-500">{booking.time}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold uppercase text-neutral-500 mb-2 block">
                                                Durée
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[#FFF4E6] flex items-center justify-center">
                                                    <Icon icon="solar:clock-circle-linear" className="w-5 h-5 text-[#C6934F]" />
                                                </div>
                                                <p className="font-medium text-neutral-900">{booking.duration}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="text-xs font-semibold uppercase text-neutral-500 mb-2 block">
                                            Lieu du service
                                        </label>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#FFF4E6] flex items-center justify-center flex-shrink-0">
                                                <Icon icon="solar:map-point-linear" className="w-5 h-5 text-[#C6934F]" />
                                            </div>
                                            <p className="text-neutral-900 pt-2">{booking.location}</p>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="text-xs font-semibold uppercase text-neutral-500 mb-2 block">
                                            Notes spéciales
                                        </label>
                                        <p className="text-neutral-700 bg-neutral-50 p-4 rounded-lg">
                                            {booking.notes}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Cancellation Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="border-neutral-100">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Icon icon="solar:info-circle-linear" className="w-5 h-5 text-[#C6934F]" />
                                        Politique d'annulation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-neutral-700">{booking.cancellationPolicy}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="border-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-lg">Tarification</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                                        <span className="text-neutral-600">Service</span>
                                        <span className="font-medium text-neutral-900">{booking.price} MAD</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-neutral-900">Total</span>
                                        <span className="text-2xl font-bold text-[#C6934F]">{booking.price} MAD</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Payment Status */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="border-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-lg">Informations de paiement</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-xs text-neutral-500 mb-1">Statut</p>
                                        <Badge className="bg-[#FFE5CC] text-[#8B5E34] hover:bg-[#FFE5CC] border-none">
                                            {booking.paymentStatus}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-500 mb-1">Mode de paiement</p>
                                        <p className="text-neutral-900 font-medium">{booking.paymentMethod}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="border-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-lg">Vos coordonnées</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Icon icon="solar:phone-linear" className="w-4 h-4 text-neutral-400" />
                                        <span className="text-neutral-700">{booking.clientPhone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon icon="solar:letter-linear" className="w-4 h-4 text-neutral-400" />
                                        <span className="text-neutral-700">{booking.clientEmail}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Icon icon="solar:map-point-linear" className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700 text-sm">{booking.clientAddress}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-3"
                        >
                            <Button className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                                <Icon icon="solar:check-circle-linear" className="w-4 h-4 mr-2" />
                                Confirmer la présence
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-neutral-200 hover:border-[#C6934F] hover:text-[#C6934F] hover:bg-[#FFF4E6]"
                            >
                                <Icon icon="solar:calendar-linear" className="w-4 h-4 mr-2" />
                                Reprogrammer
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-neutral-200 text-red-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
                            >
                                <Icon icon="solar:close-circle-linear" className="w-4 h-4 mr-2" />
                                Annuler la réservation
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
