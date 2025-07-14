'use client';

import Link from 'next/link';
import Image from 'next/image';
import { InfoCard, CTASection, SectionTitle } from "./ui";
import HomeJsonLd from './seo/HomeJsonLd';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeJsonLd />
      {/* Navigation is now handled by layout.tsx */}
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/airport-bg.jpg"
            alt="공항렌트24 인천공항 렌터카 서비스"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* 배경 이미지 오버레이 */}
        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-10" /> */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            공항렌트24
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
            Airport Rent 24
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-white">
            24시간 인천공항 픽업 서비스로 안전하고 편안한 여행을 시작하세요
          </p>
          <p className="text-lg md:text-xl mb-8 text-white opacity-90">
            24-hour Incheon Airport pickup service for safe and comfortable travel
          </p>
          <Link
            href="/search"
            className="bg-blue-600 hover:bg-blue-700 !text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
          >
            🔍 빠르게 원하는 차량 찾기
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="주요 서비스"
            subtitle="Main Services"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              icon={<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="24시간 공항 픽업/반납"
              description="비행 일정에 맞춘 24시간 공항 픽업 및 반납 서비스 제공. 언제든 편리하게 이용하세요."
            />
            <InfoCard
              icon={<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
              title="보험 포함 합리적 요금"
              description="모든 차량 기본 보험 포함, 추가 비용 없이 합리적인 가격으로 안전하게 이용하세요."
            />
            <InfoCard
              icon={<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
              title="다양한 차종 선택"
              description="경차부터 대형, SUV, 수입차까지 다양한 차종을 보유. 원하는 차량을 선택하세요."
            />
          </div>

          {/* English Service Description */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="text-gray-600">
                <h4 className="font-semibold text-blue-600 mb-2">24/7 Airport Pickup</h4>
                <p className="text-sm">Convenient pickup and drop-off service available 24 hours to match your flight schedule</p>
              </div>
              <div className="text-gray-600">
                <h4 className="font-semibold text-blue-600 mb-2">Insurance Included</h4>
                <p className="text-sm">All vehicles include basic insurance coverage with competitive rates and no hidden fees</p>
              </div>
              <div className="text-gray-600">
                <h4 className="font-semibold text-blue-600 mb-2">Various Vehicle Types</h4>
                <p className="text-sm">Choose from compact cars to luxury vehicles, SUVs, and imported cars to suit your needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        phoneText="📞 예약 문의하기"
        reservationText="🔍 차량 찾아보기"
        reservationLink="/search"
      />
    </div>
  );
} 