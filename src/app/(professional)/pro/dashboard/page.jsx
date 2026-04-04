"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockBookings, mockReviews, mockServices } from "@/lib/mockData";

// Stats Card Component
const StatsCard = ({ icon, label, value, trend, iconBg, iconColor }) => (
    <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon icon={icon} className={`w-4 h-4 ${iconColor}`} />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
        </CardContent>
    </Card>
);

// Recent Review Card
const ReviewCard = ({ review }) => (
    <Card className="border-neutral-100">
        <CardContent className="p-4">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF4E6] flex items-center justify-center text-[#C6934F] font-semibold flex-shrink-0">
                    {review.clientName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-neutral-900 truncate">{review.clientName}</p>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                            {[...Array(5)].map((_, i) => (
                                <Icon
                                    key={i}
                                    icon="solar:star-bold"
                                    className={`w-4 h-4 ${i < review.rating ? 'text-[#C6934F]' : 'text-neutral-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{review.comment}</p>
                    <p className="text-xs text-neutral-400 mt-2">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);

// Quick Action Button
const QuickActionPro = ({ icon, label, href, badge }) => (
    <Link href={href} className="block">
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="relative flex items-center gap-3 p-3.5 bg-white rounded-xl border border-neutral-100 hover:border-[#C6934F]/30 hover:shadow-sm transition-all"
        >
            <div className="w-10 h-10 rounded-lg bg-[#FFF4E6] flex items-center justify-center flex-shrink-0">
                <Icon icon={icon} className="w-5 h-5 text-[#C6934F]" />
            </div>
            <span className="font-medium text-neutral-700 flex-1">{label}</span>
            {badge && (
                <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {badge}
                </Badge>
            )}
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-neutral-400" />
        </motion.div>
    </Link>
);

export default function ProDashboard() {
    const { data: session } = useSession();
    const [todayBookings, setTodayBookings] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [acceptedIds, setAcceptedIds] = useState(new Set());
    const [declinedIds, setDeclinedIds] = useState(new Set());

    useEffect(() => {
        const today = mockBookings.filter(b => b.status === 'confirmed').slice(0, 4);
        const pending = mockBookings.filter(b => b.status === 'pending').slice(0, 2);

        setTodayBookings(today);
        setPendingBookings(pending);
        setRecentReviews(mockReviews.slice(0, 3));
    }, []);

    const proName = session?.user?.name?.split(' ')[0] || 'Sarah';

    const handleAcceptBooking = (bookingId, clientName) => {
        setAcceptedIds(prev => new Set(prev).add(bookingId));
        toast.success(`Booking from ${clientName} accepted! 🎉`, {
            description: 'You will receive a confirmation email shortly.',
            position: 'top-right',
            duration: 4000,
        });
    };

    const handleDeclineBooking = (bookingId, clientName) => {
        setDeclinedIds(prev => new Set(prev).add(bookingId));
        toast.info(`Booking from ${clientName} declined`, {
            description: 'The client will be notified of your response.',
            position: 'top-right',
            duration: 4000,
        });
    };

    const visiblePendingBookings = pendingBookings.filter(b => !declinedIds.has(b.id));
    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                        Welcome Back, <span className="text-neutral-900">{proName}!</span>
                    </h1>
                    <p className="text-neutral-600 mt-2">
                        Here's an overview of your business today
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    <StatsCard
                        icon="solar:dollar-linear"
                        label="Today's Earnings"
                        value="$235"
                        trend="2 appointments completed"
                        iconBg="bg-[#FFF4E6]"
                        iconColor="text-[#C6934F]"
                    />
                    <StatsCard
                        icon="solar:chart-2-linear"
                        label="This Week"
                        value="$1450"
                        trend="+12% from last week"
                        iconBg="bg-[#FFF4E6]"
                        iconColor="text-[#C6934F]"
                    />
                    <StatsCard
                        icon="solar:star-linear"
                        label="Rating"
                        value="4.9"
                        trend="127 total reviews"
                        iconBg="bg-[#FFF4E6]"
                        iconColor="text-[#C6934F]"
                    />
                    <StatsCard
                        icon="solar:users-group-rounded-linear"
                        label="Total Clients"
                        value="127"
                        trend="156 services completed"
                        iconBg="bg-[#FFF4E6]"
                        iconColor="text-[#C6934F]"
                    />
                </motion.div>

                {/* Main Content with Tabs */}
                <Tabs defaultValue="pending" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="pending">
                            Pending Requests
                            {visiblePendingBookings.length > 0 && (
                                <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#C6934F] text-white border-none">
                                    {visiblePendingBookings.length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>

                    {/* Pending Requests Tab */}
                    <TabsContent value="pending" className="space-y-4">
                        <Card className="border-border/60">
                            <CardHeader>
                                <CardTitle>Booking Requests</CardTitle>
                                <CardDescription>Review and respond to new booking requests</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {visiblePendingBookings.length > 0 ? (
                                    visiblePendingBookings.map((booking) => (
                                        <div key={booking.id} className="p-4 border border-border rounded-lg">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-semibold text-lg text-foreground">
                                                            {booking.clientName || "Jessica Brown"}
                                                        </h3>
                                                        <Badge variant={"secondary"}>
                                                            New
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-muted-foreground">
                                                            <span className="font-medium text-foreground">Service:</span> {booking.serviceName}
                                                        </p>
                                                        <p className="text-muted-foreground flex items-center gap-1">
                                                            <Icon icon="solar:calendar-linear" className="w-3 h-3" />
                                                            {new Date(booking.date).toLocaleDateString("en-US", {
                                                                weekday: "short",
                                                                month: "short",
                                                                day: "numeric",
                                                            })} at {booking.time}
                                                        </p>
                                                        <p className="text-muted-foreground">{booking.location || "123 Main St, Apt 4B"}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-right mb-2">
                                                        <span className="text-2xl font-bold text-foreground">${booking.price}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleDeclineBooking(booking.id, booking.clientName || "Client")}
                                                            className="bg-transparent border-neutral-300"
                                                        >
                                                            <Icon icon="solar:close-circle-linear" className="w-4 h-4 mr-1" />
                                                            Decline
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleAcceptBooking(booking.id, booking.clientName || "Client")}
                                                            className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none"
                                                        >
                                                            <Icon icon="solar:check-circle-linear" className="w-4 h-4 mr-1" />
                                                            Accept
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Icon icon="solar:inbox-linear" className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No pending requests</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Upcoming Appointments Tab */}
                    <TabsContent value="upcoming" className="space-y-4">
                        <Card className="border-border/60">
                            <CardHeader>
                                <CardTitle>Upcoming Appointments</CardTitle>
                                <CardDescription>Your confirmed bookings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {todayBookings.length > 0 ? (
                                    todayBookings.map((booking) => (
                                        <div key={booking.id} className="p-4 border border-border rounded-lg">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-semibold text-lg text-foreground">
                                                            {booking.clientName || "Rachel Green"}
                                                        </h3>
                                                        <Badge className="bg-[#C6934F] hover:bg-[#C6934F] text-white border-none">
                                                            Confirmed
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-muted-foreground">
                                                            <span className="font-medium text-foreground">Service:</span> {booking.serviceName}
                                                        </p>
                                                        <p className="text-muted-foreground flex items-center gap-1">
                                                            <Icon icon="solar:calendar-linear" className="w-3 h-3" />
                                                            {new Date(booking.date).toLocaleDateString("en-US", {
                                                                weekday: "short",
                                                                month: "short",
                                                                day: "numeric",
                                                            })} at {booking.time}
                                                        </p>
                                                        <p className="text-muted-foreground">{booking.location || "789 Elm Street"}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-right mb-2">
                                                        <span className="text-2xl font-bold text-foreground">${booking.price}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline" className="bg-transparent border-neutral-300">
                                                            <Icon icon="solar:eye-linear" className="w-4 h-4 mr-1" />
                                                            View Details
                                                        </Button>
                                                        <Button size="sm" className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none">
                                                            <Icon icon="solar:play-linear" className="w-4 h-4 mr-1" />
                                                            Start Service
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <Icon icon="solar:calendar-minimalistic-linear" className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No upcoming appointments</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Completed Tab */}
                    <TabsContent value="completed">
                        <Card className="border-border/60">
                            <CardHeader>
                                <CardTitle>Completed Services</CardTitle>
                                <CardDescription>Your service history</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground">
                                    <Icon icon="solar:clock-circle-linear" className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>Completed bookings will appear here</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Reviews and Quick Actions Row */}
                <div className="grid lg:grid-cols-3 gap-6 mt-8">
                    {/* Recent Reviews */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-neutral-900">
                                    Recent Reviews
                                </h2>
                                <Link href="/pro/reviews">
                                    <Button variant="ghost" size="sm" className="text-[#C6934F] hover:text-[#B8854A] hover:bg-[#FFF4E6]">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentReviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Actions Sidebar */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                                Quick Actions
                            </h2>
                            <div className="space-y-2.5">
                                <QuickActionPro
                                    icon="solar:calendar-add-linear"
                                    label="Manage Availability"
                                    href="/pro/calendar"
                                />
                                <QuickActionPro
                                    icon="solar:clipboard-list-linear"
                                    label="My Services"
                                    href="/pro/services"
                                    badge={mockServices.length}
                                />
                                <QuickActionPro
                                    icon="solar:inbox-linear"
                                    label="Messages"
                                    href="/pro/messages"
                                    badge={2}
                                />
                                <QuickActionPro
                                    icon="solar:wallet-2-linear"
                                    label="My Earnings"
                                    href="/pro/earnings"
                                />
                                <QuickActionPro
                                    icon="solar:settings-linear"
                                    label="Settings"
                                    href="/pro/settings"
                                />
                            </div>
                        </motion.div>

                        {/* Profile Completion Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="bg-gradient-to-br from-[#C6934F] to-[#D4A574] border-none text-white overflow-hidden">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-semibold">Complete Your Profile</p>
                                        <span className="text-white/80 text-sm">75%</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                                        <div className="bg-white h-2 rounded-full transition-all" style={{ width: '75%' }} />
                                    </div>
                                    <p className="text-white/80 text-sm mb-4">
                                        Add photos of your work to attract more clients
                                    </p>
                                    <Link href="/pro/profile">
                                        <Button className="w-full bg-white text-[#C6934F] hover:bg-white/90">
                                            Complete Profile
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}