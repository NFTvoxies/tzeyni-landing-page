// src/app/FAQ/page.jsx
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export const metadata = {
  title: 'TZEYNI | FAQ',
  description: 'Questions fréquemment posées',
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <FAQ />
      <Footer />
    </>
  );
}