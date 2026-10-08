import { FileText, Calendar, User, Users, Hash } from "lucide-react";
import type { ClaimInfo } from "@/data/claimData";

interface ClaimSummaryCardProps {
  variant?: "dark" | "light";
  status?: string;
  claim: ClaimInfo;
}

const ClaimSummaryCard = ({ variant = "dark", status = "Under Review", claim }: ClaimSummaryCardProps) => {
  const isDark = variant === "dark";
  const label = isDark ? "text-gray-400" : "text-[#8795A1]";
  const value = isDark ? "text-white" : "text-[#0758ac]";
  const icon = isDark ? "text-gray-400" : "text-[#8795A1]";

  return (
    <div className={`rounded-xl border p-6 ${isDark ? "border-[#045a94] bg-[#044a80]" : "border-[#d1d5db] bg-white"}`}>
      <div className="flex items-center gap-2 mb-4">
        <FileText className={`h-5 w-5 ${isDark ? "text-[#d3222a]" : "text-[#0758ac]"}`} />
        <h2 className={`text-base font-bold ${value}`}>Application Summary</h2>
        <span className={`ml-auto rounded-full px-3 py-0.5 text-xs font-semibold ${isDark ? "bg-[#d3222a]/15 text-[#d3222a]" : "bg-[#d3222a]/15 text-[#b20d15]"}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <User className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Applicant</p>
            <p className={`text-sm font-medium ${value}`}>{claim.claimant}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Age</p>
            <p className={`text-sm font-medium ${value}`}>{claim.age}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Gender</p>
            <p className={`text-sm font-medium ${value}`}>{claim.gender}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
          <div>
            <p className={`text-xs ${label}`}>Application Date</p>
            <p className={`text-sm font-medium ${value}`}>{claim.applicationDate}</p>
          </div>
        </div>
      </div>

      <hr className={`my-4 ${isDark ? "border-[#045a94]" : "border-[#e5e7eb]"}`} />

      <div className="flex items-start gap-3">
        <Hash className={`h-4 w-4 mt-0.5 shrink-0 ${icon}`} />
        <div>
          <p className={`text-xs ${label}`}>Application ID</p>
          <p className={`text-sm font-medium ${value}`}>{claim.applicationId}</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimSummaryCard;
