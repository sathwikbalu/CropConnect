
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const testimonials = [
  {
    id: 'farmer-1',
    quote: "CropConnect has completely transformed the way I manage surplus crops. Instead of letting them go to waste, I can now trade with neighboring farms and actually make a profit.",
    name: "Maria Johnson",
    role: "Small Farm Owner",
    location: "Riverside County",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 'farmer-2',
    quote: "The resource sharing feature saved our harvest. When our irrigation system broke down, we were able to rent equipment from another farm through the platform in less than a day.",
    name: "James Wilson",
    role: "Family Farm Operator",
    location: "Green Valley",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 'farmer-3',
    quote: "As a new farmer, the community forums provide invaluable advice. I've learned so much from experienced farmers who are always willing to share their knowledge.",
    name: "Sarah Thompson",
    role: "Beginning Farmer",
    location: "Harvest Hills",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=150&h=150"
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-neutral">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Stories from Our Farming Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from farmers who have successfully used CropConnect to transform their agricultural practices and strengthen their local farming community.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="farmer-1" className="w-full">
            <TabsList className="grid grid-cols-3 mb-10 bg-white/50">
              {testimonials.map((testimonial) => (
                <TabsTrigger
                  key={testimonial.id}
                  value={testimonial.id}
                  className="flex flex-col items-center py-4 data-[state=active]:bg-white"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-sm font-medium">{testimonial.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {testimonials.map((testimonial) => (
              <TabsContent 
                key={testimonial.id}
                value={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="flex flex-col items-center text-center">
                  <svg className="w-12 h-12 text-primary-200 mb-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path>
                  </svg>
                  <blockquote className="text-xl font-medium mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
