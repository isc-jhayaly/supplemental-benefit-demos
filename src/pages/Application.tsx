import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Shield, Sparkles } from "lucide-react";
import StepIndicator from "@/components/StepIndicator";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const steps = [
  { number: 1, label: "Consent" },
  { number: 2, label: "Identity Verification" },
  { number: 3, label: "Record Retrieval" },
  { number: 4, label: "Application" },
];

interface QAItem {
  question: string;
  answer: string;
  source: string;
  status: "verified" | "required";
}

const qaData: QAItem[] = [
  { question: "What is your height?", answer: "5'10\" (178 cm)", source: "Primary Care Visit - 2024", status: "verified" },
  { question: "What is your current weight?", answer: "175 lbs (79 kg)", source: "Primary Care Visit - 2024", status: "verified" },
  { question: "Do you currently smoke?", answer: "No", source: "Health Assessment - 2024", status: "verified" },
  { question: "What is your blood pressure?", answer: "118/76 mmHg", source: "Cardiology Visit - 2024", status: "verified" },
  { question: "Do you have any chronic conditions?", answer: "None reported", source: "Medical History", status: "verified" },
  { question: "Are you currently taking any medications?", answer: "Multivitamin (daily)", source: "Prescription Records", status: "verified" },
  { question: "What is your cholesterol level?", answer: "Total: 185 mg/dL (Normal)", source: "Lab Results - 2024", status: "verified" },
  { question: "Have you been hospitalized in the past 5 years?", answer: "No", source: "Hospital Records", status: "verified" },
  { question: "Do you have a family history of heart disease?", answer: "Information not available", source: "Manual entry required", status: "required" },
  { question: "What is your occupation?", answer: "Software Engineer", source: "Employment Records - 2024", status: "verified" },
  { question: "Have you ever been diagnosed with diabetes?", answer: "No", source: "Medical History", status: "verified" },
  { question: "What is your alcohol consumption frequency?", answer: "Information not available", source: "Manual entry required", status: "required" },
  { question: "Do you participate in any hazardous activities or sports?", answer: "Information not available", source: "Manual entry required", status: "required" },
  { question: "Have you had any surgeries in the past 10 years?", answer: "No", source: "Surgical Records", status: "verified" },
  { question: "What is your resting heart rate?", answer: "68 bpm", source: "Cardiology Visit - 2024", status: "verified" },
];

type Phase = "filling" | "complete";

const Application = () => {
  const [phase, setPhase] = useState<Phase>("filling");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const totalQuestions = qaData.length;
  const verifiedCount = qaData.filter((q) => q.status === "verified").length;
  const requiredCount = qaData.filter((q) => q.status === "required").length;

  useEffect(() => {
    if (phase === "filling" && highlightedIndex < totalQuestions - 1) {
      const t = setTimeout(() => {
        setHighlightedIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(t);
    } else if (phase === "filling" && highlightedIndex >= totalQuestions - 1) {
      const t = setTimeout(() => setPhase("complete"), 600);
      return () => clearTimeout(t);
    }
  }, [phase, highlightedIndex, totalQuestions]);

  const progressValue = phase === "complete"
    ? (verifiedCount / totalQuestions) * 100
    : ((highlightedIndex + 1) / totalQuestions) * 100;

  const completedCount = phase === "complete" ? verifiedCount : Math.min(highlightedIndex + 1, totalQuestions);

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-10">
      <AppHeader />
      <StepIndicator steps={steps} currentStep={4} completedSteps={[1, 2, 3]} />

      <div className="mt-8 w-full max-w-4xl space-y-6">
        {/* Header box */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                {phase === "filling" ? "Guided Data Entry" : "Application Review"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {phase === "filling"
                  ? "Automatically filling your application with verified health records"
                  : "Please review the auto-filled information and provide missing details"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>{phase === "complete" ? "Completed" : "Progress"}</span>
            <span>{completedCount} of {totalQuestions} questions</span>
          </div>
          <Progress value={progressValue} className="h-2" />

          {phase === "complete" && requiredCount > 0 && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
              <span className="text-sm font-medium text-red-600">
                {requiredCount} questions require additional information
              </span>
            </div>
          )}
        </div>

        {/* Q&A grid */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-2 gap-0">
            <h3 className="text-base font-bold text-foreground mb-4 px-2">Application Questions</h3>
            <h3 className="text-base font-bold text-foreground mb-4 px-2">
              Answers from Medical Records
            </h3>

            {qaData.map((item, index) => {
              const isRevealed = index <= highlightedIndex;
              const isCurrent = index === highlightedIndex && phase === "filling";
              const isComplete = phase === "complete";
              const isRequired = item.status === "required";

              // Question styling
              let qBg = "bg-muted/30 border-border";
              let qIcon = (
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs text-muted-foreground">
                  {index + 1}
                </span>
              );

              if (isRevealed || isComplete) {
                if (isRequired && isComplete) {
                  qBg = "bg-red-50 border-red-200";
                  qIcon = (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </span>
                  );
                } else {
                  qBg = "bg-emerald-50 border-emerald-200";
                  qIcon = (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </span>
                  );
                }
              }

              // Answer styling
              let aBg = "border-border";
              let badge = null;

              if (isRevealed || isComplete) {
                if (isRequired && isComplete) {
                  aBg = "border-red-200 bg-red-50";
                  badge = (
                    <span className="flex items-center gap-1 rounded-full border border-red-300 px-2 py-0.5 text-xs font-medium text-red-600 shrink-0">
                      <AlertCircle className="h-3 w-3" /> Required
                    </span>
                  );
                } else if (isRevealed) {
                  aBg = "border-emerald-200 bg-emerald-50/30";
                  badge = (
                    <span className="flex items-center gap-1 rounded-full border border-emerald-300 px-2 py-0.5 text-xs font-medium text-emerald-600 shrink-0">
                      <Shield className="h-3 w-3" /> Verified
                    </span>
                  );
                }
              }

              return (
                <div key={index} className="contents">
                  {/* Question */}
                  <div className="px-2 py-1.5">
                    <div
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300 ${qBg} ${
                        isCurrent ? "ring-2 ring-primary/30" : ""
                      }`}
                    >
                      {qIcon}
                      <span className={`text-sm ${isRevealed || isComplete ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.question}
                      </span>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="px-2 py-1.5">
                    <div
                      className={`rounded-lg border px-4 py-3 transition-all duration-300 ${
                        isRevealed || isComplete ? aBg : "border-border opacity-0"
                      }`}
                    >
                      {(isRevealed || isComplete) && (
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={`text-sm font-semibold ${isRequired && isComplete ? "text-red-600" : "text-foreground"}`}>
                              {item.answer}
                            </p>
                            <p className={`text-xs ${isRequired && isComplete ? "text-red-500" : "text-muted-foreground"}`}>
                              Source: {item.source}
                            </p>
                          </div>
                          {badge}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom buttons */}
        {phase === "complete" && (
          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="flex-1 text-sm font-medium">
              Edit Responses
            </Button>
            <Button variant="consent" size="lg" className="flex-1 text-sm font-medium">
              Continue to Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
