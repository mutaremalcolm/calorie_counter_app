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

const IdealWeightCalculator = () => {
  const [unitType, setUnitType] = React.useState("US");

  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <section>
          <h1 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1">
            Ideal Weight Calculator
          </h1>
          <div className="bg-gray-200 p-2">
            <span>
              The Ideal Weight Calculator computes ideal body weight (IBW)
              ranges based on height, gender, and age. The idea of finding the
              IBW using a formula has been sought after by many experts for a
              long time. Currently, there persist several popular formulas, and
              our Ideal Weight Calculator provides their results for
              side-to-side comparisons.
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
          <Card className="w-full p-4 mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <>
                      <FormItem className="flex items-center">
                        <FormLabel className="flex-shrink-0 ml-4 mr-2">
                          Age
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="25"
                            {...field}
                            className="w-20 px-2 py-1 text-end"
                          />
                        </FormControl>
                        <FormDescription className="ml-2">
                          ages 2 - 80
                        </FormDescription>
                        <FormMessage />
                      </FormItem>

                      <RadioGroup
                        defaultValue="option-one"
                        className="flex flex-row items-center w-full"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="ml-4">Gender</span>
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">Female</Label>
                        </div>
                      </RadioGroup>

                      <FormItem className="flex items-center">
                        <FormLabel className="flex-shrink-0 ml-4 mr-2">
                          Height
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="cm"
                            {...field}
                            className="w-20 px-2 py-1 text-end"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
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
        {/* TODO: Customise additional calculator buttons */}
        <section className="relative w-full mt-5">
        <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US" ? "bg-gray-200 text-purple-500" : "bg-transparent"
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
        <section>
          <div className="mt-5">
            <h5 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1">
              How much should i weigh?
            </h5>
          </div>
            <div className="bg-gray-200 p-4">
            <span>
              Most everyone has at some point tried to lose weight, or at least
              known somebody who has. This is largely due to the perception of
              an "ideal" body weight, which is often based on what we see
              promoted through various media such as social media, TV, movies,
              magazines, etc. Although ideal body weight (IBW) today is
              sometimes based on perceived visual appeal, IBW was actually
              introduced to estimate dosages for medical use, and the formulas
              that calculate it are not at all related to how a person looks at
              a given weight. It has since been determined that the metabolism
              of certain drugs is more based on IBW than it is total body
              weight. Today, IBW is also used widely throughout sports, since
              many sports classify people based on their body weight. Note that
              IBW is not a perfect measurement. It does not consider the
              percentages of body fat and muscle in a person's body. This means
              that it is possible for highly fit, healthy athletes to be
              considered overweight based on their IBW. This is why IBW should
              be considered with the perspective that it is an imperfect measure
              and not necessarily indicative of health, or a weight that a
              person should necessarily strive toward; it is possible to be over
              or under your "IBW" and be perfectly healthy. How much a person
              should weigh is not an exact science. It is highly dependent on
              each individual. Thus far, there is no measure, be it IBW, body
              mass index (BMI), or any other that can definitively state how
              much a person should weigh to be healthy. They are only
              references, and it's more important to adhere to making healthy
              life choices such as regular exercise, eating a variety of
              unprocessed foods, getting enough sleep, etc. than it is to chase
              a specific weight based on a generalized formula. That being said,
              many factors can affect the ideal weight; the major factors are
              listed below. Other factors include health conditions, fat
              distribution, progeny, etc.
            </span>
            </div>
            <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              Age
            </h4>
            <div className="bg-gray-200 p-4">
            <span>
              In theory, age shouldn't be a large determinant of an IBW past the
              ages of 14-15 for girls and 16-17 for boys, after which most
              people stop growing. It is actually expected that human males and
              females lose 1.5 and 2 inches in height respectively by age 70. It
              is important to remember that as people age, lean muscle mass
              decreases and it is easier to accumulate excess body fat. This is
              a natural process, though it is possible to lessen the effects of
              aging by adopting various habits such as monitoring diet,
              exercise, stress, and sleep.
            </span>
            </div>
            <h1 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              Gender
            </h1>
            <div className="bg-gray-200 p-4">
            <span>
              Generally, females weigh less than males even though they
              naturally have a higher percentage of body fat. This is because
              the male body generally has higher muscle mass, and muscle is
              heavier than fat. Not only that, but women generally have lower
              bone density. Last but not least, males tend to be taller than
              females.
            </span>
            </div>
            <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              Height
            </h4>
            <div className="bg-gray-200 p-4">
            <span>
              The taller the person, the more muscle mass and body fat they
              have, which results in more weight. A male at a similar height to
              a female should weigh about 10-20% heavier.
            </span>
            </div>
            <h1 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              Limitations of our IBW calculator
            </h1>
            <div className="bg-gray-200 p-4">
            <span>
              There are limitations to all the formulas and methods. Because the
              formulas are designed to be as applicable to as wide a range of
              people as possible, they cannot be highly accurate for every
              single individual. The formulas factor only height and gender, and
              there are no considerations for physical handicaps, people on the
              extreme ends of the spectrum, activity levels, or muscle mass to
              body fat ratios, otherwise known as body composition. Our Ideal
              Weight Calculator is meant to be used as a general guideline based
              on popular formulas, and its results are not intended as strict
              values that a person must achieve to be considered an "ideal
              weight."
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default IdealWeightCalculator;
