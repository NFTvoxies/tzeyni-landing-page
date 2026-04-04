"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// Mock reviews data
const initialReviews = [
    {
        id: 1,
        client: "Jessica Brown",
        service: "Hair Coloring",
        date: "2024-12-20",
        rating: 5,
        title: "Absolutely Perfect!",
        comment:
            "Sarah did an amazing job with my hair. The color turned out even better than I expected, and she was so professional and friendly throughout the entire process.",
        helpful: 24,
        hasResponse: false,
    },
    {
        id: 2,
        client: "Amanda White",
        service: "Haircut & Style",
        date: "2024-12-10",
        rating: 5,
        title: "Excellent Service",
        comment:
            "Very skilled and attentive. The haircut was exactly what I wanted. Will definitely book again!",
        helpful: 12,
        hasResponse: true,
        response: {
            date: "2024-12-11",
            text: "Thank you so much, Amanda! I'm thrilled you love your new look. Can't wait to see you again!",
        },
    },
    {
        id: 3,
        client: "Rachel Green",
        service: "Hair Styling",
        date: "2024-11-28",
        rating: 4,
        title: "Great Experience",
        comment:
            "The styling was beautiful and the service was professional. A minor scheduling issue but overall very satisfied.",
        helpful: 8,
        hasResponse: false,
    },
    {
        id: 4,
        client: "Monica Geller",
        service: "Bridal Styling",
        date: "2024-11-15",
        rating: 5,
        title: "Dream Wedding Hair!",
        comment:
            "Made my wedding day extra special. The updo was absolutely stunning and lasted all night. Highly recommend!",
        helpful: 31,
        hasResponse: true,
        response: {
            date: "2024-11-16",
            text: "It was such an honor to be part of your special day, Monica! You looked beautiful. Wishing you all the best!",
        },
    },
];

