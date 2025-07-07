'use client';

import { useState, useMemo } from 'react';
import { VEHICLES, Vehicle, VEHICLE_CATEGORIES } from '@/lib/vehicles';
import Image from 'next/image';
import Link from 'next/link';

// 승차인원 옵션
const SEATING_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: '5', label: '5인 이하' },
  { value: '7', label: '7인 이상' },
  { value: '11', label: '11인 이상' },
];

// 가격대 옵션
const PRICE_RANGES = [
  { value: 'all', label: '전체' },
  { value: 'budget', label: '10만원 이하' },
  { value: 'mid', label: '10만원 - 20만원' },
  { value: 'premium', label: '20만원 이상' },
];

// 특별 기능 옵션
const SPECIAL_FEATURES = [
  { value: 'hybrid', label: '하이브리드' },
  { value: 'luxury', label: '럭셔리' },
  { value: 'new', label: '최신형' },
  { value: 'spacious', label: '넓은 공간' },
];

export default function CarSearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedSeating, setSelectedSeating] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showCount, setShowCount] = useState<number>(12);

  // 차량 필터링 로직
  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter(vehicle => {
      // 카테고리 필터
      if (selectedCategory !== '전체' && vehicle.category !== selectedCategory) {
        return false;
      }

      // 승차인원 필터
      if (selectedSeating !== 'all') {
        const seatingCapacity = vehicle.features.find(f => f.includes('인승'));
        if (seatingCapacity) {
          const capacity = parseInt(seatingCapacity.replace('인승', ''));
          switch (selectedSeating) {
            case '5':
              if (capacity > 5) return false;
              break;
            case '7':
              if (capacity < 7) return false;
              break;
            case '11':
              if (capacity < 11) return false;
              break;
          }
        } else if (selectedSeating !== '5') {
          return false; // 승차인원 정보가 없는 차량은 5인 이하로 간주
        }
      }

      // 가격대 필터
      if (selectedPriceRange !== 'all') {
        const priceValue = parseInt(vehicle.price.replace(/[^0-9]/g, ''));
        switch (selectedPriceRange) {
          case 'budget':
            if (priceValue > 100000) return false;
            break;
          case 'mid':
            if (priceValue <= 100000 || priceValue > 200000) return false;
            break;
          case 'premium':
            if (priceValue <= 200000) return false;
            break;
        }
      }

      // 특별 기능 필터
      if (selectedFeatures.length > 0) {
        const hasSelectedFeatures = selectedFeatures.some(feature => {
          switch (feature) {
            case 'hybrid':
              return vehicle.features.some(f => f.includes('하이브리드'));
            case 'luxury':
              return vehicle.features.some(f => f.includes('럭셔리') || f.includes('프리미엄') || f.includes('최고급'));
            case 'new':
              return vehicle.features.some(f => f.includes('최신형') || f.includes('2026'));
            case 'spacious':
              return vehicle.features.some(f => f.includes('넓은') || f.includes('공간'));
            default:
              return false;
          }
        });
        if (!hasSelectedFeatures) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedSeating, selectedPriceRange, selectedFeatures]);

  const displayedVehicles = filteredVehicles.slice(0, showCount);
  const hasMore = filteredVehicles.length > showCount;

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('전체');
    setSelectedSeating('all');
    setSelectedPriceRange('all');
    setSelectedFeatures([]);
    setShowCount(12);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          원하는 차량을 찾아보세요
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          다양한 조건으로 필터링하여 최적의 차량을 찾으실 수 있습니다
        </p>
      </section>

      {/* 필터 섹션 */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 차종 필터 */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">차종</h3>
            <div className="flex flex-wrap gap-2">
              {VEHICLE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 승차인원 필터 */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">승차인원</h3>
            <div className="flex flex-wrap gap-2">
              {SEATING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedSeating(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSeating === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 가격대 필터 */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">가격대</h3>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedPriceRange(range.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPriceRange === range.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-50'
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 특별 기능 필터 */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">특별 기능</h3>
          <div className="flex flex-wrap gap-2">
            {SPECIAL_FEATURES.map((feature) => (
              <button
                key={feature.value}
                onClick={() => handleFeatureToggle(feature.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedFeatures.includes(feature.value)
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-50'
                  }`}
              >
                {feature.label}
              </button>
            ))}
          </div>
        </div>

        {/* 필터 초기화 및 결과 */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-600">
            총 <span className="font-bold text-blue-600">{filteredVehicles.length}대</span>의 차량이 검색되었습니다
          </div>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            필터 초기화
          </button>
        </div>
      </section>

      {/* 검색 결과 */}
      <section>
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500 mb-4">다른 조건으로 검색해보세요</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <>
            {/* 차량 갤러리 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  {/* 차량 정보 */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {vehicle.name}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {vehicle.category}
                      </span>
                    </div>

                    <p className="text-blue-600 font-bold text-xl mb-4">
                      {vehicle.price}
                    </p>

                    {/* 주요 특징 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {vehicle.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {vehicle.features.length > 3 && (
                        <span className="text-xs text-gray-400 px-2 py-1">
                          +{vehicle.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* 예약 버튼 */}
                    <Link
                      href={`/reservation?vehicle=${vehicle.id}`}
                      className="w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold block"
                    >
                      이 차량 예약하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={() => setShowCount(prev => prev + 12)}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  더보기 ({displayedVehicles.length} / {filteredVehicles.length})
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          원하는 차량을 찾으셨나요?
        </h2>
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
      </section>
    </div>
  );
} 