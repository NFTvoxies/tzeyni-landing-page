'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import { mockRegister } from '@/lib/mockApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const roleConfig = {
  client: {
    title: 'Créer un compte client',
    subtitle: 'Rejoignez Tzeyni pour réserver vos services beauté préférés',
    submitLabel: 'Créer mon compte',
    loginLink: '/auth/login?role=client',
    loginLabel: 'Se connecter',
    otpRedirect: '/auth/client/verify-otp',
    panelTitle: 'Bienvenue sur Tzeyni',
    panelDescription: 'Réservez des services de beauté à domicile avec les meilleurs professionnels du Maroc.',
    panelImage: "/assets/image/login/banner_login_client.webp",
    panelOverlay: 'from-[#C6934F]/70 to-[#B8854A]/60',
    badge: null,
    stats: [
      { value: '500+', label: 'Professionnels' },
      { value: '100+', label: 'Services' },
      { value: '4.9', label: 'Note moyenne' },
    ],
    benefits: null,
  },
  professional: {
    title: 'Créer un compte professionnel',
    subtitle: 'Inscrivez-vous pour commencer à recevoir des réservations',
    submitLabel: 'Créer mon compte professionnel',
    loginLink: '/auth/login?role=professional',
    loginLabel: 'Se connecter',
    otpRedirect: '/auth/professional/verify-otp',
    panelTitle: 'Développez votre activité avec Tzeyni',
    panelDescription: 'Rejoignez notre réseau de professionnels vérifiés et accédez à une clientèle qualifiée.',
    panelImage: "/assets/image/tzeyni header bg.png",
    panelOverlay: 'from-[#0D0D0D]/80 via-[#1A1612]/70 to-[#C6934F]/30',
    badge: 'Pro',
    stats: null,
    benefits: [
      { icon: 'solar:calendar-bold-duotone', text: 'Gestion de rendez-vous simplifiée' },
      { icon: 'solar:wallet-bold-duotone', text: 'Paiements sécurisés et rapides' },
      { icon: 'solar:chart-2-bold-duotone', text: 'Tableau de bord analytique' },
      { icon: 'solar:users-group-rounded-bold-duotone', text: 'Accès à plus de 1000+ clients' },
    ],
  },
};

