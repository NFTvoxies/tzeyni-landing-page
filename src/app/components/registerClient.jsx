"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import axios from "../../axios";

const RegisterClient = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [dictionary, setDictionary] = useState(null);
  const [error, setError] = useState("");

  const { locale } = useParams();
  const [successMessage, setSuccessMessage] = useState("");

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
      setError("Passwords don't match");
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/api/user/register", {
        full_name: data.full_name,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        city: data.city,
        addresse: data.addresse,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      const result = response.data;

      if (response.status === 200 && result.status) {
        setSuccessMessage(
          "Registration successful. Check your email for the verification code."
        );

        router.push(`/auth/client/verify-otp?email=${encodeURIComponent(data.email)}`);
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {dictionary?.title || "Create an Account"}
          </h1>
          <p className="text-gray-600 mb-8">
            {dictionary?.description || "Join our community today"}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="full_name"
              control={control}
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    {...field}
                    type="text"
                    id="full_name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.full_name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.full_name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <select
                    {...field}
                    id="gender"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
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
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    {...field}
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+1234567890"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    {...field}
                    type="text"
                    id="city"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your City"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="addresse"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="addresse"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <textarea
                    {...field}
                    id="addresse"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                      errors.addresse ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your Address"
                    rows="3"
                  ></textarea>
                  {errors.addresse && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.addresse.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      type={isPasswordShown ? "text" : "password"}
                      id="password"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
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

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === control._formValues.password ||
                  "The passwords do not match",
              }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      {...field}
                      type={isPasswordShown ? "text" : "password"}
                      id="confirmPassword"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}
            />

            <button
              type="submit"
              className="w-full bg-[#aa9270] text-white py-2 px-4 rounded-lg hover:bg-[#aa9270] transition duration-200"
            >
              {dictionary?.form?.buttons?.submit || "Register"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {dictionary?.links_text || "Already have an account?"}
            </p>
            <Link
              href={`/auth/login`}
              className="mt-2 inline-block text-[#aa9270] hover:underline"
            >
              Login here
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right side - Image and Pattern */}
      <div className="hidden lg:block w-1/2 bg-[#aa9270] relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 z-10"></div>
        <Image
          src="/assets/image/tzeyni header bg.png" // Replace with your actual image path
          alt="Registration background"
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
          <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
          <p>
            Create an account to connect, collaborate, and grow with
            professionals and clients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
