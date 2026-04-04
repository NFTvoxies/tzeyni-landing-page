"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock bookings data
const initialBookings = [
    {
        id: 'booking-001',
        clientName: 'Jessica Brown',
        clientPhone: '+212 622 123 456',
        clientEmail: 'jessica@example.com',
        serviceName: 'Hair Coloring',
        date: '2026-01-28',
        time: '14:00',
        status: 'confirmed',
        price: 150,
        address: '123 Main St, Apt 4B, Casablanca',
        notes: 'Full head balayage with deep conditioning',
    },
    {
        id: 'booking-002',
        clientName: 'Amanda White',
        clientPhone: '+212 661 234 567',
        clientEmail: 'amanda@example.com',
        serviceName: 'Haircut & Style',
        date: '2026-01-30',
        time: '10:00',
        status: 'confirmed',
        price: 75,
        address: '456 Oak Ave, Suite 2, Casablanca',
        notes: 'Short pixie cut with texturing',
    },
    {
        id: 'booking-003',
        clientName: 'Rachel Green',
        clientPhone: '+212 667 345 678',
        clientEmail: 'rachel@example.com',
        serviceName: 'Bridal Styling',
        date: '2026-02-01',
        time: '09:00',
        status: 'pending',
        price: 250,
        address: '789 Elm Street, Rabat',
        notes: 'Updo for wedding - trial session',
        isNew: true,
    },
    {
        id: 'booking-004',
        clientName: 'Monica Geller',
        clientPhone: '+212 668 456 789',
        clientEmail: 'monica@example.com',
        serviceName: 'Hair Treatment',
        date: '2026-02-02',
        time: '15:00',
        status: 'pending',
        price: 80,
        address: '321 Pine Road, Casablanca',
        notes: 'Deep conditioning treatment for damaged hair',
        isNew: false,
    },
    {
        id: 'booking-005',
        clientName: 'Sophie Martin',
        clientPhone: '+212 622 567 890',
        clientEmail: 'sophie@example.com',
        serviceName: 'Coloration Complète',
        date: '2025-12-20',
        time: '14:00',
        status: 'completed',
        price: 350,
        address: '123 Boulevard Mohammed V, Casablanca',
        notes: 'Full color with highlights',
        rating: 5,
    },
    {
        id: 'booking-006',
        clientName: 'Phoebe Buffay',
        clientPhone: '+212 669 678 901',
        clientEmail: 'phoebe@example.com',
        serviceName: 'Hair Styling',
        date: '2025-12-18',
        time: '18:00',
        status: 'completed',
        price: 75,
        address: '555 Broadway, Marrakech',
        notes: 'Elegant waves for gala event',
        rating: 4,
    },
];

