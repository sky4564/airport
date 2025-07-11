'use client';

import { VEHICLE_CATEGORIES } from '@/lib/vehicles';

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
  { value: 'ventilated_seats', label: '❄️ 통풍시트' },
  { value: 'sunroof', label: '🌞 선루프' },
  { value: 'heated_seats', label: '🔥 열선시트' },
  { value: 'navigation', label: '🗺️ 네비게이션' },
  { value: 'backup_camera', label: '📹 후방카메라' },
  { value: 'parking_assist', label: '🅿️ 주차보조' },
  { value: 'cruise_control', label: '🚗 크루즈컨트롤' },
  { value: 'hybrid', label: '🌱 하이브리드' },
];

const filterSteps = [
  { id: 'category', title: '차종 선택', subtitle: '원하는 차종을 선택해주세요' },
  { id: 'seating', title: '승차인원', subtitle: '필요한 승차인원을 선택해주세요' },
  { id: 'price', title: '가격대', subtitle: '예산에 맞는 가격대를 선택해주세요' },
  { id: 'features', title: '특별 기능', subtitle: '원하는 기능을 선택해주세요 (복수선택 가능)' }
];

interface SearchFilterProps {
  selectedCategory: string;
  selectedSeating: string;
  selectedPriceRange: string;
  selectedFeatures: string[];
  currentStep: number;
  onCategoryChange: (category: string) => void;
  onSeatingChange: (seating: string) => void;
  onPriceRangeChange: (priceRange: string) => void;
  onFeatureToggle: (feature: string) => void;
  onStepChange: (step: number) => void;
  onReset: () => void;
}

export default function SearchFilter({
  selectedCategory,
  selectedSeating,
  selectedPriceRange,
  selectedFeatures,
  currentStep,
  onCategoryChange,
  onSeatingChange,
  onPriceRangeChange,
  onFeatureToggle,
  onStepChange,
  onReset
}: SearchFilterProps) {
  const nextStep = () => {
    if (currentStep < filterSteps.length - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const autoNextStep = () => {
    if (currentStep < filterSteps.length - 1 && currentStep !== 3) {
      setTimeout(() => {
        onStepChange(currentStep + 1);
      }, 300);
    }
  };

  const handleSearchComplete = () => {
    const searchResults = document.querySelector('#search-results');
    searchResults?.scrollIntoView({ behavior: 'smooth' });
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
                    onCategoryChange(category);
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
                    onSeatingChange(option.value);
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
                    onPriceRangeChange(range.value);
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
                  onClick={() => onFeatureToggle(feature.value)}
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
    <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      {/* 진행 상황 표시 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {filterSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepChange(index)}
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
              onClick={onReset}
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
                  handleSearchComplete();
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
            onClick={handleSearchComplete}
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
  );
} 