import React from 'react';
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

interface CalorieResults {
  bmr: number;
  tdee: number;
  maintenance: number;
  weightLoss: number;
  weightGain: number;
}

interface LocationState {
  results: CalorieResults;
}

const CalorieResults: React.FC = () => {
  const location = useLocation();
  const results = (location.state as LocationState)?.results;

  if (!results) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 ">
        <Card className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p>Please go back to the calculator and enter your details to calculate your calories.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md space-y-6 dark:bg-gray-800 text-white p-2 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Calorie Results</h1>

        <Card className="p-6 dark:bg-gray-900 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-2">Maintenance Calories</h2>
          <p className="mb-2">
            To maintain your current weight, you need around{" "}
            <strong>{Math.round(results.maintenance)}</strong> kcal/day.
          </p>
          <p className="text-sm text-gray-600">
            These are the calories required to maintain your weight at your
            current activity level.
          </p>
        </Card>

        <Card className="p-6 dark:bg-gray-900 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-2">Weight Loss Target</h2>
          <p className="mb-2">
            To lose weight steadily, consume around{" "}
            <strong>{Math.round(results.weightLoss)}</strong> kcal/day.
          </p>
          <p className="text-sm text-gray-600 dark:bg-gray-900 transition-colors duration-200">
            This represents a 500 calorie deficit for sustainable weight loss
            of about 0.5kg (1lb) per week.
          </p>
        </Card>

        <Card className="p-6 dark:bg-gray-900 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-2">Weight Gain Target</h2>
          <p className="mb-2">
            To gain weight steadily, consume around{" "}
            <strong>{Math.round(results.weightGain)}</strong> kcal/day.
          </p>
          <p className="text-sm text-gray-600">
            This represents a 500 calorie surplus for steady weight gain
            of about 0.5kg (1lb) per week.
          </p>
        </Card>

        <Card className="p-6 dark:bg-gray-900 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <p className="mb-2">
            Your Basal Metabolic Rate (BMR): <strong>{Math.round(results.bmr)}</strong> kcal/day
          </p>
          <p className="mb-2">
            Your Total Daily Energy Expenditure (TDEE): <strong>{Math.round(results.tdee)}</strong> kcal/day
          </p>
          <p className="text-sm text-gray-600">
            BMR is the number of calories your body burns at rest. TDEE includes your activity level.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CalorieResults;