import { Check } from "lucide-react";

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
}

const StepIndicator = ({ steps, currentStep, completedSteps = [] }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-8 md:gap-16">
      {steps.map((step) => {
        const isCompleted = completedSteps.includes(step.number);
        const isCurrent = step.number === currentStep;

        return (
          <div key={step.number} className="flex flex-col items-center gap-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                isCompleted
                  ? "border-emerald-500 bg-emerald-500 text-primary-foreground"
                  : isCurrent
                  ? "border-[#0758ac] bg-[#0758ac] text-white"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : step.number}
            </div>
            <span
              className={`text-center text-xs font-medium ${
                isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
