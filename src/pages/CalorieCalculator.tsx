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
import React from "react";
import { ChevronDown, Play } from "lucide-react";

const CalorieCalculator = () => {
  const [selectedActivity, setSelectedActivity] = React.useState(
    "Moderate: exercise 4-5 times/week"
  );
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
            Calorie Calculator
          </h1>
          <div className="bg-gray-200 rounded-sm p-4">
            <span>
              The Calorie Calculator can be used to estimate the number of
              calories a person needs to consume each day. This calculator can
              also provide some simple guidelines for gaining or losing weight.
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
                          ages 15 - 80
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

                      <FormItem className="flex items-center">
                        <FormLabel className="flex-shrink-0 ml-4 mr-2">
                          Weight
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="kg"
                            {...field}
                            className="w-20 px-2 py-1 text-end"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      <FormItem className="flex items-center w-full">
                        <FormLabel className="flex-shrink-0 ml-4 mr-2">
                          Activity
                        </FormLabel>
                        <FormControl className="relative">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div>
                                <Input
                                  readOnly
                                  value={selectedActivity}
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
                                checked={selectedActivity === "Light"}
                                onCheckedChange={() =>
                                  setSelectedActivity("Light")
                                }
                              >
                                Light: exercise 1-2 times/week
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={selectedActivity === "Moderate"}
                                onCheckedChange={() =>
                                  setSelectedActivity("Moderate")
                                }
                              >
                                Moderate: exercise 4-5 times/week
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={selectedActivity === "Heavy"}
                                onCheckedChange={() =>
                                  setSelectedActivity("Heavy")
                                }
                              >
                                Heavy: daily exercise or intense exercise 6-7
                                times/week
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
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
                    onClick={() => form.reset()}
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
          <div className="mt-5 bg-gray-200 rounded-sm p-4">
            This Calorie Calculator uses three key equations to estimate basal
            metabolic rate (BMR) based on averages. The Harris-Benedict
            Equation, one of the earliest, was revised in 1984 but replaced in
            1990 by the more accurate Mifflin-St Jeor Equation. The
            Katch-McArdle Formula differs by factoring in lean body mass, making
            it more precise for lean individuals who know their body fat
            percentage. Of these, the Mifflin-St Jeor is generally considered
            the most accurate for calculating BMR, except when lean body mass is
            accounted for using the Katch-McArdle Formula.
            <br />
            <strong>Mifflin-St Jeor Equation:</strong>
            <br />
            For men: BMR = 10W + 6.25H - 5A + 5 For women: BMR = 10W + 6.25H -
            5A - 161 Revised Harris-Benedict Equation: For men: BMR = 13.397W +
            4.799H - 5.677A + 88.362 For women: BMR = 9.247W + 3.098H - 4.330A +
            447.593 Katch-McArdle Formula: BMR = 370 + 21.6(1 - F)W
            <br />
            where: <br />
            <ul>
              <li>W is body weight in kg </li>
              <li>H is body height in cm</li>
              <li>A is age F is body fat in percentage</li>
            </ul>
            <div className="mt-4">
              The value from these equations estimates the daily calories needed
              to maintain body weight at rest. This is adjusted by an activity
              factor (1.2-1.95) based on exercise levels. To lose 0.45 kg a
              week, reduce calorie intake by 500 per day. For example, someone
              needing 2,500 calories should eat 2,000 to lose 0.45 kg. It's
              recommended not to reduce intake by more than 1,000 calories
              daily, as losing over 0.9 kg a week can be unhealthy, leading to
              muscle loss, lowered metabolism, and dehydration. A balanced diet
              with proper nutrients is essential for sustainable weight loss and
              overall health.
            </div>
          </div>
          <div className="mt-5">
            <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              Calorie Counting as a Means for Weight Loss
            </h4>
            <div className="bg-gray-200 rounded-sm p-4">
              <span>
                Calorie counting for weight loss involves a few steps: determine
                your BMR using an equation like Katch-McArdle if you know your
                body fat percentage. Subtract 500 calories a day to lose about
                0.45 kg weekly, but remember this is an estimate. Track calories
                using apps, spreadsheets, or journals, and adjust based on your
                goals. Don't aim to lose more than 0.9 kg weekly as this can
                cause muscle loss and health issues. Be consistent in weighing
                yourself and maintain a balanced diet. While calorie counting is
                effective, it's just one of many weight loss strategies. Find
                what works best for you.
              </span>
            </div>
            <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              Zigzag Calorie Cycling
            </h4>
            <div className="bg-gray-200 rounded-sm p-4">
              <span>
                Calorie counting for weight loss involves a few basic steps.
                First, determine your Basal Metabolic Rate (BMR) using a formula
                like Katch-McArdle if you know your body fat percentage.
                Subtracting 500 calories from your daily intake theoretically
                leads to losing 1 pound per week, but results vary. Aim for no
                more than 2 pounds of weight loss per week and consult a doctor
                if you're planning to lose more. Track calories using apps,
                spreadsheets, or journals, and monitor progress weekly rather
                than daily, as weight can fluctuate due to factors like water
                intake. Consistent, long-term effort is key, and it's important
                to find an approach that fits your lifestyle for sustainable
                results. Additionally, food choices impact not only calorie
                intake but also health, satiety, and nutrition. Whole foods
                generally support healthier weight loss than processed options.
                While calorie counting is effective for some, it’s just one
                method of weight management. Other factors like portion control,
                exercise, and macronutrient balance play roles too. The key is
                to find a strategy that suits your needs and can be maintained
                over time.
              </span>
            </div>
            <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              How Many Calories Do You Need{" "}
            </h4>
            <div className="bg-gray-200 rounded-sm p-4">
              <span>
                Many people seek to lose weight, and often the easiest way to do
                this is to consume fewer calories each day. But how many
                calories does the body actually need in order to be healthy?
                This largely depends on the amount of physical activity a person
                performs each day, and regardless of this, is different for all
                people – there are many different factors involved, not all of
                which are well-understood or known. Some factors that influence
                the number of calories a person needs to remain healthy include
                age, weight, height, sex, levels of physical activity, and
                overall general health. For example, a physically active
                25-year-old male that is 6 feet in height requires considerably
                higher calorie intake than a 5-foot-tall, sedentary 70-year-old
                woman. Though it differs depending on age and activity level,
                adult males generally require 2,000-3000 calories per day to
                maintain weight while adult females need around 1,600-2,400
                according to the U.S Department of Health. The body does not
                require many calories to simply survive. However, consuming too
                few calories results in the body functioning poorly, since it
                will only use calories for functions essential to survival, and
                ignore those necessary for general health and well-being.
                Harvard Health Publications suggests women get at least 1,200
                calories and men get at least 1,500 calories a day unless
                supervised by doctors. As such, it is highly recommended that a
                person attempting to lose weight monitors their body's caloric
                necessities and adjusts them as necessary to maintain its
                nutritional needs.
              </span>
            </div>
            <h4 className="font-nunito-sans font-extrabold text-white bg-purple-500 p-1 mt-4">
              Calories: Different Kinds and Their Effects{" "}
            </h4>
            <div className="bg-gray-200 rounded-sm p-4">
              <span>
                The main sources of calories in a typical diet are
                carbohydrates, proteins, fats, and sometimes alcohol, though
                alcohol should be limited due to its empty calories. Studies
                show that calories listed on labels and the actual calories
                absorbed by the body can vary, highlighting the complexity of
                nutrition. For example, chewing food more can slightly increase
                calorie burn and lead to eating less by reaching satiety sooner,
                but the effects of chewing are not fully understood. Foods
                requiring more chewing, like fruits, vegetables, and whole
                grains, tend to burn more calories during digestion and keep you
                full longer. Certain foods, like coffee and spices, may boost
                calorie burn, and the "quality" of calories is important.
                High-calorie foods (e.g., avocados, nuts) can be healthy in
                moderation, while low-calorie foods (e.g., vegetables) provide
                fewer calories relative to serving size. Empty calories, like
                those from added sugars, offer little nutritional value.
                Calories from beverages, which make up around 21% of a typical
                diet, are often empty calories, so opting for water, unsweetened
                tea, or coffee is a healthier choice. In general, eating
                unprocessed foods and paying attention to hidden sugars in
                "health" products can lead to better, more sustainable weight
                management.
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CalorieCalculator;
