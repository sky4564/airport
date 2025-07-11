import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/lib/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  showReservationButton?: boolean;
  compact?: boolean; // 컴팩트 모드 (VehicleShowcaseSection용)
}

export default function VehicleCard({
  vehicle,
  showReservationButton = false,
  compact = false
}: VehicleCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100">
      {/* 차량 이미지 */}
      <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 relative overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-contain hover:scale-110 transition-transform duration-300"
          style={{
            objectPosition: 'center',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
            padding: '8px'
          }}
          sizes={compact
            ? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
        />
      </div>

      {/* 차량 정보 */}
      <div className={compact ? "p-4" : "p-6"}>
        <div className={compact ? "mb-2" : "mb-3"}>
          <h3 className={`font-bold text-gray-900 ${compact ? "text-sm lg:text-base truncate" : "text-lg"} mb-1`}>
            {vehicle.name}
          </h3>
          <span className={`inline-block ${compact ? "text-xs" : "text-sm font-medium"} bg-blue-100 text-blue-${compact ? "600" : "800"} px-${compact ? "2" : "3"} py-1 rounded-full ${compact ? "mt-1" : ""}`}>
            {vehicle.category}
          </span>
        </div>

        <p className={`text-blue-600 font-bold ${compact ? "text-sm lg:text-base mb-3" : "text-xl mb-4"}`}>
          {vehicle.price}
        </p>

        {/* 주요 특징 */}
        <div className={`flex flex-wrap gap-1 ${showReservationButton ? "mb-4" : ""}`}>
          {vehicle.features.slice(0, compact ? 2 : 3).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {vehicle.features.length > (compact ? 2 : 3) && (
            <span className="text-xs text-gray-400 px-2 py-1">
              +{vehicle.features.length - (compact ? 2 : 3)}
            </span>
          )}
        </div>

        {/* 예약 버튼 (검색 결과에서만 표시) */}
        {showReservationButton && (
          <Link
            href={`/reservation?vehicle=${vehicle.id}`}
            className="w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold block"
            style={{ color: 'white' }}
          >
            이 차량 예약하기
          </Link>
        )}
      </div>
    </div>
  );
} 