// src/app/my-bookings/page.jsx
"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Head from "next/head"
import Navbar from '../components/Navbar';
import BookingHistoryList from '../components/BookingHistoryList';
import Footer from '../components/Footer';

function MyBookings() {
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        // Récupérer l'historique des réservations
        // Ceci est une implémentation fictive. Remplacez par un appel API réel.
        const mockBookings = [
            {
                id: 1,
                serviceName: "Service de Coiffure",
                date: "2024-10-19",
                time: "10:30",
                price: 150.00,
                image: "/assets/image/coiffure.png"
            },
            // Ajoutez plus de réservations fictives si nécessaire
        ];
        setBookingHistory(mockBookings);
    }, []);

    const filterData = (type) => {
        return bookingHistory.filter(item =>
            type === 'terminé' ?
            new Date(item.date) >= new Date() :
            new Date(item.date) < new Date()
        );
    }

    return (
        <>
            <Head>
                <title>TZEYNI | Mes Réservations</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
            </Head>
            <Navbar />
            <main className="relative bg-gradient-to-b from-[#e1c7b3] via-[#FCF9F7] to-white min-h-screen pt-20">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className='font-bold text-3xl mb-6'>Mes Réservations</h2>
                    <Tabs defaultValue="réservé" className="w-full">
                        <TabsList className="w-full justify-start mb-6">
                            <TabsTrigger value="réservé">Réservé</TabsTrigger>
                            <TabsTrigger value="terminé">Terminé</TabsTrigger>
                        </TabsList>
                        <TabsContent value="réservé">
                            <BookingHistoryList 
                                bookingHistory={filterData('réservé')}
                                type='réservé'
                            />
                        </TabsContent>
                        <TabsContent value="terminé">
                            <BookingHistoryList 
                                bookingHistory={filterData('terminé')}
                                type='terminé'
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default MyBookings