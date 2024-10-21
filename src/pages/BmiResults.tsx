import React from 'react';
import { Card } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';


interface BmiResultsProps {
    results: {
      age: number;
      height: number;
      weight: number;
      bmi: number;
    };
  }

const BmiResults: React.FC<BmiResultsProps> = () => {
    const location = useLocation();
    const results = location.state?.results;

    // bug for bmi value breaks here *** investigate
    if (!results || typeof results.bmi !== 'number') {
        return <p>No results found. Please go back and submit the form.</p>; 
    }

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-4">
        <Card className="w-full max-w-md p-6 mt-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4 text-black">
              BMI Results
            </h2>
            {/* Display the BMI result */}
            {results !== null && (
              <div className="p-4 bg-black text-white rounded-md">
                <h3 className="text-xl font-semibold mb-2">Your BMI</h3>
                <p className="text-lg">
                  Based on your inputs, your BMI is:{" "}
                  <strong>{results.bmi}</strong>.
                </p>
              </div>
            )}
            {results !== null && (
              <div className="mt-4 p-4 bg-black text-white rounded-md">
                <h3 className="text-lg font-semibold">BMI Interpretation</h3>
                <p className="text-sm text-gray-600">
                  {results < 18.5 && "You are considered underweight."}
                  {results >= 18.5 &&
                    results < 24.9 &&
                    "You have a normal weight."}
                  {results >= 25 &&
                    results < 29.9 &&
                    "You are considered overweight."}
                  {results >= 30 && "You are considered obese."}
                </p>
              </div>
            )}
            {/* Tips for a healthy BMI */}
            <div className="mt-4 p-4 bg-black text-white rounded-md">
              <h3 className="text-lg font-semibold">Tips for a Healthy BMI</h3>
              <p className="text-sm text-gray-600">
                Maintaining a healthy BMI involves a balanced diet, regular
                exercise, and consistent health monitoring. Consider consulting
                a healthcare provider for personalized advice.
              </p>
            </div>
          </Card>
        <div className="ml-2 text-sm bg-black text-white rounded-sm p-4 mt-2">
          <ul>
            <li>
              <strong>Healthy BMI Range:</strong> 18.5 kg/m - 25 kg/m
            </li>
            <li>
              <strong>Healthy weight for the weight:</strong> 59.9kg - 81 kg
            </li>
            <li>
              <strong>BMI Prime:</strong> 0.8
            </li>
            <li>
              <strong>Ponderal Index:</strong> 11.1 kg/m
            </li>
          </ul>
        </div>
        </div>
    </>
  )
}

export default BmiResults