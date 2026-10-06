const dotRings = [
  // Outer ring — 12 dots
  ...[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => ({
    cx: 50 + 38 * Math.cos((angle * Math.PI) / 180),
    cy: 50 + 38 * Math.sin((angle * Math.PI) / 180),
    r: 4.2,
    ring: 0,
    index: i,
  })),
  // Middle ring — 8 dots
  ...[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => ({
    cx: 50 + 26 * Math.cos((angle * Math.PI) / 180),
    cy: 50 + 26 * Math.sin((angle * Math.PI) / 180),
    r: 3.2,
    ring: 1,
    index: i,
  })),
  // Inner ring — 5 dots
  ...[0, 72, 144, 216, 288].map((angle, i) => ({
    cx: 50 + 15 * Math.cos((angle * Math.PI) / 180),
    cy: 50 + 15 * Math.sin((angle * Math.PI) / 180),
    r: 2.5,
    ring: 2,
    index: i,
  })),
];

const ClearLogoAnimated = () => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative w-28 h-28">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <style>{`
          @keyframes spinRing0 {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes spinRing1 {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes spinRing2 {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50%      { transform: scale(1.15); opacity: 1; }
          }
          .ring0 { animation: spinRing0 6s linear infinite; transform-origin: 50px 50px; }
          .ring1 { animation: spinRing1 4s linear infinite; transform-origin: 50px 50px; }
          .ring2 { animation: spinRing2 3s linear infinite; transform-origin: 50px 50px; }
          .dot   { animation: pulse 2s ease-in-out infinite; transform-origin: center; }
        `}</style>

        <g className="ring0">
          {dotRings.filter(d => d.ring === 0).map((d, i) => (
            <circle
              key={`r0-${i}`}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="#1a1a1a"
              className="dot"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </g>
        <g className="ring1">
          {dotRings.filter(d => d.ring === 1).map((d, i) => (
            <circle
              key={`r1-${i}`}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="#1a1a1a"
              className="dot"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </g>
        <g className="ring2">
          {dotRings.filter(d => d.ring === 2).map((d, i) => (
            <circle
              key={`r2-${i}`}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="#1a1a1a"
              className="dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
      </svg>
    </div>

    <span className="text-2xl font-bold tracking-[0.25em] text-[#1a1a1a]">
      CLEAR<sup className="text-xs align-super ml-0.5">®</sup>
    </span>
  </div>
);

export default ClearLogoAnimated;