// Stats Card Component
const StatsCard = ({ title, value, icon, highlight = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <Card className="border-border/60 bg-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon icon={icon} className="w-4 h-4" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`text-4xl font-bold ${highlight ? 'text-[#C6934F]' : 'text-foreground'}`}>
                    {value}
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

// Review Card Component
const ReviewCard = ({ review, onRespond }) => {
    const [responseText, setResponseText] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleSubmitResponse = () => {
        if (!responseText.trim()) return;
        onRespond(review.id, responseText);
        setResponseText("");
        setIsSheetOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            layout
        >
            <Card className="border-border/60 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                    {/* Header: Client + Badge */}
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="font-serif text-lg font-bold text-foreground">
                                {review.client}
                            </h3>
                            <p className="text-sm text-[#C6934F]">{review.service}</p>
                        </div>
                        {!review.hasResponse && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-none">
                                No Response
                            </Badge>
                        )}
                    </div>

                    {/* Rating + Date */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Icon
                                    key={i}
                                    icon="solar:star-bold"
                                    className={`w-4 h-4 ${i < review.rating
                                        ? 'text-[#C6934F]'
                                        : 'text-neutral-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                        <h4 className="font-semibold text-foreground mb-1">{review.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Professional Response */}
                    {review.hasResponse && review.response && (
                        <div className="mb-4 p-4 bg-[#C6934F]/5 border border-[#C6934F]/20 rounded-lg">
                            <p className="text-xs font-semibold text-[#C6934F] mb-2">Your Response</p>
                            <p className="text-sm text-foreground mb-2">{review.response.text}</p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(review.response.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-border/40">
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                            <Icon icon="solar:like-linear" className="w-4 h-4 mr-1" />
                            Helpful ({review.helpful})
                        </Button>

                        {!review.hasResponse && (
                            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-[#C6934F] hover:text-[#B8854A] ml-auto"
                                    >
                                        <Icon icon="solar:reply-linear" className="w-4 h-4 mr-1" />
                                        Respond
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle className="font-serif">Respond to {review.client}</SheetTitle>
                                        <SheetDescription>
                                            Write a thoughtful response to this review. Your response will be visible to everyone.
                                        </SheetDescription>
                                    </SheetHeader>

                                    <div className="py-6 space-y-4">
                                        {/* Original Review Summary */}
                                        <div className="p-4 bg-neutral-50 rounded-lg">
                                            <div className="flex gap-0.5 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Icon
                                                        key={i}
                                                        icon="solar:star-bold"
                                                        className={`w-4 h-4 ${i < review.rating
                                                            ? 'text-[#C6934F]'
                                                            : 'text-neutral-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm font-medium text-foreground mb-1">{review.title}</p>
                                            <p className="text-sm text-muted-foreground line-clamp-3">{review.comment}</p>
                                        </div>

                                        {/* Response Input */}
                                        <div>
                                            <label className="text-sm font-medium text-foreground mb-2 block">
                                                Your Response
                                            </label>
                                            <Textarea
                                                value={responseText}
                                                onChange={(e) => setResponseText(e.target.value)}
                                                placeholder="Thank you for your feedback..."
                                                className="min-h-[120px] resize-none"
                                            />
                                        </div>
                                    </div>

                                    <SheetFooter>
                                        <Button
                                            onClick={handleSubmitResponse}
                                            disabled={!responseText.trim()}
                                            className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white"
                                        >
                                            <Icon icon="solar:send-linear" className="w-4 h-4 mr-2" />
                                            Submit Response
                                        </Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function ProReviewsPage() {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState(initialReviews);

    // Calculate stats
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : "0.0";
    const totalReviews = reviews.length;
    const fiveStarCount = reviews.filter(r => r.rating === 5).length;
    const responseCount = reviews.filter(r => r.hasResponse).length;

    const handleRespond = (reviewId, responseText) => {
        setReviews(prev =>
            prev.map(r =>
                r.id === reviewId
                    ? {
                        ...r,
                        hasResponse: true,
                        response: {
                            date: new Date().toISOString().split('T')[0],
                            text: responseText,
                        },
                    }
                    : r
            )
        );

        const review = reviews.find(r => r.id === reviewId);
        toast.success(`Response sent to ${review?.client}! ✨`, {
            description: 'Your response is now visible.',
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
                        Client Reviews
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        See what your clients are saying and respond to feedback
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatsCard
                        title="Average Rating"
                        value={
                            <div className="flex items-end gap-1">
                                <span>{averageRating}</span>
                                <span className="text-lg text-[#C6934F] mb-1">/5</span>
                            </div>
                        }
                        icon="solar:star-linear"
                    />
                    <StatsCard
                        title="Total Reviews"
                        value={totalReviews}
                        icon="solar:chat-round-dots-linear"
                    />
                    <StatsCard
                        title="5 Star Reviews"
                        value={fiveStarCount}
                        icon="solar:star-shine-linear"
                        highlight
                    />
                    <StatsCard
                        title="Responses"
                        value={responseCount}
                        icon="solar:reply-linear"
                    />
                </div>

                {/* Average Rating Stars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Icon
                                    key={i}
                                    icon="solar:star-bold"
                                    className={`w-6 h-6 ${i < Math.floor(Number(averageRating))
                                        ? 'text-[#C6934F]'
                                        : 'text-neutral-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            Based on {totalReviews} reviews
                        </span>
                    </div>
                </motion.div>

                {/* Reviews List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <ReviewCard
                                    review={review}
                                    onRespond={handleRespond}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {reviews.length === 0 && (
                    <Card className="border-border/60 bg-white">
                        <CardContent className="py-16 text-center">
                            <Icon icon="solar:chat-round-dots-linear" className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
                            <h3 className="font-serif text-xl font-semibold text-neutral-900 mb-2">
                                No Reviews Yet
                            </h3>
                            <p className="text-neutral-600 max-w-md mx-auto">
                                Complete some bookings to start receiving reviews from your clients.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
