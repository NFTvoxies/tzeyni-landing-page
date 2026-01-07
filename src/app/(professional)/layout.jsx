// Professional section layout
// This layout wraps all professional-specific pages

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProfessionalLayout({ children }) {
    return (
        <>
            <Navbar userType="professional" />
            {children}
            <Footer />
        </>
    );
}
