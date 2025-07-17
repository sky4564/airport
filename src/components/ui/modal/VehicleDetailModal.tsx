'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle, getSortedVehicleTypes, compareVehicleOptions, getBaseVehicleType } from '@/lib/vehicles';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VehicleDetailModal({ vehicle, isOpen, onClose }: VehicleDetailModalProps) {
  const [selectedType, setSelectedType] = useState<Vehicle | null>(null);

  // 차량이 바뀔 때마다 selectedType 초기화
  useEffect(() => {
    setSelectedType(null);
  }, [vehicle?.id]);

  // 동일 모델의 모든 타입 가져오기 (정렬된)
  const baseModel = vehicle ? (vehicle.baseModel || vehicle.name) : '';
  const vehicleTypes = useMemo(() => {
    return baseModel ? getSortedVehicleTypes(baseModel) : [];
  }, [baseModel]);

  const hasMultipleTypes = vehicleTypes.length > 1;

  // 현재 선택된 차량 (타입이 선택되면 해당 타입, 아니면 기본 차량)
  const currentVehicle = selectedType || vehicle;

  // 기본 타입과의 옵션 비교 (기본 A타입과 현재 선택된 타입 비교)
  const baseVehicle = useMemo(() => {
    return baseModel ? getBaseVehicleType(baseModel) : null;
  }, [baseModel]);

  const optionComparison = useMemo(() => {
    if (!baseVehicle || !currentVehicle || currentVehicle.id === baseVehicle.id) {
      return null;
    }
    return compareVehicleOptions(baseVehicle, currentVehicle);
  }, [baseVehicle, currentVehicle]);

  // 특징을 카테고리별로 정렬 (추가된 옵션 먼저, 그 다음 공통 옵션)
  const organizedFeatures = useMemo(() => {
    if (!currentVehicle) {
      return [];
    }

    if (!optionComparison) {
      return currentVehicle.features.map(feature => ({
        text: feature,
        type: 'default' as const
      }));
    }

    const features = [
      // 추가된 옵션들을 먼저 표시 (강조)
      ...optionComparison.addedOptions.map(feature => ({
        text: feature,
        type: 'added' as const
      })),
      // 공통 옵션들
      ...optionComparison.commonOptions.map(feature => ({
        text: feature,
        type: 'common' as const
      }))
    ];

    return features;
  }, [currentVehicle, optionComparison]);

  if (!isOpen || !vehicle) return null;

  // currentVehicle이 null이면 기본 vehicle 사용
  const safeCurrentVehicle = currentVehicle || vehicle;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* 배경 오버레이 */}
        <div
          className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          onClick={onClose}
        />

        {/* 모달 컨테이너 */}
        <div className="relative bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all max-w-4xl w-full mx-auto"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}>
          {/* 헤더 */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-900">차량 상세정보</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 컨텐츠 */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 왼쪽: 차량 이미지 */}
              <div className="space-y-4">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 rounded-2xl overflow-hidden relative shadow-inner"
                  style={{
                    boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                  <Image
                    src={safeCurrentVehicle.image}
                    alt={safeCurrentVehicle.name}
                    fill
                    className="object-contain"
                    style={{
                      objectPosition: 'center',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                      padding: '16px'
                    }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    key={safeCurrentVehicle.id} // 이미지 캐시 방지를 위한 key 추가
                  />
                </div>

                {/* 가격 정보 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 text-center shadow-lg border border-blue-100"
                  style={{
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}>
                  <div className="text-sm text-blue-600 font-medium mb-1">렌탈 요금</div>
                  <div className="text-3xl font-bold text-blue-900">{safeCurrentVehicle.price}</div>
                  <div className="text-sm text-blue-600 mt-1">기본 보험료 포함</div>
                </div>
              </div>

              {/* 오른쪽: 차량 정보 */}
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {safeCurrentVehicle.name}
                    {safeCurrentVehicle.type && (
                      <span className="ml-2 text-lg text-blue-600 font-medium">타입 {safeCurrentVehicle.type}</span>
                    )}
                  </h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {safeCurrentVehicle.category}
                  </span>
                </div>

                {/* 타입 선택 (여러 타입이 있는 경우만 표시) */}
                {hasMultipleTypes && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">차량 타입 선택</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {vehicleTypes.map((typeVehicle) => {
                        // 현재 차량 대비 옵션 변화 계산
                        const comparison = baseVehicle && typeVehicle.id !== baseVehicle.id
                          ? compareVehicleOptions(baseVehicle, typeVehicle)
                          : null;

                        return (
                          <button
                            key={typeVehicle.id}
                            onClick={() => setSelectedType(typeVehicle)}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${safeCurrentVehicle.id === typeVehicle.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                              }`}
                          >
                            <div className="text-center">
                              <div className="font-semibold mb-1">
                                타입 {typeVehicle.type || 'A'}
                                {comparison && comparison.addedOptions.length > 0 && (
                                  <span className="ml-1 text-xs text-green-600">+{comparison.addedOptions.length}</span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">{typeVehicle.price}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {optionComparison && optionComparison.addedOptions.length > 0 && (
                      <div className="text-xs text-green-600 mt-2 bg-green-50 p-2 rounded-lg border border-green-200">
                        ✨ 추가 옵션: {optionComparison.addedOptions.join(', ')}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      💡 타입별로 옵션과 가격이 다를 수 있습니다
                    </div>
                  </div>
                )}

                {/* 주요 특징 - 옵션 변화를 강조하여 표시 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 특징</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {organizedFeatures.map((feature, index) => {
                      let bgClass = "bg-white";
                      let borderClass = "border-gray-100";
                      let iconClass = "bg-gradient-to-r from-blue-500 to-indigo-500";
                      let textClass = "text-gray-700";
                      let badgeElement = null;

                      if (feature.type === 'added') {
                        bgClass = "bg-gradient-to-r from-green-50 to-emerald-50";
                        borderClass = "border-green-200";
                        iconClass = "bg-gradient-to-r from-green-500 to-emerald-500";
                        textClass = "text-green-800 font-medium";
                        badgeElement = (
                          <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">NEW</span>
                        );
                      }

                      return (
                        <div
                          key={index}
                          className={`flex items-center justify-between space-x-2 p-3 ${bgClass} rounded-lg shadow-sm border ${borderClass} hover:shadow-md transition-all`}
                          style={{
                            boxShadow: feature.type === 'added'
                              ? '0 2px 8px rgba(34, 197, 94, 0.15)'
                              : '0 2px 4px rgba(0, 0, 0, 0.05)'
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 ${iconClass} rounded-full shadow-sm`}></div>
                            <span className={`text-sm ${textClass}`}>{feature.text}</span>
                          </div>
                          {badgeElement}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 차량 등급별 설명 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">차량 정보</h4>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-2 shadow-inner border border-gray-200"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.05)'
                    }}>
                    {safeCurrentVehicle.category === '승합차' && (
                      <div className="text-sm text-gray-600">
                        <strong>대가족/단체 여행에 최적:</strong> 넓은 실내 공간과 충분한 수하물 공간으로 여행이 편리합니다.
                      </div>
                    )}
                    {safeCurrentVehicle.category === '대형' && (
                      <div className="text-sm text-gray-600">
                        <strong>프리미엄 비즈니스:</strong> 럭셔리한 승차감과 고급 내장재로 품격 있는 이동을 제공합니다.
                      </div>
                    )}
                    {safeCurrentVehicle.category === 'SUV' && (
                      <div className="text-sm text-gray-600">
                        <strong>다목적 활용:</strong> 높은 시야와 안전성, 넓은 공간으로 어떤 여행에도 적합합니다.
                      </div>
                    )}
                    {(safeCurrentVehicle.category === '준대형' || safeCurrentVehicle.category === '중형' || safeCurrentVehicle.category === '준중형') && (
                      <div className="text-sm text-gray-600">
                        <strong>실용적 선택:</strong> 연비와 편의성의 균형으로 경제적이면서도 편안한 이동이 가능합니다.
                      </div>
                    )}
                    {safeCurrentVehicle.category === '경차' && (
                      <div className="text-sm text-gray-600">
                        <strong>경제적 이동:</strong> 뛰어난 연비와 주차 편의성으로 도심 여행에 최적화되어 있습니다.
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      ※ 모든 차량은 정기 점검을 받은 안전한 차량입니다.
                    </div>
                  </div>
                </div>

                {/* 예약 버튼 */}
                <div className="space-y-3">
                  <Link
                    href={`/reservation?vehicle=${safeCurrentVehicle.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-lg block shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{
                      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3), 0 6px 6px rgba(0, 0, 0, 0.1)',
                      color: 'white'
                    }}
                    onClick={onClose}
                  >
                    {safeCurrentVehicle.type ? `타입 ${safeCurrentVehicle.type}로 예약하기` : '이 차량으로 예약하기'}
                  </Link>
                  <div className="text-center text-sm text-gray-500">
                    예약 문의: <span className="font-semibold text-blue-600">032-427-5500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-1 p-3 bg-white rounded-lg shadow-sm">
                <div className="text-blue-600 font-semibold">✓ 24시간 픽업 가능</div>
                <div className="text-xs text-gray-600">인천공항 T1, T2</div>
              </div>
              <div className="space-y-1 p-3 bg-white rounded-lg shadow-sm">
                <div className="text-blue-600 font-semibold">✓ 완전보험 포함</div>
                <div className="text-xs text-gray-600">자차보험, 대인보험</div>
              </div>
              <div className="space-y-1 p-3 bg-white rounded-lg shadow-sm">
                <div className="text-blue-600 font-semibold">✓ 무료 내비게이션</div>
                <div className="text-xs text-gray-600">최신 지도 업데이트</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 