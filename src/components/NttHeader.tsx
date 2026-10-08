import AmeritasLogo from "@/components/AmeritasLogo";

const NttHeader = () => (
  <header className="w-full bg-[#0758ac] border-b border-[#045a94]">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <AmeritasLogo variant="header" className="h-8" />
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <span className="cursor-default hover:text-white transition-colors">Life Insurance</span>
        <span className="cursor-default hover:text-white transition-colors">Benefits</span>
        <span className="cursor-default hover:text-white transition-colors">Claims</span>
        <span className="cursor-default hover:text-white transition-colors">Support</span>
      </nav>
      <button className="rounded bg-[#d3222a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#b20d15] transition-colors">
        Contact us
      </button>
    </div>
  </header>
);

export default NttHeader;
