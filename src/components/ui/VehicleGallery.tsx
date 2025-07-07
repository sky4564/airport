'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VEHICLE_CATEGORIES, getVehiclesByCategory } from '@/lib/vehicles';

export default function VehicleGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const filteredVehicles = getVehiclesByCategory(selectedCategory);

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">보유 차량</h2>

        {/* 필터 버튼들 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {VEHICLE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 차량 갤러리 */}
        <div className="grid grid-cols-1 gap-4">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-4">
                {/* 차량 이미지 */}
                <div className="flex-shrink-0 w-24 h-16 relative">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 96px, 96px"
                  />
                </div>

                {/* 차량 정보 */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">{vehicle.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {vehicle.category}
                    </span>
                  </div>
                  <p className="text-blue-600 font-bold text-sm mb-2">{vehicle.price}</p>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 필터 결과가 없을 때 */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">해당 차종의 차량이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
} 