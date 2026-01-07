"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockBookings, mockProfessionals } from '@/lib/mockData';

const statusConfig = {
    pending: { label: 'pending', bgColor: 'bg-[#FFE5CC]', textColor: 'text-[#8B5E34]', icon: 'solar:clock-circle-linear' },
    confirmed: { label: 'confirmed', bgColor: 'bg-[#C6934F]', textColor: 'text-white', icon: 'solar:check-circle-linear' },
    completed: { label: 'completed', bgColor: 'bg-blue-100', textColor: 'text-blue-700', icon: 'solar:check-read-linear' },
    cancelled: { label: 'cancelled', bgColor: 'bg-red-100', textColor: 'text-red-700', icon: 'solar:close-circle-linear' }
};

// Booking Card Component
const BookingCard = ({ booking }) => {
    const professional = mockProfessionals.find(p => p.id === booking.professionalId);
    const status = statusConfig[booking.status] || statusConfig.pending;
    const bookingDate = new Date(booking.date);
    const isPast = bookingDate < new Date();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card className={`border-neutral-100 overflow-hidden hover:shadow-md transition-shadow ${
                !isPast ? 'hover:border-amber-200' : ''
            }`}>
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                        {/* Service Image */}
                        <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                            <Image
                                src={booking.image || "/assets/image/default-service.png"}
                                alt={booking.serviceName}
                                fill
                                className="object-cover"
                            />
                            {!isPast && (
                                <div className="absolute top-2 left-2">
                                    <Badge className={`${status.bgColor} ${status.textColor} hover:${status.bgColor} border-none`}>
                                        <Icon icon={status.icon} className="w-3 h-3 mr-1" />
                                        {status.label}
                                    </Badge>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg text-neutral-900">{booking.serviceName}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-6 h-6 rounded-full overflow-hidden">
                                            <Image
                                                src={professional?.avatar || "/assets/image/default-avatar.png"}
                                                alt={professional?.full_name}
                                                width={24}
                                                height={24}
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm text-neutral-600">{professional?.full_name}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-neutral-500">
                                        <span className="flex items-center gap-1">
                                            <Icon icon="solar:calendar-linear" className="w-4 h-4 text-neutral-400" />
                                            {bookingDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Icon icon="solar:clock-circle-linear" className="w-4 h-4 text-neutral-400" />
                                            {booking.time}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Icon icon="solar:map-point-linear" className="w-4 h-4 text-neutral-400" />
                                            {booking.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-xl font-bold text-amber-600">{booking.price} MAD</span>

                                    {isPast && booking.status === 'completed' && (
                                        <Badge className={`${status.bgColor} ${status.textColor} hover:${status.bgColor} border-none`}>
                                            <Icon icon={status.icon} className="w-3 h-3 mr-1" />
                                            {status.label}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-100">
                                {!isPast && booking.status === 'confirmed' && (
                                    <>
                                        <Link href={`/bookings/${booking.id}`}>
                                            <Button size="sm" className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                                                <Icon icon="solar:eye-linear" className="w-4 h-4 mr-1" />
                                                Voir détails
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="secondary" className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                                            <Icon icon="solar:chat-round-linear" className="w-4 h-4 mr-1" />
                                            Contacter
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <Icon icon="solar:close-circle-linear" className="w-4 h-4 mr-1" />
                                            Annuler
                                        </Button>
                                    </>
                                )}

                                {booking.status === 'completed' && (
                                    <>
                                        <Link href={`/service/${booking.professionalId}`}>
                                            <Button size="sm" className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                                                <Icon icon="solar:refresh-linear" className="w-4 h-4 mr-1" />
                                                Réserver à nouveau
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="secondary" className="bg-[#FFE5CC] text-[#8B5E34] hover:bg-[#FFD9B3] border-none">
                                            <Icon icon="solar:star-linear" className="w-4 h-4 mr-1" />
                                            Laisser un avis
                                        </Button>
                                    </>
                                )}

                                {booking.status === 'pending' && (
                                    <span className="text-sm text-neutral-500">
                                        En attente de confirmation par le professionnel
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Tab Button Component
const TabButton = ({ tab, isActive, onClick }) => (
    <Button
        onClick={onClick}
        variant={isActive ? "default" : "outline"}
        className={`${
            isActive
                ? 'bg-[#C6934F] hover:bg-[#B8854A] text-white border-[#C6934F]'
                : 'bg-white text-neutral-600 hover:bg-neutral-50 border-neutral-200'
        }`}
    >
        {tab.label}
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            isActive
                ? 'bg-white/20 text-white'
                : 'bg-neutral-100 text-neutral-500'
        }`}>
            {tab.count}
        </span>
    </Button>
);

export default function ClientBookings() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        setBookings(mockBookings);
    }, []);

    const now = new Date();
    const upcomingBookings = bookings.filter(b =>
        new Date(b.date) >= now && b.status !== 'cancelled' && b.status !== 'completed'
    );
    const pastBookings = bookings.filter(b =>
        new Date(b.date) < now || b.status === 'completed'
    );
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

    const tabs = [
        { id: 'upcoming', label: 'À venir', count: upcomingBookings.length },
        { id: 'past', label: 'Passées', count: pastBookings.length },
        { id: 'cancelled', label: 'Annulées', count: cancelledBookings.length }
    ];

    const getActiveBookings = () => {
        switch (activeTab) {
            case 'upcoming': return upcomingBookings;
            case 'past': return pastBookings;
            case 'cancelled': return cancelledBookings;
            default: return upcomingBookings;
        }
    };

    return (
        <main className="min-h-screen bg-[#FFF9F5] pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-neutral-900">Mes Réservations</h1>
                    <p className="text-neutral-500 mt-2">Gérez et suivez vos rendez-vous beauté</p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 mb-6"
                >
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab.id}
                            tab={tab}
                            isActive={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        />
                    ))}
                </motion.div>

                {/* Bookings List */}
                <div className="space-y-4">
                    {getActiveBookings().length > 0 ? (
                        getActiveBookings().map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Card className="border-neutral-100">
                                <CardContent className="p-12 text-center">
                                    <Icon
                                        icon={activeTab === 'upcoming' ? 'solar:calendar-search-linear' : 'solar:clipboard-list-linear'}
                                        className="w-16 h-16 text-neutral-300 mx-auto mb-4"
                                    />
                                    <h3 className="text-lg font-medium text-neutral-900 mb-2">
                                        {activeTab === 'upcoming' && 'Aucune réservation à venir'}
                                        {activeTab === 'past' && 'Aucune réservation passée'}
                                        {activeTab === 'cancelled' && 'Aucune réservation annulée'}
                                    </h3>
                                    <p className="text-neutral-500 mb-6">
                                        {activeTab === 'upcoming' && 'Explorez nos professionnels et réservez votre prochain soin beauté'}
                                    </p>
                                    {activeTab === 'upcoming' && (
                                        <Link href="/service">
                                            <Button className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                                                <Icon icon="solar:magnifer-linear" className="w-5 h-5 mr-2" />
                                                Trouver un professionnel
                                            </Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </main>
    );
}
