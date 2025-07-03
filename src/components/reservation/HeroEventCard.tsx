import Image from 'next/image';

export default function HeroEventCard() {
  return (
    <div className="bg-blue-50 rounded-lg p-4 flex items-center min-h-[80px] ">
      <div className="flex-1">
        <div className="font-semibold text-gray-900 mb-2 text-base">SNS 이용후기 이벤트</div>
        <div className="text-sm text-gray-700 leading-relaxed">따뜻한 후기 남기고 100% 당첨혜택까지!</div>
      </div>
      <Image src="/images/kakao_event.png" alt="이벤트 대체이미지" width={60} height={60} className="object-contain rounded-md" />
    </div>
  );
} 