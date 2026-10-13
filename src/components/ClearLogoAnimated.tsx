const dotRings = [
  // Outer ring — 10 dots, full 360° at 36° intervals
  ...[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => ({
    cx: 50 + 38 * Math.cos((angle * Math.PI) / 180),
    cy: 50 + 38 * Math.sin((angle * Math.PI) / 180),
    r: 4.0,
    ring: 0,
    index: i,
  })),
  // Middle ring — 10 dots, starts aligned, spins to 18° offset for flower pattern
  ...[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => ({
    cx: 50 + 26 * Math.cos((angle * Math.PI) / 180),
    cy: 50 + 26 * Math.sin((angle * Math.PI) / 180),
    r: 3.0,
    ring: 1,
    index: i,
  })),
  // Inner ring — 10 dots, aligned with outer ring
  ...[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => ({
    cx: 50 + 15 * Math.cos((angle * Math.PI) / 180),
    cy: 50 + 15 * Math.sin((angle * Math.PI) / 180),
    r: 2.2,
    ring: 2,
    index: i,
  })),
];

const ClearLogoAnimated = () => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative w-28 h-28 clear-breathe">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <style>{`
          @keyframes spinRing0 {
            from { transform: rotate(0deg); }
            to   { transform: rotate(180deg); }
          }
          @keyframes spinRing1 {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-162deg); }
          }
          @keyframes spinRing2 {
            from { transform: rotate(0deg); }
            to   { transform: rotate(144deg); }
          }
          @keyframes breathe {
            0%   { transform: scale(1); }
            50%  { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          .ring0 {
            animation: spinRing0 5s ease-out forwards;
            transform-origin: 50px 50px;
          }
          .ring1 {
            animation: spinRing1 4.5s ease-out forwards;
            transform-origin: 50px 50px;
          }
          .ring2 {
            animation: spinRing2 4s ease-out forwards;
            transform-origin: 50px 50px;
          }
          .clear-breathe {
            animation: breathe 1.2s ease-in-out 1;
            animation-delay: 4s;
            animation-fill-mode: both;
          }
        `}</style>

        <g className="ring0">
          {dotRings.filter(d => d.ring === 0).map((d, i) => (
            <circle
              key={`r0-${i}`}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="#1a1a1a"
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
