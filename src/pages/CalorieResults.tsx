import { Card } from "../components/ui/card";
import { useLocation } from "react-router-dom";

interface CalorieResultsProps {
  results: {
    maintenance: number;
    loseHalfKg: number;
    loseOneKg: number;
  };
}

const CalorieResults: React.FC<CalorieResultsProps> = () => {
  const location = useLocation();
  const results = location.state?.results;

  if (!results) {
    return <p>No results found. Please go back and submit the form.</p>; //implement toast message here
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md p-6 mt-8 shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Calorie Results
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-purple-100 rounded-md">
              <h3 className="text-xl font-semibold">Maintenance Calories</h3>
              <p className="text-lg">
                To maintain your current weight, you need around{" "}
                <strong>{results.maintenance}</strong> kcal/day.
              </p>
              <p className="text-sm text-gray-600">
                These are the calories required to maintain your weight at your
                current activity level.
              </p>
            </div>

            <div className="p-4 bg-purple-100 rounded-md">
              <h3 className="text-xl font-semibold text-red-600">
                Calorie Deficit (0.5 kg/week)
              </h3>
              <p className="text-lg">
                To lose 0.5 kg per week, consume around{" "}
                <strong>{results.loseHalfKg}</strong> kcal/day.
              </p>
              <p className="text-sm text-gray-600">
                A moderate calorie deficit for gradual and sustainable weight
                loss.
              </p>
            </div>

            <div className="p-4 bg-purple-100 rounded-md">
              <h3 className="text-xl font-semibold text-red-600">
                Calorie Deficit (1 kg/week)
              </h3>
              <p className="text-lg">
                To lose 1 kg per week, consume around{" "}
                <strong>{results.loseOneKg}</strong> kcal/day.
              </p>
              <p className="text-sm text-gray-600">
                A more aggressive deficit, suitable for faster weight loss, but
                may require closer monitoring.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CalorieResults;
