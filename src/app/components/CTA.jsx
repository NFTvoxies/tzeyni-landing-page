'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

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
            setTimeout(() => setStatus('idle'), 4000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const benefitsList = [
        {
            icon: 'solar:gift-bold-duotone',
            title: 'Offres Exclusives',
            description: 'Promotions réservées aux abonnés',
        },
        {
            icon: 'solar:bell-bing-bold-duotone',
            title: 'Accès Anticipé',
            description: 'Découvrez les nouveaux services en premier',
        },
        {
            icon: 'solar:calendar-bold-duotone',
            title: 'Événements VIP',
            description: 'Invitations à des événements beauté exclusifs',
        },
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1A1612] to-[#0D0D0D] animate-gradient" 
                style={{ backgroundSize: '200% 200%' }} 
            />
            
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C6934F]/8 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#B8854A]/6 rounded-full blur-[100px] translate-y-1/2" />
                
                {/* Sparkle particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#E8C98A] rounded-full animate-sparkle"
                        style={{
                            top: `${10 + i * 12}%`,
                            left: `${5 + i * 12}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${2.5 + i * 0.3}s`,
                        }}
                    />
                ))}
                
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative max-w-4xl mx-auto mb-20"
                >
                    {/* Glow background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#C6934F] via-[#E8C98A] to-[#C6934F] rounded-3xl opacity-20 blur-xl" />
                    
                    <div className="relative bg-gradient-to-br from-[#C6934F] to-[#9A6F3A] rounded-3xl p-10 md:p-14 text-center overflow-hidden">
                        {/* Inner decorations */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/4" />
                        
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm"
                            >
                                <Icon icon="solar:star-shine-bold" className="w-4 h-4" />
                                Rejoignez 5000+ utilisateurs
                            </motion.div>
                            
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-playfair">
                                Prêt à Transformer Votre<br />
                                Routine Beauté?
                            </h2>
                            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
                                Rejoignez des milliers de clients et professionnels satisfaits sur Tzeyni
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/browse">
                                    <button className="group px-8 py-4 bg-white text-[#C6934F] rounded-xl font-bold hover:bg-neutral-50 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2">
                                        Réserver un Service
                                        <Icon icon="solar:arrow-right-bold" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <Link href="/auth/login/professional">
                                    <button className="px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-xl font-bold hover:bg-white/10 hover:border-white/60 transition-all duration-300">
                                        Devenir Professionnel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-[#E8C98A] text-sm font-medium mb-6">
                            <Icon icon="solar:letter-bold" className="w-4 h-4" />
                            Newsletter
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-playfair">
                            Restez Informé avec <span className="text-gradient-gold">Tzeyni</span>
                        </h3>
                        <p className="text-white/40">
                            Conseils beauté, offres exclusives et nouveautés directement dans votre boîte mail
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {benefitsList.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                whileHover={{ y: -4 }}
                                className="glass rounded-2xl p-5 text-center transition-all duration-300 hover:border-[#C6934F]/20"
                            >
                                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#C6934F]/20 to-[#C6934F]/5 flex items-center justify-center">
                                    <Icon icon={benefit.icon} className="w-6 h-6 text-[#E8C98A]" />
                                </div>
                                <h4 className="text-white font-semibold text-sm mb-1">{benefit.title}</h4>
                                <p className="text-white/40 text-xs">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Newsletter Form */}
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Icon icon="solar:letter-bold-duotone" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="email"
                                    placeholder="Votre adresse e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 glass text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C6934F]/50 focus:border-[#C6934F]/30 transition-all duration-300 placeholder-white/30"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-8 py-4 bg-gradient-to-r from-[#C6934F] to-[#B8854A] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-glow active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {status === 'loading' ? (
                                    <Icon icon="solar:spinner-bold" className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>S&apos;abonner</span>
                                        <Icon icon="solar:arrow-right-bold" className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Status Messages */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 flex items-center gap-3 px-4 py-3 glass rounded-xl border border-emerald-500/20"
                            >
                                <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-emerald-400" />
                                <span className="text-emerald-300 text-sm">Bienvenue ! Consultez votre e-mail pour un cadeau spécial 🎉</span>
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 flex items-center gap-3 px-4 py-3 glass rounded-xl border border-red-500/20"
                            >
                                <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 text-red-400" />
                                <span className="text-red-300 text-sm">Une erreur s&apos;est produite. Veuillez réessayer.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="text-center text-white/20 text-xs mt-6">
                        En vous abonnant, vous acceptez notre{' '}
                        <a href="#" className="text-[#C6934F]/70 hover:text-[#C6934F] transition-colors">
                            Politique de Confidentialité
                        </a>{' '}
                        et nos{' '}
                        <a href="#" className="text-[#C6934F]/70 hover:text-[#C6934F] transition-colors">
                            Conditions d&apos;Utilisation
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
