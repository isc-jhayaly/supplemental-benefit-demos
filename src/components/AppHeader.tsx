import { Shield } from "lucide-react";

const AppHeader = () => (
  <>
    <div className="mb-2 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
        <Shield className="h-5 w-5 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">InterSystems Mutual</h1>
    </div>
    <p className="mb-8 text-muted-foreground">Life Insurance ($5M) Application</p>
  </>
);

export default AppHeader;
