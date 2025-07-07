'use client';

import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import ReservationForm from './forms/ReservationForm';
import VehicleGallery from './ui/VehicleGallery';

export default function MobilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 모바일 네비게이션 */}
      <Navigation />

      {/* 모바일 히어로 섹션 - 빠른 예약 */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              인천공항 렌트카
            </h1>
            <p className="text-blue-100 mb-4">
              빠른 예약으로 바로 시작하세요
            </p>

            {/* 빠른 연결 버튼들 */}
            <div className="flex gap-2 mb-4">
              <a
                href="tel:010-0000-0000"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                바로 전화
              </a>
              <Link
                href="/search"
                className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                차량 찾기
              </Link>
            </div>

            {/* 폼 작성 버튼 */}
            <div className="mb-4">
              <button
                onClick={() => {
                  const formElement = document.getElementById('mobile-reservation-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                예약 폼 작성
              </button>
            </div>
          </div>

          {/* 모바일 예약 폼 */}
          <div id="mobile-reservation-form" className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              예약 문의하기
            </h2>
            <ReservationForm simplified={true} />
          </div>
        </div>
      </section>

      {/* 모바일 서비스 특징 */}
      <section className="py-8 bg-white">
        <div className="max-w-md mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-6 text-blue-600">주요 서비스</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">24시간 공항 픽업/반납</h3>
                <p className="text-sm text-gray-600">비행 일정에 맞춘 24시간 공항 픽업 및 반납 서비스</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">보험 포함 합리적 요금</h3>
                <p className="text-sm text-gray-600">모든 차량 기본 보험 포함, 추가 비용 없이 합리적인 가격</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">다양한 차종 선택</h3>
                <p className="text-sm text-gray-600">경차부터 대형, SUV, 수입차까지 다양한 차종 보유</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 모바일 차량 이미지 갤러리 */}
      <VehicleGallery />

      {/* 빠른 연락 섹션 */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">지금 바로 연락하세요</h2>
          <p className="text-blue-100 mb-6">빠른 상담과 예약을 위해 전화 또는 카카오톡으로 연락주세요</p>

          <div className="flex flex-col gap-3">
            <a
              href="tel:010-0000-0000"
              className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-center transition-colors hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              010-0000-0000
            </a>
            <a
              href="https://open.kakao.com/o/your-kakao-link"
              className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg text-center transition-colors hover:bg-yellow-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C5.58 2 2 5.14 2 9c0 2.39 1.4 4.51 3.5 5.69-.15-.56-.28-1.44-.06-2.09l1.57-6.63s-.4-.8-.4-1.99c0-1.86 1.08-3.25 2.42-3.25 1.14 0 1.69.86 1.69 1.88 0 1.15-.73 2.86-1.11 4.45-.32 1.33.67 2.42 1.98 2.42 2.37 0 3.96-3.06 3.96-6.69 0-2.76-1.86-4.83-4.95-4.83-3.58 0-5.8 2.69-5.8 5.69 0 1.03.3 1.75.78 2.31.22.26.25.49.18.75-.05.19-.18.73-.23.93-.07.28-.35.38-.61.28-1.67-.69-2.45-2.55-2.45-4.64 0-3.65 3.08-8.04 9.21-8.04 4.95 0 8.16 3.58 8.16 7.42 0 5.08-2.82 8.89-6.98 8.89-1.4 0-2.72-.78-3.17-1.67l-.86 3.49c-.31 1.21-1.14 2.73-1.7 3.66.95.29 1.96.45 3.01.45 4.42 0 8-3.58 8-8S14.42 2 10 2z" />
              </svg>
              카카오톡 문의
            </a>
          </div>
        </div>
      </section>

      {/* 모바일용 간단한 푸터 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <h3 className="text-lg font-bold mb-4">인천공항 렌트카</h3>
          <p className="text-gray-300 text-sm mb-4">
            24시간 공항 픽업/반납 서비스<br />
            합리적인 가격의 렌트카 서비스
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/about" className="text-blue-400 hover:text-blue-300 text-sm">
              회사소개
            </Link>
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300 text-sm">
              요금안내
            </Link>
            <Link href="/pickup" className="text-blue-400 hover:text-blue-300 text-sm">
              픽업안내
            </Link>
          </div>
          <p className="text-gray-400 text-xs">
            © 2024 인천공항 렌트카. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 