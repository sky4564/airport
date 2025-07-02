import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-6 justify-between h-full">
      <div className="bg-blue-100 rounded-lg p-6 flex-1 flex flex-col justify-between min-h-[220px]">
        <div>
          <div className="text-sm text-gray-700 mb-3 font-medium">여행의 시작과 끝을 함께하는 차렌터카</div>
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
  );
} 