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
import React from "react";
import { ChevronDown, Play } from "lucide-react";
import { BMIinfo, BMItitle } from "@/lib/constants";
import { Link } from "react-router-dom";

const calculateBMI = (
  _age: number,
  _gender: string,
  height: number,
  weight: number
) => {
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10; // Round to one decimal place
};

const BmiCalculator = () => {
  const [bmiResult, setBmiResult] = React.useState<number | null>(null);
  const [unitType, setUnitType] = React.useState("US");

  // Form Schema
  const formSchema = z.object({
    age: z
      .number({
        required_error: "Age is required",
        invalid_type_error: "Age is required",
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const bmiResults = calculateBMI(
      values.age,
      values.gender,
      values.height,
      values.weight
    );
    setBmiResult(bmiResults);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <section>
          {/* Title */}
          {BMItitle.map((info, index) => (
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
          <Card className="w-full p-4 mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <>
                      {/* Age Input */}
                      <FormItem className="flex items-center">
                        <FormLabel className="flex-shrink-0 ml-4 mr-2">
                          Age
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoFocus
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="w-20 px-2 py-1 text-end"
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="ml-2">
                          ages 15 - 80
                        </FormDescription>
                      </FormItem>
                      {/* Gender Section */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="ml-4">Gender</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                className="flex flex-row items-center w-full ml-4"
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
                      {/* Height section */}
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
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className="w-20 px-2 py-1 text-end"
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription className="ml-2">
                              min height 100cm
                            </FormDescription>
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
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className="w-20 px-2 py-1 text-end"
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription className="ml-2">
                              min weight 30kgs
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                />
                <section className="pb-4">
                  <Button type="submit" className="ml-10 bg-purple-500">
                    Calculate
                    <Play className="w-4 h-4 ml-2 fill-light" />
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-purple-500"
                    onClick={() => form.reset()}
                  >
                    Clear
                  </Button>
                </section>
              </form>
            </Form>
          </Card>
          <Card>
            {/* BMI results */}
            {bmiResult !== null && <p>Your BMI is: {bmiResult}</p>}
          </Card>
        </div>
        <section className="ml-2 text-sm bg-pink-50 rounded-sm p-4 mt-2">
          <ul>
            <li>
              <strong>Healthy BMI Range:</strong> 18.5 kg/m - 25 kg/m
            </li>
            <li>
              <strong>Healthy weight for the weight:</strong> 59.9kg - 81 kg
            </li>
            <li>
              <strong>BMI Prime:</strong> 0.8
            </li>
            <li>
              <strong>Ponderal Index:</strong> 11.1 kg/m
            </li>
          </ul>
        </section>
        {/* TODO: Customise additional calculator buttons */}
        {/* Related Calculators */}
        <section className="relative w-full mt-5 md: ml-2">
          <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US"
                  ? "bg-pink-200 text-purple-500"
                  : "bg-transparent"
              }`}
              onClick={() => setUnitType("US")}
            >
              Related
            </button>
          </div>
          {/* Links to related calculators */}
          <section className="flex justify-center bg-pink-50 mt-10 rounded-sm">
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
            <Link to="/CaloriesBurntCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                Calories Burnt Calculators
              </Button>
            </Link>
          </section>
        </section>
        {/* Additional Information */}
        <section>
          <div>
            {BMIinfo.map((info, index) => (
              <div key={index} className="mt-5 rounded-sm p-4">
                {info.title && (
                  <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
                    {info.title}
                  </h4>
                )}
                <div className=" bg-pink-50 p-4 rounded-sm">
                  <p>{info.content}</p>
                  {info.equation && <p>{info.equation}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default BmiCalculator;
