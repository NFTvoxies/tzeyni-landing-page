"use client";

// MUI Imports
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

// Component Imports
import { Controller, useForm } from "react-hook-form";
import { motion } from 'framer-motion';

import toast from "react-hot-toast";

// Hook Imports]
import Link from "next/link";

const OtpPro = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [isLoading, setIsLoading] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  // Function to mask the email
  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    const maskedLocalPart =
      localPart.slice(0, 2) + "*".repeat(localPart.length - 2);

    return `${maskedLocalPart}@${domain}`;
  };

  const onSubmit = async (data) => {
    const otpCode = data.otp.join("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/professional/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email, // Send email from the query parameter
            code: otpCode, // Send the concatenated OTP code
          }),
        }
      );

      if (response.ok) {
        toast.success("Votre compte a été vérifié avec succès!");

        setIsLoading(true);
        setRedirectMessage("Redirection vers la page de connexion...");

        setTimeout(() => {
          router.push("/auth/login/professional");
        }, 3000);
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Échec de la vérification de l'OTP. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur de vérification de l'OTP:", error);
      toast.error("Une erreur s'est produite lors de la vérification de l'OTP.");
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      const prevInput = document.querySelector(
        `input[name="otp.${index - 1}"]`
      );

      prevInput.focus();
    }
  };

  const watchOtp = watch("otp", []);

  // Function to handle OTP resend
  const handleResendOtp = async () => {
    const api = await getApi();

    try {
      const response = await fetch(
        `${api}/v1/auth/verify-email/${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        toast.success("Un nouvel OTP a été envoyé à votre email!");
      } else {
        const errorData = await response.json();

        toast.error(
          errorData.message || "Échec de la réexpédition de l'OTP. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur de réexpédition de l'OTP:", error);
      toast.error("Une erreur s'est produite lors de la réexpédition de l'OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Vérifiez votre email
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Nous avons envoyé un code à 6 chiffres à <span className="font-semibold">{maskEmail(email)}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-6 gap-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Controller
                key={index}
                name={`otp.${index}`}
                control={control}
                rules={{ required: true, maxLength: 1 }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    maxLength="1"
                    className="w-full h-12 border border-gray-300 rounded-lg text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value && index < 5) {
                        document.querySelector(`input[name="otp.${index + 1}"]`).focus();
                      }
                    }}
                  />
                )}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={watchOtp.some((otp) => !otp)}
            className={`w-full py-3 bg-[#aa9270] text-white rounded-lg font-semibold hover:bg-[#936c4e] transition duration-200 ${
              watchOtp.some((otp) => !otp) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Vérifiez mon compte
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Vous n'avez pas reçu le code?{' '}
              <span
                onClick={() => handleResendOtp()}
                className="text-[#aa9270] cursor-pointer hover:underline"
              >
                Renvoyer
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <Link href="/auth/login" className="text-[#aa9270] hover:underline">
                Retour à la connexion
              </Link>
            </p>
          </div>
        </form>

        {isLoading && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">{redirectMessage}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OtpPro;
