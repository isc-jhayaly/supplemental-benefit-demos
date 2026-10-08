import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import NttHeader from "@/components/NttHeader";
import ClaimSummaryCard from "@/components/ClaimSummaryCard";
import { claimDataByScenario } from "@/data/claimData";
import type { DemoScenarioKey } from "@/data/demoScenarios";

const NttHandoff = () => {
  const navigate = useNavigate();
  const { scenario } = useParams();
  const claim = claimDataByScenario[(scenario as DemoScenarioKey) ?? "complex-exception"];

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      <NttHeader />

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center py-12 bg-[#f0f2f5]">
        <div className="mx-auto max-w-2xl w-full px-6">
          <div className="text-center mb-8">
            <div className="w-16 h-1 bg-[#009688] mb-6 mx-auto rounded-full" />
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#009688]">
              Supplemental Benefits Claim
            </p>
            <h1 className="text-3xl font-bold leading-tight text-[#000080] sm:text-4xl">
              InterSystems Mutual has received your claim and requests your{" "}
              <span className="text-[#009688]">medical records</span>.
            </h1>
            <p className="mt-4 text-base text-[#555]">
              To process your supplemental benefits claim, we need to securely
              retrieve your health records. Your data is protected and handled
              in compliance with HIPAA regulations.
            </p>
          </div>

          <ClaimSummaryCard variant="light" claim={claim} />

          <div className="text-center mt-8">
            <button
              onClick={() => navigate(`/demo/${scenario}/consent`)}
              className="inline-flex items-center gap-2 rounded bg-[#009688] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/10 hover:bg-[#00796b] transition-colors"
            >
              Continue to record auto-retrieval
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NttHandoff;
