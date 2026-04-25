import { Suspense } from "react";
import Register from "@/app/components/Register";

export const metadata = {
  title: "Inscription | Tzeyni",
  description: "Créez votre compte Tzeyni — client ou professionnel — pour profiter de services de beauté à domicile.",
};

export default function RegisterPage() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  );
}
