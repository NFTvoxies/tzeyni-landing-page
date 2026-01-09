"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Sparkles } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = ({ role = "client" }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const handleClickShowPassword = () => setIsPasswordShown(!isPasswordShown);

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push(role === "professional" ? "/pro/dashboard" : "/dashboard");
    }
  }, [status, role, router]);

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        role: role,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result.ok) {
        router.push(role === "professional" ? "/pro/dashboard" : "/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FCF9F5]">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 animate-fadeIn">
        <div className="w-full max-w-md animate-slideInLeft">
          <Card className="border-none shadow-md rounded-[15px] hover:shadow-lg transition-shadow duration-500">
            <CardHeader className="space-y-4">
              {/* Tzeyni Branding */}
              <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
                <Sparkles className="h-7 w-7 text-[#C6934F] transition-transform duration-300 group-hover:scale-110" />
                <span className="font-serif text-2xl font-bold text-foreground">Tzeyni</span>
              </Link>

              <div>
                <CardTitle className="text-2xl">
                  {role === "professional" ? "Espace Professionnel" : "Espace Client"}
                </CardTitle>
                <CardDescription className="text-base mt-1.5">
                  Connectez-vous à votre compte
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded animate-shake">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "L'email est requis",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Adresse email invalide",
                    },
                  }}
                  render={({ field }) => (
                    <div className="space-y-1">
                      <Label htmlFor="email" className="leading-5">
                        Adresse email*
                      </Label>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="vous@example.com"
                        className={`transition-all duration-300 focus:ring-[#C6934F] ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Password Field */}
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Le mot de passe est requis" }}
                  render={({ field }) => (
                    <div className="space-y-1">
                      <Label htmlFor="password" className="leading-5">
                        Mot de passe*
                      </Label>
                      <div className="relative">
                        <Input
                          {...field}
                          type={isPasswordShown ? "text" : "password"}
                          id="password"
                          placeholder="••••••••••••••••"
                          className={`pr-9 transition-all duration-300 focus:ring-[#C6934F] ${errors.password ? "border-red-500" : ""}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={handleClickShowPassword}
                          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent transition-colors duration-200"
                        >
                          {isPasswordShown ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                          <span className="sr-only">{isPasswordShown ? "Masquer le mot de passe" : "Afficher le mot de passe"}</span>
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between gap-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox id="rememberMe" />
                    <Label htmlFor="rememberMe" className="text-muted-foreground text-sm font-normal">
                      Se souvenir de moi
                    </Label>
                  </div>

                  <Link href="/auth/forgot_password" className="text-sm text-[#C6934F] hover:underline transition-all duration-200">
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-[#C6934F] hover:bg-[#B8854A] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                  Connexion
                </Button>
              </form>

              {/* Registration Links */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Vous n'avez pas de compte ?
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/auth/register/client" className="flex-1">
                    <Button variant="outline" className="w-full hover:border-[#C6934F] transition-all duration-300">
                      Inscription Client
                    </Button>
                  </Link>
                  <Link href="/auth/register/professionnelle" className="flex-1">
                    <Button variant="outline" className="w-full hover:border-[#C6934F] transition-all duration-300">
                      Inscription Professionnel
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#C6934F] to-[#B8854A] relative overflow-hidden items-center justify-center animate-fadeIn">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 L50 100 L100 0 Z"
              fill="rgba(255,255,255,0.3)"
              stroke="rgba(255,255,255,0.4)"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="relative z-10 text-white text-center px-12 max-w-md animate-slideInRight">
          <h2 className="text-4xl font-serif font-bold mb-4">Bienvenue sur Tzeyni</h2>
          <p className="text-lg opacity-90">
            {role === "professional"
              ? "Gérez votre activité et développez votre clientèle avec notre plateforme professionnelle."
              : "Réservez des services de beauté à domicile avec les meilleurs professionnels."}
          </p>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
