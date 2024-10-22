import { useState } from "react";
import CaloriesBurnt from "@/components/CaloriesBurnt";
import { Card } from "@/components/ui/card";
import { calculateEnergyBalance } from "@/lib/calculators";

const CaloriesBurntResults = () => {
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0); // Example state
  const [caloriesBurnt, setCaloriesBurnt] = useState<number>(0); // Example state

  // Assuming that CaloriesBurnt component provides the burnt calories value
  // You can replace this with the actual mechanism of getting the values from CaloriesBurnt

  const energyBalance = calculateEnergyBalance(caloriesConsumed, caloriesBurnt);

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-4">
        <Card className="w-full max-w-md p-6 mt-8 shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-purple-500">
            Energy Balance Result
          </h2>

          <div className="p-4 bg-white rounded-md space-y-4">
            <div className="p-4 bg-purple-100 rounded-md">
              <h3 className="text-xl font-semibold">Your Energy Balance</h3>
              <p className="text-lg">
                Based on your inputs, your energy balance is:{" "}
                <strong>{energyBalance} kcal</strong>.
              </p>
            </div>

            <div className="p-4 bg-purple-100 rounded-md">
              <h3 className="text-lg font-semibold">
                What does Energy Balance mean?
              </h3>
              <p className="text-sm text-gray-600">
                Energy balance is the difference between the calories you
                consume and the calories you burn. A positive balance means
                weight gain, and a negative balance means weight loss.
              </p>
            </div>

            <div className="p-4 bg-purple-100 rounded-md">
              <h3 className="text-lg font-semibold">
                Tips for Managing Energy Balance
              </h3>
              <p className="text-sm text-gray-600">
                To maintain a healthy weight, aim for a balance between calories
                consumed and burnt. Regular physical activity and mindful eating
                can help you achieve this.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CaloriesBurntResults;
