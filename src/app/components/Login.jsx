"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const roleConfig = {
  client: {
    title: "Espace Client",
    subtitle: "Connectez-vous à votre compte client",
    submitLabel: "Connexion",
    registerLink: "/auth/register?role=client",
    dashboardRedirect: "/dashboard",
    panelType: "image",
    panelImage: "/assets/image/login/banner_login_client.webp",
    panelTitle: "Bienvenue sur Tzeyni",
    panelDescription: "Réservez des services de beauté à domicile avec les meilleurs professionnels.",
  },
  professional: {
    title: "Espace Professionnel",
    subtitle: "Connectez-vous à votre compte professionnel",
    submitLabel: "Se connecter à Tzeyni Pro",
    registerLink: "/auth/register?role=professional",
    dashboardRedirect: "/pro/dashboard",
    panelType: "dashboard",
    panelImage: "/assets/image/login/dashboard tzeyni pro.png",
    panelTitle: "Tzeyni Pro",
    panelDescription: "Gérez votre activité et développez votre clientèle avec notre plateforme professionnelle.",
  },
};

const Login = () => {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "professional" ? "professional" : "client";

  const [role, setRole] = useState(initialRole);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();
  const config = roleConfig[role];

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

  const handleClickShowPassword = () => setIsPasswordShown(!isPasswordShown);

  const handleRoleSwitch = (newRole) => {
    if (newRole !== role) {
      setRole(newRole);
      setError("");
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push(config.dashboardRedirect);
    }
  }, [status, config.dashboardRedirect, router]);

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
        router.push(config.dashboardRedirect);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FCF9F5] relative">
      {/* Logo */}
      <Link href="/" className="absolute top-5 left-6 z-50">
        <Image
          src="/assets/image/logo/tzeyni-new-logo.png"
          alt="Tzeyni"
          width={110}
          height={40}
          className="hover:opacity-80 transition-opacity duration-200"
        />
      </Link>

      {/* Left Panel — Decorative (Professional = dashboard mockup, Client = banner image) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <AnimatePresence mode="wait">
          {role === "client" ? (
            <motion.div
              key="client-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url('${config.panelImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#C6934F]/70 to-[#B8854A]/70 mix-blend-multiply" />
              <div className="relative z-10 text-white text-center px-12 max-w-md">
                <h2 className="text-4xl xl:text-5xl font-bold font-playfair mb-4">{config.panelTitle}</h2>
                <p className="text-lg text-white/90">{config.panelDescription}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pro-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center p-16"
            >
              {/* Decorative background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#C6934F]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-[#C6934F]/10 rounded-full blur-3xl animate-pulse" />
              </div>

              {/* Laptop mockup */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#C6934F] via-[#8B6F47] to-[#C6934F] rounded-2xl opacity-75 blur-sm animate-gradient" style={{ backgroundSize: '200% 200%' }} />
                <div className="relative bg-white rounded-2xl p-3 shadow-2xl overflow-hidden">
                  <div className="bg-gray-100 rounded-lg p-1">
                    <div className="bg-white rounded aspect-video w-[480px] overflow-hidden relative border border-gray-200">
                      <Image
                        src={config.panelImage}
                        alt="Tzeyni Pro Dashboard"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-b-xl mt-1" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-500">
            <CardHeader className="space-y-4">

              {/* Role Toggle */}
              <div className="bg-gray-100 rounded-xl p-1 flex">
                <button
                  type="button"
                  onClick={() => handleRoleSwitch("client")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    role === "client"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon icon="solar:user-bold-duotone" className="w-4 h-4" />
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch("professional")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    role === "professional"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon icon="solar:star-bold-duotone" className="w-4 h-4" />
                  Professionnel
                </button>
              </div>

              <div>
                <CardTitle className="text-2xl">{config.title}</CardTitle>
                <CardDescription className="text-base mt-1.5">{config.subtitle}</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-5 rounded text-sm flex items-center gap-2"
                  >
                    <Icon icon="solar:danger-triangle-bold" className="w-4 h-4 flex-shrink-0" />
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
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
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="leading-5">Adresse email*</Label>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="vous@example.com"
                        className={`bg-white border-gray-300 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Le mot de passe est requis" }}
                  render={({ field }) => (
                    <div className="space-y-1.5">
                      <Label htmlFor="password" className="leading-5">Mot de passe*</Label>
                      <div className="relative">
                        <Input
                          {...field}
                          type={isPasswordShown ? "text" : "password"}
                          id="password"
                          placeholder="••••••••••••••••"
                          className={`bg-white border-gray-300 pr-10 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={handleClickShowPassword}
                          className="absolute inset-y-0 right-0 text-gray-500 hover:text-gray-700 hover:bg-transparent"
                        >
                          {isPasswordShown ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                  )}
                />

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="rememberMe" />
                    <Label htmlFor="rememberMe" className="text-gray-500 text-sm font-normal cursor-pointer">
                      Se souvenir de moi
                    </Label>
                  </div>
                  <Link href="/auth/forgot_password" className="text-sm text-[#C6934F] hover:underline transition-all duration-200">
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {config.submitLabel}
                </Button>
              </form>

              {/* Registration link */}
              <div className="mt-6 space-y-4">
                <p className="text-center text-sm text-gray-500">
                  Vous n&apos;avez pas de compte ?{" "}
                  <Link href={config.registerLink} className="text-[#C6934F] font-medium hover:underline transition-all duration-200">
                    Créer un compte
                  </Link>
                </p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-400">ou</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-[#C6934F] transition-all duration-300"
                >
                  <Icon icon="flat-color-icons:google" className="w-5 h-5 mr-2" />
                  Se connecter avec Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
