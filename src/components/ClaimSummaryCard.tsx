import { FileText, Calendar, User, Heart, DollarSign } from "lucide-react";
import type { ClaimInfo } from "@/data/claimData";

interface ClaimSummaryCardProps {
  variant?: "dark" | "light";
  status?: string;
  claim: ClaimInfo;
}

const ClaimSummaryCard = ({ variant = "dark", status = "Pending Review", claim }: ClaimSummaryCardProps) => {
  const isDark = variant === "dark";
  const label = isDark ? "text-gray-400" : "text-[#8795A1]";
  const value = isDark ? "text-white" : "text-[#070F26]";
  const icon = isDark ? "text-gray-400" : "text-[#8795A1]";

  return (
    <div className={`rounded-xl border p-6 ${isDark ? "border-[#1a2340] bg-[#0c1430]" : "border-[#d1d5db] bg-white"}`}>
      <div className="flex items-center gap-2 mb-4">
        <FileText className={`h-5 w-5 ${isDark ? "text-[#E6B600]" : "text-[#070F26]"}`} />
        <h2 className={`text-base font-bold ${value}`}>Claim Summary</h2>
        <span className={`ml-auto rounded-full px-3 py-0.5 text-xs font-semibold ${isDark ? "bg-[#E6B600]/15 text-[#E6B600]" : "bg-[#E6B600]/15 text-[#9a7b00]"}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <User className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Claimant</p>
            <p className={`text-sm font-medium ${value}`}>{claim.claimant}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Date of Incident</p>
            <p className={`text-sm font-medium ${value}`}>{claim.dateOfIncident}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Heart className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Primary Diagnosis</p>
            <p className={`text-sm font-medium ${value}`}>{claim.diagnosis}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <DollarSign className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Benefit Type</p>
            <p className={`text-sm font-medium ${value}`}>{claim.benefitType}</p>
          </div>
        </div>
      </div>

      <hr className={`my-4 ${isDark ? "border-[#1a2340]" : "border-[#e5e7eb]"}`} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <p className={`text-xs ${label}`}>Policy Number</p>
          <p className={`font-medium ${value}`}>{claim.policyNumber}</p>
        </div>
        <div>
          <p className={`text-xs ${label}`}>Claim Filed</p>
          <p className={`font-medium ${value}`}>{claim.claimFiled}</p>
        </div>
        <div>
          <p className={`text-xs ${label}`}>Estimated Benefit</p>
          <p className="font-medium text-[#E6B600]">{claim.estimatedBenefit}</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimSummaryCard;
