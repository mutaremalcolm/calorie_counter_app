import React from 'react';
import { Card } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';

interface BMIResults {
  bmi: number;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
}

interface LocationState {
  results: BMIResults;
}

const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) return {
    category: "Underweight",
    description: "You are considered underweight. Consider consulting with a healthcare provider about achieving a healthy weight.",
    color: "text-blue-500"
  };
  if (bmi < 24.9) return {
    category: "Normal Weight",
    description: "You have a healthy weight. Maintain your healthy lifestyle with balanced diet and regular exercise.",
    color: "text-green-500"
  };
  if (bmi < 29.9) return {
    category: "Overweight",
    description: "You are considered overweight. Focus on healthy eating habits and regular physical activity.",
    color: "text-yellow-500"
  };
  return {
    category: "Obese",
    description: "You are considered obese. It's recommended to consult with healthcare providers about weight management strategies.",
    color: "text-red-500"
  };
};

const calculateHealthyWeightRange = (height: number) => {
  const minWeight = Math.round((18.5 * (height / 100) ** 2) * 10) / 10;
  const maxWeight = Math.round((24.9 * (height / 100) ** 2) * 10) / 10;
  return { minWeight, maxWeight };
};

const BmiResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  if (!state?.results) {
    // Redirect to calculator if no results are present
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);

    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p>Redirecting to calculator...</p>
        </Card>
      </div>
    );
  }

  const { results } = state;
  const bmiCategory = getBMICategory(results.bmi);
  const { minWeight, maxWeight } = calculateHealthyWeightRange(results.height);
  const bmiPrime = (results.bmi / 25).toFixed(1);
  const ponderalIndex = (results.weight / Math.pow(results.height / 100, 3)).toFixed(1);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center dark:text-white">BMI Results</h1>

        <Card className="p-6 dark:bg-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold dark:text-white">{results.bmi.toFixed(1)}</h2>
            <p className={`text-lg font-semibold ${bmiCategory.color}`}>
              {bmiCategory.category}
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">Your Measurements</h3>
              <ul className="space-y-1 text-sm dark:text-gray-300">
                <li>Height: {results.height} cm</li>
                <li>Weight: {results.weight} kg</li>
                <li>Gender: {results.gender}</li>
                <li>Age: {results.age} years</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">BMI Analysis</h3>
              <p className="text-sm mb-4 dark:text-gray-300">{bmiCategory.description}</p>
              <ul className="space-y-2 text-sm dark:text-gray-300">
                <li><strong>Healthy BMI Range:</strong> 18.5 - 24.9</li>
                <li><strong>Healthy Weight Range:</strong> {minWeight} - {maxWeight} kg</li>
                <li><strong>BMI Prime:</strong> {bmiPrime}</li>
                <li><strong>Ponderal Index:</strong> {ponderalIndex} kg/m³</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">Health Recommendations</h3>
              <ul className="space-y-2 text-sm dark:text-gray-300">
                <li>• Maintain a balanced diet rich in nutrients</li>
                <li>• Engage in regular physical activity</li>
                <li>• Stay hydrated and get adequate sleep</li>
                <li>• Consult healthcare providers for personalized advice</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BmiResults;