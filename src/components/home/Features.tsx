
import React from 'react';
import { Calendar, Users, BarChart3, Share2 } from 'lucide-react';

const featureItems = [
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: 'Crop & Resource Sharing',
    description: 'List surplus crops and equipment for exchange or sale within your community.',
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: 'Market Insights',
    description: 'Access real-time market data and price trends to make informed decisions.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Community Support',
    description: 'Connect with local farmers to share knowledge, advice, and best practices.',
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: 'Seasonal Planning',
    description: 'Plan your farming activities with seasonal calendars and optimization tools.',
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">How CropConnect Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides powerful tools to help small-scale farmers thrive through
            collaboration, resource optimization, and community-building.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-6 rounded-xl bg-neutral text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-5 p-4 rounded-full bg-primary-50">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
