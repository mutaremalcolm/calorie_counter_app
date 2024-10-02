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
import {
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Play } from "lucide-react";

const CalorieCalculator = () => {
  const [selectedActivity, setSelectedActivity] = React.useState("Moderate: exercise 4-5 times/week");

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
        <Card className="w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <>
                    <section className="flex items-center gap-4">
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="flex flex-grow: 1 ml-4 mr-4">Age</FormLabel>
                        <FormControl className="flex flex-grow">
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
                    </section>
                    <section>
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
                    </section>
                    <section className="flex items-center gap-4">
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="flex flex-grow: 1 ml-4 mr-1">
                          Height
                        </FormLabel>
                        <FormControl className="flex flex-grow">
                          <Input placeholder="cm" {...field} className="w-20 px-2 py-1 text-end" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </section>
                    <section className="flex items-center gap-4">
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="flex flex-grow: 1 ml-4 mr-1">
                          Weight
                        </FormLabel>
                        <FormControl className="flex flex-grow">
                          <Input placeholder="kg" {...field} className="w-20 px-2 py-1 text-end" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </section>
                    <section className="flex items-center gap-4">
                      <FormItem className="flex flex-row items-center w-full">
                        <FormLabel className="flex flex-grow: 1 ml-4 mr-1">
                          Activity
                        </FormLabel>
                        <FormControl className="flex flex-grow relative">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <div>
                                <Input 
                                  readOnly 
                                  value={selectedActivity} 
                                  className="cursor-pointer text-start pr-8" 
                                />
                                {/* <ChevronDown /> */}
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              <DropdownMenuLabel>
                                Select Activity Level
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuCheckboxItem
                                checked={selectedActivity === "Light"}
                                onCheckedChange={() => setSelectedActivity("Light")}
                              >
                                Light: exercise 1-2 times/week
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={selectedActivity === "Moderate"}
                                onCheckedChange={() => setSelectedActivity("Moderate")}
                              >
                                Moderate: exercise 4-5 times/week
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuCheckboxItem
                                checked={selectedActivity === "Heavy"}
                                onCheckedChange={() => setSelectedActivity("Heavy")}
                              >
                                Heavy: daily exercise or intense exercise 6-7 times/week
                              </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </section>
                  </>
                )}
              />
              <section className="ml-10 underline">
                + Settings
              </section>
              <section className="pb-4">
              <Button 
              type="submit" 
              className="ml-10 bg-purple-500"
              >
                Calculate
                <Play className="w-4 h-4 ml-2 fill-light"/>
              </Button>
              <Button 
              type="submit" 
              className="ml-2 bg-purple-500"
              >
                Clear
              </Button>
              </section>
            </form>
          </Form>
        </Card>
      </main>
    </>
  );
};

export default CalorieCalculator;
