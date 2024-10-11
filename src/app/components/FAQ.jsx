// src/app/components/FAQ.jsx
'use client'
import { useState } from 'react';
import { Icon } from '@iconify/react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="flex justify-between items-center w-full py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900 dark:text-white">{question}</span>
        <Icon
          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-gray-500 dark:text-gray-400">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Comment fonctionne TZEYNI ?",
      answer: "TZEYNI vous met en relation avec des stylistes professionnels qui offrent des services de beauté à domicile. Il vous suffit de réserver un service via notre plateforme, et un styliste vérifié se rendra à votre domicile à l'heure prévue."
    },
    {
      question: "Les stylistes TZEYNI sont-ils certifiés ?",
      answer: "Oui, tous les stylistes TZEYNI sont des professionnels certifiés. Nous vérifions minutieusement chaque styliste pour nous assurer qu'il répond à nos normes élevées d'expertise et de professionnalisme."
    },
    {
      question: "Dans quelles zones TZEYNI est-il disponible ?",
      answer: "TZEYNI est actuellement disponible dans les principales villes de France. Utilisez notre fonction de recherche par localisation pour voir si nous sommes disponibles dans votre région."
    },
    {
      question: "Comment puis-je réserver un service ?",
      answer: "La réservation d'un service est simple ! Utilisez notre fonction de recherche pour trouver un styliste, sélectionnez le service souhaité, choisissez une date et une heure, puis confirmez votre réservation."
    },
    {
      question: "Quels types de services TZEYNI propose-t-il ?",
      answer: "TZEYNI propose une large gamme de services de beauté, notamment des coupes de cheveux, des coiffures, des colorations, du maquillage, des manucures, des pédicures, des soins du visage, et bien plus encore. Consultez notre page de services pour une liste complète des prestations."
    },
    {
      question: "Combien coûtent les services TZEYNI ?",
      answer: "Les prix varient en fonction du service et du niveau d'expérience du styliste. Vous pouvez voir le prix exact de chaque service avant de réserver. Nous nous efforçons d'offrir des tarifs compétitifs tout en assurant une rémunération équitable à nos stylistes."
    },
    {
      question: "Puis-je choisir mon styliste ?",
      answer: "Oui, vous pouvez parcourir les profils des stylistes et sélectionner celui que vous préférez. Chaque profil comprend les spécialités du styliste, son expérience et les avis des clients pour vous aider à faire un choix éclairé."
    },
    {
      question: "Que faire si je dois annuler ou reprogrammer mon rendez-vous ?",
      answer: "Vous pouvez annuler ou reprogrammer votre rendez-vous jusqu'à 24 heures avant l'heure prévue sans frais. Pour les changements dans les 24 heures, des frais minimes peuvent s'appliquer. Veuillez consulter notre politique d'annulation pour plus de détails."
    },
    {
      question: "Dois-je fournir du matériel ou des produits ?",
      answer: "Votre styliste TZEYNI apportera tout l'équipement professionnel et les produits nécessaires. Cependant, si vous avez des produits spécifiques que vous préférez, n'hésitez pas à en informer votre styliste à l'avance."
    },
    {
      question: "Comment puis-je devenir styliste TZEYNI ?",
      answer: "Nous sommes toujours à la recherche de professionnels de la beauté talentueux ! Visitez notre page 'Devenir Styliste' pour en savoir plus sur nos exigences et notre processus de candidature. Nous valorisons l'expertise, le professionnalisme et la passion du service client."
    },
    {
      question: "Les services TZEYNI sont-ils disponibles pour les hommes et les femmes ?",
      answer: "Absolument ! TZEYNI propose des services de beauté pour tous, indépendamment du genre. Nos stylistes sont formés pour répondre aux besoins de tous nos clients."
    },
    {
      question: "Puis-je réserver des services pour un groupe ou un événement spécial ?",
      answer: "Oui, TZEYNI propose des services de groupe pour les événements spéciaux tels que les mariages, les soirées entre amis ou les événements d'entreprise. Contactez notre service client pour des arrangements personnalisés."
    },
    {
      question: "Comment TZEYNI assure-t-il la sécurité et l'hygiène ?",
      answer: "La sécurité et l'hygiène sont nos priorités. Tous nos stylistes suivent des protocoles stricts de nettoyage et de désinfection de leur matériel. Ils sont également formés aux dernières normes de sécurité sanitaire."
    },
    {
      question: "Puis-je donner un pourboire à mon styliste ?",
      answer: "Les pourboires ne sont pas obligatoires mais toujours appréciés si vous êtes satisfait du service. Vous pouvez ajouter un pourboire lors du paiement via l'application ou donner directement au styliste."
    },
    {
      question: "Que faire si je ne suis pas satisfait du service ?",
      answer: "Votre satisfaction est notre priorité. Si vous n'êtes pas entièrement satisfait de votre service, veuillez nous contacter dans les 48 heures suivant votre rendez-vous. Nous travaillerons avec vous pour résoudre tout problème et assurer votre satisfaction."
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Foire Aux Questions
        </h2>
        <div className="mx-auto max-w-screen-md">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;