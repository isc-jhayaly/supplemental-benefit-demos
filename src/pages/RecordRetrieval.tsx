import { useState, useEffect } from "react";
import { CheckCircle, FileText, Info, Loader2, Shield } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  { number: 1, label: "Consent" },
  { number: 2, label: "Identity Verification" },
  { number: 3, label: "Record Retrieval" },
  { number: 4, label: "Application" },
];

type Phase = "retrieving" | "retrieved";

const RecordRetrieval = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("retrieving");

  useEffect(() => {
    if (phase === "retrieving") {
      const t = setTimeout(() => setPhase("retrieved"), 5000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-10">
      <AppHeader />
      <StepIndicator steps={steps} currentStep={3} completedSteps={[1, 2]} />

      <div className="mt-8 w-full max-w-2xl space-y-6">
        {/* Identity Verified Box */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Identity Verified</h3>
              <p className="text-sm text-muted-foreground">Your IAL2 token is active and verified</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">IAL2 Authentication Token</h4>
                <p className="text-sm text-muted-foreground">Token ID: IAL2-CLEAR-XEICZSGR7W</p>
                <p className="text-sm text-muted-foreground">Expires: 3/4/2026</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-300 px-3 py-0.5 text-xs font-medium text-emerald-600">
              Active
            </span>
          </div>
        </div>

        {/* Retrieving / Retrieved Box */}
        {phase === "retrieving" ? (
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
              <div>
                <h3 className="text-base font-bold text-foreground">Retrieving Your Records</h3>
                <p className="text-sm text-muted-foreground">Pulling your health records for the application process</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4 flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Electronic Health Records</h4>
                <p className="text-sm text-muted-foreground">
                  Securely accessing your medical history, prescriptions, and health data from connected networks
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Data Retrieved Successfully</h3>
                <p className="text-sm text-muted-foreground">Your health records have been securely accessed and processed</p>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 flex items-start gap-3 mb-4">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Application Processing Complete</h4>
                <p className="text-sm text-muted-foreground">
                  Your health records are ready. Continue to complete your application with guided data entry.
                </p>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              className="w-full text-sm font-medium"
              onClick={() => navigate("/application")}
            >
              Continue to Application
            </Button>
          </div>
        )}

        {/* Processing / Secure info box */}
        <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {phase === "retrieving" ? "Processing Your Application" : "Secure & Compliant"}
            </h4>
            <p className="text-sm text-muted-foreground">
              {phase === "retrieving"
                ? "Your records are being retrieved and will be used to process your application. All data remains encrypted and protected under HIPAA regulations."
                : "All data remains encrypted and protected under HIPAA regulations throughout the entire process."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordRetrieval;
