import ChubbLogo from "@/components/ChubbLogo";

const NttHeader = () => (
  <header className="w-full bg-[#000000] border-b border-[#333333]">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <ChubbLogo variant="white" className="h-4" />
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <span className="cursor-default hover:text-white transition-colors">Claims</span>
        <span className="cursor-default hover:text-white transition-colors">Benefits</span>
        <span className="cursor-default hover:text-white transition-colors">Coverage</span>
        <span className="cursor-default hover:text-white transition-colors">Support</span>
      </nav>
      <button className="rounded bg-[#6e27c5] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5b1fb0] transition-colors">
        Contact us
      </button>
    </div>
  </header>
);

export default NttHeader;
