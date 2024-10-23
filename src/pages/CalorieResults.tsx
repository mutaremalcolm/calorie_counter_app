import React from 'react';
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

interface CalorieResults {
  maintenance: number;
  loseHalfKg: number;
  loseOneKg: number;
}
 
interface LocationState {
  results: CalorieResults;
} 

const CalorieResults: React.FC = () => {
  const location = useLocation();
  const results = (location.state as LocationState)?.results;

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <Card className="w-full max-w-3xl p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            No Results Found
          </h2>
          <p className="text-center text-muted-foreground">
            Please go back to the calculator and enter your details to calculate your calories.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Calorie Results
        </h2>
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              Maintenance Calories
            </h3>
            <p className="mb-2">
              To maintain your current weight, you need around{" "}
              <span className="font-bold">{Math.round(results.maintenance)}</span> kcal/day.
            </p>
            <p className="text-sm text-muted-foreground">
              These are the calories required to maintain your weight at your 
              current activity level.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              Calorie Deficit (0.5 kg/week)
            </h3>
            <p className="mb-2">
              To lose 0.5 kg per week, consume around{" "}
              <span className="font-bold">{Math.round(results.loseHalfKg)}</span> kcal/day.
            </p>
            <p className="text-sm text-muted-foreground">
              A moderate calorie deficit for gradual and sustainable weight 
              loss.
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              Calorie Deficit (1 kg/week)
            </h3>
            <p className="mb-2">
              To lose 1 kg per week, consume around{" "}
              <span className="font-bold">{Math.round(results.loseOneKg)}</span> kcal/day.
            </p>
            <p className="text-sm text-muted-foreground">
              A more aggressive deficit, suitable for faster weight loss, but 
              may require closer monitoring.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default CalorieResults;