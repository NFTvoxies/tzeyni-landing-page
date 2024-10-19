// src/app/my-bookings/BookingHistoryList.jsx
import React from 'react'
import Image from 'next/image'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'

function BookingHistoryList({ bookingHistory, type }) {
    
    const cancelAppointment = (booking) => {
        // C'est ici que vous appelleriez normalement votre API pour annuler la réservation
        // Pour l'instant, nous allons juste afficher un message toast
        toast('Réservation annulée avec succès!')
    }
    
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {bookingHistory.map((booking, index) => (
                <div key={index} className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className='p-6'>
                        <div className='flex items-center mb-4'>
                            <Image 
                                src={booking.image}
                                alt={booking.serviceName}
                                width={80}
                                height={80}
                                className='rounded-full object-cover mr-4'
                            />
                            <div>
                                <h3 className='font-bold text-lg'>{booking.serviceName}</h3>
                                <p className='text-gray-600'>MAD {booking.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 text-sm text-gray-600'>
                            <p className='flex items-center'>
                                <Calendar className='w-4 h-4 mr-2 text-[#aa9270]' />
                                {booking.date}
                            </p>
                            <p className='flex items-center'>
                                <Clock className='w-4 h-4 mr-2 text-[#aa9270]' />
                                {booking.time}
                            </p>
                        </div>
                        {type === 'réservé' && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="mt-4 w-full border-red-300 hover:bg-red-50"
                                    >
                                        Annuler le rendez-vous
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Cette action ne peut pas être annulée. Cela annulera définitivement votre rendez-vous.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Non, le garder</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => cancelAppointment(booking)}
                                        >
                                            Oui, annulez-le
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookingHistoryList