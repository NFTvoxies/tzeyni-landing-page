'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [isHovered, setIsHovered] = useState(false);

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
    <section className="relative py-20">
      {/* Fond en dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b bg-[#323232]"></div>
    
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c2a33c] rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#e7d1b4] rounded-full blur-[100px] translate-y-1/2"></div>
      </div>

      <div className="relative mx-4 max-w-6xl lg:mx-auto">
        <div className="relative backdrop-blur-xl rounded-3xl overflow-hidden bg-gray-800/50 border border-gray-700">
          <div className="p-8 md:p-10">
            {/* En-tête */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Icon
                icon="solar:letter-bold-duotone"
                className="w-16 h-16 text-[#c2a33c] mx-auto mb-6"
              />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Restez Informé avec Tzeyni
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Rejoignez notre communauté pour des mises à jour exclusives, des conseils beauté et des offres personnalisées.
              </p>
            </div>

            {/* Avantages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              {benefitsList.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-xl p-4 bg-gray-700/50 backdrop-blur-sm border border-gray-600"
                >
                  <Icon icon={benefit.icon} className="w-8 h-8 text-[#c2a33c]" />
                  <span className="text-gray-200">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative">
              <input
                type="email"
                placeholder="Entrez votre adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-gray-700/50 text-white rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#c2a33c] focus:border-transparent pr-36 transition-all duration-300 placeholder-gray-400"
              />
              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={status === 'loading'}
                className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-[#c2a33c] to-[#e7d1b4] text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                  {status === 'loading' ? (
                    <Icon
                      icon="solar:spinner-bold"
                      className="w-5 h-5 animate-spin"
                    />
                  ) : (
                    <>
                      <span>S'abonner</span>
                      <Icon
                        icon={isHovered ? 'solar:arrow-right-bold' : 'solar:bell-bold'}
                        className="w-5 h-5 transition-all duration-300"
                      />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Messages de statut */}
            {status === 'success' && (
              <div className="mt-6 max-w-xl mx-auto">
                <Alert className="bg-green-900/50 border-green-600 text-green-100">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="w-5 h-5 text-green-400"
                  />
                  <AlertTitle>Succès !</AlertTitle>
                  <AlertDescription>
                    Bienvenue dans notre newsletter ! Consultez votre e-mail pour un cadeau spécial.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-6 max-w-xl mx-auto">
                <Alert variant="destructive" className="bg-red-900/50 border-red-600">
                  <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 text-red-400" />
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>
                    Une erreur s'est produite. Veuillez réessayer plus tard.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Pied de page */}
            <p className="text-center text-gray-400 text-sm mt-8">
              En vous abonnant, vous acceptez notre{' '}
              <a href="#" className="text-[#c2a33c] hover:underline">
                Politique de Confidentialité
              </a>{' '}
              et nos{' '}
              <a href="#" className="text-[#c2a33c] hover:underline">
                Conditions d'Utilisation
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
