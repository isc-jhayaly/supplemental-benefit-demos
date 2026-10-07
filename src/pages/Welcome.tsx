import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle, AlertTriangle, Search, ArrowRight } from "lucide-react";
import { patients } from "@/data/patients";
import { usePatient } from "@/context/PatientContext";
import { demoScenarios } from "@/data/demoScenarios";

const Welcome = () => {
  const navigate = useNavigate();
  const { setCurrentPatient, setDemoScenario, setReturnUrl } = usePatient();

  const selectScenario = (index: number) => {
    const scenario = demoScenarios[index];
    setCurrentPatient(patients[index]);
    setDemoScenario(scenario.key);
    setReturnUrl(null);
    navigate(`/ntt/${scenario.key}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center max-w-lg w-full">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Chubb</h1>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-foreground">
          Submit a Supplemental Health Benefits Claim
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a demo scenario to begin
        </p>

        <div className="mt-6 flex w-full flex-col gap-3">
          {demoScenarios.map((scenario, index) => (
            <button
              key={scenario.key}
              onClick={() => selectScenario(index)}
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
      </div>
    </div>
  );
};

export default Welcome;
