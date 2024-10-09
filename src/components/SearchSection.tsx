import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../components/ui/button";

const SearchSection = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-white ml-8 mr-8">
      <Card className="w-full p-8 bg-pink-50">
        <div className="max-w-2xl mx-auto">
          <CardHeader className="text-center text-purple-900 font-extrabold text-4xl">
            <h4>What are you searching for?</h4>
          </CardHeader>
          <CardTitle className="text-center text-purple-900 font-medium text-3xl">
            <span>
              Find thousands of foods and calorie information
            </span>
          </CardTitle>
          <CardContent className="flex justify-center items-center mt-6 mb-10 space-x-4">
            <textarea
              className="w-full max-w-md p-3 border rounded-md border-gray-300 h-12"
              placeholder="Enter food item..."
            />
            <Button className="bg-purple-900 text-white h-12 px-6">
              Search
            </Button>
          </CardContent>
        </div>
      </Card>
    </main>
  );
};

export default SearchSection;
