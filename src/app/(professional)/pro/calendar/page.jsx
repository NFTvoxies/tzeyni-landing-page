"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithInput } from "@/components/ui/date-picker-with-input";
import { CalendarDays, Clock3, Plus, Trash2 } from "lucide-react";

const dayOrder = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
];

const initialAvailability = {
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "17:00" },
    saturday: { enabled: false, start: "10:00", end: "15:00" },
    sunday: { enabled: false, start: "10:00", end: "15:00" },
};

const initialBlocked = [
    { id: 1, date: "2025-01-20", reason: "Personal day" },
    { id: 2, date: "2025-02-14", reason: "Vacation" },
];

export default function ProfessionalCalendar() {
    const [availability, setAvailability] = useState(initialAvailability);
    const [blockedDates, setBlockedDates] = useState(initialBlocked);
    const [newBlocked, setNewBlocked] = useState({ date: "", reason: "" });

    const timeOptions = useMemo(() => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                times.push(time);
            }
        }
        return times;
    }, []);

    const handleToggleDay = (day, enabled) => {
        setAvailability((prev) => ({
            ...prev,
            [day]: { ...prev[day], enabled },
        }));
    };

    const handleTimeChange = (day, field, value) => {
        setAvailability((prev) => ({
            ...prev,
            [day]: { ...prev[day], [field]: value },
        }));
    };

    const handleAddBlocked = () => {
        if (!newBlocked.date || !newBlocked.reason.trim()) return;
        setBlockedDates((prev) => [
            ...prev,
            { id: Date.now(), date: newBlocked.date, reason: newBlocked.reason.trim() },
        ]);
        setNewBlocked({ date: "", reason: "" });
    };

    const handleRemoveBlocked = (id) => {
        setBlockedDates((prev) => prev.filter((item) => item.id !== id));
    };

    const handleSaveAvailability = () => {
        // Placeholder for future API call
        console.log("Saved availability", availability, blockedDates);
    };

    return (
        <main className="min-h-screen bg-[--background] pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Calendar</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Schedule Management</h1>
                    <p className="text-neutral-600">
                        Set your availability and manage your calendar
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card className="border-border/60">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <CalendarDays className="h-5 w-5 text-[#C6934F]" />
                                    Weekly Availability
                                </CardTitle>
                                <CardDescription>
                                    Set your working hours for each day of the week
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {dayOrder.map(({ key, label }) => {
                                    const hours = availability[key];
                                    return (
                                        <div
                                            key={key}
                                            className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-border rounded-lg bg-white"
                                        >
                                            <div className="flex items-center gap-3 md:w-44">
                                                <Switch
                                                    checked={hours.enabled}
                                                    onCheckedChange={(checked) => handleToggleDay(key, checked)}
                                                    className="data-[state=checked]:bg-[#C6934F] data-[state=unchecked]:bg-neutral-200"
                                                />
                                                <div>
                                                    <p className="font-medium text-neutral-900">{label}</p>
                                                    {!hours.enabled && (
                                                        <p className="text-sm text-neutral-500 italic">Unavailable</p>
                                                    )}
                                                </div>
                                            </div>

                                            {hours.enabled && (
                                                <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                                                    <div className="flex items-center gap-2 w-full">
                                                        <Label className="text-sm text-neutral-600 flex items-center gap-1">
                                                            <Clock3 className="h-4 w-4" /> From
                                                        </Label>
                                                        <Select
                                                            value={hours.start}
                                                            onValueChange={(value) => handleTimeChange(key, "start", value)}
                                                        >
                                                            <SelectTrigger className="w-full h-10 border border-border bg-white text-sm text-foreground focus:ring-[#C6934F]">
                                                                <SelectValue placeholder="Select time" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {timeOptions.map((time) => (
                                                                    <SelectItem key={time} value={time}>
                                                                        {time}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="flex items-center gap-2 w-full">
                                                        <Label className="text-sm text-neutral-600 flex items-center gap-1">
                                                            <Clock3 className="h-4 w-4" /> To
                                                        </Label>
                                                        <Select
                                                            value={hours.end}
                                                            onValueChange={(value) => handleTimeChange(key, "end", value)}
                                                        >
                                                            <SelectTrigger className="w-full h-10 border border-border bg-white text-sm text-foreground focus:ring-[#C6934F]">
                                                                <SelectValue placeholder="Select time" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {timeOptions.map((time) => (
                                                                    <SelectItem key={time} value={time}>
                                                                        {time}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                <Button
                                    className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white"
                                    onClick={handleSaveAvailability}
                                >
                                    Save Availability
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="border-border/60">
                            <CardHeader>
                                <CardTitle className="text-xl">Blocked Dates</CardTitle>
                                <CardDescription>Manage your time off</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {blockedDates.length ? (
                                    blockedDates.map((blocked) => (
                                        <div
                                            key={blocked.id}
                                            className="flex items-start justify-between p-3 border border-border rounded-lg bg-white"
                                        >
                                            <div>
                                                <p className="font-medium text-neutral-900">
                                                    {new Date(blocked.date).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                                <p className="text-sm text-neutral-600">{blocked.reason}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveBlocked(blocked.id)}
                                                className="text-destructive hover:text-destructive"
                                                aria-label="Remove blocked date"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-sm text-neutral-500 py-6">
                                        No blocked dates yet
                                    </div>
                                )}

                                <div className="border-t border-border pt-4 space-y-3">
                                    <p className="text-sm font-medium text-neutral-900">Add a blocked date</p>
                                    <DatePickerWithInput
                                        label="Date"
                                        value={newBlocked.date}
                                        onChange={(date) => setNewBlocked((prev) => ({ ...prev, date }))}
                                        placeholder="Select a date..."
                                    />
                                    <div className="space-y-2">
                                        <Label className="text-sm text-neutral-600">Reason</Label>
                                        <Input
                                            placeholder="Vacation, personal day..."
                                            value={newBlocked.reason}
                                            onChange={(e) => setNewBlocked((prev) => ({ ...prev, reason: e.target.value }))}
                                            className="bg-white"
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full bg-transparent"
                                        onClick={handleAddBlocked}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Blocked Date
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
