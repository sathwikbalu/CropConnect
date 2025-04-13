import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { fetchUserProducts, deleteProduct } from "@/services/productService";

const MyProducts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchUserProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [toast, user]);

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );

      toast({
        title: "Product deleted!",
        description: "The product has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold mb-6">My Products</h1>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <Card className="text-center">
            <CardContent>
              <p className="text-lg">No products listed yet.</p>
              <Button onClick={() => navigate("/add-product")}>
                Add Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="relative">
                <CardContent className="relative h-48">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="mt-4">
                    <span className="text-primary font-medium">
                      ${product.price}
                    </span>
                    <span className="text-gray-500"> / {product.unit}</span>
                  </div>
                </CardContent>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link to={`/edit-product/${product._id}`}>
                    <Button size="icon" variant="secondary">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyProducts;
