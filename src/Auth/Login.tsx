import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock } from "lucide-react"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input"; 


const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(7, { message: "Email is too short" })
    .max(30, { message: "Email is too long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const { email, password } = data;
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24  dark:bg-gray-900 transition-colors duration-200">
      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-center mb-5 text-black dark:text-white">
            Welcome to the Calorie Application
          </CardTitle>
          <section className="text-center mb-5">
            <CardDescription className="text-black dark:text-white">
              Your tool to help you track and manage your calorie intake, helping you achieve your fitness goals.
            </CardDescription>
          </section>
          <section className="text-center mt-5">
            <CardDescription>
              <section className="mt-5 text-black dark:text-white">
                Enter your details to log in and access your Dashboard
              </section>
            </CardDescription>
          </section>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <section className="flex flex-col items-center mb-4 w-full">
              <div className="flex items-center w-full md:w-3/4 bg-gray-100 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <Mail className="mr-2 text-black dark:text-white" />
                <Input
                  className="w-full border-none bg-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your email"
                  {...register("email")}
                  onKeyDown={() => clearErrors()}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </section>

            {/* Password Input */}
            <section className="flex flex-col items-center mb-4 w-full">
              <div className="flex items-center w-full md:w-3/4 bg-gray-100 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <Lock className="mr-2 text-black dark:text-white" />
                <Input
                  className="w-full border-none bg-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  onKeyDown={() => clearErrors()}
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </section>

            {/* Submit Button */}
            <section className="flex justify-center mt-6">
              <Button className="mt-4 text-white bg-black" type="submit">
                Login
              </Button>
            </section>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
