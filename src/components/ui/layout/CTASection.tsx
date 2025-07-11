import Link from 'next/link';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  phoneText?: string;
  phoneNumber?: string;
  reservationText?: string;
  reservationLink?: string;
  className?: string;
  variant?: 'default' | 'gradient';
}

export default function CTASection({
  title = "지금 바로 예약하세요",
  subtitle = "최고의 서비스로 여러분의 여행을 더욱 특별하게 만들어 드립니다.",
  phoneText = "📞 전화 예약",
  phoneNumber = "010-1234-5678",
  reservationText = "💻 온라인 예약",
  reservationLink = "/reservation",
  className = "",
  variant = 'default'
}: CTASectionProps) {
  const bgClass = variant === 'gradient'
    ? "bg-gradient-to-r from-blue-600 to-blue-800"
    : "bg-blue-600";

  return (
    <section className={`${bgClass} text-white py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${phoneNumber}`}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            {phoneText}
          </a>
          <Link
            href={reservationLink}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-200 border-2 border-blue-400"
          >
            {reservationText}
          </Link>
        </div>
      </div>
    </section>
  );
} 