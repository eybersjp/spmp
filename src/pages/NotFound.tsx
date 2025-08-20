import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          <Button 
            className="bg-gradient-solar hover:opacity-90"
            onClick={() => window.location.href = "/"}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
