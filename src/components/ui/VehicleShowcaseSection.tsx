'use client';

import { useState } from 'react';
import { VEHICLE_CATEGORIES, getVehiclesByCategory } from '@/lib/vehicles';
import VehicleGrid from './VehicleGrid';
import SectionTitle from './SectionTitle';

export default function VehicleShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [showCount, setShowCount] = useState<number>(15);

  const filteredVehicles = getVehiclesByCategory(selectedCategory);
  const displayedVehicles = filteredVehicles.slice(0, showCount);
  const hasMore = filteredVehicles.length > showCount;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle title="보유 차량 안내" />

        {/* 필터 버튼들 */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {VEHICLE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowCount(15); // 카테고리 변경 시 초기화
              }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 차량 갤러리 - 그리드 형식 */}
        <VehicleGrid
          vehicles={displayedVehicles}
          compact={true}
          emptyMessage="해당 차종의 차량이 없습니다."
        />

        {/* 더보기 버튼 */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowCount(prev => prev + 15)}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              더보기 ({displayedVehicles.length} / {filteredVehicles.length})
            </button>
          </div>
        )}

      </div>
    </section>
  );
} 