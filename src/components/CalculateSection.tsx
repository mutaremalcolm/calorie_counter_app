import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CalculateSection = () => {
  return (
    <>
      <Card className="ml-8 mr-8 bg-pink-50">
        <div className="flex justify-between w-full">
          <div className="w-2/4 pr-4"> 
            <CardHeader className="mt-10 text-purple-900 font-extrabold text-4xl">
              <h4>Free Weight-Loss App</h4>
            </CardHeader>
            <CardTitle className="mt-5 text-purple-900 font-medium text-3xl ml-5">
              <span>
                Reach and Maintain your ideal
                <br /> weight with your personalized plan
              </span>
            </CardTitle>
            <CardContent className="mt-10 mb-10">
              <Link to="/calculatecalories">
                <Button className="pl-15 bg-purple-900">
                  Calculate Calories
                </Button>
              </Link>
            </CardContent>
          </div>

          {/* TODO refine Dashboard UI */}
          <div className="w-2/4 flex justify-end"> 
            <CardDescription className="bg-white mr-8 mt-10 mb-10 rounded-md p-6">
              {/* Calories stats */}
              <div className="mb-4 text-center">
                <div className="flex justify-between mb-2 items-center">
                  {/* Eaten */}
                  <div className="text-center">
                    <p className="font-bold text-2xl">1,291</p>
                    <p className="text-black font-xsm mb-1">Eaten</p>
                  </div>

                  {/* Remaining with circular progress */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16">
                      <CircularProgressbar value={50} text="1,009" />
                    </div>
                  </div>

                  {/* Burned */}
                  <div className="text-center">
                    <p className="font-bold text-2xl">500</p>
                    <p className="text-black font-xsm mb-1">Burned</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 justify-center mt-20"> 
                {/* Carbs Progress */}
                <div className="text-center">
                  <p className="text-sm font-semibold mb-1">Carbs</p>
                  <Progress value={60} className="w-20 h-2 bg-gray-300" />
                  <p className="text-xs mt-1 text-black">60g / 100g</p>
                </div>

                {/* Protein Progress */}
                <div className="text-center">
                  <p className="text-sm font-semibold mb-1">Protein</p>
                  <Progress value={38} className="w-20 h-2 bg-gray-300" />
                  <p className="text-xs mt-1 text-black">30g / 80g</p>
                </div>

                {/* Fat Progress */}
                <div className="text-center">
                  <p className="text-sm font-semibold mb-1">Fat</p>
                  <Progress value={57} className="w-20 h-2 bg-gray-300" />
                  <p className="text-xs mt-1 text-black">40g / 70g</p>
                </div>
              </div>
            </CardDescription>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CalculateSection;
