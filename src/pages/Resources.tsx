
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ResourceCard, { ResourceItem } from '@/components/marketplace/ResourceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RequireAuth from '@/components/auth/RequireAuth';
import RequireFarmer from '@/components/auth/RequireFarmer';
import { useNavigate } from 'react-router-dom';
import { fetchAllResources } from '@/services/resourceService';
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

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        const data = await fetchAllResources();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast({
          title: "Error",
          description: "Failed to load resources. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [toast]);

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-neutral py-12 md:py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Resource Sharing</h1>
              <p className="text-lg text-gray-600">
                Find equipment, tools, storage, and other farming resources to rent from neighboring farms
              </p>
            </div>
            <Button onClick={() => navigate("/add-resource")} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Resource
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search equipment, storage, tools..."
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
                        By Day
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        By Week
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        By Month
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Excellent Condition
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Within 10 miles
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
                        Price: Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Price: High to Low
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Distance: Nearest
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Condition: Best
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-lg">Loading resources...</p>
              </div>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              <Button className="mt-4" onClick={() => navigate('/add-resource')}>
                Add Your First Resource
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Wrap the Resources page with authentication and farmer requirement
export default function ProtectedResources() {
  return (
    <RequireAuth>
      <RequireFarmer>
        <Resources />
      </RequireFarmer>
    </RequireAuth>
  );
}
