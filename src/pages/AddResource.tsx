
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import RequireAuth from "@/components/auth/RequireAuth";
import RequireFarmer from "@/components/auth/RequireFarmer";
import ResourceForm, { ResourceFormData } from "@/components/resources/ResourceForm";
import { createResource } from "@/services/resourceService";

const AddResource = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (resourceData: ResourceFormData) => {
    setIsSubmitting(true);
    
    try {
      await createResource(resourceData);
      
      toast({
        title: "Resource added!",
        description: `${resourceData.title} has been added successfully`,
      });
      
      navigate("/my-resources");
    } catch (error) {
      console.error('Error adding resource:', error);
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-2xl mx-auto">
          <ResourceForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitButtonText="Add Resource"
            cancelPath="/my-resources"
          />
        </div>
      </div>
    </Layout>
  );
};

export default function ProtectedAddResource() {
  return (
    <RequireAuth>
      <RequireFarmer>
        <AddResource />
      </RequireFarmer>
    </RequireAuth>
  );
}
