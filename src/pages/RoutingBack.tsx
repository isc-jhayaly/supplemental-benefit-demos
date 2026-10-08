import { CheckCircle } from "lucide-react";
import NttHeader from "@/components/NttHeader";
import ClaimSummaryCard from "@/components/ClaimSummaryCard";
import { usePatient } from "@/context/PatientContext";
import { claimDataByScenario } from "@/data/claimData";
import type { DemoScenarioKey } from "@/data/demoScenarios";

const RoutingBack = () => {
  const { demoScenario } = usePatient();
  const claim = claimDataByScenario[(demoScenario as DemoScenarioKey) ?? "complex-exception"];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <NttHeader />
      <div className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mb-5">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#000080] mb-2 text-center">
          Your medical records have been sent to InterSystems Mutual.
        </h1>
        <p className="text-[#393939] text-sm mb-8 text-center max-w-lg">
          Review your submitted claim below.
        </p>

        <div className="w-full max-w-2xl">
          <ClaimSummaryCard variant="light" status="Records Submitted" claim={claim} />
        </div>
      </div>
    </div>
  );
};

export default RoutingBack;
