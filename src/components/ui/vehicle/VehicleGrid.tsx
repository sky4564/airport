import { Vehicle } from '@/lib/vehicles';
import { VehicleCard } from './';

interface VehicleGridProps {
  vehicles: Vehicle[];
  showReservationButton?: boolean;
  compact?: boolean; // 컴팩트 모드 (VehicleShowcaseSection용)
  emptyMessage?: string;
}

export default function VehicleGrid({
  vehicles,
  showReservationButton = false,
  compact = false,
  emptyMessage = "차량이 없습니다."
}: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-6">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">검색 결과가 없습니다</h3>
        <p className="text-lg text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  const gridClasses = compact
    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  return (
    <div className={gridClasses}>
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          showReservationButton={showReservationButton}
          compact={compact}
        />
      ))}
    </div>
  );
} 