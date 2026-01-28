"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";

// Initial mock services data
const initialServices = [
    {
        id: 'svc-001',
        name: 'Haircut & Style',
        description: 'Professional haircut with styling and finishing',
        price: 60,
        duration: 60,
        bookings: 42,
        views: 324,
        isActive: true
    },
    {
        id: 'svc-002',
        name: 'Hair Coloring',
        description: 'Full head coloring, highlights, or balayage treatments',
        price: 150,
        duration: 120,
        bookings: 38,
        views: 512,
        isActive: true
    },
    {
        id: 'svc-003',
        name: 'Hair Treatment',
        description: 'Deep conditioning and restorative treatments',
        price: 80,
        duration: 45,
        bookings: 25,
        views: 287,
        isActive: true
    },
    {
        id: 'svc-004',
        name: 'Bridal Styling',
        description: 'Complete bridal hair styling for your special day',
        price: 250,
        duration: 180,
        bookings: 18,
        views: 445,
        isActive: true
    },
    {
        id: 'svc-005',
        name: 'Kids Haircut',
        description: 'Fun and gentle haircuts for children',
        price: 35,
        duration: 30,
        bookings: 20,
        views: 155,
        isActive: false
    }
];

// Stats Card Component
const StatsCard = ({ icon, label, value, subtitle, iconColor }) => (
    <Card className="border-border/60 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon icon={icon} className={`w-5 h-5 ${iconColor}`} />
        </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold text-foreground">{value}</div>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </CardContent>
    </Card>
);

