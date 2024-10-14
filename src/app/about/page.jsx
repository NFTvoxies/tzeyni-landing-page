import Head from "next/head";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>TZEYNI | À propos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <Navbar />
      <AboutHero />
      <Footer />
    </>
  );
}