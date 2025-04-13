
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CropCard, { CropItem } from '../marketplace/CropCard';

const featuredCrops: CropItem[] = [
  {
    id: '1',
    title: 'Fresh Organic Tomatoes',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500',
    price: '$2.50/kg',
    quantity: '50',
    unit: 'kg',
    location: 'Greenfield',
    distance: '5 miles',
    sellerId: 'farmer1',
    sellerName: 'John Smith',
    tradeOption: 'sell'
  },
  {
    id: '2',
    title: 'Sweet Corn',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=500',
    price: '$1.75/dozen',
    quantity: '30',
    unit: 'dozen',
    location: 'Riverside',
    distance: '3 miles',
    sellerId: 'farmer2',
    sellerName: 'Emma Davis',
    tradeOption: 'both'
  },
  {
    id: '3',
    title: 'Fresh Lettuce Varieties',
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80&w=500',
    price: '$1.25/head',
    quantity: '100',
    unit: 'heads',
    location: 'Oakville',
    distance: '7 miles',
    sellerId: 'farmer3',
    sellerName: 'Robert Johnson',
    tradeOption: 'barter'
  }
];

const MarketPreview = () => {
  return (
    <section className="py-16 md:py-20 bg-neutral">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Featured Marketplace Listings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover fresh local produce and available farm resources in your area
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/marketplace">
                View All Listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCrops.map(crop => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPreview;