// Service Card Component
const ServiceCard = ({ service, onEdit, onDelete }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        layout
    >
        <Card className="border-border/60 bg-white overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                {/* Header with name and badge */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl font-bold text-foreground">
                            {service.name}
                        </h3>
                        <Badge
                            className={`${service.isActive
                                    ? 'bg-[#C6934F] hover:bg-[#B8854A] text-white border-none'
                                    : 'bg-neutral-200 text-neutral-600 border-none'
                                }`}
                        >
                            {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(service)}
                            className="h-9 w-9 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                        >
                            <Icon icon="solar:pen-2-linear" className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Icon icon="solar:trash-bin-trash-linear" className="w-4 h-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Service</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete "{service.name}"? This action cannot be undone and will remove all associated booking history.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => onDelete(service.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Price</p>
                        <p className="text-lg font-semibold text-foreground">
                            $ {service.price}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="text-lg font-semibold text-foreground flex items-center gap-1">
                            <Icon icon="solar:clock-circle-linear" className="w-4 h-4 text-[#C6934F]" />
                            {service.duration}m
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Bookings</p>
                        <p className="text-lg font-semibold text-foreground">{service.bookings}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Views</p>
                        <p className="text-lg font-semibold text-foreground">{service.views}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

// Service Form Component
const ServiceForm = ({ service, onSave, onClose, isOpen }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        isActive: true
    });

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name,
                description: service.description,
                price: service.price.toString(),
                duration: service.duration.toString(),
                isActive: service.isActive
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                duration: '',
                isActive: true
            });
        }
    }, [service, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.duration) {
            toast.error('Please fill in all required fields');
            return;
        }

        onSave({
            ...service,
            id: service?.id || `svc-${Date.now()}`,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            duration: parseInt(formData.duration),
            isActive: formData.isActive,
            bookings: service?.bookings || 0,
            views: service?.views || 0
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Service Name *</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Haircut & Style"
                    className="border-neutral-200 focus:border-[#C6934F] focus:ring-[#C6934F]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your service..."
                    className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-neutral-200 focus:border-[#C6934F] focus:ring-1 focus:ring-[#C6934F] focus:outline-none resize-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="60"
                        className="border-neutral-200 focus:border-[#C6934F] focus:ring-[#C6934F]"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes) *</Label>
                    <Input
                        id="duration"
                        type="number"
                        min="0"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="60"
                        className="border-neutral-200 focus:border-[#C6934F] focus:ring-[#C6934F]"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-neutral-100">
                <div className="space-y-0.5">
                    <Label htmlFor="active">Active Status</Label>
                    <p className="text-xs text-muted-foreground">
                        Make this service visible to clients
                    </p>
                </div>
                <Switch
                    id="active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    className="data-[state=checked]:bg-[#C6934F]"
                />
            </div>

            <div className="flex gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="flex-1 bg-[#C6934F] hover:bg-[#B8854A] text-white"
                >
                    {service ? 'Update Service' : 'Add Service'}
                </Button>
            </div>
        </form>
    );
};

export default function ProServicesPage() {
    const { data: session } = useSession();
    const [services, setServices] = useState(initialServices);
    const [editingService, setEditingService] = useState(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Calculate totals
    const totalBookings = services.reduce((sum, s) => sum + s.bookings, 0);
    const totalViews = services.reduce((sum, s) => sum + s.views, 0);

    const handleAddService = () => {
        setEditingService(null);
        setIsSheetOpen(true);
    };

    const handleEditService = (service) => {
        setEditingService(service);
        setIsSheetOpen(true);
    };

    const handleSaveService = (serviceData) => {
        if (editingService) {
            // Update existing service
            setServices(prev =>
                prev.map(s => s.id === serviceData.id ? serviceData : s)
            );
            toast.success(`"${serviceData.name}" has been updated! ✨`, {
                description: 'Your service changes are now live.',
                position: 'top-right',
            });
        } else {
            // Add new service
            setServices(prev => [...prev, serviceData]);
            toast.success(`"${serviceData.name}" has been added! 🎉`, {
                description: 'Your new service is now visible to clients.',
                position: 'top-right',
            });
        }
        setIsSheetOpen(false);
        setEditingService(null);
    };

    const handleDeleteService = (serviceId) => {
        const service = services.find(s => s.id === serviceId);
        setServices(prev => prev.filter(s => s.id !== serviceId));
        toast.success(`"${service?.name}" has been deleted`, {
            description: 'The service has been removed from your offerings.',
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
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
                >
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900">
                            My Services
                        </h1>
                        <p className="text-neutral-600 mt-1">
                            Manage and showcase your professional services
                        </p>
                    </div>

                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button
                                onClick={handleAddService}
                                className="bg-[#C6934F] hover:bg-[#B8854A] text-white gap-2"
                            >
                                <Icon icon="solar:add-circle-linear" className="w-5 h-5" />
                                Add Service
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle className="font-serif text-2xl">
                                    {editingService ? 'Edit Service' : 'Add New Service'}
                                </SheetTitle>
                                <SheetDescription>
                                    {editingService
                                        ? 'Update your service details below.'
                                        : 'Create a new service offering for your clients.'}
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6">
                                <ServiceForm
                                    service={editingService}
                                    onSave={handleSaveService}
                                    onClose={() => setIsSheetOpen(false)}
                                    isOpen={isSheetOpen}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                >
                    <StatsCard
                        icon="solar:chart-2-linear"
                        label="Total Bookings"
                        value={totalBookings}
                        subtitle="Across all services"
                        iconColor="text-[#C6934F]"
                    />
                    <StatsCard
                        icon="solar:eye-linear"
                        label="Total Views"
                        value={totalViews.toLocaleString()}
                        subtitle="Profile views"
                        iconColor="text-[#C6934F]"
                    />
                </motion.div>

                {/* Services List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <ServiceCard
                                        service={service}
                                        onEdit={handleEditService}
                                        onDelete={handleDeleteService}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <Card className="border-border/60 bg-white">
                                <CardContent className="py-16 text-center">
                                    <Icon
                                        icon="solar:clipboard-list-linear"
                                        className="w-16 h-16 mx-auto text-neutral-300 mb-4"
                                    />
                                    <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-2">
                                        No Services Yet
                                    </h3>
                                    <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                                        Start adding your professional services to attract clients and manage bookings.
                                    </p>
                                    <Button
                                        onClick={handleAddService}
                                        className="bg-[#C6934F] hover:bg-[#B8854A] text-white gap-2"
                                    >
                                        <Icon icon="solar:add-circle-linear" className="w-5 h-5" />
                                        Add Your First Service
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}
