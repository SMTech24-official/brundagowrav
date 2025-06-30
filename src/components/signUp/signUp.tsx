/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { useCreateUserMutation } from "../../redux/api/auth/authAPi";
import {
  setAddress,
  setContactNumber,
  setEmail,
  setName,
  setPassword,
} from "../../redux/features/auth/registerSlice";

// Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  contactNumber: z
    .string()
    .min(1, { message: "Contact number is required" })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number",
    }),
  address: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
  profilePhoto: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createUser, { isLoading }] = useCreateUserMutation();

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      password: "",
      profilePhoto: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Update Redux store with form data
    dispatch(setName(data.name));
    dispatch(setEmail(data.email));
    dispatch(setContactNumber(data.contactNumber));
    dispatch(setAddress(data.address || ""));
    dispatch(setPassword(data.password));

    try {
      const userData = {
        user: {
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          address: data.address,
        },
        password: data.password,
        planId: "", // Add planId if needed, e.g., from a dropdown
        file,
      };

      await createUser(userData).unwrap();

      setIsSuccess(true); // ✅ show message
      toast.success("Registration successful!", {
        description: "Please check your email to verify your account.",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);

      navigate("/");
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error?.data?.message || "Something went wrong",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="lg:min-w-[500px] h-full mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Welcome, Register Here! 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Please Enter Your Credentials Below!
          </p>
        </div>

        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
            Registration successful! ✅<br />
            Please check your email to verify your account. 📧
            <br />
            Redirecting to login page...
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium block">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium block">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="georgiayoung@example.com"
              {...register("email")}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Contact Number Input */}
          <div className="space-y-2">
            <label
              htmlFor="contactNumber"
              className="text-sm font-medium block"
            >
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="text"
              placeholder="+1234567890"
              {...register("contactNumber")}
              className={`w-full px-3 py-2 border ${
                errors.contactNumber ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Address Input */}
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium block">
              Address (Optional)
            </label>
            <input
              id="address"
              type="text"
              placeholder="123 Main St"
              {...register("address")}
              className={`w-full px-3 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>

          {/* Profile Photo Input */}
          <div className="space-y-2">
            <label htmlFor="profilePhoto" className="text-sm font-medium block">
              Profile Photo (Optional)
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className={`w-full px-3 py-2 border ${
                errors.profilePhoto ? "border-red-500" : "border-gray-200"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {/* {errors.profilePhoto && (
              <p className="text-red-500 text-xs">
                {errors.profilePhoto.message}
              </p>
            )} */}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium block">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                {...register("password")}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer bg-primary/80 text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-xs text-center">
            Have an account?{" "}
            <span className="text-sm text-blue-400">
              <Link to="/">Sign In</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
