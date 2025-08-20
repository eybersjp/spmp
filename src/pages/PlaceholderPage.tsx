import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  icon: Icon = Construction 
}: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-0 shadow-elegant text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-solar">
            <Icon className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This module will include comprehensive functionality for {title.toLowerCase()}.
            Full implementation coming in future updates.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            <Button 
              onClick={() => navigate("/")}
              className="flex-1 bg-gradient-solar hover:opacity-90"
            >
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}