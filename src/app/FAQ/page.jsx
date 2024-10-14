// src/app/contact/page.jsx
import Head from "next/head";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Head>
        <title>TZEYNI | Contact Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <Navbar />
      <FAQ />
      <Footer />
    </>
  );
}