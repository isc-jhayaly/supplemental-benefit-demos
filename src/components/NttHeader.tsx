import { Shield } from "lucide-react";

const NttHeader = () => (
  <header className="w-full bg-[#000080] border-b border-[#000066]">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009688]">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">
          InterSystems Mutual
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <span className="cursor-default hover:text-white transition-colors">Claims</span>
        <span className="cursor-default hover:text-white transition-colors">Benefits</span>
        <span className="cursor-default hover:text-white transition-colors">Coverage</span>
        <span className="cursor-default hover:text-white transition-colors">Support</span>
      </nav>
      <button className="rounded bg-[#009688] px-5 py-2 text-sm font-semibold text-white hover:bg-[#00796b] transition-colors">
        Contact us
      </button>
    </div>
  </header>
);

export default NttHeader;
