import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ChevronDown, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaloriesBurntCalculator = () => {
  const [unitType, setUnitType] = React.useState("US");
  const navigate = useNavigate();

  // Form schema
  const formSchema = z.object({
    caloriesConsumed: z
      .number({
        required_error: "Calories Consumed is required",
        invalid_type_error: "Calories Consumed must be a number",
      })
      .min(500, "Calories Consumed must be at least 500")
      .max(3500, "Calories Consumed must be under 3500"),
    caloriesBurnt: z
      .number({
        required_error: "Calories Burnt is required",
        invalid_type_error: "Calories Burnt must be a number",
      })
      .min(0, "Calories Burnt cannot be negative")
      .max(5000, "Calories Burnt must be under 5000"),
  });

  type FormValues = z.infer<typeof formSchema>;

  // Initialize form with empty string default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caloriesConsumed: undefined,
      caloriesBurnt: undefined
    }
  });

  const onSubmit = (values: FormValues) => {
    const energyBalance = values.caloriesConsumed - values.caloriesBurnt;
    
    navigate("/caloriesBurntResults", {
      state: {
        caloriesConsumed: values.caloriesConsumed,
        caloriesBurnt: values.caloriesBurnt,
        energyBalance: energyBalance
      }
    });
  };
 
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">
              Calories Burnt Calculator
            </h1>
            <div className="flex justify-center bg-black text-white p-2 dark:bg-gray-800 rounded-lg">
              <ChevronDown className="mr-2" />
              <span>Modify the values below and click Calculate</span>
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
              {/* Calories Consumed Field */}
              <FormField
                control={form.control}
                name="caloriesConsumed"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-center">
                    <FormLabel className="flex-shrink-0 ml-4 mr-2">
                      Calories Consumed
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 px-2 py-1 text-left dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onChange={(e) => {
                          const value = e.target.value;
                          onChange(value === '' ? undefined : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormDescription className="ml-2 dark:text-gray-400">
                      Calories 500 - 3500
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Calories Burnt Field */}
              <FormField
                control={form.control}
                name="caloriesBurnt"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="flex items-center justify-center">
                    <FormLabel className="flex-shrink-0 ml-4 mr-2">
                      Calories Burnt
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 px-2 py-1 text-left ml-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onChange={(e) => {
                          const value = e.target.value;
                          onChange(value === '' ? undefined : parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormDescription className="ml-2 dark:text-gray-400">
                      Calories 0 - 5000
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <section className="pt-2 pb-4 flex flex-col justify-center md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <Button
                  type="submit"
                  className="bg-black dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Calculate
                  <Play className="w-4 h-4 ml-2 fill-current" />
                </Button>
                <Button
                  type="button"
                  className="bg-black dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => form.reset()}
                >
                  Clear
                </Button>
              </section>
            </form>
          </Form>
        </Card>
      </main>
    </>
  );
};

export default CaloriesBurntCalculator;