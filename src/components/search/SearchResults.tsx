import Link from 'next/link';
import { Vehicle } from '@/lib/vehicles';
import VehicleGrid from '../ui/VehicleGrid';

interface SearchResultsProps {
  filteredVehicles: Vehicle[];
  displayedVehicles: Vehicle[];
  hasMore: boolean;
  onShowMore: () => void;
  onResetFilters: () => void;
}

export default function SearchResults({
  filteredVehicles,
  displayedVehicles,
  hasMore,
  onShowMore,
  onResetFilters
}: SearchResultsProps) {
  return (
    <section id="search-results" className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          검색 결과
        </h2>
        <p className="text-gray-600">
          선택하신 조건에 맞는 차량들입니다
        </p>
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16">
          <VehicleGrid
            vehicles={[]}
            emptyMessage="선택하신 조건에 맞는 차량이 없습니다. 다른 조건으로 검색해보세요."
          />
          <div className="space-y-4 mt-8">
            <button
              onClick={onResetFilters}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              🔄 필터 초기화
            </button>
            <div className="text-sm text-gray-400">
              또는 위의 단계별 필터를 다시 설정해보세요
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 검색 결과 개수 표시 */}
          <div className="text-center mb-8">
            <span className="inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-lg font-semibold">
              총 {filteredVehicles.length}대의 차량이 검색되었습니다
            </span>
          </div>

          {/* 차량 갤러리 */}
          <div className="mb-8">
            <VehicleGrid
              vehicles={displayedVehicles}
              showReservationButton={true}
            />
          </div>

          {/* 더보기 버튼 */}
          {hasMore && (
            <div className="text-center mb-8">
              <button
                onClick={onShowMore}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                더보기 ({displayedVehicles.length} / {filteredVehicles.length})
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              원하는 차량을 찾으셨나요?
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              지금 바로 예약하거나 전화 상담을 받아보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:010-1234-5678"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                📞 전화 예약
              </a>
              <Link
                href="/reservation"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-blue-400"
              >
                💻 온라인 예약
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
} 