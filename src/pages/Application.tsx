import { CheckCircle, Shield, Sparkles, FileText } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";

const steps = [
  { number: 1, label: "Consent" },
  { number: 2, label: "Identity Verification" },
  { number: 3, label: "Record Retrieval" },
  { number: 4, label: "Application" },
];

interface BenefitTile {
  title: string;
  icon: React.ReactNode;
}

const benefits: BenefitTile[] = [
  { title: "Cancer Diagnosis (Critical Illness Benefit)", icon: <FileText className="h-5 w-5 text-primary" /> },
  { title: "Overnight Hospital Stay (Hospital Indemnity Benefit)", icon: <Shield className="h-5 w-5 text-primary" /> },
];

const Application = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-10">
      <AppHeader />
      <StepIndicator steps={steps} currentStep={4} completedSteps={[1, 2, 3]} />

      <div className="mt-8 w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Identified Potential Supplemental Benefit Events</h3>
            </div>
          </div>
        </div>

        {/* Benefit Tiles */}
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-6 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                {benefit.icon}
              </div>
              <h4 className="text-sm font-semibold text-foreground">{benefit.title}</h4>
            </div>
            <Button
              variant="consent"
              size="sm"
              className="shrink-0 text-sm font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
            >
              Initiate Supplemental Benefits Claim
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Application;
