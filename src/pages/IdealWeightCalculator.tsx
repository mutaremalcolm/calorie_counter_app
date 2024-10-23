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


// IBW Calculation using Devine Formula
const calculateIBW = (gender: "male" | "female", heightCm: number): number => {
  const heightInInches = heightCm / 2.54;
  const inchesOver60 = heightInInches - 60;

  if (inchesOver60 <= 0) {
    return gender === "male" ? 50 : 45.5;
  }

  const ibw =
    gender === "male" ? 50 + 2.3 * inchesOver60 : 45.5 + 2.3 * inchesOver60;

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
      <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Ideal Weight Calculator</h1>
            <div className="flex justify-center bg-black text-white p-2">
              <ChevronDown className="mr-2" />
              <span>Modify the values below and click Calculate</span>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-l ${
                unitType === "Metric" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              Metric Units
            </button>
            <button
              className={`px-4 py-2 rounded-r ${
                unitType === "US" ? "bg-black text-white" : "bg-gray-200"
              }`}
              onClick={() => setUnitType("US")}
            >
              US Units
            </button>
          </div>
        </div>
          {/* Input Card */}
          <Card className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Age Field */}
                <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-24">Age</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 text-right"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="ml-2">
                      years (15-100)
                    </FormDescription>
                  </FormItem>
                )}
              />
                {/* Gender Field */}
                <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel className="w-24">Gender:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex gap-4"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="ml-2">
                              Male
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="ml-2">
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
                {/* Height Field */}
                <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="w-24">Height:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-20 text-right"
                        onFocus={() => field.onChange()}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="ml-2">cm</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <section className="pb-4">
                  <Button type="submit" className="ml-10 bg-black">
                    Calculate
                    <Play className="w-4 h-4 ml-2 fill-light" />
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-black"
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
        {/* Display IBW Result */}
        {ibwResult !== null && (
          <Card className="w-full max-w-md p-6 mt-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4 text-purple-500">
              Ideal Body Weight (IBW) Result
            </h2>

            <div className="p-4 bg-white rounded-md space-y-4">
              <div className="p-4 bg-purple-100 rounded-md">
                <h3 className="text-xl font-semibold">Your IBW</h3>
                <p className="text-lg">
                  Based on your inputs, your Ideal Body Weight is:{" "}
                  <strong>{ibwResult} kg</strong>.
                </p>
              </div>
            </div>
          </Card>
        )}
        {/* Additional Information Section */}
        <section className="ml-2 text-sm bg-black text-white rounded-sm p-4 mt-4">
          <ul>
            <li>
              <strong>Ideal Body Weight (IBW):</strong> An estimate of the
              optimal body weight based on height and gender.
            </li>
            <li>
              <strong>Age Consideration:</strong> While age can influence body
              composition, IBW primarily focuses on height and gender.
            </li>
            <li>
              <strong>Health Guidance:</strong> Use IBW as a general guideline
              and consult with healthcare professionals for personalized advice.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default IdealWeightCalculator;
