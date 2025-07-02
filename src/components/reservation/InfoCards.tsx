import Link from 'next/link';

export default function InfoCards() {
  return (
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
  );
} 