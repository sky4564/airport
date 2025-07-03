import Link from 'next/link';

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Link
        href="/reservation?type=airport"
        className="bg-blue-100 rounded-lg p-4 flex flex-col items-center hover:bg-blue-200 transition-colors duration-200"
      >
        <div className="text-xs bg-blue-500 text-white font-bold mb-2 tracking-wide">공항픽업</div>
        <div className="text-lg font-semibold mb-2 text-blue-700">공항 픽업 서비스</div>
        <div className="text-sm text-blue-900 mb-3 text-center leading-relaxed">인천공항에서 편리하게 차량을 픽업하세요.</div>
        <div className="text-sm text-blue-600 underline font-medium">바로가기</div>
      </Link>
      <Link
        href="/reservation?type=monthly"
        className="bg-green-100 rounded-lg p-4 flex flex-col items-center hover:bg-green-200 transition-colors duration-200"
      >
        <div className="text-xs bg-green-500 text-white font-bold mb-2 tracking-wide">월간렌트</div>
        <div className="text-lg font-semibold mb-2 text-green-700">월간 렌트 서비스</div>
        <div className="text-sm text-green-900 mb-3 text-center leading-relaxed">장기 렌트로 더 합리적인 가격을 경험하세요.</div>
        <div className="text-sm text-green-600 underline font-medium">바로가기</div>
      </Link>
      <Link
        href="/reservation?type=suv"
        className="bg-yellow-100 rounded-lg p-4 flex flex-col items-center hover:bg-yellow-200 transition-colors duration-200"
      >
        <div className="text-xs bg-yellow-500 text-white font-bold mb-2 tracking-wide">SUV</div>
        <div className="text-lg font-semibold mb-2 text-yellow-700">SUV 렌트</div>
        <div className="text-sm text-yellow-900 mb-3 text-center leading-relaxed">넉넉한 공간과 파워풀한 주행을 원한다면 SUV!</div>
        <div className="text-sm text-yellow-600 underline font-medium">바로가기</div>
      </Link>
      <Link
        href="/reservation?type=import"
        className="bg-purple-100 rounded-lg p-4 flex flex-col items-center hover:bg-purple-200 transition-colors duration-200"
      >
        <div className="text-xs bg-purple-500 text-white font-bold mb-2 tracking-wide">수입차</div>
        <div className="text-lg font-semibold mb-2 text-purple-700">수입차 렌트</div>
        <div className="text-sm text-purple-900 mb-3 text-center leading-relaxed">특별한 경험을 위한 프리미엄 수입차 라인업.</div>
        <div className="text-sm text-purple-600 underline font-medium">바로가기</div>
      </Link>
    </div>
  );
} 