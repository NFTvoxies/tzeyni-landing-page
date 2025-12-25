// src/app/profile/page.jsx
"use client"
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

export default function Profile() {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        image: '/assets/image/default-avatar.png' // Image par défaut
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Récupérer les données du profil
        // Ceci est une implémentation fictive. Remplacez par un appel API réel.
        const mockProfile = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            image: '/assets/image/profile-icon.png'
        };
        setProfile(mockProfile);
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
                setProfile(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, vous enverriez généralement le profil mis à jour à votre backend
        console.log('Profil mis à jour:', profile);
        toast.success('Profil mis à jour avec succès!');
        setIsEditing(false);
    };

    return (
        <>
            <Navbar />
            <main className="relative bg-gradient-to-b from-[#e1c7b3] via-[#FCF9F7] to-white min-h-screen pt-20">
                {/* Éléments de fond décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#b57d56]/10" />
                    <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-[#C4AB9A]/10" />
                    <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-[#b57d56]/5" />
                </div>
                <div className="absolute inset-0 bg-[url('/assets/image/pattern.png')] opacity-5"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-[#b57d56] to-[#C4AB9A] text-white">
                            <h3 className="text-lg leading-6 font-medium">Profil</h3>
                            <p className="mt-1 max-w-2xl text-sm">Détails personnels et application.</p>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col items-center">
                                    <div className="relative w-32 h-32 mb-4">
                                        <Image
                                            src={profile.image}
                                            alt="Profil"
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-full"
                                        />
                                        {isEditing && (
                                            <Label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </Label>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <Input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value={profile.firstName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value={profile.lastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={profile.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    {!isEditing ? (
                                        <Button type="button" onClick={() => setIsEditing(true)}>
                                            Modifier le profil
                                        </Button>
                                    ) : (
                                        <>
                                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                                Annuler
                                            </Button>
                                            <Button type="submit">
                                                Enregistrer les modifications
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}