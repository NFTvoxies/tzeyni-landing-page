"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

import { signIn, useSession } from "next-auth/react";

const LoginPro = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [dictionary, setDictionary] = useState(null);
  const [error, setError] = useState("");
  const { locale } = useParams();
  const handleClickShowPassword = () => setIsPasswordShown(!isPasswordShown);

  const { data: session, status } = useSession(); // Get session data and status

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
      router.push("http://localhost:3001/dashboard");
    }
  }, [status, router]);

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result.ok) {
        // Manually redirect after login
        router.push("http://localhost:3001/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {dictionary?.title || "Welcome Back"}
          </h1>
          <p className="text-gray-600 mb-8">
            {dictionary?.description || "Login to your account"}
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="email"
              control={control}
              rules={{
                required:
                  dictionary?.form?.inputs?.email?.errors?.required ||
                  "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:
                    dictionary?.form?.inputs?.email?.errors?.email ||
                    "Invalid email address",
                },
              }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {dictionary?.form?.inputs?.email?.label || "Email"}
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="you@example.com"
                    />
                    <Icon
                      icon="mdi:email"
                      className="absolute right-3 top-2.5 text-gray-400"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required:
                  dictionary?.form?.inputs?.password?.errors?.required ||
                  "Password is required",
              }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {dictionary?.form?.inputs?.password?.label || "Password"}
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      type={isPasswordShown ? "text" : "password"}
                      id="password"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={handleClickShowPassword}
                      className="absolute right-3 top-2.5 text-gray-400"
                    >
                      <Icon
                        icon={isPasswordShown ? "mdi:eye-off" : "mdi:eye"}
                      />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-yellow-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {dictionary?.form?.inputs?.remember?.label || "Remember me"}
                </span>
              </label>
              <Link
                href="/auth/forgot_password"
                className="text-sm text-[#aa9270] hover:underline"
              >
                {dictionary?.links?.forgot_password || "Forgot Password?"}
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#aa9270] text-white py-2 px-4 rounded-lg hover:bg-[#aa9270] transition duration-200"
            >
              {dictionary?.form?.buttons?.submit || "Login"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {dictionary?.links_text || "Don't have an account?"}
            </p>
            <div className="mt-3 space-x-4">
              <Link
                href={`/auth/register/client`}
                className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Register as Client
              </Link>
              <Link
                href={`/auth/register/professionnelle`}
                className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                Register as Professional
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Image and Pattern */}
      <div className="hidden lg:block w-1/2 bg-[#aa9270] relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 z-10"></div>
        <Image
          src="/assets/image/tzeyni header bg.png" // Replace with your actual image path
          alt="Login background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-[#aa9270] opacity-20 z-20"></div>
        <div className="absolute inset-0 z-30">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 L50 100 L100 0 Z"
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.2)"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-40">
          <h2 className="text-3xl font-bold mb-2">Welcome to Our Platform</h2>
          <p>
            Connect, collaborate, and grow with our community of professionals
            and clients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPro;
