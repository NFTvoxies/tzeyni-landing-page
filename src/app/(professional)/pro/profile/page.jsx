"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockProfessionals, mockCategories, moroccanCities } from '@/lib/mockData';

// Stat Card Component
const StatCard = ({ value, label, icon, iconBg, iconColor }) => (
    <div className="text-center p-4">
        <div className={`w-10 h-10 rounded-xl bg-[#FFF4E6] flex items-center justify-center mx-auto mb-2`}>
            <Icon icon={icon} className={`w-5 h-5 text-[#C6934F]`} />
        </div>
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
        <p className="text-neutral-500 text-sm">{label}</p>
    </div>
);

// Tab Button Component
const TabButton = ({ tab, isActive, onClick }) => (
    <Button
        onClick={onClick}
        variant={isActive ? "default" : "ghost"}
        className={`${
            isActive
                ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
        } whitespace-nowrap`}
    >
        <Icon icon={tab.icon} className="w-4 h-4 mr-2" />
        {tab.label}
    </Button>
);

export default function ProProfile() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone: '',
        city: '',
        addresse: '',
        gender: '',
        avatar: '/assets/image/professional.png',
        bio: '',
        experience: '',
        specialties: [],
        servicesAtHome: true,
        travelRadius: 15,
        priceRange: ''
    });

    useEffect(() => {
        const mockPro = mockProfessionals[0];
        if (mockPro) {
            setProfile({
                full_name: mockPro.full_name,
                email: mockPro.email,
                phone: mockPro.phone,
                city: mockPro.city,
                addresse: mockPro.addresse || '',
                gender: mockPro.gender,
                avatar: mockPro.avatar,
                bio: mockPro.bio || '',
                experience: mockPro.experience || '',
                specialties: mockPro.specialties || [],
                servicesAtHome: mockPro.servicesAtHome ?? true,
                travelRadius: mockPro.travelRadius || 15,
                priceRange: mockPro.priceRange || ''
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSpecialtyToggle = (specialty) => {
        setProfile(prev => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter(s => s !== specialty)
                : [...prev.specialties, specialty]
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Profil mis à jour avec succès!');
        setIsEditing(false);
        setIsLoading(false);
    };

    const tabs = [
        { id: 'profile', label: 'Informations', icon: 'solar:user-linear' },
        { id: 'services', label: 'Services', icon: 'solar:clipboard-list-linear' },
        { id: 'gallery', label: 'Portfolio', icon: 'solar:gallery-linear' },
        { id: 'availability', label: 'Disponibilité', icon: 'solar:calendar-linear' }
    ];

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Card with Stats */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="border-neutral-100 mb-8 overflow-hidden">
                        {/* Cover Banner */}
                        <div className="h-24 bg-gradient-to-r from-[#C6934F] to-[#D4A574]" />
                        
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-16 md:-mt-12">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white">
                                        <Image
                                            src={profile.avatar}
                                            alt="Profile"
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    {isEditing && (
                                        <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#C6934F] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#B8854A] transition-colors shadow-md">
                                            <Icon icon="solar:camera-linear" className="w-4 h-4 text-white" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 mt-4 md:mt-8">
                                    <h1 className="text-2xl font-bold text-neutral-900">{profile.full_name}</h1>
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {profile.specialties.map((specialty, i) => (
                                            <Badge key={i} className="bg-[#FFF4E6] text-[#C6934F] hover:bg-[#FFE5CC] border-none">
                                                {specialty}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4 mt-3 text-neutral-500 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Icon icon="solar:map-point-linear" className="w-4 h-4" />
                                            {profile.city}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Icon icon="solar:star-bold" className="w-4 h-4 text-amber-400" />
                                            4.9 (127 avis)
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-4 md:mt-8">
                                    {!isEditing ? (
                                        <Button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none"
                                        >
                                            <Icon icon="solar:pen-linear" className="w-4 h-4 mr-2" />
                                            Edit
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                            variant="outline"
                                            className="border-neutral-300 text-neutral-700"
                                        >
                                            <Icon icon="solar:close-circle-linear" className="w-4 h-4 mr-2" />
                                            Cancel
                                        </Button>
                                    )}
                                    <Button variant="outline" className="border-neutral-200">
                                        <Icon icon="solar:eye-linear" className="w-4 h-4 mr-2" />
                                        Aperçu
                                    </Button>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-100">
                                <StatCard 
                                    value="127" 
                                    label="Avis clients" 
                                    icon="solar:star-linear"
                                    iconBg="bg-amber-50"
                                    iconColor="text-amber-600"
                                />
                                <StatCard 
                                    value="342" 
                                    label="Réservations" 
                                    icon="solar:calendar-linear"
                                    iconBg="bg-blue-50"
                                    iconColor="text-blue-600"
                                />
                                <StatCard 
                                    value="98%" 
                                    label="Taux de réponse" 
                                    icon="solar:chat-round-linear"
                                    iconBg="bg-emerald-50"
                                    iconColor="text-emerald-600"
                                />
                                <StatCard 
                                    value="4.9" 
                                    label="Note moyenne" 
                                    icon="solar:medal-star-linear"
                                    iconBg="bg-violet-50"
                                    iconColor="text-violet-600"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab.id}
                            tab={tab}
                            isActive={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        />
                    ))}
                </div>

                {/* Content based on active tab */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {activeTab === 'profile' && (
                        <Card className="border-neutral-100">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Basic Info */}
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Nom complet</Label>
                                            <Input
                                                id="full_name"
                                                name="full_name"
                                                value={profile.full_name}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={!isEditing ? 'bg-neutral-50 border-transparent' : 'border-neutral-200 focus:border-amber-500'}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={!isEditing ? 'bg-neutral-50 border-transparent' : 'border-neutral-200 focus:border-amber-500'}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Téléphone</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={!isEditing ? 'bg-neutral-50 border-transparent' : 'border-neutral-200 focus:border-amber-500'}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="city">Ville</Label>
                                            <select
                                                id="city"
                                                name="city"
                                                value={profile.city}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={`w-full h-10 px-3 rounded-md border text-sm outline-none transition-all ${
                                                    !isEditing 
                                                        ? 'bg-neutral-50 border-transparent' 
                                                        : 'border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                                                }`}
                                            >
                                                {moroccanCities.map((city) => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="experience">Expérience</Label>
                                            <Input
                                                id="experience"
                                                name="experience"
                                                value={profile.experience}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="Ex: 5 ans d'expérience"
                                                className={!isEditing ? 'bg-neutral-50 border-transparent' : 'border-neutral-200 focus:border-amber-500'}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="travelRadius">Rayon de déplacement (km)</Label>
                                            <Input
                                                id="travelRadius"
                                                type="number"
                                                name="travelRadius"
                                                value={profile.travelRadius}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className={!isEditing ? 'bg-neutral-50 border-transparent' : 'border-neutral-200 focus:border-amber-500'}
                                            />
                                        </div>

                                        {/* Bio */}
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="bio">À propos de vous</Label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                value={profile.bio}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                rows={4}
                                                placeholder="Décrivez votre parcours et vos spécialités..."
                                                className={`w-full px-3 py-2 rounded-md border text-sm resize-none outline-none transition-all ${
                                                    !isEditing 
                                                        ? 'bg-neutral-50 border-transparent' 
                                                        : 'border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                                                }`}
                                            />
                                        </div>

                                        {/* Specialties */}
                                        <div className="md:col-span-2 space-y-3">
                                            <Label>Spécialités</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {mockCategories.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        type="button"
                                                        onClick={() => isEditing && handleSpecialtyToggle(cat.name)}
                                                        disabled={!isEditing}
                                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                                            profile.specialties.includes(cat.name)
                                                                ? 'bg-amber-500 text-white'
                                                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                                        } ${!isEditing && 'cursor-default opacity-80'}`}
                                                    >
                                                        {cat.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Services at home toggle */}
                                        <div className="md:col-span-2">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="servicesAtHome"
                                                    checked={profile.servicesAtHome}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-5 h-5 rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
                                                />
                                                <span className="text-neutral-700">
                                                    Je propose des services à domicile
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    {isEditing && (
                                        <div className="mt-8 flex justify-end gap-4">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setIsEditing(false)}
                                                className="text-neutral-600"
                                            >
                                                Annuler
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="bg-amber-500 hover:bg-amber-600 text-white"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Icon icon="solar:refresh-linear" className="w-5 h-5 mr-2 animate-spin" />
                                                        Enregistrement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icon icon="solar:check-circle-linear" className="w-5 h-5 mr-2" />
                                                        Enregistrer
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'gallery' && (
                        <Card className="border-neutral-100">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-neutral-900">Mon Portfolio</CardTitle>
                                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                                        <Icon icon="solar:add-circle-linear" className="w-5 h-5 mr-2" />
                                        Ajouter des photos
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    <div className="aspect-square rounded-xl bg-neutral-50 flex items-center justify-center border-2 border-dashed border-neutral-200 cursor-pointer hover:border-amber-400 transition-colors">
                                        <div className="text-center">
                                            <Icon icon="solar:gallery-add-linear" className="w-8 h-8 text-neutral-400 mx-auto" />
                                            <p className="text-sm text-neutral-500 mt-2">Ajouter</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-neutral-500 text-sm mt-6">
                                    Ajoutez des photos de vos réalisations pour montrer votre travail aux clients potentiels.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'services' && (
                        <Card className="border-neutral-100">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-neutral-900">Mes Services</CardTitle>
                                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                                        <Icon icon="solar:add-circle-linear" className="w-5 h-5 mr-2" />
                                        Ajouter un service
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-500">
                                    Gérez les services que vous proposez à vos clients.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'availability' && (
                        <Card className="border-neutral-100">
                            <CardHeader>
                                <CardTitle className="text-neutral-900">Ma Disponibilité</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-neutral-500">
                                    Définissez vos horaires de disponibilité pour les réservations.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </div>
        </main>
    );
}
