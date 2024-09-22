import React from 'react';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';


const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-5 sm:py-16 lg:py-20 bg-purple-400 ml-8 mr-8 rounded-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600">What Calorie users are saying</p>
          </div>
          <div className="relative mt-5 md:mt-24">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
            </div>
            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
              <TestimonialCard
                name="Leslie Alexander"
                location="Seoul South Korea April 2019"
                imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                quote="“My new clients are achieving their weight goals much faster. Calorie makes it easier to know how to eat right.“"
              />
              <TestimonialCard
                name="John Doe"
                location="Honolulu Hawaii February 2017"
                imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                quote="“Body Recomposition is 75% Food and 25% work in the gym. Calorie is the tool we have been waiting for, its awesome.”"
              />
              <TestimonialCard
                name="Jane Smith"
                location="Berlin Germany April 2019"
                imageUrl="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                quote="“Eating right with a hectic schedule is a challenge. Calorie simplified it for me by allowing me to prepare in advance.”"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  name: string;
  location: string;
  imageUrl: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, location, imageUrl, quote }) => {
  return (
    <Card className="flex flex-col overflow-hidden shadow-xl bg-purple-400 border-none">
      <CardDescription className="flex items-center mt-8">
        <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={imageUrl} alt={name} />
        <div className="ml-4">
          <p className="text-base font-bold text-gray-900">{name}</p>
          <p className="mt-0.5 text-sm text-gray-600">{location}</p>
        </div>
      </CardDescription>
      <CardHeader className="pb-0">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-[#4b3892]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardHeader>
      <CardContent className="mt-8">
        <blockquote>
          <p className="text-lg leading-relaxed text-gray-900">{quote}</p>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default TestimonialsSection;
