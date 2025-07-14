'use client';

import { useState, useMemo } from 'react';
import { VEHICLES } from '@/lib/vehicles';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';
import { PageHeader } from '../ui';

export default function CarSearchSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedSeating, setSelectedSeating] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showCount, setShowCount] = useState<number>(12);
  const [currentStep, setCurrentStep] = useState<number>(0);

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
            case 'smart_key':
              return vehicle.features.some(f => f.includes('스마트키') || f.includes('키리스') || f.includes('버튼시동'));
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="원하는 차량을 찾아보세요"
        description="단계별로 조건을 선택하여 최적의 차량을 찾으실 수 있습니다"
      />

      {/* 검색 필터 섹션 */}
      <SearchFilter
        selectedCategory={selectedCategory}
        selectedSeating={selectedSeating}
        selectedPriceRange={selectedPriceRange}
        selectedFeatures={selectedFeatures}
        currentStep={currentStep}
        onCategoryChange={setSelectedCategory}
        onSeatingChange={setSelectedSeating}
        onPriceRangeChange={setSelectedPriceRange}
        onFeatureToggle={handleFeatureToggle}
        onStepChange={setCurrentStep}
        onReset={resetFilters}
      />

      {/* 검색 결과 섹션 */}
      <SearchResults
        filteredVehicles={filteredVehicles}
        displayedVehicles={displayedVehicles}
        hasMore={hasMore}
        onShowMore={() => setShowCount(prev => prev + 12)}
        onResetFilters={resetFilters}
      />
    </div>
  );
} 