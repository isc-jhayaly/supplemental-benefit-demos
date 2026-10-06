const NttHeader = () => (
  <header className="w-full bg-[#015294] border-b border-[#004470]">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <div className="flex items-center gap-2.5">
        <span className="text-xl font-bold text-white tracking-tight">
          Unum
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <span className="cursor-default hover:text-white transition-colors">Claims</span>
        <span className="cursor-default hover:text-white transition-colors">Benefits</span>
        <span className="cursor-default hover:text-white transition-colors">Coverage</span>
        <span className="cursor-default hover:text-white transition-colors">Support</span>
      </nav>
      <button className="rounded bg-[#00a6d7] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0090c7] transition-colors">
        Contact us
      </button>
    </div>
  </header>
);

export default NttHeader;
