// src/app/contact/page.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "../components/ContactHero";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

export const metadata = {
  title: 'TZEYNI | Contact',
  description: 'Contactez-nous pour plus d\'informations',
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="absolute w-full z-40 mt-96 ">
          <ContactForm />
        </div>
        <ContactHero />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}