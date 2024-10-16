import Head from "next/head";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stylists from "../components/Stylists";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import IconSection from "../components/IconSection";


export default function Home() {
  return (
    <>
      <Head>
        <title>TZEYNI | Accueil</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
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
