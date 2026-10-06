export interface PatientBenefit {
  title: string;
  type: "critical-illness" | "hospital-indemnity";
}

export interface Patient {
  firstName: string;
  lastName: string;
  phone: string;
  apiFirstName: string;
  apiLastName: string;
  benefits: PatientBenefit[];
  description: string;
}

export const patients: Patient[] = [
  {
    firstName: "STEPHIE",
    lastName: "OLIN",
    phone: "2035551111",
    apiFirstName: "Stephie",
    apiLastName: "Olin",
    benefits: [
      { title: "Overnight Hospital Stay (Hospital Indemnity Benefit)", type: "hospital-indemnity" },
    ],
    description: "Auto-approved hospital indemnity claim",
  },
  {
    firstName: "VENTURA",
    lastName: "RISSER",
    phone: "8605552222",
    apiFirstName: "Ventura",
    apiLastName: "Risser",
    benefits: [
      { title: "Heart Attack (Critical Illness Benefit)", type: "critical-illness" },
    ],
    description: "Auto-denied critical illness claim requiring exception handling",
  },
  {
    firstName: "DAVID",
    lastName: "KAMP",
    phone: "7492017317",
    apiFirstName: "David",
    apiLastName: "Kamp",
    benefits: [
      { title: "Heart Attack (Critical Illness Benefit)", type: "critical-illness" },
      { title: "Overnight Hospital Stay (Hospital Indemnity Benefit)", type: "hospital-indemnity" },
    ],
    description: "Heart attack with an overnight hospital stay requiring critical illness claim",
  },
  {
    firstName: "JOHN",
    lastName: "CARSON",
    phone: "8609871234",
    apiFirstName: "John",
    apiLastName: "Carson",
    benefits: [
      { title: "Stroke (Critical Illness Benefit)", type: "critical-illness" },
      { title: "Overnight Hospital Stay (Hospital Indemnity Benefit)", type: "hospital-indemnity" },
      { title: "Emergency Room Visit (Accident Benefit)", type: "hospital-indemnity" },
    ],
    description: "Stroke with hospital stay and ER visit",
  },
  {
    firstName: "RAYMOND",
    lastName: "CHAN",
    phone: "8601234567",
    apiFirstName: "Ray",
    apiLastName: "Chan",
    benefits: [
      { title: "Cancer Diagnosis (Critical Illness Benefit)", type: "critical-illness" },
      { title: "Overnight Hospital Stay (Hospital Indemnity Benefit)", type: "hospital-indemnity" },
    ],
    description: "Cancer diagnosis with an overnight hospital stay",
  },
];

export function findPatientByPhone(phone: string): Patient | undefined {
  const digits = phone.replace(/\D/g, "");
  return patients.find((p) => p.phone === digits);
}
