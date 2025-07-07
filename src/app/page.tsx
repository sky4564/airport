'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Home from "../components/Home";


export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // 모바일 디바이스 감지 함수
    const isMobileDevice = () => {
      // User Agent 기반 모바일 감지
      const userAgent = navigator.userAgent || navigator.vendor || '';

      // 모바일 디바이스 패턴
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;

      // 화면 크기 기반 감지 (768px 이하)
      const isSmallScreen = window.innerWidth <= 768;

      // 터치 지원 여부
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      return mobileRegex.test(userAgent) || (isSmallScreen && isTouchDevice);
    };

    // 모바일 디바이스인 경우 모바일 페이지로 리디렉션
    if (isMobileDevice()) {
      router.push('/mobile');
    }
  }, [router]);

  return (
    <>
      <Home />
    </>
  );
}
