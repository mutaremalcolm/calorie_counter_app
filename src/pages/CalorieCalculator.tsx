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
          <h1 className="font-nunito-sans font-extrabold text-purple-500">
            Calorie Calculator
          </h1>
          <div>
            <span>
              The Calorie Calculator can be used to estimate the number of
              calories a person needs to consume each day. This calculator can
              also provide some simple guidelines for gaining or losing weight.
            </span>
          </div>
          <div className="flex justify-center bg-purple-500">
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
        <section className="ml-2 text-sm">
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
        <section className="relative w-full mt-5">
          <div className="absolute top-0 left-0 p-2 flex space-x-2 z-10 bg-transparent rounded-tl-lg rounded-tr-lg">
            <button
              className={`px-4 py-2 rounded ${
                unitType === "US" ? "bg-gray-200 text-black" : "bg-transparent"
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
          {/* TODO Format text */}
          <div className="mt-5">
            This Calorie Calculator is based on several equations, and the
            results of the calculator are based on an estimated average. The
            Harris-Benedict Equation was one of the earliest equations used to
            calculate basal metabolic rate (BMR), which is the amount of energy
            expended per day at rest. It was revised in 1984 to be more accurate
            and was used up until 1990, when the Mifflin-St Jeor Equation was
            introduced. The Mifflin-St Jeor Equation also calculates BMR, and
            has been shown to be more accurate than the revised Harris-Benedict
            Equation. The Katch-McArdle Formula is slightly different in that it
            calculates resting daily energy expenditure (RDEE), which takes lean
            body mass into account, something that neither the Mifflin-St Jeor
            nor the Harris-Benedict Equation do. Of these equations, the
            Mifflin-St Jeor Equation is considered the most accurate equation
            for calculating BMR with the exception that the Katch-McArdle
            Formula can be more accurate for people who are leaner and know
            their body fat percentage. The three equations used by the
            calculator are listed below:
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
              The value obtained from these equations is the estimated number of
              calories a person can consume in a day to maintain their
              body-weight, assuming they remain at rest. This value is
              multiplied by an activity factor (generally 1.2-1.95) dependent on
              a person's typical levels of exercise, which accounts for times
              during the day when a person is not at rest. 1 pound, or
              approximately 0.45 kg, equates to about 3,500 calories. As such,
              in order to lose 1 pound per week, it is recommended that 500
              calories be shaved off the estimate of calories necessary for
              weight maintenance per day. For example, if a person has an
              estimated allotment of 2,500 calories per day to maintain
              body-weight, consuming 2,000 calories per day for one week would
              theoretically result in 3,500 calories (or 1 pound) lost during
              the period. It is important to remember that proper diet and
              exercise is largely accepted as the best way to lose weight. It is
              inadvisable to lower calorie intake by more than 1,000 calories
              per day, as losing more than 2 pounds per week can be unhealthy,
              and can result in the opposite effect in the near future by
              reducing metabolism. Losing more than 2 pounds a week will likely
              involve muscle loss, which in turn lowers BMR, since more muscle
              mass results in higher BMR. Excessive weight loss can also be due
              to dehydration, which is unhealthy. Furthermore, particularly when
              exercising in conjunction with dieting, maintaining a good diet is
              important, since the body needs to be able to support its
              metabolic processes and replenish itself. Depriving the body of
              the nutrients it requires as part of heavily unhealthy diets can
              have serious detrimental effects, and weight lost in this manner
              has been shown in some studies to be unsustainable, since the
              weight is often regained in the form of fat (putting the
              participant in a worse state than when beginning the diet). As
              such, in addition to monitoring calorie intake, it is important to
              maintain levels of fiber intake as well as other nutritional
              necessities to balance the needs of the body.
            </div>
          </div>
          <div className="mt-5">
            <h5 className="font-bold text-purple-500">
              Calorie Counting as a Means for Weight Loss
            </h5>
            <span>
              Calorie counting with the intent of losing weight, on its simplest
              levels, can be broken down into a few general steps: Determine
              your BMR using one of the provided equations. If you know your
              body fat percentage, the Katch-McArdle Formula might be a more
              accurate representation of your BMR. Remember that the values
              attained from these equations are approximations and subtracting
              exactly 500 calories from your BMR will not necessarily result in
              exactly 1 pound lost per week – it could be less, or it could be
              more! Determine your weight loss goals. Recall that 1 pound (~0.45
              kg) equates to approximately 3500 calories, and reducing daily
              caloric intake relative to estimated BMR by 500 calories per day
              will theoretically result in a loss of 1 pound a week. It is
              generally not advisable to lose more than 2 pounds per week as it
              can have negative health effects, i.e. try to target a maximum
              daily calorie reduction of approximately 1000 calories per day.
              Consulting your doctor and/or a registered dietician nutritionist
              (RDN) is recommended in cases where you plan to lose more than 2
              pounds per week. Choose a method to track your calories and
              progress towards your goals. If you have a smartphone, there are
              many easy-to-use applications that facilitate tracking calories,
              exercise, and progress, among other things. Many, if not all of
              these, have estimates for the calories in many brand-name foods or
              dishes at restaurants, and if not, they can estimate calories
              based on the amount of the individual components of the foods. It
              can be difficult to get a good grasp on food proportions and the
              calories they contain – which is why counting calories (as well as
              any other approach) is not for everyone – but if you meticulously
              measure and track the number of calories in some of your typical
              meals, it quickly becomes easier to accurately estimate calorie
              content without having to actually measure or weigh your food each
              time. There are also websites that can help to do the same, but if
              you prefer, manually maintaining an excel spreadsheet or even a
              pen and paper journal are certainly viable alternatives. Track
              your progress over time and make changes to better achieve your
              goals if necessary. Remember that weight loss alone is not the
              sole determinant of health and fitness, and you should take other
              factors such as fat vs. muscle loss/gain into account as well.
              Also, it is recommended that measurements are taken over longer
              periods of time such as a week (rather than daily) as significant
              variations in weight can occur simply based on water intake or
              time of day. It is also ideal to take measurements under
              consistent conditions, such as weighing yourself as soon as you
              wake up and before breakfast, rather than at different times
              throughout the day. Keep at it! The above steps are an attempt at
              the most basic form of calorie counting. Calorie counting is not
              an exact science, and can be as complex as you want to make it.
              The above does not consider the proportions of macronutrients
              consumed. While there is no exactly known, ideal proportion of
              macronutrients (fats, proteins, carbohydrates), some balance is
              certainly advisable, and different foods have been found to have
              different effects on health, feelings of hunger, and number of
              calories burned. Generally, minimally processed plant and animal
              foods tend to be more conducive to healthy weight loss and
              maintenance. There are many approaches to weight loss and there is
              no set ideal method that works for all people, which is why so
              many different diets and exercise regimens exist. While some
              methods are more effective for each individual person, not all
              weight loss methods are equivalent, and studies suggest that some
              approaches are healthier than others. That being said, one of the
              most commonly effective weight loss methods is counting calories.
              In its most basic form, calories consumed minus calories expended
              will result in weight gain if the result is positive, or weight
              loss if the result is negative. However, this is far from a
              comprehensive picture, and many other factors play a role in
              affecting healthy, sustainable weight loss. For example, there
              exist conflicting studies addressing whether or not the type of
              calories or foods consumed, or how they are consumed, affects
              weight loss. Studies have shown that foods that require a person
              to chew more and are more difficult to digest result in the body
              burning more calories, sometimes referred to as the thermic effect
              of food. While the increase in burned calories may be marginal,
              foods that are more difficult to digest such as vegetables
              generally tend to be healthier and provide more nutrients for
              fewer calories than many processed foods. Consistent with the view
              that in regards to weight loss, only net calories are important
              and not their source, there exist cases such as the Twinkie diet,
              where a person that solely counted calories while eating a variety
              of cake snacks managed to lose 27 pounds over two months. As
              effective as this can be, it is certainly not suggested. While the
              participant did not seem to suffer any noticeable health
              detriments in this particular case, there are other less
              measurable factors that should be considered such as long-term
              effects of such a diet on potential for developing cancers, heart
              disease, and diabetes. However, ignoring efficiency and health,
              sustained, significant reduction of caloric intake or increase of
              physical activity should result in weight loss, and counting
              calories can be an effective way to achieve this sole result.
              Aside from being one viable method for facilitating weight loss,
              calorie counting has other somewhat less quantifiable advantages
              including helping to increase nutritional awareness. Many people
              are completely unaware of, or grossly underestimate their daily
              caloric intake. Counting calories can help raise awareness of
              different types of foods, the number of calories they contain, and
              how these calories have a different effect on a person's feelings
              of satiety. Once a person has a better understanding of how many
              calories are actually in that bag of chips that they can so easily
              inhale within minutes, how much of their daily caloric intake it
              consumes, and how little the chips do to satiate their hunger,
              portion control and avoidance of foods with empty calories tends
              to become easier. Having actual caloric measurements can also
              assist in weight loss, since tangible calorie goals can be set,
              rather than simply trying to eat less. Also, although this is not
              necessarily directly related to calorie counting, studies have
              shown that portion control by simply eating from a smaller plate
              can help reduce calorie intake, since people tend to fill their
              plates and eat everything on their plates. Many people do not
              realize that they are overeating, since they have become
              accustomed to restaurant-sized portions being the norm, when said
              portions can be up to three or more times larger than necessary
              for a typical meal. Tracking calories also puts exercise in a
              quantifiable perspective, increasing a person's awareness
              regarding how much exercise is really required to counteract a
              220-calorie bag of M&M's. Once a link is made between the amount
              of exercise that some snack equates to, many people find
              abstaining from that bag of chips to be the preferred option
              rather than performing an equivalent amount of exercise – which
              can lead to healthier eating habits. In the end, however, what's
              important is picking a strategy that works for you. Calorie
              counting is only one method used to achieve weight loss amongst
              many, and even within this method, there are many possible
              approaches a person can take. Finding an approach that fits within
              your lifestyle that you think you would be able to adhere to is
              likely going to provide the most sustainable option and desirable
              result.
            </span>
            <h4 className="font-bold text-purple-500 mt-5">
              Zigzag Calorie Cycling
            </h4>
            <span>
              Calorie counting with the intent of losing weight, on its simplest
              levels, can be broken down into a few general steps: Determine
              your BMR using one of the provided equations. If you know your
              body fat percentage, the Katch-McArdle Formula might be a more
              accurate representation of your BMR. Remember that the values
              attained from these equations are approximations and subtracting
              exactly 500 calories from your BMR will not necessarily result in
              exactly 1 pound lost per week – it could be less, or it could be
              more! Determine your weight loss goals. Recall that 1 pound (~0.45
              kg) equates to approximately 3500 calories, and reducing daily
              caloric intake relative to estimated BMR by 500 calories per day
              will theoretically result in a loss of 1 pound a week. It is
              generally not advisable to lose more than 2 pounds per week as it
              can have negative health effects, i.e. try to target a maximum
              daily calorie reduction of approximately 1000 calories per day.
              Consulting your doctor and/or a registered dietician nutritionist
              (RDN) is recommended in cases where you plan to lose more than 2
              pounds per week. Choose a method to track your calories and
              progress towards your goals. If you have a smartphone, there are
              many easy-to-use applications that facilitate tracking calories,
              exercise, and progress, among other things. Many, if not all of
              these, have estimates for the calories in many brand-name foods or
              dishes at restaurants, and if not, they can estimate calories
              based on the amount of the individual components of the foods. It
              can be difficult to get a good grasp on food proportions and the
              calories they contain – which is why counting calories (as well as
              any other approach) is not for everyone – but if you meticulously
              measure and track the number of calories in some of your typical
              meals, it quickly becomes easier to accurately estimate calorie
              content without having to actually measure or weigh your food each
              time. There are also websites that can help to do the same, but if
              you prefer, manually maintaining an excel spreadsheet or even a
              pen and paper journal are certainly viable alternatives. Track
              your progress over time and make changes to better achieve your
              goals if necessary. Remember that weight loss alone is not the
              sole determinant of health and fitness, and you should take other
              factors such as fat vs. muscle loss/gain into account as well.
              Also, it is recommended that measurements are taken over longer
              periods of time such as a week (rather than daily) as significant
              variations in weight can occur simply based on water intake or
              time of day. It is also ideal to take measurements under
              consistent conditions, such as weighing yourself as soon as you
              wake up and before breakfast, rather than at different times
              throughout the day. Keep at it! The above steps are an attempt at
              the most basic form of calorie counting. Calorie counting is not
              an exact science, and can be as complex as you want to make it.
              The above does not consider the proportions of macronutrients
              consumed. While there is no exactly known, ideal proportion of
              macronutrients (fats, proteins, carbohydrates), some balance is
              certainly advisable, and different foods have been found to have
              different effects on health, feelings of hunger, and number of
              calories burned. Generally, minimally processed plant and animal
              foods tend to be more conducive to healthy weight loss and
              maintenance. There are many approaches to weight loss and there is
              no set ideal method that works for all people, which is why so
              many different diets and exercise regimens exist. While some
              methods are more effective for each individual person, not all
              weight loss methods are equivalent, and studies suggest that some
              approaches are healthier than others. That being said, one of the
              most commonly effective weight loss methods is counting calories.
              In its most basic form, calories consumed minus calories expended
              will result in weight gain if the result is positive, or weight
              loss if the result is negative. However, this is far from a
              comprehensive picture, and many other factors play a role in
              affecting healthy, sustainable weight loss. For example, there
              exist conflicting studies addressing whether or not the type of
              calories or foods consumed, or how they are consumed, affects
              weight loss. Studies have shown that foods that require a person
              to chew more and are more difficult to digest result in the body
              burning more calories, sometimes referred to as the thermic effect
              of food. While the increase in burned calories may be marginal,
              foods that are more difficult to digest such as vegetables
              generally tend to be healthier and provide more nutrients for
              fewer calories than many processed foods. Consistent with the view
              that in regards to weight loss, only net calories are important
              and not their source, there exist cases such as the Twinkie diet,
              where a person that solely counted calories while eating a variety
              of cake snacks managed to lose 27 pounds over two months. As
              effective as this can be, it is certainly not suggested. While the
              participant did not seem to suffer any noticeable health
              detriments in this particular case, there are other less
              measurable factors that should be considered such as long-term
              effects of such a diet on potential for developing cancers, heart
              disease, and diabetes. However, ignoring efficiency and health,
              sustained, significant reduction of caloric intake or increase of
              physical activity should result in weight loss, and counting
              calories can be an effective way to achieve this sole result.
              Aside from being one viable method for facilitating weight loss,
              calorie counting has other somewhat less quantifiable advantages
              including helping to increase nutritional awareness. Many people
              are completely unaware of, or grossly underestimate their daily
              caloric intake. Counting calories can help raise awareness of
              different types of foods, the number of calories they contain, and
              how these calories have a different effect on a person's feelings
              of satiety. Once a person has a better understanding of how many
              calories are actually in that bag of chips that they can so easily
              inhale within minutes, how much of their daily caloric intake it
              consumes, and how little the chips do to satiate their hunger,
              portion control and avoidance of foods with empty calories tends
              to become easier. Having actual caloric measurements can also
              assist in weight loss, since tangible calorie goals can be set,
              rather than simply trying to eat less. Also, although this is not
              necessarily directly related to calorie counting, studies have
              shown that portion control by simply eating from a smaller plate
              can help reduce calorie intake, since people tend to fill their
              plates and eat everything on their plates. Many people do not
              realize that they are overeating, since they have become
              accustomed to restaurant-sized portions being the norm, when said
              portions can be up to three or more times larger than necessary
              for a typical meal. Tracking calories also puts exercise in a
              quantifiable perspective, increasing a person's awareness
              regarding how much exercise is really required to counteract a
              220-calorie bag of M&M's. Once a link is made between the amount
              of exercise that some snack equates to, many people find
              abstaining from that bag of chips to be the preferred option
              rather than performing an equivalent amount of exercise – which
              can lead to healthier eating habits. In the end, however, what's
              important is picking a strategy that works for you. Calorie
              counting is only one method used to achieve weight loss amongst
              many, and even within this method, there are many possible
              approaches a person can take. Finding an approach that fits within
              your lifestyle that you think you would be able to adhere to is
              likely going to provide the most sustainable option and desirable
              result.
            </span>
            <h4 className="font-bold text-purple-500 mt-5">
              How Many Calories Do You Need{" "}
            </h4>
            <span>
              Many people seek to lose weight, and often the easiest way to do
              this is to consume fewer calories each day. But how many calories
              does the body actually need in order to be healthy? This largely
              depends on the amount of physical activity a person performs each
              day, and regardless of this, is different for all people – there
              are many different factors involved, not all of which are
              well-understood or known. Some factors that influence the number
              of calories a person needs to remain healthy include age, weight,
              height, sex, levels of physical activity, and overall general
              health. For example, a physically active 25-year-old male that is
              6 feet in height requires considerably higher calorie intake than
              a 5-foot-tall, sedentary 70-year-old woman. Though it differs
              depending on age and activity level, adult males generally require
              2,000-3000 calories per day to maintain weight while adult females
              need around 1,600-2,400 according to the U.S Department of Health.
              The body does not require many calories to simply survive.
              However, consuming too few calories results in the body
              functioning poorly, since it will only use calories for functions
              essential to survival, and ignore those necessary for general
              health and well-being. Harvard Health Publications suggests women
              get at least 1,200 calories and men get at least 1,500 calories a
              day unless supervised by doctors. As such, it is highly
              recommended that a person attempting to lose weight monitors their
              body's caloric necessities and adjusts them as necessary to
              maintain its nutritional needs.
            </span>
            <h4 className="font-bold text-purple-500 mt-5">
              Calories: Different Kinds and Their Effects{" "}
            </h4>
            <span>
              The main sources of calories in a typical person's diet are
              carbohydrates, proteins, and fat, with alcohol also being a
              significant portion of calorie intake for many people (though
              ideally this should be limited since alcohol contains many empty
              calories). Some studies have shown that the calories displayed on
              nutrition labels and the calories actually consumed and retained
              can vary significantly. This hints at the complex nature of
              calories and nutrition and is why many conflicting points of view
              on the "best" methodology for losing weight exist. For example,
              how a person chews their food has been shown to affect weight loss
              to some degree; generally speaking, chewing food more increases
              the number of calories that the body burns during digestion.
              People that chew more also tend to eat less, since the longer
              period of time necessary to chew their food allows more time to
              reach a state of satiety, which results in eating less. However,
              the effects of how food is chewed and digestion of different foods
              are not completely understood and it is possible that other
              factors exist, and thus this information should be taken with a
              grain of salt (in moderation if weight loss is the goal).
              Generally, foods that take more effort to chew – fruit,
              vegetables, lean meats, whole grains, etc. – require the body to
              burn more calories since more calories are required to digest
              them. It also results in the feeling of satiety for longer periods
              of time. Furthermore, certain foods like coffee, tea, chilies,
              cinnamon, and ginger have been found to increase the rate of
              calories burned, due to the ingredients they contain. The
              "quality" of calories consumed is also important. There are
              different classifications of foods in terms of calories. This
              includes high-calorie foods, low-calorie foods, and empty
              calories. Consistent with their naming, high-calorie foods are
              foods that are calorically dense, meaning that there are a high
              number of calories relative to serving size, while low-calorie
              foods have fewer calories relative to serving size. Foods such as
              fat, oils, fried foods, and sugary foods are examples of
              high-calorie foods. Being a high-calorie food does not inherently
              mean that the food is unhealthy however – avocados, quinoa, nuts,
              and whole grains are all high-calorie foods that are considered
              healthful in moderation. Low-calorie foods include vegetables and
              certain fruits, among other things, while empty calories, such as
              those in added sugars and solid fats, are calories that contain
              few to no nutrients. Studies have shown that there is a measurable
              difference between consuming 500 calories of carrots compared to
              500 calories of popcorn. As previously mentioned, this in part can
              be attributed to differences in how the foods are consumed and
              processed. Carrots require far more chewing and can result in more
              calories burned during digestion. Again, the mechanism for these
              differences is not fully defined, but simply note that for weight
              loss purposes, the general formula of calories in minus calories
              out determining weight gain or loss does hold, but that the number
              of calories on a nutrition label is not necessarily indicative of
              how many calories the body actually retains. While there is no
              clear-cut or ideal amount of macronutrient proportions a person
              should consume to maintain a healthy diet or lose weight, eating a
              "healthy" diet replete with a variety of unprocessed foods such as
              vegetables, fruits, and lean meats is correlated with being
              healthier, and is more likely to result in sustainable weight
              loss. Also, remember that calories from drinks comprise an
              estimated 21% of a typical person's diet. Many of these calories
              fall under the category of empty calories. While sodas are an
              obvious culprit, drinks such as juices and even milk have large
              amounts of sugar and should be consumed in moderation to avoid
              negating their nutritional benefits. Ideally, a person should
              drink water, tea, and coffee without adding sugar in order to
              reduce calories gained from drinks. Remember: All foods, including
              "healthful foods," should be consumed in moderation, and
              distinctions can often be misleading since even natural foods like
              fruits can have large amounts of sugar, and foods labeled as
              "health foods" such as low-calorie foods, reduced-fat foods, etc.
              can potentially replace one unhealthy component with another. Many
              reduced-fat foods have large amounts of added sugar to compensate
              for taste lost through fat reduction. It is important to pay
              attention to, and consider the different components in a food
              product in order to determine whether said food should have a
              place within your diet.
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default CalorieCalculator;
