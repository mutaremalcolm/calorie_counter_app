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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Play } from "lucide-react";
import { calorieInfo, calorieTitle } from "@/lib/constants";
import { Link } from "react-router-dom";

// Activity Levels
const activityLevels = {
  "Light: exercise 1-2 times/week": 1.375,
  "Moderate: exercise 4-5 times/week": 1.55,
  "Heavy: daily exercise or intense exercise 6-7 times/week": 1.725,
};

type ActivityLevel = keyof typeof activityLevels;

// Calculate Calories (using Harris-Benedict formula)
const calculateCalories = (
  age: number,
  gender: "male" | "female",
  height: number,
  weight: number,
  activity: ActivityLevel
) => {
  let bmr;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  const maintainanceCalories = bmr * activityLevels[activity];
  const loseHalfKgCalories = maintainanceCalories - 500;
  const loseOneKgCalories = maintainanceCalories - 1000;

  return {
    maintenance: Math.round(maintainanceCalories),
    loseHalfKg: Math.round(loseHalfKgCalories),
    loseOneKg: Math.round(loseOneKgCalories),
  };
};

const CalorieCalculator = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activity, setActivity] = React.useState<ActivityLevel>(
    "Moderate: exercise 4-5 times/week"
  );
  const [unitType, setUnitType] = React.useState("US");
  const [calorieResults, setCalorieResults] = React.useState<ReturnType<
    typeof calculateCalories
  > | null>(null);


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
      [
        "Light: exercise 1-2 times/week",
        "Moderate: exercise 4-5 times/week",
        "Heavy: daily exercise or intense exercise 6-7 times/week",
      ] as const,
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

  function onSubmit(values: FormValues) {
    const results = calculateCalories(
      values.age,
      values.gender,
      values.height,
      values.weight,
      values.activity
    );
    setCalorieResults(results);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        {/* title */}
        <section>
        {calorieTitle.map((info, index)=> (
            <div key={index} className="mt-5 rounded-sm">
              {info.title && (
                <h1 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
                  {info.title}
                </h1>
              )}
              <div className=" bg-pink-40 p-4 rounded-sm">
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
          {/* Input Card */}
          <Card className="w-full p-4 mt-8 bg-pink-40">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="flex-shrink-0 ml-4 mr-2">
                        Age
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onFocus={() => field.onChange()}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
                        ages 15 - 80
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
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-row items-center w-full"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Height Section */}
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="flex-shrink-0 ml-4 mr-2">
                        Height
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onFocus={() => field.onChange(undefined)}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
                        min height 100cm
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Weight Section */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel className="flex-shrink-0 ml-4 mr-2">
                        Weight
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onFocus={() => field.onChange(undefined)}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
                        min weight 30kg
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Activity Section */}
                <FormField
  control={form.control}
  name="activity"
  render={({ field }) => (
    <FormItem className="flex items-center w-full">
      <FormLabel className="flex-shrink-0 ml-4 mr-2 required">
        Activity
      </FormLabel>
      <FormControl>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Input
                readOnly
                value={field.value}
                className="cursor-pointer text-start pr-8"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              Select Activity Level
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={field.value === "Light: exercise 1-2 times/week"}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange("Light: exercise 1-2 times/week");
                }
              }}
            >
              Light: exercise 1-2 times/week
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={field.value === "Moderate: exercise 4-5 times/week"}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange("Moderate: exercise 4-5 times/week");
                }
              }}
            >
              Moderate: exercise 4-5 times/week
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={field.value === "Heavy: daily exercise or intense exercise 6-7 times/week"}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange("Heavy: daily exercise or intense exercise 6-7 times/week");
                }
              }}
            >
              Heavy: daily exercise or intense exercise 6-7 times/week
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
                {/* Settings Section */}
                <section className="ml-10 underline">+ Settings</section>
                <div className="pb-4">
                  <Button type="submit" className="ml-10 bg-purple-500">
                    Calculate
                    <Play className="w-4 h-4 ml-2 fill-light" />
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-purple-500"
                    onClick={() => {
                      form.reset();
                      setActivity("Moderate: exercise 4-5 times/week");
                      setCalorieResults(null);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
        {/* Results */}
        {calorieResults && (
          <Card className="w-full p-4 mt-8">
            <h2 className="text-xl font-bold mb-4">Your Calorie Needs:</h2>
            <ul>
              <li>Maintaince: {calorieResults.maintenance} calories/day</li>
              <li>
                To Lose 0.5kg/week: {calorieResults.loseHalfKg} calories/day
              </li>
              <li>To lose 1kg/week: {calorieResults.loseOneKg} calories/day</li>
            </ul>
          </Card>
        )}
        {/* Activity Levels */}
        <section className="ml-2 text-sm bg-pink-50 rounded-sm p-4 mt-4">
          <ul>
            <li>
              <strong>Exercise:</strong> 15-30 minutes of elevated heart rate
              activity.
            </li>
            <li>
              <strong>Intense exercise:</strong> 25-120 minutes of elevated
              heart rate activity.
            </li>
            <li>
              <strong>Very intense exercise:</strong> 2+ hours of elevated heart
              rate activity.
            </li>
          </ul>
        </section>
        {/* related calculators */}
        <section className="relative w-full mt-5">
          <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US"
                  ? "bg-pink-50 text-purple-500"
                  : "bg-transparent"
              }`}
              onClick={() => setUnitType("US")}
            >
              Related
            </button>
          </div>
          {/*TODO: Optimise for mobile */}
          <section className="flex justify-center bg-gray-200 mt-10 rounded-sm">
            <Link to="/BmiCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                BMI Calculator
              </Button>
            </Link>
            <Link to="/IdealWeightCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                Ideal Weight Calculators
              </Button>
            </Link>
            <Link to="/CaloriesBurntCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                Calories Burnt Calculators
              </Button>
            </Link>
          </section>
          {/* Additional Information Section */}
          <section>
            {calorieInfo.map((info, index) => (
              <div key={index} className="mt-5 rounded-sm p-4">
                {info.title && (
                  <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
                    {info.title}
                  </h4>
                )}
                <div className=" bg-pink-50 p-4 rounded-sm">
                  <p>{info.content}</p>
                  {info.equation && <p>{info.equation}</p>}
                  {info.list && (
                    <ul>
                      {info.list.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
    </>
  );
};

export default CalorieCalculator;
