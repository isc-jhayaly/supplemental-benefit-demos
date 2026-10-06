import { useNavigate } from "react-router-dom";
import { usePatient } from "@/context/PatientContext";
import { patients } from "@/data/patients";
import { demoScenarios } from "@/data/demoScenarios";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DemoSelection = () => {
  const navigate = useNavigate();
  const { setCurrentPatient, setDemoScenario, setReturnUrl } = usePatient();

  const selectScenario = (scenarioKey: string, index: number) => {
    setCurrentPatient(patients[index]);
    setDemoScenario(scenarioKey);
    setReturnUrl(null);
    navigate(`/demo/${scenarioKey}/consent`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="flex flex-col items-center text-center max-w-lg w-full">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mounted Demo App</h1>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Start a mounted demo scenario
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Each scenario is available under <code>/demo/</code> with a return callback URL.
        </p>

        <div className="mt-6 flex w-full flex-col gap-3">
          {demoScenarios.map((scenario, index) => (
            <button
              key={scenario.key}
              onClick={() => selectScenario(scenario.key, index)}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary hover:bg-accent/50"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${scenario.iconBg}`}>
                <scenario.icon className={`h-5 w-5 ${scenario.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {scenario.title}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {scenario.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => navigate("/")}
        >
          Return to Local Welcome
        </Button>
      </div>
    </div>
  );
};

export default DemoSelection;
