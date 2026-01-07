"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockBookings, mockProfessionals } from "@/lib/mockData";

// Upcoming Booking Card Component
const UpcomingBookingCard = ({ booking }) => {
    const professional = mockProfessionals.find(p => p.id === booking.professionalId);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card className="border-neutral-100 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                            <Image
                                src={booking.image || "/assets/image/default-service.png"}
                                alt={booking.serviceName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-neutral-900 truncate">{booking.serviceName}</p>
                            <p className="text-sm text-neutral-500">{professional?.full_name}</p>
                            <div className="flex items-center gap-2 mt-1.5 text-sm text-neutral-600">
                                <Icon icon="solar:calendar-linear" className="w-4 h-4 text-neutral-400" />
                                <span>{new Date(booking.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                                <span className="text-neutral-300">•</span>
                                <span>{booking.time}</span>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <Badge 
                                variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                                className={
                                    booking.status === 'confirmed' 
                                        ? 'bg-[#C6934F] text-white hover:bg-[#C6934F] border-none' 
                                        : booking.status === 'pending'
                                            ? 'bg-[#FFE5CC] text-[#8B5E34] hover:bg-[#FFE5CC] border-none'
                                            : ''
                                }
                            >
                                {booking.status === 'confirmed' ? 'confirmed' :
                                    booking.status === 'pending' ? 'pending' : booking.status}
                            </Badge>
                            <p className="text-sm font-semibold text-neutral-900 mt-2">{booking.price} MAD</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Quick Action Button Component
const QuickAction = ({ icon, label, href, iconBg, iconColor }) => (
    <Link href={href}>
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card className="border-neutral-100 hover:border-amber-200 hover:shadow-sm transition-all cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-5 h-full">
                    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
                        <Icon icon={icon} className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    <span className="text-sm font-medium text-neutral-700 text-center">{label}</span>
                </CardContent>
            </Card>
        </motion.div>
    </Link>
);

// Favorite Professional Card
const FavoriteProfessionalCard = ({ professional }) => (
    <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="border-neutral-100 hover:border-amber-200 transition-all cursor-pointer">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                            src={professional.avatar}
                            alt={professional.full_name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 truncate">{professional.full_name}</p>
                        <div className="flex items-center gap-1">
                            <Icon icon="solar:star-bold" className="w-4 h-4 text-amber-400" />
                            <span className="text-sm text-neutral-600">{professional.rating}</span>
                        </div>
                    </div>
                    <Link href={`/service/${professional.id}`}>
                        <Button size="sm" className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                            Book
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default function ClientDashboard() {
    const { data: session } = useSession();
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        const now = new Date();
        const upcoming = mockBookings.filter(b =>
            new Date(b.date) >= now && b.status !== 'cancelled'
        ).slice(0, 3);

        const recent = mockBookings.filter(b =>
            new Date(b.date) < now || b.status === 'completed'
        ).slice(0, 3);

        setUpcomingBookings(upcoming);
        setRecentBookings(recent);
    }, []);

    const userName = session?.user?.name?.split(' ')[0] || 'Client';

    return (
        <main className="min-h-screen bg-[#FFF9F5] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                        Bonjour, <span className="text-neutral-900">{userName}!</span>
                    </h1>
                    <p className="text-neutral-600 mt-2">
                        Manage your bookings and discover new beauty services
                    </p>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                    <QuickAction
                        icon="solar:calendar-linear"
                        label="Book a Service"
                        href="/service"
                        iconBg="bg-[#FFF4E6]"
                        iconColor="text-[#C6934F]"
                    />
                    <QuickAction
                        icon="solar:clock-circle-linear"
                        label="My Appointments"
                        href="/bookings"
                        iconBg="bg-[#FFF4E6]"
                        iconColor="text-[#C6934F]"
                    />
                    <QuickAction
                        icon="solar:star-linear"
                        label="Favorites"
                        href="/favorites"
                        iconBg="bg-[#FFF4E6]"
                        iconColor="text-[#C6934F]"
                    />
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Upcoming Bookings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-neutral-900">
                                    Upcoming Appointments
                                </h2>
                                <Link href="/bookings">
                                    <Button variant="ghost" size="sm" className="text-neutral-900 hover:text-neutral-700 hover:bg-transparent font-semibold">
                                        View All
                                    </Button>
                                </Link>
                            </div>

                            {upcomingBookings.length > 0 ? (
                                <div className="space-y-3">
                                    {upcomingBookings.map((booking) => (
                                        <UpcomingBookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            ) : (
                                <Card className="border-neutral-100">
                                    <CardContent className="p-8 text-center">
                                        <Icon icon="solar:calendar-search-linear" className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                                        <p className="text-neutral-500 mb-4">Aucune réservation à venir</p>
                                        <Link href="/service">
                                            <Button className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                                                Book Now
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                                Past Appointments
                            </h2>

                            {recentBookings.length > 0 ? (
                                <Card className="border-neutral-100">
                                    <CardContent className="p-0 divide-y divide-neutral-100">
                                        {recentBookings.map((booking) => (
                                            <div key={booking.id} className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                                        <Icon icon="solar:check-circle-linear" className="w-5 h-5 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-neutral-900">{booking.serviceName}</p>
                                                        <p className="text-sm text-neutral-500">
                                                            {new Date(booking.date).toLocaleDateString('fr-FR')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link href={`/service/${booking.professionalId}`}>
                                                    <Button variant="ghost" size="sm" className="text-[#C6934F] hover:text-[#B8854A] hover:bg-[#FFF4E6] font-medium">
                                                        Book Again
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="border-neutral-100">
                                    <CardContent className="p-6 text-center">
                                        <p className="text-neutral-500">Aucune activité récente</p>
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="space-y-6">
                        {/* Favorite Professionals */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                                Professionnels favoris
                            </h2>
                            <div className="space-y-3">
                                {mockProfessionals.slice(0, 3).map((pro) => (
                                    <FavoriteProfessionalCard key={pro.id} professional={pro} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Promo Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card className="bg-gradient-to-br from-[#C6934F] to-[#D4A574] border-none text-white overflow-hidden">
                                <CardContent className="p-6">
                                    <h3 className="font-semibold text-lg mb-2">Parrainez vos amis 🎁</h3>
                                    <p className="text-white/80 text-sm mb-4">
                                        Gagnez 50 MAD pour chaque ami qui réserve son premier service
                                    </p>
                                    <Button className="w-full bg-white text-[#C6934F] hover:bg-white/90 font-semibold">
                                        Invite Friends
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
