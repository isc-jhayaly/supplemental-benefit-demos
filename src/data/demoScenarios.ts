import { AlertTriangle, CheckCircle, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DemoScenarioKey = "happy" | "basic-exception" | "complex-exception";

export interface DemoScenario {
  key: DemoScenarioKey;
  title: string;
  description: string;
  patientIndex: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export const demoScenarios: DemoScenario[] = [
  {
    key: "happy",
    title: "Happy Path",
    description: "Claim is auto-approved",
    patientIndex: 0,
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-100",
  },
  {
    key: "basic-exception",
    title: "Basic Exception",
    description: "Claim is auto-denied",
    patientIndex: 1,
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-100",
  },
  {
    key: "complex-exception",
    title: "Complex Exception",
    description: "Claim requires manual chart review",
    patientIndex: 2,
    icon: Search,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100",
  },
];

const scenarioMap = demoScenarios.reduce((acc, scenario) => {
  acc[scenario.key] = scenario;
  return acc;
}, {} as Record<DemoScenarioKey, DemoScenario>);

export function getDemoScenarioByKey(key: string | null | undefined): DemoScenario | undefined {
  if (!key) return undefined;
  return scenarioMap[key as DemoScenarioKey];
}

export function getDemoScenarioKeys(): DemoScenarioKey[] {
  return demoScenarios.map((scenario) => scenario.key);
}
