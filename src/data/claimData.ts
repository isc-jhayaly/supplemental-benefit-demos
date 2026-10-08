import type { DemoScenarioKey } from "./demoScenarios";

export interface ClaimInfo {
  claimant: string;
  age: string;
  gender: string;
  applicationDate: string;
  applicationId: string;
}

export const claimDataByScenario: Record<DemoScenarioKey, ClaimInfo> = {
  happy: {
    claimant: "Stephie Olin",
    age: "34",
    gender: "Female",
    applicationDate: "September 3, 2026",
    applicationId: "AML-2026-0531884",
  },
  "basic-exception": {
    claimant: "Ventura Risser",
    age: "52",
    gender: "Male",
    applicationDate: "August 15, 2026",
    applicationId: "AML-2026-0729156",
  },
  "complex-exception": {
    claimant: "David Kamp",
    age: "45",
    gender: "Male",
    applicationDate: "October 2, 2026",
    applicationId: "AML-2026-0847291",
  },
};
