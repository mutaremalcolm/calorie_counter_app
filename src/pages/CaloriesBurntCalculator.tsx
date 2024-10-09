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
import { caloriesBurntTitle } from "@/lib/constants";
import { Link } from "react-router-dom";

// Function to calculate the calorie deficit
const calculateEnergyBalance = (
  caloriesConsumed: number,
  caloriesBurnt: number
) => {
  return caloriesConsumed - caloriesBurnt;
};

const CaloriesBurntCalculator = () => {
  const [unitType, setUnitType] = React.useState("US");
  const [energyBalance, setEnergyBalance] = React.useState<number | null>(null);

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    const result = calculateEnergyBalance(
      values.caloriesConsumed,
      values.caloriesBurnt
    );
    setEnergyBalance(result);
    console.log(values);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <section>
          {caloriesBurntTitle.map((info, index) => (
            <div key={index} className="mt-5 rounded-sm">
              {info.title && (
                <h1 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
                  {info.title}
                </h1>
              )}
              <div className=" bg-gray-200 p-4 rounded-sm">
                <p>{info.content}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center bg-purple-500 text-white">
            <ChevronDown />
            <span>
              Modify the values below and click the Calculate button to use
            </span>
          </div>
        </section>
        <div className="relative w-full max-w-md">
          <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US"
                  ? "bg-purple-500 text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setUnitType("US")}
            >
              US Units
            </button>
            <button
              className={`px-4 py-2 rounded ${
                unitType === "Metric"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setUnitType("Metric")}
            >
              Metric Units
            </button>
          </div>
          <Card className="w-full p-4 mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Calories Consumed Field */}
                <FormField
                  control={form.control}
                  name="caloriesConsumed"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="flex-shrink-0 ml-4 mr-2">
                        Calories Consumed
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="500"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
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
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="flex-shrink-0 ml-4 mr-2">
                        Calories Burnt
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="300"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
                        Calories 0 - 5000
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <section className="ml-10 underline">+ Settings</section>
                <section className="pb-4">
                  <Button type="submit" className="ml-10 bg-purple-500">
                    Calculate
                    <Play className="w-4 h-4 ml-2 fill-light" />
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-purple-500"
                    onClick={() => {
                      form.reset();
                      setEnergyBalance(null);
                    }}
                  >
                    Clear
                  </Button>
                </section>
              </form>
            </Form>
          </Card>
        </div>
        <section className="ml-2 text-sm bg-gray-200 rounded-sm p-4 mt-4">
          <ul>
            <li>
              <strong>Calories Burnt:</strong> Track the calories you've burned
              through various activities.
            </li>
            <li>
              <strong>Calories Consumed:</strong> Monitor your daily calorie
              intake.
            </li>
            <li>
              <strong>Energy Balance:</strong> Understand the balance between
              calories consumed and burnt.
            </li>
          </ul>
        </section>
        {/* Related calculators section */}
        <section className="relative w-full mt-5">
          <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US"
                  ? "bg-gray-200 text-purple-500"
                  : "bg-transparent"
              }`}
              onClick={() => setUnitType("US")}
            >
              Related
            </button>
          </div>
        <section className="flex justify-center bg-gray-200 mt-10 rounded-sm">
            <Link to="/CalorieCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                Calorie Calculator
              </Button>
            </Link>
            <Link to="/IdealWeightCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                Ideal Weight Calculators
              </Button>
            </Link>
            <Link to="/BmiCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                BMI Calculator
              </Button>
            </Link>
          </section>
          </section>
        <section>
          <div className="mt-5 bg-gray-200 rounded-sm p-4">
            {energyBalance !== null && (
              <p>
                <strong>Energy Balance:</strong> {energyBalance}
              </p>
            )}
            The Calories Burnt Calculator can be used to estimate the number of
            calories you burn during various activities. It helps you understand
            your energy expenditure and manage your weight effectively.
          </div>
        </section>
      </main>
    </>
  );
};

export default CaloriesBurntCalculator;
