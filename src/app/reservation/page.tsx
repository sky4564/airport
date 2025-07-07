'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import ReservationForm from '@/components/forms/ReservationForm';
import HeroSection from '@/components/reservation/HeroSection';
import TabSelector from '@/components/reservation/TabSelector';
import InfoCards from '@/components/reservation/InfoCards';
import SocialButtonBn from '@/components/reservation/SocialButtonBn';
import FooterText from '@/components/reservation/FooterText';
import VehicleJsonLd from '@/components/reservation/VehicleJsonLd';

export default function ReservationPage() {
  useEffect(() => {
    document.title = '예약 문의 | 인천공항 렌트카';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '인천공항 렌트카 예약 문의를 남겨주세요. 빠른 시일 내에 연락드리겠습니다.');
    }
  }, []);

  return (
    <>
      <Head>
        <title>예약 문의 | 인천공항 렌트카</title>
        <meta name="description" content="인천공항 렌트카 예약 문의를 남겨주세요. 빠른 시일 내에 연락드리겠습니다." />
      </Head>
      <VehicleJsonLd />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        {/* 상단 2단 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* 좌측: 인트로/일러스트/이벤트 */}
          <HeroSection />
          {/* 우측: 폼+탭 */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <TabSelector />
            <ReservationForm />
          </div>
        </div>
        {/* 하단 안내카드 */}
        <InfoCards />
        {/* 하단 SNS/블로그/카카오/톡톡 버튼 */}
        <SocialButtonBn />
        <FooterText />
      </div>
    </>
  );
} 