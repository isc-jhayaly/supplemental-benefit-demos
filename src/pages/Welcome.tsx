import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">InterSystems Mutual</h1>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Would you like to check your supplemental benefits data?
        </h2>

        <div className="mt-8 flex w-full gap-4">
          <Button variant="outline" size="lg" className="flex-1 text-sm font-medium">
            No
          </Button>
          <Button
            variant="consent"
            size="lg"
            className="flex-1 text-sm font-medium"
            onClick={() => navigate("/consent")}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
