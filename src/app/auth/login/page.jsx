import { Suspense } from "react";
import Login from "@/app/components/Login";

export const metadata = {
  title: "Connexion | Tzeyni",
  description: "Connectez-vous à votre compte Tzeyni — client ou professionnel.",
};

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
