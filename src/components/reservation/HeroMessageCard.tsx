import Image from 'next/image';

export default function HeroMessageCard() {
  return (
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
  );
} 