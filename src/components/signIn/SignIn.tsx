import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(6, { message: "Password should be at least 6 characters long" })
        .min(1, { message: "Password is required" }),
    rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    // Use React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
        const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

        toast.promise(promise, {
            loading: 'Loading...',
            success: () => {
                return `WellCome back admin`;
            },
            error: 'Error',
        });
        navigate("/dashboard")
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="lg:min-w-[500px] h-full mx-auto">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Hi, Welcome Back! 👋</h1>
                    <p className="text-gray-500 text-sm">Please Enter Your Email And Password Below!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
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
                            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-200"
                                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
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
                                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-200"
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
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-primary/80 text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}