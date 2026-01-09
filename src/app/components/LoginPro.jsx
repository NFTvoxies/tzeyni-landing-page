"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Sparkles, ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPro = () => {
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

  // Redirect if session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/pro/dashboard");
    }
  }, [status, router]);

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        role: "professional",
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result.ok) {
        router.push("/pro/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FCF9F5] relative">
      {/* Back to website link */}
      <Link href="/" className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm z-50 transition-colors duration-300">
        <ArrowLeft className="h-4 w-4" />
        Retour au site
      </Link>

      {/* Left side - Dashboard Preview with Animated Border */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-16 relative animate-fadeIn">
        {/* Laptop mockup with animated border */}
        <div className="relative animate-slideInLeft">
          {/* Animated glowing border container */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#C6934F] via-[#8B6F47] to-[#C6934F] rounded-2xl opacity-75 blur-sm animate-borderGlow"></div>

          {/* Laptop frame */}
          <div className="relative bg-white rounded-2xl p-3 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
            {/* Screen bezel */}
            <div className="bg-gray-100 rounded-lg p-1">
              {/* Dashboard preview image placeholder */}
              <div className="bg-white rounded aspect-video w-[500px] overflow-hidden relative border border-gray-200">
                {/* Simulated dashboard content */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {["Dashboard", "Books", "Mail", "Component"].map((tab, i) => (
                      <div key={i} className={`text-xs ${i === 0 ? 'text-[#C6934F] font-semibold' : 'text-gray-500'} p-2`}>{tab}</div>
                    ))}
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[{ val: "$15.5k", label: "Total Sales" }, { val: "1250", label: "Net Sales" }, { val: "$20.54k", label: "Total Net" }, { val: "$1,200", label: "Revenue" }].map((stat, i) => (
                      <div key={i} className="bg-white rounded p-2 shadow-sm border border-gray-200">
                        <div className="text-[#C6934F] text-xs font-semibold">{stat.val}</div>
                        <div className="text-gray-500 text-[10px]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Graph placeholder */}
                  <div className="bg-white rounded h-24 mb-2 flex items-end p-2 gap-1 shadow-sm border border-gray-200">
                    {[20, 35, 45, 30, 50, 40, 35, 45, 40].map((h, i) => (
                      <div key={i} className="flex-1 bg-[#C6934F]/30 rounded-t" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="h-2 bg-gray-200 rounded-b-xl mt-1"></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#C6934F]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-[#C6934F]/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 animate-fadeIn">
        <div className="w-full max-w-md animate-slideInRight">
          {/* Branding */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              S'identifier à Tzeyni Pro
            </h1>
            <p className="text-gray-600 text-sm">
              Accélérez et concentrez-vous sur la croissance.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded text-sm animate-shake">
              {error}
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
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 text-sm">
                    Adresse email*
                  </Label>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    placeholder="vous@example.com"
                    className={`bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${errors.email ? "border-red-500" : ""}`}
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
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900 text-sm">
                    Mot de passe*
                  </Label>
                  <div className="relative">
                    <Input
                      {...field}
                      type={isPasswordShown ? "text" : "password"}
                      id="password"
                      placeholder="••••••••••••••••"
                      className={`bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 pr-10 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={handleClickShowPassword}
                      className="absolute inset-y-0 right-0 text-gray-600 hover:text-gray-900 hover:bg-transparent transition-colors duration-200"
                    >
                      {isPasswordShown ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              )}
            />

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="rememberMe" />
                <Label htmlFor="rememberMe" className="text-gray-600 text-sm font-normal cursor-pointer">
                  Se souvenir de moi
                </Label>
              </div>

              <Link href="/auth/forgot_password" className="text-sm text-[#C6934F] hover:underline transition-all duration-200">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
              Se connecter à Tzeyni Pro
            </Button>
          </form>

          {/* Registration and Social Login */}
          <div className="mt-6 space-y-4">
            <p className="text-center text-sm text-gray-600">
              Nouveau sur notre plateforme ?{" "}
              <Link href="/auth/register/professionnelle" className="text-[#C6934F] font-medium hover:underline transition-all duration-200">
                Créer un compte
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[#FCF9F5] text-gray-500">ou</span>
              </div>
            </div>

            <Button variant="ghost" className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#C6934F] transition-all duration-300">
              Se connecter avec Google
            </Button>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes borderGlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
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
        
        .animate-borderGlow {
          background-size: 200% 200%;
          animation: borderGlow 3s ease infinite;
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

export default LoginPro;
