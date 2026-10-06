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
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <NttHeader />

      {/* Hero */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#015294] via-[#004470] to-[#3273af]" />
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-[#fac832]/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-[#fac832]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl w-full px-6">
          <div className="text-center mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#fac832]">
              Supplemental Benefits Claim
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Unum has received your claim and requests your{" "}
              <span className="text-[#fac832]">medical records</span>.
            </h1>
            <p className="mt-4 text-base text-gray-300">
              To process your supplemental benefits claim, we need to securely
              retrieve your health records. Your data is protected and handled
              in compliance with HIPAA regulations.
            </p>
          </div>

          <ClaimSummaryCard variant="dark" claim={claim} />

          <div className="text-center mt-8">
            <button
              onClick={() => navigate(`/demo/${scenario}/consent`)}
              className="inline-flex items-center gap-2 rounded bg-[#fac832] px-8 py-3.5 text-base font-semibold text-[#015294] shadow-lg shadow-amber-500/10 hover:bg-[#e0b42d] transition-colors"
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
