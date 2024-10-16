// src/app/contact/page.jsx
import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import ContactHero from "../components/ContactHero";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

export default function Contact() {
  return (
    <>
      <Head>
        <title>TZEYNI | Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <Navbar />
      <main className="relative">
        <div className="absolute w-full z-10 mt-96 ">
          <ContactForm />
        </div>
        <ContactHero />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
}