import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Calorie Counter</h1>
        <p className="text-lg text-gray-600 mb-6">Track your daily calorie intake and stay on top of your fitness goals.</p>
      </div>
    </div>
  );
};

export default Hero;
