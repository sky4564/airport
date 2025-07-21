interface PageHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  textColor?: 'dark' | 'light' | 'custom';
  customTextClass?: string;
}

export default function PageHeader({
  title,
  description,
  centered = true,
  className = "",
  textColor = 'dark',
  customTextClass = ""
}: PageHeaderProps) {
  const alignmentClass = centered ? "text-center" : "";

  // 텍스트 색상 클래스 결정
  const getTitleColorClass = () => {
    switch (textColor) {
      case 'light':
        return 'text-white';
      case 'dark':
        return 'text-gray-900';
      case 'custom':
        return customTextClass;
      default:
        return 'text-gray-900';
    }
  };

  const getDescriptionColorClass = () => {
    switch (textColor) {
      case 'light':
        return 'text-white opacity-90';
      case 'dark':
        return 'text-gray-700';
      case 'custom':
        return customTextClass;
      default:
        return 'text-gray-700';
    }
  };

  return (
    <section className={`mb-8 ${alignmentClass} ${className}`}>
      <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${getTitleColorClass()}`}>
        {title}
      </h1>
      {description && (
        <p className={`text-lg mb-6 ${getDescriptionColorClass()}`}>
          {description}
        </p>
      )}
    </section>
  );
} 