import Link from 'next/link';
import Image from 'next/image';
import ReservationForm from '@/components/forms/ReservationForm';

export const metadata = {
  title: '예약 문의 | 인천공항 렌트카',
  description: '인천공항 렌트카 예약 문의를 남겨주세요. 빠른 시일 내에 연락드리겠습니다.',
};

export default function ReservationPage() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      {/* 상단 2단 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* 좌측: 인트로/일러스트/이벤트 */}
        <div className="flex flex-col gap-6 justify-between h-full">
          <div className="bg-blue-100 rounded-lg p-6 flex-1 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="text-sm text-gray-700 mb-3 font-medium">여행의 시작과 끝을 함께하는 ANT 렌터카</div>
              <div className="text-2xl md:text-3xl font-bold leading-tight mb-3 text-gray-900">
                고객감동을 위해 <br />
                <span className="text-blue-700">오늘도 달립니다.</span>
              </div>
            </div>
            <div className="flex justify-end items-end mt-4">
              <Image src="/images/hero-bg.jpg" alt="대체 일러스트" width={120} height={80} className="object-contain rounded-md" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 flex items-center min-h-[80px]">
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-2 text-base">SNS 이용후기 이벤트</div>
              <div className="text-sm text-gray-700 leading-relaxed">따뜻한 후기 남기고 100% 당첨혜택까지!</div>
            </div>
            <Image src="/images/globe.svg" alt="이벤트 대체이미지" width={60} height={60} className="object-contain" />
          </div>
        </div>
        {/* 우측: 폼+탭 */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* 탭 (디자인만, 기능은 공항렌트카 고정) */}
          <div className="flex mb-6">
            <div className="flex-1 text-center py-3 rounded-t-lg bg-blue-600 text-white font-bold text-base">공항렌트카</div>
            <div className="flex-1 text-center py-3 rounded-t-lg bg-gray-100 text-gray-500 font-bold text-base">월간렌트카</div>
          </div>
          <ReservationForm />
        </div>
      </div>
      {/* 하단 안내카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Link href="/pricing" className="bg-blue-100 rounded-lg p-4 flex flex-col items-center hover:bg-blue-200 transition-colors duration-200">
          <div className="text-xs text-blue-700 font-bold mb-2 tracking-wide">ACTUAL VEHICLE</div>
          <div className="text-lg font-semibold mb-2 text-gray-900">실제차량 보기</div>
          <div className="text-sm text-gray-600 mb-3 text-center leading-relaxed">다양한 차량을 확인해보세요</div>
          <div className="text-sm text-blue-700 underline font-medium">바로가기</div>
        </Link>
        <Link href="/pricing" className="bg-blue-50 rounded-lg p-4 flex flex-col items-center hover:bg-blue-100 transition-colors duration-200">
          <div className="text-xs text-blue-700 font-bold mb-2 tracking-wide">RENTAL FEE</div>
          <div className="text-lg font-semibold mb-2 text-gray-900">대여요금</div>
          <div className="text-sm text-gray-600 mb-3 text-center leading-relaxed">대여기간별 일일 요금</div>
          <div className="text-sm text-blue-700 underline font-medium">바로가기</div>
        </Link>
        <Link href="/pickup" className="bg-blue-50 rounded-lg p-4 flex flex-col items-center hover:bg-blue-100 transition-colors duration-200">
          <div className="text-xs text-blue-700 font-bold mb-2 tracking-wide">RENTAL INFORMATION</div>
          <div className="text-lg font-semibold mb-2 text-gray-900">대여안내</div>
          <div className="text-sm text-gray-600 mb-3 text-center leading-relaxed">대여안내를 참고해 주세요</div>
          <div className="text-sm text-blue-700 underline font-medium">바로가기</div>
        </Link>
        <Link href="/contact" className="bg-blue-600 rounded-lg p-4 flex flex-col items-center hover:bg-blue-700 transition-colors duration-200">
          <div className="text-xs text-blue-100 font-bold mb-2 tracking-wide">SUPPLEMENTARY</div>
          <div className="text-lg font-semibold text-white mb-2">부가서비스</div>
          <div className="text-sm text-blue-100 mb-3 text-center leading-relaxed">부가서비스를 참고해 주세요</div>
          <div className="text-sm text-white underline font-medium">바로가기</div>
        </Link>
      </div>
      {/* 하단 SNS/블로그/카카오/톡톡 버튼 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
          <Image src="/images/instagram.svg" alt="인스타그램" width={24} height={24} className="mr-2" />
          <span className="font-semibold text-gray-800">인스타그램</span>
        </a>
        <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
          <Image src="/images/blog.svg" alt="블로그" width={24} height={24} className="mr-2" />
          <span className="font-semibold text-gray-800">블로그</span>
        </a>
        <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
          <Image src="/images/kakao.svg" alt="카카오채널" width={24} height={24} className="mr-2" />
          <span className="font-semibold text-gray-800">카카오채널</span>
        </a>
        <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
          <Image src="/images/talk.svg" alt="톡톡" width={24} height={24} className="mr-2" />
          <span className="font-semibold text-gray-800">톡톡</span>
        </a>
      </div>
      <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto text-base leading-relaxed">
        다양한 차종과 합리적인 요금으로 고객님의 여행을 더욱 편안하게 만들어 드립니다.
        모든 차량은 정기 점검을 통해 최상의 상태를 유지하고 있습니다.
      </p>
    </div>
  );
} 