import { Card } from '@/components/ui/card';
import { Scale, Heart, Info } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface FormData {
  gender: 'male' | 'female';
  height: number;
  age: number;
  unit: 'US' | 'Metric';
}

interface LocationState {
  ibwResult: number;
  formData: FormData;
}

const IBWResults = () => {
  const location = useLocation();
  const { ibwResult, formData } = location.state as LocationState;

  const getWeightRange = (ibw: number) => {
    const lower = Math.round((ibw * 0.9) * 10) / 10;
    const upper = Math.round((ibw * 1.1) * 10) / 10;
    return { lower, upper };
  };

  const range = getWeightRange(ibwResult);

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center dark:bg-gray-900">
      <Card className="w-full max-w-2xl p-6 dark:bg-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Ideal Body Weight Results</h1>
        </div>

        {/* Primary Result */}
        <div className="bg-black dark:bg-gray-700 text-white p-6 rounded-lg mb-6">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-8 h-8 mr-2" />
            <span className="text-xl">Target Weight:</span>
            <span className="text-3xl font-bold ml-2">{ibwResult} kg</span>
          </div>
          <div className="text-center">
            <Heart className="inline w-6 h-6 mb-1 mr-2" />
            <span>Healthy weight range: {range.lower} - {range.upper} kg</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Scale className="w-6 h-6 mr-2" />
            Your Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Height:</span>
              <span className="ml-2">{formData.height} {formData.unit === 'Metric' ? 'cm' : 'inches'}</span>
            </div>
            <div>
              <span className="font-medium">Gender:</span>
              <span className="ml-2 capitalize">{formData.gender}</span>
            </div>
            <div>
              <span className="font-medium">Age:</span>
              <span className="ml-2">{formData.age} years</span>
            </div>
            <div>
              <span className="font-medium">Unit:</span>
              <span className="ml-2">{formData.unit}</span>
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
          <div className="flex items-start">
            <Info className="w-6 h-6 mr-3 flex-shrink-0 text-blue-500" />
            <p className="text-sm">
              This calculation uses the Devine Formula, which is widely accepted for
              estimating ideal body weight. Remember that this is a general guideline
              and individual factors may vary.
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default IBWResults;