// Pending Booking Card with improved UX
const PendingBookingCard = ({ booking, onAccept, onDecline }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            layout
        >
            <Card className="border-border/60 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                    {/* Only show for truly new requests */}
                    {booking.isNew && (
                        <div className="px-6 pt-4 pb-2 bg-amber-50 border-b border-amber-200">
                            <div className="flex items-center gap-2">
                                <Icon icon="solar:bell-bing-linear" className="w-4 h-4 text-amber-600" />
                                <p className="text-sm font-medium text-amber-900">
                                    New request • Respond within 24 hours
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="p-6">
                        {/* Header: Client + Price (single display) */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                                    {booking.clientName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {booking.serviceName}
                                </p>
                            </div>

                            {/* Price - Single, Prominent Display */}
                            <div className="text-right">
                                <p className="text-3xl font-bold text-[#C6934F]">
                                    ${booking.price}
                                </p>
                                <Badge variant="secondary" className="mt-1 bg-amber-100 text-amber-800 border-none">
                                    Pending
                                </Badge>
                            </div>
                        </div>

                        {/* Primary Info: Date/Time */}
                        <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Icon icon="solar:calendar-linear" className="w-5 h-5 text-[#C6934F]" />
                                <div>
                                    <p className="font-semibold text-base text-foreground">
                                        {new Date(booking.date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                                        <Icon icon="solar:clock-circle-linear" className="w-3.5 h-3.5" />
                                        {booking.time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Expandable Details Toggle */}
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="w-full flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span className="font-medium">
                                {showDetails ? 'Hide' : 'Show'} contact details
                            </span>
                            <Icon
                                icon="solar:alt-arrow-down-linear"
                                className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-3 mt-3 overflow-hidden"
                                >
                                    {/* Address */}
                                    <div className="flex items-start gap-2">
                                        <Icon icon="solar:map-point-linear" className="w-4 h-4 text-[#C6934F] flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-foreground">{booking.address}</p>
                                    </div>

                                    {/* Quick Contact Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 bg-transparent border-neutral-300"
                                            onClick={() => window.location.href = `tel:${booking.clientPhone}`}
                                        >
                                            <Icon icon="solar:phone-calling-linear" className="w-4 h-4 mr-1" />
                                            Call
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 bg-transparent border-neutral-300"
                                            onClick={() => window.location.href = `mailto:${booking.clientEmail}`}
                                        >
                                            <Icon icon="solar:letter-linear" className="w-4 h-4 mr-1" />
                                            Email
                                        </Button>
                                    </div>

                                    {/* Notes */}
                                    {booking.notes && (
                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <p className="text-xs font-medium text-blue-900 mb-1">Client Notes</p>
                                            <p className="text-sm text-blue-800">{booking.notes}</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Action Buttons - Clear Hierarchy */}
                        <div className="mt-6 space-y-2">
                            <Button
                                size="lg"
                                onClick={() => onAccept(booking.id)}
                                className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white text-base font-semibold h-12"
                            >
                                <Icon icon="solar:check-circle-bold" className="w-5 h-5 mr-2" />
                                Accept Booking
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="w-full text-muted-foreground hover:text-foreground"
                                    >
                                        Decline Request
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Decline this booking?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {booking.clientName} will be notified that you&apos;re unavailable for this time slot.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => onDecline(booking.id)}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Decline Booking
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Active/Upcoming Booking Card with improved UX
const ActiveBookingCard = ({ booking, onNavigate, onComplete, onCancel }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
        >
            <Card className="border-border/60 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                    {/* Header: Client + Price */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                                {booking.clientName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {booking.serviceName}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-[#C6934F]">
                                ${booking.price}
                            </p>
                            <Badge className="mt-1 bg-[#C6934F] hover:bg-[#C6934F] text-white border-none">
                                Confirmed
                            </Badge>
                        </div>
                    </div>

                    {/* Date/Time Box */}
                    <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Icon icon="solar:calendar-linear" className="w-5 h-5 text-[#C6934F]" />
                            <div>
                                <p className="font-semibold text-base text-foreground">
                                    {new Date(booking.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                                    <Icon icon="solar:clock-circle-linear" className="w-3.5 h-3.5" />
                                    {booking.time}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Expandable Details */}
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span className="font-medium">
                            {showDetails ? 'Hide' : 'Show'} details
                        </span>
                        <Icon
                            icon="solar:alt-arrow-down-linear"
                            className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                        />
                    </button>

                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="space-y-3 mt-3 overflow-hidden"
                            >
                                <div className="flex items-start gap-2">
                                    <Icon icon="solar:map-point-linear" className="w-4 h-4 text-[#C6934F] flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-foreground">{booking.address}</p>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 bg-transparent border-neutral-300"
                                        onClick={() => window.location.href = `tel:${booking.clientPhone}`}
                                    >
                                        <Icon icon="solar:phone-calling-linear" className="w-4 h-4 mr-1" />
                                        Call
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 bg-transparent border-neutral-300"
                                        onClick={() => window.location.href = `mailto:${booking.clientEmail}`}
                                    >
                                        <Icon icon="solar:letter-linear" className="w-4 h-4 mr-1" />
                                        Email
                                    </Button>
                                </div>

                                {booking.notes && (
                                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <p className="text-xs font-medium text-blue-900 mb-1">Notes</p>
                                        <p className="text-sm text-blue-800">{booking.notes}</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-2">
                        <div className="flex gap-2">
                            <Button
                                size="lg"
                                onClick={() => onNavigate(booking.address)}
                                className="flex-1 bg-[#C6934F] hover:bg-[#B8854A] text-white h-11"
                            >
                                <Icon icon="solar:route-linear" className="w-5 h-5 mr-2" />
                                Navigate
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => onComplete(booking.id)}
                                className="flex-1 bg-transparent border-neutral-300 h-11"
                            >
                                <Icon icon="solar:check-circle-linear" className="w-5 h-5 mr-2" />
                                Complete
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onCancel(booking.id)}
                            className="w-full text-muted-foreground hover:text-red-600"
                        >
                            Cancel Booking
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Completed Booking Card
const CompletedBookingCard = ({ booking }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        layout
    >
        <Card className="border-border/60 bg-white">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                            {booking.clientName}
                        </h3>
                        <p className="text-sm text-muted-foreground">{booking.serviceName}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-[#C6934F]">${booking.price}</p>
                        <Badge variant="outline" className="mt-1 text-neutral-600 border-neutral-300">
                            Completed
                        </Badge>
                    </div>
                </div>

                {/* Rating */}
                {booking.rating && (
                    <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Icon
                                key={i}
                                icon="solar:star-bold"
                                className={`w-5 h-5 ${i < booking.rating
                                    ? 'text-[#C6934F]'
                                    : 'text-neutral-200'
                                    }`}
                            />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                            {booking.rating}.0 rating
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon icon="solar:calendar-linear" className="w-4 h-4" />
                    {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

// Empty State
const EmptyState = ({ icon, title, description }) => (
    <Card className="border-border/60 bg-white">
        <CardContent className="py-16 text-center">
            <Icon icon={icon} className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
            <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-2">
                {title}
            </h3>
            <p className="text-neutral-600 max-w-md mx-auto">
                {description}
            </p>
        </CardContent>
    </Card>
);

export default function ProBookingsPage() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState(initialBookings);

    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
    const completedBookings = bookings.filter(b => b.status === 'completed');

    const handleAcceptBooking = (bookingId) => {
        setBookings(prev =>
            prev.map(b =>
                b.id === bookingId ? { ...b, status: 'confirmed' } : b
            )
        );
        const booking = bookings.find(b => b.id === bookingId);
        toast.success(`Booking from ${booking?.clientName} accepted! 🎉`, {
            description: 'The client has been notified.',
            position: 'top-right',
        });
    };

    const handleDeclineBooking = (bookingId) => {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
        toast.info('Booking request declined', {
            description: 'The client has been notified.',
            position: 'top-right',
        });
    };

    const handleNavigate = (address) => {
        window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, "_blank");
    };

    const handleCompleteBooking = (bookingId) => {
        setBookings(prev =>
            prev.map(b =>
                b.id === bookingId ? { ...b, status: 'completed' } : b
            )
        );
        const booking = bookings.find(b => b.id === bookingId);
        toast.success(`Service for ${booking?.clientName} completed! ✨`, {
            description: 'Great job! The client can now leave a review.',
            position: 'top-right',
        });
    };

    const handleCancelBooking = (bookingId) => {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
        toast.info('Booking cancelled', {
            description: 'The client has been notified.',
            position: 'top-right',
        });
    };

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">
                        My Bookings
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Manage your upcoming and completed appointments
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Tabs defaultValue="pending" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="pending">
                                Pending Requests
                                {pendingBookings.length > 0 && (
                                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-amber-500 text-white border-none">
                                        {pendingBookings.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="upcoming">
                                Upcoming
                                {upcomingBookings.length > 0 && (
                                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#C6934F] text-white border-none">
                                        {upcomingBookings.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>

                        {/* Pending */}
                        <TabsContent value="pending" className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {pendingBookings.length > 0 ? (
                                    pendingBookings.map((booking, index) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <PendingBookingCard
                                                booking={booking}
                                                onAccept={handleAcceptBooking}
                                                onDecline={handleDeclineBooking}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <EmptyState
                                        icon="solar:inbox-linear"
                                        title="No Pending Requests"
                                        description="You don't have any pending booking requests at the moment."
                                    />
                                )}
                            </AnimatePresence>
                        </TabsContent>

                        {/* Upcoming */}
                        <TabsContent value="upcoming" className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {upcomingBookings.length > 0 ? (
                                    upcomingBookings.map((booking, index) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <ActiveBookingCard
                                                booking={booking}
                                                onNavigate={handleNavigate}
                                                onComplete={handleCompleteBooking}
                                                onCancel={handleCancelBooking}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <EmptyState
                                        icon="solar:calendar-minimalistic-linear"
                                        title="No Upcoming Bookings"
                                        description="Accept pending requests to see them here."
                                    />
                                )}
                            </AnimatePresence>
                        </TabsContent>

                        {/* Completed */}
                        <TabsContent value="completed" className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {completedBookings.length > 0 ? (
                                    completedBookings.map((booking, index) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <CompletedBookingCard booking={booking} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <EmptyState
                                        icon="solar:clock-circle-linear"
                                        title="No Completed Bookings"
                                        description="Your completed services will appear here."
                                    />
                                )}
                            </AnimatePresence>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </main>
    );
}
