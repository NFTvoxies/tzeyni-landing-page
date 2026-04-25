"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon, ArrowLeft } from "lucide-react";
import { Icon } from "@iconify/react";
import { mockRegister } from "@/lib/mockApi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterClient = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      gender: "",
      email: "",
      phone: "",
      city: "",
      addresse: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleClickShowPassword = () => setIsPasswordShown(!isPasswordShown);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result = await mockRegister({
        full_name: data.full_name,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        city: data.city,
        addresse: data.addresse,
        password: data.password,
      }, 'client');

      if (result.status) {
        toast.success("Inscription réussie ! Vérifiez votre email pour le code de confirmation.");
        router.push(`/auth/client/verify-otp?email=${encodeURIComponent(data.email)}`);
      } else {
        setError(result.message || "L'inscription a échoué");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Une erreur est survenue lors de l'inscription"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: 'full_name',
      label: 'Nom complet*',
      type: 'text',
      placeholder: 'Votre nom complet',
      rules: { required: 'Le nom complet est requis' },
    },
    {
      name: 'gender',
      label: 'Genre*',
      type: 'select',
      placeholder: 'Sélectionner',
      rules: { required: 'Le genre est requis' },
      options: [
        { value: '', label: 'Sélectionner le genre' },
        { value: 'Homme', label: 'Homme' },
        { value: 'Femme', label: 'Femme' },
      ],
    },
    {
      name: 'email',
      label: 'Adresse email*',
      type: 'email',
      placeholder: 'vous@example.com',
      rules: {
        required: "L'email est requis",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Adresse email invalide'
        }
      },
    },
    {
      name: 'phone',
      label: 'Téléphone*',
      type: 'tel',
      placeholder: '+212 6XX XXX XXX',
      rules: { required: 'Le numéro de téléphone est requis' },
    },
    {
      name: 'city',
      label: 'Ville*',
      type: 'text',
      placeholder: 'Casablanca',
      rules: { required: 'La ville est requise' },
    },
    {
      name: 'addresse',
      label: 'Adresse*',
      type: 'text',
      placeholder: 'Votre adresse complète',
      rules: { required: "L'adresse est requise" },
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#FCF9F5] relative">
      {/* Back to website link */}
      <Link href="/" className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm z-50 transition-colors duration-300">
        <ArrowLeft className="h-4 w-4" />
        Retour au site
      </Link>

      {/* Left side - Registration Form */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <Card className="border-none shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-500">
            <CardHeader className="space-y-3 pb-4">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <span className="font-serif text-2xl font-bold text-foreground">Tzeyni</span>
              </Link>

              <div>
                <CardTitle className="text-2xl">Créer un compte client</CardTitle>
                <CardDescription className="text-base mt-1.5">
                  Rejoignez Tzeyni pour réserver vos services beauté préférés
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-5 rounded text-sm flex items-center gap-2"
                >
                  <Icon icon="solar:danger-triangle-bold" className="w-4 h-4 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* 2-column grid for form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formFields.map((field) => (
                    <Controller
                      key={field.name}
                      name={field.name}
                      control={control}
                      rules={field.rules}
                      render={({ field: formField }) => (
                        <div className="space-y-1.5">
                          <Label htmlFor={field.name} className="text-sm text-gray-700 leading-5">
                            {field.label}
                          </Label>
                          {field.type === 'select' ? (
                            <div className="relative">
                              <select
                                {...formField}
                                id={field.name}
                                className={`w-full h-10 px-3 rounded-md border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C6934F] focus:border-[#C6934F] transition-all duration-300 appearance-none ${
                                  errors[field.name] ? 'border-red-500' : 'border-gray-300'
                                }`}
                              >
                                {field.options.map((opt) => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                              <Icon icon="solar:alt-arrow-down-linear" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          ) : (
                            <Input
                              {...formField}
                              type={field.type}
                              id={field.name}
                              placeholder={field.placeholder}
                              className={`bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
                                errors[field.name] ? 'border-red-500' : ''
                              }`}
                            />
                          )}
                          {errors[field.name] && (
                            <p className="text-xs text-red-500">{errors[field.name].message}</p>
                          )}
                        </div>
                      )}
                    />
                  ))}
                </div>

                {/* Password fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Le mot de passe est requis',
                      minLength: { value: 8, message: 'Minimum 8 caractères' }
                    }}
                    render={({ field }) => (
                      <div className="space-y-1.5">
                        <Label htmlFor="password" className="text-sm text-gray-700 leading-5">
                          Mot de passe*
                        </Label>
                        <div className="relative">
                          <Input
                            {...field}
                            type={isPasswordShown ? 'text' : 'password'}
                            id="password"
                            placeholder="••••••••"
                            className={`bg-white border-gray-300 pr-10 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
                              errors.password ? 'border-red-500' : ''
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
                        {errors.password && (
                          <p className="text-xs text-red-500">{errors.password.message}</p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Veuillez confirmer le mot de passe',
                      validate: (value) =>
                        value === control._formValues.password ||
                        'Les mots de passe ne correspondent pas',
                    }}
                    render={({ field }) => (
                      <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword" className="text-sm text-gray-700 leading-5">
                          Confirmer le mot de passe*
                        </Label>
                        <div className="relative">
                          <Input
                            {...field}
                            type={isPasswordShown ? 'text' : 'password'}
                            id="confirmPassword"
                            placeholder="••••••••"
                            className={`bg-white border-gray-300 pr-10 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
                              errors.confirmPassword ? 'border-red-500' : ''
                            }`}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-400 pt-1">
                  En vous inscrivant, vous acceptez nos{' '}
                  <Link href="#" className="text-[#C6934F] hover:underline">Conditions d&apos;utilisation</Link>
                  {' '}et notre{' '}
                  <Link href="#" className="text-[#C6934F] hover:underline">Politique de confidentialité</Link>.
                </p>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C6934F] hover:bg-[#B8854A] text-white font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Icon icon="solar:spinner-bold" className="w-4 h-4 animate-spin" />
                      Inscription en cours...
                    </span>
                  ) : (
                    "Créer mon compte"
                  )}
                </Button>
              </form>

              {/* Registration links */}
              <div className="mt-6 space-y-3">
                <p className="text-center text-sm text-gray-500">
                  Vous avez déjà un compte ?{' '}
                  <Link href="/auth/login/client" className="text-[#C6934F] font-medium hover:underline transition-all duration-200">
                    Se connecter
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

                <Link href="/auth/register/professionnelle" className="block">
                  <Button variant="outline" className="w-full hover:border-[#C6934F] hover:text-[#C6934F] transition-all duration-300">
                    <Icon icon="solar:star-bold" className="w-4 h-4 mr-2" />
                    S&apos;inscrire en tant que professionnel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right side - Decorative Panel */}
      <div className="hidden lg:flex w-5/12 relative overflow-hidden items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: "url('/assets/image/login/banner_login_client.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C6934F]/70 to-[#B8854A]/60 mix-blend-multiply" />

        {/* Decorative floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white/5 blur-3xl animate-float" />
          <div className="absolute bottom-32 right-10 w-60 h-60 rounded-full bg-white/5 blur-3xl animate-float-slow" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-white text-center px-12 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold font-playfair leading-tight">
              Bienvenue sur Tzeyni
            </h2>
            <p className="text-white/90 leading-relaxed text-lg">
              Réservez des services de beauté à domicile avec les meilleurs professionnels du Maroc.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: '500+', label: 'Pros' },
                { value: '100+', label: 'Services' },
                { value: '4.9', label: 'Note' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
                >
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-white/70 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
