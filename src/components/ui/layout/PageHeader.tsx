interface PageHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  centered = true,
  className = ""
}: PageHeaderProps) {
  const alignmentClass = centered ? "text-center" : "";

  return (
    <section className={`mb-8 ${alignmentClass} ${className}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-white mb-6">
          {description}
        </p>
      )}
    </section>
  );
} 