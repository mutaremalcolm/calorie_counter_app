import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, ActivitySquare, Flame, Scale } from "lucide-react";

interface ResultsState {
  caloriesConsumed: number;
  caloriesBurnt: number;
  energyBalance: number;
}

const CaloriesBurntResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState | null;

  if (!state) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 dark:bg-gray-900 transition-colors duration-200">
        <Card className="p-6 w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="text-center">
            <Info className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-xl font-bold mb-4 dark:text-white">No Results Found</h2>
            <p className="mb-6 dark:text-gray-300">Please calculate your calories first.</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  const { caloriesConsumed, caloriesBurnt, energyBalance } = state;

  const getStatusColor = () => {
    if (energyBalance > 500) return "text-red-500";
    if (energyBalance < -500) return "text-yellow-500";
    return "text-green-500";
  };

  const getEnergyStatus = () => {
    if (energyBalance > 500) return "Caloric Surplus";
    if (energyBalance < -500) return "Caloric Deficit";
    return "Maintenance";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-2 dark:text-white">
            Calories Results
          </h1>
          <div className="flex justify-center bg-black text-white p-2 dark:bg-gray-800 rounded-lg">
            <Info className="mr-2" />
            <span>Your calorie breakdown</span>
          </div>
        </div>

        <Card className="p-6 w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <ActivitySquare className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-sm font-medium dark:text-gray-300">Consumed</div>
                <div className="text-lg font-bold dark:text-white">{caloriesConsumed}</div>
              </div>
              <div className="text-center">
                <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                <div className="text-sm font-medium dark:text-gray-300">Burnt</div>
                <div className="text-lg font-bold dark:text-white">{caloriesBurnt}</div>
              </div>
              <div className="text-center">
                <Scale className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-sm font-medium dark:text-gray-300">Balance</div>
                <div className={`text-lg font-bold ${getStatusColor()}`}>{energyBalance}</div>
              </div>
            </div>

            {/* Status */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Current Status
              </h3>
              <div className={`text-xl font-bold ${getStatusColor()}`}>
                {getEnergyStatus()}
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Recommendations
              </h3>
              <p className="text-sm dark:text-gray-300">
                {energyBalance > 500 ? (
                  "You're in a significant caloric surplus. Consider reducing your calorie intake or increasing activity level if weight loss is your goal."
                ) : energyBalance < -500 ? (
                  "You're in a significant caloric deficit. Consider increasing your calorie intake to maintain healthy energy levels."
                ) : (
                  "You're maintaining a good balance between calories consumed and burnt. Keep up the good work!"
                )}
              </p>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="w-full bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Calculate Again
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default CaloriesBurntResults;