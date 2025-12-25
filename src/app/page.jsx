import Hero from "./components/Hero";
import IconSection from "./components/IconSection";
import Features from "./components/Features";
import Stylists from "./components/Stylists";
import Testimonial from "./components/Testimonial";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata = {
  title: 'TZEYNI | Accueil',
  description: 'Bienvenue sur TZEYNI - Services de beauté et bien-être',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <IconSection />
      <Features />
      <Stylists />
      <Testimonial />
      <Newsletter />
      <Footer />
    </>
  );
}