const Register = () => {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'professional' ? 'professional' : 'client';

  const [role, setRole] = useState(initialRole);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const config = roleConfig[role];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      full_name: '',
      gender: '',
      email: '',
      phone: '',
      city: '',
      addresse: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleClickShowPassword = () => setIsPasswordShown(!isPasswordShown);

  const handleRoleSwitch = (newRole) => {
    if (newRole !== role) {
      setRole(newRole);
      setError('');
      reset();
    }
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setError('');
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
      }, role);

      if (result.status) {
        toast.success('Inscription réussie ! Veuillez vérifier votre email.');
        router.push(`${config.otpRedirect}?email=${encodeURIComponent(data.email)}`);
      } else {
        setError(result.message || "L'inscription a échoué");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription");
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
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Adresse email invalide' },
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

      {/* Left / Decorative Panel — only on large screens */}
      <div className="hidden lg:flex w-5/12 relative overflow-hidden items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${config.panelImage}')` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${config.panelOverlay}`}
              style={role === 'client' ? { mixBlendMode: 'multiply' } : undefined}
            />
          </motion.div>
        </AnimatePresence>

        {/* Decorative floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-[#C6934F]/15 blur-3xl animate-float" />
          <div className="absolute bottom-32 left-10 w-60 h-60 rounded-full bg-[#C6934F]/10 blur-3xl animate-float-slow" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-white px-12 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {role === 'professional' && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-white/90 text-sm font-medium">
                  <Icon icon="solar:star-bold" className="w-4 h-4 text-[#E8C98A]" />
                  Espace Professionnel
                </span>
              )}

              <h2 className="text-3xl xl:text-4xl font-bold font-playfair leading-tight">
                {config.panelTitle}
              </h2>

              <p className="text-white/70 leading-relaxed">
                {config.panelDescription}
              </p>

              {/* Benefits for pro */}
              {config.benefits && (
                <div className="space-y-4 pt-4">
                  {config.benefits.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon icon={item.icon} className="w-5 h-5 text-[#E8C98A]" />
                      </div>
                      <span className="text-white/80 text-sm">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Stats for client */}
              {config.stats && (
                <div className="grid grid-cols-3 gap-4 pt-6">
                  {config.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center"
                    >
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-white/70 text-xs">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right / Form Panel */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <Card className="border-none shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-500">
            <CardHeader className="space-y-4 pb-3">


              {/* Role Toggle */}
              <div className="bg-gray-100 rounded-xl p-1 flex">
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('client')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    role === 'client'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon icon="solar:user-bold-duotone" className="w-4 h-4" />
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('professional')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    role === 'professional'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon icon="solar:star-bold-duotone" className="w-4 h-4" />
                  Professionnel
                </button>
              </div>

              <div>
                <CardTitle className="text-xl">{config.title}</CardTitle>
                <CardDescription className="text-sm mt-1">{config.subtitle}</CardDescription>
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
                    className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded text-sm flex items-center gap-2"
                  >
                    <Icon icon="solar:danger-triangle-bold" className="w-4 h-4 flex-shrink-0" />
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* 2-column grid for form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formFields.map((field) => (
                    <Controller
                      key={field.name}
                      name={field.name}
                      control={control}
                      rules={field.rules}
                      render={({ field: formField }) => (
                        <div className="space-y-1">
                          <Label htmlFor={field.name} className="text-xs text-gray-600 leading-4">
                            {field.label}
                          </Label>
                          {field.type === 'select' ? (
                            <div className="relative">
                              <select
                                {...formField}
                                id={field.name}
                                className={`w-full h-9 px-3 rounded-md border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#C6934F] focus:border-[#C6934F] transition-all duration-300 appearance-none ${
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
                              className={`h-9 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Le mot de passe est requis',
                      minLength: { value: 8, message: 'Minimum 8 caractères' },
                    }}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Label htmlFor="password" className="text-xs text-gray-600 leading-4">Mot de passe*</Label>
                        <div className="relative">
                          <Input
                            {...field}
                            type={isPasswordShown ? 'text' : 'password'}
                            id="password"
                            placeholder="••••••••"
                            className={`h-9 bg-white border-gray-300 pr-10 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
                              errors.password ? 'border-red-500' : ''
                            }`}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={handleClickShowPassword}
                            className="absolute inset-y-0 right-0 h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-transparent"
                          >
                            {isPasswordShown ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                          </Button>
                        </div>
                        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                      </div>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: 'Veuillez confirmer le mot de passe',
                      validate: (value) => value === control._formValues.password || 'Les mots de passe ne correspondent pas',
                    }}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Label htmlFor="confirmPassword" className="text-xs text-gray-600 leading-4">Confirmer*</Label>
                        <Input
                          {...field}
                          type={isPasswordShown ? 'text' : 'password'}
                          id="confirmPassword"
                          placeholder="••••••••"
                          className={`h-9 bg-white border-gray-300 focus:border-[#C6934F] focus:ring-[#C6934F] transition-all duration-300 ${
                            errors.confirmPassword ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                      </div>
                    )}
                  />
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-400">
                  En vous inscrivant, vous acceptez nos{' '}
                  <Link href="#" className="text-[#C6934F] hover:underline">Conditions d&apos;utilisation</Link>
                  {' '}et notre{' '}
                  <Link href="#" className="text-[#C6934F] hover:underline">Politique de confidentialité</Link>.
                </p>

                {/* Submit */}
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
                    config.submitLabel
                  )}
                </Button>
              </form>

              {/* Login link */}
              <div className="mt-5 text-center">
                <p className="text-sm text-gray-500">
                  Vous avez déjà un compte ?{' '}
                  <Link href={config.loginLink} className="text-[#C6934F] font-medium hover:underline transition-all duration-200">
                    {config.loginLabel}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
