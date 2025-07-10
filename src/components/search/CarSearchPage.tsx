'use client';

import { useState, useMemo } from 'react';
import { VEHICLES, VEHICLE_CATEGORIES } from '@/lib/vehicles';
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

// 특별 기능 옵션 (실용적인 기능으로 축소)
const SPECIAL_FEATURES = [
  { value: 'ventilated_seats', label: '❄️ 통풍시트' },
  { value: 'sunroof', label: '🌞 선루프' },
  { value: 'heated_seats', label: '🔥 열선시트' },
  { value: 'navigation', label: '🗺️ 네비게이션' },
  { value: 'backup_camera', label: '📹 후방카메라' },
  { value: 'parking_assist', label: '🅿️ 주차보조' },
  { value: 'cruise_control', label: '🚗 크루즈컨트롤' },
  { value: 'hybrid', label: '🌱 하이브리드' },
];

export default function CarSearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedSeating, setSelectedSeating] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showCount, setShowCount] = useState<number>(12);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const filterSteps = [
    { id: 'category', title: '차종 선택', subtitle: '원하는 차종을 선택해주세요' },
    { id: 'seating', title: '승차인원', subtitle: '필요한 승차인원을 선택해주세요' },
    { id: 'price', title: '가격대', subtitle: '예산에 맞는 가격대를 선택해주세요' },
    { id: 'features', title: '특별 기능', subtitle: '원하는 기능을 선택해주세요 (복수선택 가능)' }
  ];

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
        // "일 X만원" 형태에서 X 값을 추출 (만원 단위)
        const priceMatch = vehicle.price.match(/(\d+)만원/);
        if (priceMatch) {
          const priceValue = parseInt(priceMatch[1]); // 만원 단위
          switch (selectedPriceRange) {
            case 'budget':
              if (priceValue > 10) return false; // 10만원 이하
              break;
            case 'mid':
              if (priceValue <= 10 || priceValue > 20) return false; // 10만원 - 20만원
              break;
            case 'premium':
              if (priceValue <= 20) return false; // 20만원 이상
              break;
          }
        }
      }

      // 특별 기능 필터
      if (selectedFeatures.length > 0) {
        const hasAllSelectedFeatures = selectedFeatures.every(feature => {
          switch (feature) {
            case 'ventilated_seats':
              return vehicle.features.some(f => f.includes('통풍시트') || f.includes('벤틸레이션'));
            case 'sunroof':
              return vehicle.features.some(f => f.includes('선루프') || f.includes('썬루프') || f.includes('파노라마'));
            case 'heated_seats':
              return vehicle.features.some(f => f.includes('열선시트') || f.includes('시트히터'));
            case 'navigation':
              return vehicle.features.some(f => f.includes('네비게이션') || f.includes('내비') || f.includes('GPS'));
            case 'backup_camera':
              return vehicle.features.some(f => f.includes('후방카메라') || f.includes('백카메라') || f.includes('후방모니터'));
            case 'parking_assist':
              return vehicle.features.some(f => f.includes('주차보조') || f.includes('주차지원') || f.includes('오토파킹'));
            case 'cruise_control':
              return vehicle.features.some(f => f.includes('크루즈컨트롤') || f.includes('정속주행'));
            case 'hybrid':
              return vehicle.features.some(f => f.includes('하이브리드'));
            default:
              return false;
          }
        });
        if (!hasAllSelectedFeatures) return false;
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
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < filterSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  // 자동으로 다음 단계로 넘어가는 함수
  const autoNextStep = () => {
    // 특별 기능 단계(3)에서는 자동으로 넘어가지 않음 (다중 선택 가능하므로)
    if (currentStep < filterSteps.length - 1 && currentStep !== 3) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300); // 0.3초 후 자동 이동
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: // 차종 선택
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {VEHICLE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    autoNextStep();
                  }}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 border-2 ${selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                >
                  <div className="text-2xl mb-2">
                    {category === '전체' ? '🚗' :
                      category === '승합차' ? '🚐' :
                        category === '대형' ? '🏰' :
                          category === 'SUV' ? '🚙' :
                            category === '준대형' ? '🚘' :
                              category === '중형' ? '🚗' :
                                category === '준중형' ? '🚓' : '🚕'}
                  </div>
                  <div className="font-semibold">{category}</div>
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-blue-500">
              💡 선택하면 자동으로 다음 단계로 이동합니다
            </div>
          </div>
        );

      case 1: // 승차인원
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SEATING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedSeating(option.value);
                    autoNextStep();
                  }}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 border-2 ${selectedSeating === option.value
                    ? 'bg-green-600 text-white border-green-600 shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-md'
                    }`}
                >
                  <div className="text-2xl mb-2">
                    {option.value === 'all' ? '👥' :
                      option.value === '5' ? '👨‍👩‍👧‍👦' :
                        option.value === '7' ? '👨‍👩‍👧‍👦👶👶' :
                          '🚌'}
                  </div>
                  <div className="font-semibold">{option.label}</div>
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-green-500">
              💡 선택하면 자동으로 다음 단계로 이동합니다
            </div>
          </div>
        );

      case 2: // 가격대
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => {
                    setSelectedPriceRange(range.value);
                    autoNextStep();
                  }}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 border-2 ${selectedPriceRange === range.value
                    ? 'bg-purple-600 text-white border-purple-600 shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                >
                  <div className="text-2xl mb-2">
                    {range.value === 'all' ? '💰' :
                      range.value === 'budget' ? '🪙' :
                        range.value === 'mid' ? '💵' :
                          '💎'}
                  </div>
                  <div className="font-semibold">{range.label}</div>
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-purple-500">
              💡 선택하면 자동으로 다음 단계로 이동합니다
            </div>
          </div>
        );

      case 3: // 특별 기능
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SPECIAL_FEATURES.map((feature) => (
                <button
                  key={feature.value}
                  onClick={() => handleFeatureToggle(feature.value)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${selectedFeatures.includes(feature.value)
                    ? 'bg-orange-600 text-white border-orange-600 shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                >
                  <div className="font-medium">{feature.label}</div>
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-orange-500">
              💡 실용적인 기능들로 선별했습니다. 여러 기능을 선택할 수 있어요!
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          원하는 차량을 찾아보세요
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          단계별로 조건을 선택하여 최적의 차량을 찾으실 수 있습니다
        </p>
      </section>

      {/* 슬라이드 필터 섹션 */}
      <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        {/* 진행 상황 표시 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {filterSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`flex-1 text-center p-2 rounded-lg transition-all duration-300 ${index === currentStep
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : index < currentStep
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                  }`}
              >
                <div className="text-xs mb-1">Step {index + 1}</div>
                <div className="text-sm">{step.title}</div>
              </button>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / filterSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 현재 단계 제목 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filterSteps[currentStep].title}
          </h2>
          <p className="text-gray-600">
            {filterSteps[currentStep].subtitle}
          </p>
        </div>

        {/* 현재 단계 내용 */}
        <div className="mb-8 min-h-[280px] flex items-start">
          <div className="w-full">
            {renderCurrentStep()}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-center">
          <div className="border-2 border-gray-200 rounded-full p-3 shadow-lg">
            <div className="flex items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`p-4 transition-all duration-300 text-3xl ${currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
              >
                ⬅️
              </button>

              {/* 구분선 */}
              <div className="w-px h-12 bg-gray-300 mx-2"></div>

              <button
                onClick={resetFilters}
                className="p-4 text-red-500 hover:text-red-700 transition-all duration-300 text-3xl"
              >
                🔄
              </button>

              {/* 구분선 */}
              <div className="w-px h-12 bg-gray-300 mx-2"></div>

              <button
                onClick={() => {
                  if (currentStep < filterSteps.length - 1) {
                    nextStep();
                  } else {
                    // 마지막 단계에서는 검색 결과로 스크롤
                    const searchResults = document.querySelector('#search-results');
                    searchResults?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="p-4 text-blue-600 hover:text-blue-800 transition-all duration-300 text-3xl"
              >
                ➡️
              </button>
            </div>
          </div>
        </div>

        {/* 검색 완료 버튼 (마지막 단계에서만 표시) */}
        {currentStep === filterSteps.length - 1 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                // 검색 결과 섹션으로 스크롤
                const searchResults = document.querySelector('#search-results');
                searchResults?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-105 text-lg font-semibold shadow-lg"
            >
              ✅ 검색 완료
            </button>
          </div>
        )}

        {/* 선택된 필터 요약 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">선택한 조건</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedCategory !== '전체' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                차종: {selectedCategory}
              </span>
            )}
            {selectedSeating !== 'all' && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                승차인원: {SEATING_OPTIONS.find(opt => opt.value === selectedSeating)?.label}
              </span>
            )}
            {selectedPriceRange !== 'all' && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                가격대: {PRICE_RANGES.find(range => range.value === selectedPriceRange)?.label}
              </span>
            )}
            {selectedFeatures.map(feature => (
              <span key={feature} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                {SPECIAL_FEATURES.find(f => f.value === feature)?.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 검색 결과 */}
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
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">검색 결과가 없습니다</h3>
            <p className="text-lg text-gray-500 mb-8">선택하신 조건에 맞는 차량이 없습니다.<br />다른 조건으로 검색해보세요.</p>
            <div className="space-y-4">
              <button
                onClick={resetFilters}
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
                      style={{ color: 'white' }}
                    >
                      이 차량 예약하기
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            {hasMore && (
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowCount(prev => prev + 12)}
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
    </div>
  );
} 