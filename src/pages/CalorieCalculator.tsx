import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const activityLevels = {
  Sedentary: 1.2,
  "Light Exercise": 1.375,
  "Moderate Exercise": 1.55,
  "Heavy Exercise": 1.725,
  Athlete: 1.9,
};

const CalorieCalculator = () => {
  const navigate = useNavigate();
  const [unitType, setUnitType] = useState("US");

  // Form Schema
  const formSchema = z.object({
    age: z
      .number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
      })
      .min(15, "Age must be at least 15")
      .max(100, "Age must be under 100"),
    gender: z.enum(["male", "female"], {
      required_error: "Please select a gender",
    }),
    height: z
      .number({
        required_error: "Height is required",
        invalid_type_error: "Height must be a number",
      })
      .min(100, "Height must be at least 100cm")
      .max(250, "Height must be under 250cm"),
    weight: z
      .number({
        required_error: "Weight is required",
        invalid_type_error: "Weight must be a number",
      })
      .min(30, "Weight must be at least 30kg")
      .max(300, "Weight must be under 300kg"),
    activity: z.enum(
      Object.keys(activityLevels) as [keyof typeof activityLevels],
      {
        required_error: "Please select an activity level",
      }
    ),
  });

  type FormValues = z.infer<typeof formSchema>;

  // form resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // BMR = Basic metabolic rate (the minimum number of calories your body needs to
  //       perform basic functions while resting)
  function onSubmit(values: FormValues) {
    const bmr = calculateBMR(values);
    const tdee = bmr * activityLevels[values.activity];
    const results = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee), // tdee = total daily energy expendetiture
      maintenance: Math.round(tdee),
      weightLoss: Math.round(tdee - 500),
      weightGain: Math.round(tdee + 500),
    };
    navigate("/results", { state: { results } });
  }

  // Function to calculate Calories needed (BMR)
  const calculateBMR = (values: FormValues) => {
    const { age, gender, height, weight } = values;
    if (gender === "male") {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Calorie Calculator</h1>
          {/* Metric Units */}
          <div className="flex justify-center bg-black dark:bg-gray-800 text-white p-2 rounded-lg">
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

        <Card className="p-4 md:p-6 w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Age Input */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:items-center">
                    <FormLabel className="w-24 mb-2 md:mb-0 dark:text-white">
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onFocus={() => field.onChange()}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="ml-2 dark:text-gray-400">
                      years (15-100)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender Section */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <FormLabel className="w-24">Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex gap-4"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem
                              value="male"
                              id="male"
                              className="dark:border-gray-600"
                            />
                            <Label
                              htmlFor="male"
                              className="ml-2 dark:text-white"
                            >
                              Male
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem
                              value="female"
                              id="female"
                              className="dark:border-gray-600"
                            />
                            <Label
                              htmlFor="female"
                              className="ml-2 dark:text-white"
                            >
                              Female
                            </Label>
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
                    <FormLabel className="w-24 mb-2 md:mb-0 dark:text-white">
                      Height
                    </FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input
                          {...field}
                          className="w-20 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          onFocus={() => field.onChange()}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="ml-2 dark:text-gray-400">
                        cm
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Weight Input */}
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-24">Weight</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 text-right dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onFocus={() => field.onChange()}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="ml-2 dark:text-gray-400">
                      kg
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Activity Level */}
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-24">Activity</FormLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex-1">
                          <Input
                            readOnly
                            value={field.value || "Select activity level"}
                            className="cursor-pointer dark:border-gray-600"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>
                          Select activity level
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Object.keys(activityLevels).map((level) => (
                          <DropdownMenuCheckboxItem
                            key={level}
                            checked={field.value === level}
                            onCheckedChange={() => field.onChange(level)}
                          >
                            {level}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Buttons */}
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

        {/* Activity Level Guide */}
        <div className="items-center mt-6 bg-black text-white p-4 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white">
          <h3 className="font-bold mb-2">Activity Level Guide</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Sedentary:</strong> Little or no exercise
            </li>
            <li>
              <strong>Light Exercise:</strong> 1-3 days/week
            </li>
            <li>
              <strong>Moderate Exercise:</strong> 3-5 days/week
            </li>
            <li>
              <strong>Heavy Exercise:</strong> 6-7 days/week
            </li>
            <li>
              <strong>Athlete:</strong> 2x training per day
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
