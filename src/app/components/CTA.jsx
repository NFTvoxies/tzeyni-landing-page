'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CTA = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const benefitsList = [
        {
            icon: 'solar:gift-bold-duotone',
            text: 'Offres Exclusives & Promotions',
        },
        {
            icon: 'solar:bell-bold-duotone',
            text: 'Accès Anticipé aux Nouveaux Services',
        },
        {
            icon: 'solar:calendar-bold-duotone',
            text: 'Invitations à des Événements Spéciaux',
        },
    ];

    return (
        <section className="relative py-20 bg-gradient-to-b from-zinc-900 via-zinc-950 to-stone-950 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C6934F] rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B8854A] rounded-full blur-[100px] translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto bg-gradient-to-br from-[#C6934F] to-[#B8854A] rounded-3xl p-8 md:p-12 text-center mb-16 shadow-2xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Prêt à Transformer Votre Routine Beauté?
                    </h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                        Rejoignez des milliers de clients et professionnels satisfaits sur Tzeyni aujourd'hui
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/browse">
                            <Button size="lg" className="bg-white text-[#C6934F] hover:bg-neutral-100 gap-2 shadow-lg">
                                Réserver un Service
                                <Icon icon="solar:arrow-right-linear" className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/auth/login/professional">
                            <Button
                                size="lg"
                                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#C6934F] shadow-lg transition-all"
                            >
                                Devenir Professionnel
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="text-center mb-8">
                        <Badge className="mx-auto bg-[#C6934F] hover:bg-[#C6934F] text-white mb-4">
                            Restez Informé
                        </Badge>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Newsletter Tzeyni
                        </h3>
                        <p className="text-gray-400">
                            Rejoignez notre communauté pour des mises à jour exclusives, des conseils beauté et des offres personnalisées
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {benefitsList.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="flex items-center space-x-3 rounded-xl p-4 bg-white/5 backdrop-blur-sm border border-white/10"
                            >
                                <Icon icon={benefit.icon} className="w-6 h-6 text-[#C6934F]" />
                                <span className="text-gray-300 text-sm">{benefit.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Newsletter Form */}
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="email"
                            placeholder="Entrez votre adresse e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-6 py-4 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C6934F] focus:border-transparent pr-36 transition-all duration-300 placeholder-gray-400"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-[#C6934F] to-[#B8854A] text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-center space-x-2">
                                {status === 'loading' ? (
                                    <Icon icon="solar:spinner-bold" className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>S'abonner</span>
                                        <Icon icon="solar:arrow-right-bold" className="w-5 h-5" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <div className="mt-6">
                            <Alert className="bg-green-900/50 border-green-600 text-green-100">
                                <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-green-400" />
                                <AlertTitle>Succès !</AlertTitle>
                                <AlertDescription>
                                    Bienvenue dans notre newsletter ! Consultez votre e-mail pour un cadeau spécial.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mt-6">
                            <Alert variant="destructive" className="bg-red-900/50 border-red-600">
                                <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 text-red-400" />
                                <AlertTitle>Erreur</AlertTitle>
                                <AlertDescription>
                                    Une erreur s'est produite. Veuillez réessayer plus tard.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}

                    {/* Footer */}
                    <p className="text-center text-gray-500 text-sm mt-6">
                        En vous abonnant, vous acceptez notre{' '}
                        <a href="#" className="text-[#C6934F] hover:underline">
                            Politique de Confidentialité
                        </a>{' '}
                        et nos{' '}
                        <a href="#" className="text-[#C6934F] hover:underline">
                            Conditions d'Utilisation
                        </a>
                        .
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
