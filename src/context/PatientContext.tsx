import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Patient } from "@/data/patients";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClinicalData = Record<string, any>;

interface PatientContextValue {
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  clinicalData: ClinicalData | null;
  setClinicalData: (data: ClinicalData | null) => void;
  returnUrl: string | null;
  setReturnUrl: (url: string | null) => void;
  demoScenario: string | null;
  setDemoScenario: (scenario: string | null) => void;
}

const PatientContext = createContext<PatientContextValue | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [clinicalData, setClinicalData] = useState<ClinicalData | null>(null);
  const [returnUrl, setReturnUrl] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem("returnUrl");
  });
  const [demoScenario, setDemoScenario] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem("demoScenario");
  });

  useEffect(() => {
    if (returnUrl) {
      window.sessionStorage.setItem("returnUrl", returnUrl);
    } else {
      window.sessionStorage.removeItem("returnUrl");
    }
  }, [returnUrl]);

  useEffect(() => {
    if (demoScenario) {
      window.sessionStorage.setItem("demoScenario", demoScenario);
    } else {
      window.sessionStorage.removeItem("demoScenario");
    }
  }, [demoScenario]);

  return (
    <PatientContext.Provider
      value={{
        currentPatient,
        setCurrentPatient,
        clinicalData,
        setClinicalData,
        returnUrl,
        setReturnUrl,
        demoScenario,
        setDemoScenario,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error("usePatient must be used within PatientProvider");
  return ctx;
}
