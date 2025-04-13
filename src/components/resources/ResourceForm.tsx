
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export interface ResourceFormData {
  title: string;
  imageUrl: string;
  price: string;
  priceType: "per-day" | "per-week" | "per-month" | "fixed";
  availability: string;
  condition: "New" | "Excellent" | "Good" | "Fair" | "Poor";
  location: string;
  description: string;
}

interface ResourceFormProps {
  initialData?: ResourceFormData;
  onSubmit: (resourceData: ResourceFormData) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
  cancelPath?: string;
}

const ResourceForm = ({
  initialData = {
    title: "",
    imageUrl: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?auto=format&fit=crop&q=80&w=500",
    price: "",
    priceType: "per-day",
    availability: "",
    condition: "Good",
    location: "",
    description: ""
  },
  onSubmit,
  submitButtonText,
  isSubmitting,
  cancelPath = "/resources"
}: ResourceFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resource, setResource] = useState<ResourceFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResource(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setResource(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resource.title || !resource.price || !resource.location || !resource.availability) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await onSubmit(resource);
    } catch (error) {
      console.error('Error with resource form submission:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{submitButtonText === "Add Resource" ? "Add New Resource" : "Edit Resource"}</CardTitle>
        <CardDescription>
          {submitButtonText === "Add Resource" 
            ? "List your farming resources for other farmers to borrow or rent" 
            : "Update your resource listing"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Resource Name *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Tractor with Attachments"
              value={resource.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your resource (condition, specifications, etc.)"
              value={resource.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                placeholder="e.g. $100"
                value={resource.price}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priceType">Price Type *</Label>
              <Select 
                value={resource.priceType} 
                onValueChange={(value) => handleSelectChange('priceType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per-day">Per Day</SelectItem>
                  <SelectItem value="per-week">Per Week</SelectItem>
                  <SelectItem value="per-month">Per Month</SelectItem>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="availability">Availability *</Label>
              <Input
                id="availability"
                name="availability"
                placeholder="e.g. Mon-Fri, Weekends, etc."
                value={resource.availability}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">Condition *</Label>
              <Select 
                value={resource.condition} 
                onValueChange={(value) => handleSelectChange('condition', value as "New" | "Excellent" | "Good" | "Fair" | "Poor")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. Greenfield"
              value={resource.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Resource Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={resource.imageUrl}
              onChange={handleChange}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(cancelPath)}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (submitButtonText === "Add Resource" ? "Adding..." : "Updating...") : submitButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceForm;
