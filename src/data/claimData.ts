import type { DemoScenarioKey } from "./demoScenarios";

export interface ClaimInfo {
  claimant: string;
  dateOfIncident: string;
  diagnosis: string;
  benefitType: string;
  policyNumber: string;
  claimFiled: string;
  estimatedBenefit: string;
}

export const claimDataByScenario: Record<DemoScenarioKey, ClaimInfo> = {
  happy: {
    claimant: "Stephie Olin",
    dateOfIncident: "August 22, 2026",
    diagnosis: "COVID-19 Hospitalization",
    benefitType: "Hospital Indemnity — Per Diem",
    policyNumber: "ISM-2026-0531884",
    claimFiled: "September 3, 2026",
    estimatedBenefit: "$3,200.00",
  },
  "basic-exception": {
    claimant: "Ventura Risser",
    dateOfIncident: "July 10, 2026",
    diagnosis: "Malignant Melanoma (Skin Cancer)",
    benefitType: "Critical Illness — Lump Sum",
    policyNumber: "ISM-2026-0729156",
    claimFiled: "August 15, 2026",
    estimatedBenefit: "$15,000.00",
  },
  "complex-exception": {
    claimant: "David Kamp",
    dateOfIncident: "September 14, 2026",
    diagnosis: "Acute Myocardial Infarction (Heart Attack)",
    benefitType: "Critical Illness — Lump Sum",
    policyNumber: "ISM-2026-0847291",
    claimFiled: "October 2, 2026",
    estimatedBenefit: "$25,000.00",
  },
};
