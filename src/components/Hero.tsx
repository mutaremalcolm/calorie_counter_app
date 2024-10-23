import HeroImage from "../assets/Hero-Image.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-8 gap-8 dark:bg-gray-900 transition-colors duration-200">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={HeroImage}
          alt="Calorie tracking visualization"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight 
                       text-gray-900 dark:text-white">
            Calculate Calories
            <br /> Track Consumption
            <br /> Achieve Weight Goals
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Take control of your health journey.
            <br /> Input your details, track your daily intake,
            <br /> and get personalized insights to help you stay on track.
            <br /> Whether you're looking to lose weight, maintain, or gain,
            <br /> our app is here to support you every step of the way.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-2xl font-medium text-gray-900 dark:text-white">
            Register or Sign Up Below
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/login/"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium 
                       bg-gray-900 text-white rounded-lg hover:bg-gray-800
                       dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100
                       transition-colors duration-200"
            >
              Log In
            </Link>
            <Link
              to="/signup/"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium
                       border-2 border-gray-900 text-gray-900 rounded-lg
                       hover:bg-gray-900 hover:text-white
                       dark:border-gray-100 dark:text-white
                       dark:hover:bg-gray-100 dark:hover:text-gray-900
                       transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;