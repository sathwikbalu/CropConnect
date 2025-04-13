
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CropCard, { CropItem } from '@/components/marketplace/CropCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<CropItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, isFarmer } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      // Transform data to match CropItem interface
      const formattedProducts = data.map((product: any) => ({
        id: product._id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
        location: 'Unknown', // This could be added to the product model later
        distance: 'Unknown', // This could be calculated based on user location later
        sellerId: product.sellerId,
        sellerName: product.sellerName,
        tradeOption: product.tradeOption
      }));
      
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-neutral py-12 md:py-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Crop Marketplace</h1>
            <p className="text-lg text-gray-600">
              {isFarmer() 
                ? "List your surplus crops for sale or find what other farmers are offering" 
                : "Find fresh crops from local farmers for your retail business"}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {isAuthenticated && isFarmer() && (
              <Link to="/add-product">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Add New Crop</span>
                </Button>
              </Link>
            )}
            
            {!isAuthenticated && (
              <div className="w-full md:w-auto mb-4 md:mb-0 flex justify-center md:justify-start">
                <Link to="/register">
                  <Button variant="outline" className="flex items-center gap-2">
                    {isFarmer() 
                      ? "Add your crops to the marketplace" 
                      : "Join to connect with farmers"}
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search crops, fruits, vegetables..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        For Sale Only
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        For Barter Only
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Within 5 miles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Within 10 miles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Within 25 miles
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Newest First
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Price: Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Price: High to Low
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Distance: Nearest
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">Loading products...</h3>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <CropCard key={product.id} crop={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
