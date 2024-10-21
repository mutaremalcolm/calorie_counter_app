import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Card } from "@/components/ui/card";
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

import { calorieTitle } from "@/lib/constants";
import { activityLevels } from "@/lib/calculators";
import { calculateCalories } from "@/lib/calculators";

const CalorieCalculator = () => {
  const navigate = useNavigate();
  const [unitType, setUnitType] = useState("US");
  const { handleSubmit } = useForm<FormValues>();

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

  function onSubmit(values: FormValues) {
    const results = calculateCalories(
      values.age,
      values.gender,
      values.height,
      values.weight,
      values.activity
    );
    navigate("/results", { state: { results } });
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        {/* title */}
        <section>
          {calorieTitle.map((info, index) => (
            <div key={index} className="mt-5 rounded-sm">
              {info.title && (
                <h1 className="font-nunito-sans font-extrabold text-white bg-black p-1 mt-4">
                  {info.title}
                </h1>
              )}
              <div className=" bg-pink-40 p-4 rounded-sm">
                <p>{info.content}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center bg-black text-white">
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
                unitType === "Metric" ? "bg-black text-white" : "bg-gray-200"
              }`}
              onClick={() => setUnitType("Metric")}
            >
              Metric Units
            </button>
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US" ? "bg-black text-white" : "bg-transparent"
              }`}
              onClick={() => setUnitType("US")}
            >
              US Units
            </button>
          </div>
          {/* Input Card */}
          <Card className="w-full p-4 mt-8 bg-pink-40">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {/* Activity Drop Down Selection */}
                <FormField
                  control={form.control}
                  name="activity"
                  render={({ field }) => (
                    <FormItem className="flex items-center w-full">
                      <FormLabel className="flex-shrink-0 ml-4 mr-2 required">
                        Activity Level
                      </FormLabel>
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
                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            Select an activity level
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {Object.keys(activityLevels).map((level) => (
                            <DropdownMenuCheckboxItem
                              key={level}
                              checked={field.value === level}
                              onCheckedChange={() => {
                                field.onChange(
                                  level as keyof typeof activityLevels
                                );
                              }}
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
                <section>
                  <div className="pb-4">
                    {/* TODO: fix form reset */}
                    <Button type="submit" className="ml-10 bg-black">
                      Calculate
                      <Play className="w-4 h-4 ml-2 fill-light" />
                    </Button>
                    <Button
                      type="button"
                      className="ml-2 bg-black"
                      onClick={() => {
                        form.reset();
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </section>
              </form>
            </Form>
          </Card>
        </div>
        {/* Activity Levels */}
        <section className="ml-2 text-sm bg-black text-white rounded-sm p-4 mt-4">
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
      </main>
    </>
  );
};

export default CalorieCalculator;
