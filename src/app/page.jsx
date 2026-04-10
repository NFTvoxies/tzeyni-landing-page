import Hero from "./components/Hero";
import IconSection from "./components/IconSection";
import Features from "./components/Features";
import Stylists from "./components/Stylists";
import Testimonial from "./components/Testimonial";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata = {
  title: 'Tzeyni | La beauté à domicile, simplement',
  description: 'Réservez une coiffeuse, une manucure ou un soin beauté à domicile. Professionnelles vérifiées, chez vous, au créneau qui vous convient.',
  keywords: 'beauté, domicile, coiffure, maquillage, massage, manucure, Maroc, Casablanca',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IconSection />
        <Features />
        <Stylists />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
