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
import { idealWeightTitle } from "@/lib/constants";
import { Link } from "react-router-dom";

// IBW Calculation using Devine Formula
const calculateIBW = (gender: "male" | "female", heightCm: number): number => {
  const heightInInches = heightCm / 2.54;
  const inchesOver60 = heightInInches - 60;

  if (inchesOver60 <= 0) {
    return gender === "male" ? 50 : 45.5;
  }

  const ibw = gender === "male"
    ? 50 + 2.3 * inchesOver60
    : 45.5 + 2.3 * inchesOver60;

  return Math.round(ibw * 10) / 10;
};

const IdealWeightCalculator = () => {
  const [unitType, setUnitType] = React.useState<"US" | "Metric">("Metric");
  const [ibwResult, setIbwResult] = React.useState<number | null>(null);

  // Form Schema using Zod
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
        invalid_type_error: "Height must be a number",
        required_error: "Height is required",
      })
      .min(100, "Height must be at least 100 cm")
      .max(250, "Height must be under 250 cm"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    const ibw = calculateIBW(values.gender, values.height);
    setIbwResult(ibw);
    console.log("Form Values:", values);
    console.log("Calculated IBW:", ibw, "kg");
  }

  // TODO: Handle unit changes (US vs Metric)
  const handleUnitChange = (type: "US" | "Metric") => {
    setUnitType(type);
    // unit switching logic
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <section>
          {/* Title Section */}
        {idealWeightTitle.map((info, index) => (
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
          {/* Unit Toggle Buttons */}
          <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US"
                  ? "bg-purple-500 text-white"
                  : "bg-transparent text-purple-500"
              }`}
              onClick={() => handleUnitChange("US")}
            >
              US Units
            </button>
            <button
              className={`px-4 py-2 rounded ${
                unitType === "Metric"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-purple-500"
              }`}
              onClick={() => handleUnitChange("Metric")}
            >
              Metric Units
            </button>
          </div>
          {/* Input Card */}
          <Card className="w-full p-4 mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Age Field */}
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 text-end"
                          placeholder="15"
                          min={15}
                          max={100}
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
                        Ages 15 - 100
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender Field */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-4">Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
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

                {/* Height Field */}
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
                          placeholder="170"
                          min={100}
                          max={250}
                        />
                      </FormControl>
                      <FormDescription className="ml-2">
                        Height 100cm - 250cm
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
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
                    onClick={() => {
                      form.reset();
                      setIbwResult(null); 
                    }}
                  >
                    Clear
                  </Button>
                </section>
              </form>
            </Form>
          </Card>
        </div>
        {/* Display IBW Result */}
        {ibwResult !== null && (
          <Card className="w-full max-w-md p-4 mt-8 bg-gray-200">
            <h2 className="text-xl font-bold mb-2">Ideal Body Weight (IBW) Result</h2>
            <p>
              Your Ideal Body Weight is: <strong>{ibwResult} kg</strong>
            </p>
          </Card>
        )}
        {/* Additional Information Sections */}
        <section className="ml-2 text-sm bg-gray-200 rounded-sm p-4 mt-4">
          <ul>
            <li>
              <strong>Ideal Body Weight (IBW):</strong> An estimate of the optimal body weight based on height and gender.
            </li>
            <li>
              <strong>Age Consideration:</strong> While age can influence body composition, IBW primarily focuses on height and gender.
            </li>
            <li>
              <strong>Health Guidance:</strong> Use IBW as a general guideline and consult with healthcare professionals for personalized advice.
            </li>
          </ul>
        </section>
        {/* Related Calculators */}
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
          {/* Related Calculators */}
          <section className="flex justify-center bg-gray-200 mt-10 rounded-sm">
            <Link to="/CalorieCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                Calorie Calculator
              </Button>
            </Link>
            <Link to="/CaloriesBurnt">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                Calories Burnt Calculator
              </Button>
            </Link>
            <Link to="/BmiCalculator">
              <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
                BMI Calculator
              </Button>
            </Link>
          </section>
        </section>
        {/* TODO: export static data and use map method */}
        {/* Additional Information */}
        <section>
          <div className="mt-5 bg-gray-200 rounded-sm p-4">
            The Ideal Weight Calculator can be used to estimate your ideal body weight based on your height and gender. It serves as a general guideline and should be used in conjunction with other health assessments.
          </div>
        </section>
      </main>
    </>
  );
};

export default IdealWeightCalculator;