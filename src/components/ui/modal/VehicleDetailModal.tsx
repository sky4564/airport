'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/lib/vehicles';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VehicleDetailModal({ vehicle, isOpen, onClose }: VehicleDetailModalProps) {
  if (!isOpen || !vehicle) return null;

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
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain"
                    style={{
                      objectPosition: 'center',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                      padding: '16px'
                    }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* 가격 정보 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 text-center shadow-lg border border-blue-100"
                  style={{
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}>
                  <div className="text-sm text-blue-600 font-medium mb-1">렌탈 요금</div>
                  <div className="text-3xl font-bold text-blue-900">{vehicle.price}</div>
                  <div className="text-sm text-blue-600 mt-1">기본 보험료 포함</div>
                </div>
              </div>

              {/* 오른쪽: 차량 정보 */}
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {vehicle.category}
                  </span>
                </div>

                {/* 주요 특징 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 특징</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {vehicle.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        style={{
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 차량 등급별 설명 */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">차량 정보</h4>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-2 shadow-inner border border-gray-200"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.05)'
                    }}>
                    {vehicle.category === '승합차' && (
                      <div className="text-sm text-gray-600">
                        <strong>대가족/단체 여행에 최적:</strong> 넓은 실내 공간과 충분한 수하물 공간으로 여행이 편리합니다.
                      </div>
                    )}
                    {vehicle.category === '대형' && (
                      <div className="text-sm text-gray-600">
                        <strong>프리미엄 비즈니스:</strong> 럭셔리한 승차감과 고급 내장재로 품격 있는 이동을 제공합니다.
                      </div>
                    )}
                    {vehicle.category === 'SUV' && (
                      <div className="text-sm text-gray-600">
                        <strong>다목적 활용:</strong> 높은 시야와 안전성, 넓은 공간으로 어떤 여행에도 적합합니다.
                      </div>
                    )}
                    {(vehicle.category === '준대형' || vehicle.category === '중형' || vehicle.category === '준중형') && (
                      <div className="text-sm text-gray-600">
                        <strong>실용적 선택:</strong> 연비와 편의성의 균형으로 경제적이면서도 편안한 이동이 가능합니다.
                      </div>
                    )}
                    {vehicle.category === '경차' && (
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
                    href={`/reservation?vehicle=${vehicle.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-lg block shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{
                      boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3), 0 6px 6px rgba(0, 0, 0, 0.1)',
                      color: 'white'
                    }}
                    onClick={onClose}
                  >
                    이 차량으로 예약하기
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