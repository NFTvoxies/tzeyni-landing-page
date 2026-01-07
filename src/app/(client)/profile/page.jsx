"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockClients, moroccanCities } from '@/lib/mockData';

// Settings Option Card Component
const SettingsCard = ({ icon, iconBg, iconColor, title, description, onClick, danger = false }) => (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Card 
            className={`border-neutral-100 hover:shadow-sm transition-all cursor-pointer ${
                danger ? 'hover:border-red-200' : 'hover:border-amber-200'
            }`}
            onClick={onClick}
        >
            <CardContent className="p-5">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon icon={icon} className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    <div>
                        <h3 className="font-medium text-neutral-900">{title}</h3>
                        <p className="text-sm text-neutral-500">{description}</p>
                    </div>
                    <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5 text-neutral-400 ml-auto" />
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default function ClientProfile() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone: '',
        city: '',
        addresse: '',
        gender: '',
        avatar: '/assets/image/default-avatar.png'
    });

    useEffect(() => {
        // Load mock profile data
        const mockProfile = mockClients[0];
        if (mockProfile) {
            setProfile({
                full_name: mockProfile.full_name,
                email: mockProfile.email,
                phone: mockProfile.phone,
                city: mockProfile.city,
                addresse: mockProfile.addresse,
                gender: mockProfile.gender,
                avatar: mockProfile.avatar
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
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

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Profil mis à jour avec succès!');
        setIsEditing(false);
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#FFF9F5] pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-neutral-900">Mon Profil</h1>
                    <p className="text-neutral-500 mt-2">Gérez vos informations personnelles</p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="border-neutral-100 overflow-hidden">
                        {/* Cover & Avatar */}
                        <div className="relative h-32 bg-gradient-to-r from-[#C6934F] to-[#D4A574]">
                            <div className="absolute -bottom-12 left-8">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                                        <Image
                                            src={profile.avatar}
                                            alt="Profile"
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#C6934F] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#B8854A] transition-colors shadow-md">
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
                            </div>

                            {/* Edit button */}
                            <div className="absolute top-4 right-4">
                                {!isEditing ? (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        variant="ghost"
                                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white"
                                    >
                                        <Icon icon="solar:pen-linear" className="w-4 h-4 mr-2" />
                                        Modifier
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        variant="ghost"
                                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white"
                                    >
                                        <Icon icon="solar:close-circle-linear" className="w-4 h-4 mr-2" />
                                        Annuler
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Form */}
                        <CardContent className="p-8 pt-16">
                            <form onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name" className="text-neutral-700">
                                            <Icon icon="solar:user-linear" className="inline w-4 h-4 mr-1" />
                                            Nom complet
                                        </Label>
                                        <Input
                                            id="full_name"
                                            name="full_name"
                                            value={profile.full_name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`${
                                                isEditing
                                                    ? 'border-neutral-200 focus:border-amber-500 focus:ring-amber-500/20'
                                                    : 'border-transparent bg-neutral-50'
                                            }`}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-neutral-700">
                                            <Icon icon="solar:letter-linear" className="inline w-4 h-4 mr-1" />
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`${
                                                isEditing
                                                    ? 'border-neutral-200 focus:border-amber-500 focus:ring-amber-500/20'
                                                    : 'border-transparent bg-neutral-50'
                                            }`}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-neutral-700">
                                            <Icon icon="solar:phone-linear" className="inline w-4 h-4 mr-1" />
                                            Téléphone
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`${
                                                isEditing
                                                    ? 'border-neutral-200 focus:border-amber-500 focus:ring-amber-500/20'
                                                    : 'border-transparent bg-neutral-50'
                                            }`}
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="space-y-2">
                                        <Label htmlFor="gender" className="text-neutral-700">
                                            <Icon icon="solar:user-check-linear" className="inline w-4 h-4 mr-1" />
                                            Genre
                                        </Label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={profile.gender}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full h-10 px-3 rounded-md border text-sm ${
                                                isEditing
                                                    ? 'border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                                                    : 'border-transparent bg-neutral-50'
                                            } transition-all outline-none`}
                                        >
                                            <option value="">Sélectionner</option>
                                            <option value="Femme">Femme</option>
                                            <option value="Homme">Homme</option>
                                        </select>
                                    </div>

                                    {/* City */}
                                    <div className="space-y-2">
                                        <Label htmlFor="city" className="text-neutral-700">
                                            <Icon icon="solar:city-linear" className="inline w-4 h-4 mr-1" />
                                            Ville
                                        </Label>
                                        <select
                                            id="city"
                                            name="city"
                                            value={profile.city}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full h-10 px-3 rounded-md border text-sm ${
                                                isEditing
                                                    ? 'border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                                                    : 'border-transparent bg-neutral-50'
                                            } transition-all outline-none`}
                                        >
                                            <option value="">Sélectionner</option>
                                            {moroccanCities.map((city) => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Address - Full width */}
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="addresse" className="text-neutral-700">
                                            <Icon icon="solar:map-point-linear" className="inline w-4 h-4 mr-1" />
                                            Adresse
                                        </Label>
                                        <textarea
                                            id="addresse"
                                            name="addresse"
                                            value={profile.addresse}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            rows={3}
                                            className={`w-full px-3 py-2 rounded-md border text-sm resize-none ${
                                                isEditing
                                                    ? 'border-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                                                    : 'border-transparent bg-neutral-50'
                                            } transition-all outline-none`}
                                        />
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 flex justify-end gap-4"
                                    >
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsEditing(false)}
                                            className="text-neutral-600 hover:text-neutral-800"
                                        >
                                            Annuler
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-[#C6934F] hover:bg-[#B8854A] text-white border-none"
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
                                    </motion.div>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Additional Options */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 grid md:grid-cols-2 gap-4"
                >
                    <SettingsCard
                        icon="solar:lock-password-linear"
                        iconBg="bg-blue-50"
                        iconColor="text-blue-600"
                        title="Changer le mot de passe"
                        description="Mettez à jour votre mot de passe"
                    />

                    <SettingsCard
                        icon="solar:bell-linear"
                        iconBg="bg-violet-50"
                        iconColor="text-violet-600"
                        title="Notifications"
                        description="Gérez vos préférences de notifications"
                    />

                    <SettingsCard
                        icon="solar:shield-check-linear"
                        iconBg="bg-emerald-50"
                        iconColor="text-emerald-600"
                        title="Confidentialité"
                        description="Gérez vos données personnelles"
                    />

                    <SettingsCard
                        icon="solar:trash-bin-trash-linear"
                        iconBg="bg-red-50"
                        iconColor="text-red-600"
                        title="Supprimer le compte"
                        description="Supprimer définitivement votre compte"
                        danger
                    />
                </motion.div>
            </div>
        </main>
    );
}
