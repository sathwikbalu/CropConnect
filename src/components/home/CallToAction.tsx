
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-20 bg-primary-800 text-white">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
            Ready to Transform Your Farming Experience?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using CropConnect to exchange crops, share resources, and build thriving agricultural communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary-800 hover:bg-primary-50 text-base"
            >
              <Link to="/register">Create Your Free Account</Link>
            </Button>
            <Button
              asChild
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 text-base"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
