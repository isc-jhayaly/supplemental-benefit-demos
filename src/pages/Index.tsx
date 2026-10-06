import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, FileText, Info } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import ConsentItem from "@/components/ConsentItem";
import { Button } from "@/components/ui/button";

const steps = [
  { number: 1, label: "Consent" },
  { number: 2, label: "Identity Verification" },
  { number: 3, label: "Record Retrieval" },
];

const Index = () => {
  const navigate = useNavigate();
  const [consents, setConsents] = useState([false, false, false]);
  const allChecked = consents.every(Boolean);

  const toggle = (i: number) =>
    setConsents((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-4 py-10">
      <StepIndicator steps={steps} currentStep={1} />

      <div className="mt-8 w-full max-w-2xl rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-foreground">Digital Consent</h2>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          Please review and provide consent to access your health information
        </p>

        <div className="flex flex-col gap-4">
          <ConsentItem
            icon={<Shield className="h-5 w-5" />}
            title="Data Sharing Consent"
            description="I consent for Unum to retrieve my electronic health records with authorized healthcare providers through secure national networks."
            checked={consents[0]}
            onToggle={() => toggle(0)}
          />
          <ConsentItem
            icon={<Lock className="h-5 w-5" />}
            title="Identity Verification"
            description="I agree to complete IAL2 identity verification through to ensure secure access and HIPAA compliance."
            checked={consents[1]}
            onToggle={() => toggle(1)}
          />
          <ConsentItem
            icon={<FileText className="h-5 w-5" />}
            title="Terms and Privacy Policy"
            checked={consents[2]}
            onToggle={() => toggle(2)}
            description={
              <>
                I have read and agree to the{" "}
                <a href="#" className="text-primary underline hover:text-primary/80" onClick={(e) => e.stopPropagation()}>Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-primary underline hover:text-primary/80" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>.
              </>
            }
          />
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h4 className="text-sm font-semibold text-foreground">Your data is protected</h4>
            <p className="mt-0.5 text-sm text-muted-foreground">
              All information is encrypted and transmitted securely in compliance with HIPAA regulations.
            </p>
          </div>
        </div>

        <Button
          variant="consent"
          size="lg"
          className="mt-6 w-full text-sm font-medium"
          disabled={!allChecked}
          onClick={() => navigate("../identity-verification")}
        >
          Continue to Identity Verification
        </Button>
      </div>
    </div>
  );
};

export default Index;
