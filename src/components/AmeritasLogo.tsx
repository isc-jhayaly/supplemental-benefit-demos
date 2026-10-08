interface AmeritasLogoProps {
  variant?: "color" | "white" | "header";
  className?: string;
}

const AmeritasLogo = ({ variant = "color", className = "" }: AmeritasLogoProps) => {
  if (variant === "header") {
    // White text + red bison for dark backgrounds
    // Use the white logo for text, overlay the color logo's bison with mix-blend
    return (
      <div className={`relative ${className}`}>
        {/* White version as base */}
        <img
          src="/ameritas-logo-white.png"
          alt="Ameritas"
          className="h-full"
        />
        {/* Color version overlaid — only the red bison shows through */}
        <img
          src="/ameritas-logo-color.png"
          alt=""
          className="absolute inset-0 h-full mix-blend-lighten"
          aria-hidden="true"
        />
      </div>
    );
  }

  const src = variant === "white" ? "/ameritas-logo-white.png" : "/ameritas-logo-color.png";

  return (
    <img
      src={src}
      alt="Ameritas"
      className={className}
    />
  );
};

export default AmeritasLogo;
