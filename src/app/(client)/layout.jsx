// Client section layout
// This layout wraps all client-specific pages

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ClientLayout({ children }) {
    return (
        <>
            <Navbar userType="client" />
            {children}
            <Footer />
        </>
    );
}
