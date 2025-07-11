interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
  className = "",
  size = 'md'
}: SectionTitleProps) {
  const alignmentClass = centered ? "text-center" : "";

  const titleSizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl"
  };

  return (
    <div className={`mb-8 ${alignmentClass} ${className}`}>
      <h2 className={`${titleSizeClasses[size]} font-bold text-gray-900 mb-2`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
} 