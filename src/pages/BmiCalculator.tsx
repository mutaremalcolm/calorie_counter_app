import { useState, createContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, Play } from "lucide-react";
import { calculateBMI } from "@/lib/calculators";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ThemeProviderProps {
  children: ReactNode;
}

// Create theme context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Update document class and localStorage when theme changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const BmiCalculator = () => {
  const [unitType, setUnitType] = useState("US");
  const navigate = useNavigate();

  const formSchema = z.object({
    age: z
      .number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
      })
      .min(15, "Age must be at least 15")
      .max(80, "Age must be under 80"),
    gender: z.enum(["male", "female"], {
      required_error: "Please select a gender",
    }),
    height: z
      .number({
        required_error: "Height is required",
        invalid_type_error: "Height must be a number",
      })
      .positive("Height must be positive")
      .min(100, "Height must be at least 100 cm")
      .max(250, "Height must be under 250 cm"),
    weight: z
      .number({
        required_error: "Weight is required",
        invalid_type_error: "Weight must be a number",
      })
      .positive("Weight must be positive")
      .min(30, "Weight must be at least 30 kg")
      .max(300, "Weight must be under 300 kg"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      height: undefined,
      weight: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    const results = calculateBMI(
      values.age,
      values.gender,
      values.height,
      values.weight
    );
    navigate("/bmiresults", { state: { results } });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl md:text-2xl font-bold dark:text-white">BMI Calculator</h1>
          </div>
          <div className="flex justify-center bg-black dark:bg-gray-800 text-white p-2 rounded-lg">
            <ChevronDown className="mr-2 h-5 w-5" />
            <span className="text-sm md:text-base">Modify the values below and click Calculate</span>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-l transition-colors duration-200 ${
              unitType === "Metric"
                ? "bg-black dark:bg-gray-800 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setUnitType("Metric")}
          >
            Metric Units
          </button>
          <button
            className={`px-3 md:px-4 py-2 text-sm md:text-base rounded-r transition-colors duration-200 ${
              unitType === "US"
                ? "bg-black dark:bg-gray-800 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setUnitType("US")}
          >
            US Units
          </button>
        </div>
      </div>

      <Card className="p-4 md:p-6 w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center">
                  <FormLabel className="w-24 mb-2 md:mb-0 dark:text-white">Age</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="ml-2 dark:text-gray-400">years (15-100)</FormDescription>
                  </div>
                  <FormMessage className="mt-1 md:ml-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <FormLabel className="w-24 mb-2 md:mb-0 dark:text-white">Gender:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex gap-4"
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="male" id="male" className="dark:border-gray-600" />
                          <Label htmlFor="male" className="ml-2 dark:text-white">Male</Label>
                        </div>
                        <div className="flex items-center">
                          <RadioGroupItem value="female" id="female" className="dark:border-gray-600" />
                          <Label htmlFor="female" className="ml-2 dark:text-white">Female</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Height Input */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center">
                  <FormLabel className="w-24 mb-2 md:mb-0 dark:text-white">Height:</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onFocus={() => field.onChange()}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="ml-2 dark:text-gray-400">cm</FormDescription>
                  </div>
                  <FormMessage className="mt-1 md:ml-2" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center">
                  <FormLabel className="w-24 mb-2 md:mb-0 dark:text-white">Weight:</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onFocus={() => field.onChange()}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="ml-2 dark:text-gray-400">kg</FormDescription>
                  </div>
                  <FormMessage className="mt-1 md:ml-2" />
                </FormItem>
              )}
            />

            <section className="pt-2 pb-4 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
              <Button
                type="submit"
                className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Calculate
                <Play className="w-4 h-4 ml-2 fill-current" />
              </Button>
              <Button
                type="button"
                className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => form.reset()}
              >
                Clear
              </Button>
            </section>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BmiCalculator;