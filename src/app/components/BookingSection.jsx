// src/app/components/BookingSection.jsx
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

function BookingSection({ service }) {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [bookedSlot, setBookedSlot] = useState([]);

    useEffect(() => {
        getTime();
    }, []);

    useEffect(() => {
        date && getBusinessBookedSlot();
    }, [date]);

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push({ time: i + ':00 AM' });
            timeList.push({ time: i + ':30 AM' });
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({ time: i + ':00 PM' });
            timeList.push({ time: i + ':30 PM' });
        }
        setTimeSlot(timeList);
    };

    const getBusinessBookedSlot = () => {
        // C'est ici que vous récupéreriez généralement les créneaux réservés depuis votre backend
        // Pour l'instant, nous utiliserons une implémentation fictive
        setBookedSlot([]);
    };

    const saveBooking = () => {
        // C'est ici que vous enregistreriez généralement la réservation dans votre backend
        // Pour l'instant, nous utiliserons une implémentation fictive
        toast('Service réservé avec succès !');
        setDate(null);
        setSelectedTime('');
    };

    const isSlotBooked = (time) => {
        return bookedSlot.find(item => item.time === time);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Réserver maintenant</Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Réserver {service.title}</SheetTitle>
                    <SheetDescription>
                        Sélectionnez la date et le créneau horaire pour réserver le service
                        <div className='flex flex-col gap-5 items-baseline'>
                            <h2 className='mt-5 font-bold'>Sélectionner la date</h2>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </div>
                        <h2 className='my-5 font-bold'>Sélectionner le créneau horaire</h2>
                        <div className='grid grid-cols-3 gap-3'>
                            {timeSlot.map((item, index) => (
                                <Button key={index}
                                    disabled={isSlotBooked(item.time)}
                                    variant='outline'
                                    className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${selectedTime === item.time && 'bg-primary text-white'}`}
                                    onClick={() => setSelectedTime(item.time)}
                                >
                                    {item.time}
                                </Button>
                            ))}
                        </div>
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter className="mt-5">
                    <div className='flex gap-5'>
                        <Button variant="destructive">Annuler</Button>
                        <Button
                            disabled={!(selectedTime && date)}
                            onClick={() => saveBooking()}
                        >
                            Réserver
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default BookingSection;