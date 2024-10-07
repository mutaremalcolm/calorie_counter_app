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


const BmiCalculator = () => {
  const [unitType, setUnitType] = React.useState("US");

  //Form Schema
  const formSchema = z.object({
    age: z
      .number({
        required_error: "Age is required", 
        invalid_type_error: "Age is required" 
      })
      .min(15, "Age must be at least 15")
      .max(80, "Age must be under 80"),
    gender: z.enum(["male", "female"], {
        required_error: "Please select a gender",
      }),
    height: z
      .number({ 
        required_error: "Height is required",
        invalid_type_error: "Height must be a number" })
      .positive("Height must be positive")
      .min(100, "Height must be at least 100 cm")
      .max(250, "Height must be under 250 cm"),
    weight: z
      .number({ invalid_type_error: "Weight is required" })
      .positive("Weight must be positive")
      .min(30, "Weight must be at least 30 kg")
      .max(300, "Weight must be under 300 kg"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      gender: "male",
      height: 0,
      weight: 30
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <section>
          {/* Title */}
          <h1 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1">
            BMI Calculator
          </h1>
          <div className="bg-gray-200 rounded-sm p-4">
            <span>
              The Body Mass Index (BMI) Calculator can be used to calculate BMI
              value and corresponding weight status while taking age into
              consideration. Use the "Metric Units" tab for the International
              System of Units or the "Other Units" tab to convert units into
              either US or metric units. Note that the calculator also computes
              the Ponderal Index in addition to BMI, both of which are discussed
              below in detail.
            </span>
          </div>
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
                      <FormItem className="flex items-center">
                        <FormLabel className="flex-shrink-0 ml-4 mr-2">
                          Age
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoFocus
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-20 px-2 py-1 text-end"
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="ml-2">
                          ages 15 - 80
                        </FormDescription>
                      </FormItem>

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
                                onChange={(e) => field.onChange(Number(e.target.value))}
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
                                onChange={(e) => field.onChange(Number(e.target.value))}
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
        </div>
        <section className="ml-2 text-sm bg-gray-200 rounded-sm p-4 mt-2">
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
          <div className="flex justify-center bg-gray-200 mt-10 rounded-sm">
            <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
              BMI Calculator
            </Button>
            <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
              Other Calculators
            </Button>
            <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
              Other Calculators
            </Button>
            <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
              Other Calculators
            </Button>
            <Button className="ml-10 mr-10 mt-2 mb-2 bg-purple-500">
              Other Calculators
            </Button>
          </div>
        </section>
        {/* Additional Information */}
        <section>
          <div className="mt-5 bg-gray-200 rounded-sm p-4">
            The Body Mass Index (BMI) Calculator can be used to calculate BMI
            value and corresponding weight status while taking age into
            consideration. Use the "Metric Units" tab for the International
            System of Units or the "Other Units" tab to convert units into
            either US or metric units. Note that the calculator also computes
            the Ponderal Index in addition to BMI, both of which are discussed
            below in detail.
          </div>
          <h5 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
            BMI table for adults
          </h5>
          <div className="bg-gray-200 rounded-sm p-4">
            <span>
              This is the World Health Organization's (WHO) recommended body
              weight based on BMI values for adults. It is used for both men and
              women, age 20 or older.
            </span>
          </div>
          <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
            BMI chart for adults
          </h4>
          <div className="bg-gray-200 rounded-sm p-4">
            <span>
              This is a graph of BMI categories based on the World Health
              Organization data. The dashed lines represent subdivisions within
              a major categorization.
            </span>
          </div>
          <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
            BMI table for children and teens, age 2-20
          </h4>
          <div className="bg-gray-200 rounded-sm p-4">
            <span>
              The Centers for Disease Control and Prevention (CDC) recommends
              BMI categorization for children and teens between age 2 and 20.
            </span>
          </div>
          <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
            Risks assosciated with being overweight
          </h4>
          <div className="bg-gray-200 rounded-sm p-4">
            <span>
              Being overweight increases the risk of a number of serious
              diseases and health conditions. Below is a list of said risks,
              according to the Centers for Disease Control and Prevention (CDC):
              High blood pressure Higher levels of LDL cholesterol, which is
              widely considered "bad cholesterol," lower levels of HDL
              cholesterol, considered to be good cholesterol in moderation, and
              high levels of triglycerides Type II diabetes Coronary heart
              disease Stroke Gallbladder disease Osteoarthritis, a type of joint
              disease caused by breakdown of joint cartilage Sleep apnea and
              breathing problems Certain cancers (endometrial, breast, colon,
              kidney, gallbladder, liver) Low quality of life Mental illnesses
              such as clinical depression, anxiety, and others Body pains and
              difficulty with certain physical functions Generally, an increased
              risk of mortality compared to those with a healthy BMI As can be
              seen from the list above, there are numerous negative, in some
              cases fatal, outcomes that may result from being overweight.
              Generally, a person should try to maintain a BMI below 25 kg/m2,
              but ideally should consult their doctor to determine whether or
              not they need to make any changes to their lifestyle in order to
              be healthier.
            </span>
          </div>
          <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
            Risks assosciated with being underweight
          </h4>
          <div className="bg-gray-200 rounded-sm p-4">
            <span>
              Being underweight has its own associated risks, listed below:
              Malnutrition, vitamin deficiencies, anemia (lowered ability to
              carry blood vessels) Osteoporosis, a disease that causes bone
              weakness, increasing the risk of breaking a bone A decrease in
              immune function Growth and development issues, particularly in
              children and teenagers Possible reproductive issues for women due
              to hormonal imbalances that can disrupt the menstrual cycle.
              Underweight women also have a higher chance of miscarriage in the
              first trimester Potential complications as a result of surgery
              Generally, an increased risk of mortality compared to those with a
              healthy BMI In some cases, being underweight can be a sign of some
              underlying condition or disease such as anorexia nervosa, which
              has its own risks. Consult your doctor if you think you or someone
              you know is underweight, particularly if the reason for being
              underweight does not seem obvious.
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default BmiCalculator;
