import { ReactNode } from "react";

interface ConsentItemProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  checked: boolean;
  onToggle: () => void;
}

const ConsentItem = ({ icon, title, description, checked, onToggle }: ConsentItemProps) => {
  return (
    <div
      className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 cursor-pointer transition-colors hover:border-primary/30"
      onClick={onToggle}
    >
      <div className="mt-0.5 text-primary">{icon}</div>
      <div
        className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${
          checked ? "border-primary bg-primary" : "border-border"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="text-primary-foreground">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ConsentItem;
