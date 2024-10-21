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
import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { BMItitle } from "@/lib/constants";
import { calculateBMI } from "@/lib/calculators";
import { useNavigate } from "react-router-dom";


const BmiCalculator = () => {
  const [unitType, setUnitType] = useState("US");
  const navigate = useNavigate();

  // Form Schema
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

  // Form resolver  
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
    <>
      {/* Main content */}
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <section>
          {BMItitle.map((info, index) => (
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
          {/* Unit switch buttons */}
          <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "Metric"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setUnitType("Metric")}
            >
              Metric Units
            </button>
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US"
                  ? "bg-black text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setUnitType("US")}
            >
              US Units
            </button>
          </div>

          {/* Input Form */}
          <Card className="w-full p-4 mt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Age Input */}
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
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="ml-2">
                        ages 15 - 80
                      </FormDescription>
                    </FormItem>
                  )}
                />

                {/* Gender Radio Group */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-4">Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
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

                {/* Height Input */}
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
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="ml-2">
                        min height 100 cm
                      </FormDescription>
                    </FormItem>
                  )}
                />
                {/* Weight Input */}
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
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20 px-2 py-1 text-end"
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="ml-2">
                        min weight 30 kg
                      </FormDescription>
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
                    onClick={() => form.reset()}
                  >
                    Clear
                  </Button>
                </section>
              </form>
            </Form>
          </Card>
        </div>
      </main>
    </>
  );
};

export default BmiCalculator;

