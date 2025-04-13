
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import ProductForm from "@/components/products/ProductForm";
import { createProduct } from "@/services/productService";

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (productData: any) => {
    setIsSubmitting(true);
    
    try {
      await createProduct(productData);
      
      toast({
        title: "Product added!",
        description: `${productData.title} has been added to the marketplace`,
      });
      
      navigate("/marketplace");
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
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
          <ProductForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitButtonText="Add Product"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
