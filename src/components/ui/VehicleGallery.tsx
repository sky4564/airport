'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VEHICLE_CATEGORIES, getVehiclesByCategory } from '@/lib/vehicles';

export default function VehicleGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [showCount, setShowCount] = useState<number>(15);

  const filteredVehicles = getVehiclesByCategory(selectedCategory);
  const displayedVehicles = filteredVehicles.slice(0, showCount);
  const hasMore = filteredVehicles.length > showCount;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">보유 차량</h2>

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {displayedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100"
            >
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
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* 차량 정보 */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base truncate">
                    {vehicle.name}
                  </h3>
                  <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mt-1">
                    {vehicle.category}
                  </span>
                </div>

                <p className="text-blue-600 font-bold text-sm lg:text-base mb-3">
                  {vehicle.price}
                </p>

                {/* 주요 특징 (최대 2개만 표시) */}
                <div className="flex flex-wrap gap-1">
                  {vehicle.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {vehicle.features.length > 2 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{vehicle.features.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

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

        {/* 필터 결과가 없을 때 */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">해당 차종의 차량이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
} 