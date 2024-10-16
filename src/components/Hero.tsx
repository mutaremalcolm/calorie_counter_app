import { Link } from "react-router-dom";
import HeroImage from "../assets/Hero-Image.jpg";

const Hero = () => {
  return (
    <section className="hero flex items-center justify-between px-6 py-2 mt-2">
      {/* Hero Image */}
      <div className="w-full lg:w-1/2">
        <img
          src={HeroImage}
          alt="Hero Section"
          className="w-full h-auto object-cover"
        />
      </div>
      {/* Hero Text */}
      {/* TODO: Clean up - export constants */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start pl-2">
        <h1 className="font-open-sans text-4xl sm:text-5xl font-black leading-tight text-black mb-6">
          Calculate Calories
          <br /> Track Consumption<br />
          Achieve Weight Goals
        </h1>
        <p className="font-open-sans-hebrew text-xl sm:text-base  mb-7">
          Take control of your health journey.<br/> Input your details, track your
          daily intake,<br/> and get personalized insights to help you stay on track.<br/>
          Whether you're looking to lose weight, maintain, or gain,<br/> our app is
          here to support you every step of the way.<br/> Ready to start your
          journey?
          <br />
        </p>
        <div className="mt-8">
          <span className="font-rubik text-2xl">
            Register or Sign Up Below.
          </span>
        </div>
        <div className="mt-8 flex space-x-4">
          <Link
            to="/login/"
            className="uppercase py-2 px-4 rounded-lg bg-black border-2 border-transparent
             text-white text-md hover:bg-gray-700"
          >
            Log In
          </Link>
          <Link
            to="/signup/"
            className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-black
             text-black hover:bg-gray-700 hover:text-white text-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
