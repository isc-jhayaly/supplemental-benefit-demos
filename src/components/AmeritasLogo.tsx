interface AmeritasLogoProps {
  variant?: "color" | "white";
  className?: string;
}

const AmeritasLogo = ({ variant = "color", className = "" }: AmeritasLogoProps) => {
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
