import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import Footer from "../components/Footer";

export const metadata = {
  title: 'TZEYNI | À propos',
  description: 'Découvrez notre histoire et notre mission',
};

export default function About() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <Footer />
    </>
  );
}