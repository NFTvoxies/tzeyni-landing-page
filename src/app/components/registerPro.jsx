'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { EyeIcon, EyeOffIcon, ArrowLeft } from 'lucide-react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { mockRegister } from '@/lib/mockApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Register = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      full_name: '',
      gender: '',
      email: '',
      phone: '',
      city: '',
      addresse: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(!isPasswordShown)

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
      }, 'professional');

      if (result.status) {
        toast.success("Inscription réussie ! Veuillez vérifier votre email.");
        router.push(`/auth/professional/verify-otp?email=${encodeURIComponent(data.email)}`);
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
      icon: 'solar:user-bold-duotone',
      rules: { required: 'Le nom complet est requis' },
      half: true,
    },
    {
      name: 'gender',
      label: 'Genre*',
      type: 'select',
      placeholder: 'Sélectionner',
      icon: 'solar:users-group-rounded-bold-duotone',
      rules: { required: 'Le genre est requis' },
      options: [
        { value: '', label: 'Sélectionner le genre' },
        { value: 'Homme', label: 'Homme' },
        { value: 'Femme', label: 'Femme' },
      ],
      half: true,
    },
    {
      name: 'email',
      label: 'Adresse email*',
      type: 'email',
      placeholder: 'vous@example.com',
      icon: 'solar:letter-bold-duotone',
      rules: {
        required: "L'email est requis",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Adresse email invalide'
        }
      },
      half: true,
    },
    {
      name: 'phone',
      label: 'Téléphone*',
      type: 'tel',
      placeholder: '+212 6XX XXX XXX',
      icon: 'solar:phone-bold-duotone',
      rules: { required: 'Le numéro de téléphone est requis' },
      half: true,
    },
    {
      name: 'city',
      label: 'Ville*',
      type: 'text',
      placeholder: 'Casablanca',
      icon: 'solar:map-point-bold-duotone',
      rules: { required: 'La ville est requise' },
      half: true,
    },
    {
      name: 'addresse',
      label: 'Adresse*',
      type: 'text',
      placeholder: 'Votre adresse complète',
      icon: 'solar:home-2-bold-duotone',
      rules: { required: "L'adresse est requise" },
      half: true,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#FCF9F5] relative">
      {/* Back to website link */}
      <Link href="/" className="absolute top-6 left-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm z-50 transition-colors duration-300">
        <ArrowLeft className="h-4 w-4" />
        Retour au site
      </Link>

      {/* Left side - Decorative Panel */}
      <div className="hidden lg:flex w-5/12 relative overflow-hidden items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/image/tzeyni header bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D]/80 via-[#1A1612]/70 to-[#C6934F]/30" />

        {/* Decorative floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[#C6934F]/15 blur-3xl animate-float" />
          <div className="absolute bottom-32 left-10 w-60 h-60 rounded-full bg-[#C6934F]/10 blur-3xl animate-float-slow" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-white px-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-white/90 text-sm font-medium">
              <Icon icon="solar:star-bold" className="w-4 h-4 text-[#E8C98A]" />
              Espace Professionnel
            </span>

            <h2 className="text-4xl font-bold font-playfair leading-tight">
              Développez votre <span className="text-gradient-gold">activité</span> avec Tzeyni
            </h2>

            <p className="text-white/70 leading-relaxed">
              Rejoignez notre réseau de professionnels vérifiés et accédez à une clientèle qualifiée dès aujourd'hui.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 pt-4">
              {[
                { icon: 'solar:calendar-bold-duotone', text: 'Gestion de rendez-vous simplifiée' },
                { icon: 'solar:wallet-bold-duotone', text: 'Paiements sécurisés et rapides' },
                { icon: 'solar:chart-2-bold-duotone', text: 'Tableau de bord analytique' },
                { icon: 'solar:users-group-rounded-bold-duotone', text: 'Accès à plus de 1000+ clients' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon icon={item.icon} className="w-5 h-5 text-[#E8C98A]" />
                  </div>
                  <span className="text-white/80 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Registration Form */}
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
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#C6934F]/10 text-[#C6934F] font-medium">Pro</span>
              </Link>

              <div>
                <CardTitle className="text-2xl">Créer un compte professionnel</CardTitle>
                <CardDescription className="text-base mt-1.5">
                  Inscrivez-vous pour commencer à recevoir des réservations
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
                      validate: value => value === control._formValues.password || 'Les mots de passe ne correspondent pas'
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
                    "Créer mon compte professionnel"
                  )}
                </Button>
              </form>

              {/* Login link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Vous avez déjà un compte ?{' '}
                  <Link href="/auth/login/professional" className="text-[#C6934F] font-medium hover:underline transition-all duration-200">
                    Se connecter
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Register