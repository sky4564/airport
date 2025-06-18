import Image from 'next/image';

export const metadata = {
  title: '연락처/찾아오기 | 인천공항 렌트카',
  description: '인천공항 렌트카의 연락처와 오시는 길을 안내해 드립니다. 24시간 문의 가능합니다.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">연락처/찾아오기</h1>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        언제든지 편리하게 연락주세요. 24시간 문의 가능합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 연락처 정보 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">연락처 정보</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">전화번호</h3>
              <p className="text-gray-600">02-1234-5678</p>
              <p className="text-sm text-gray-500">24시간 운영</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">이메일</h3>
              <p className="text-gray-600">info@incheon-rentcar.com</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">운영시간</h3>
              <p className="text-gray-600">24시간 운영</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">주소</h3>
              <p className="text-gray-600">
                인천광역시 중구 공항로 272<br />
                인천국제공항 제1터미널 1층
              </p>
            </div>
          </div>
        </div>

        {/* 오시는 길 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">오시는 길</h2>
          <div className="relative h-64 mb-6">
            <Image
              src="/images/map.jpg"
              alt="오시는 길 지도"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">대중교통 이용시</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>공항철도 인천공항역 하차</li>
                <li>제1터미널 1층 4번 출구로 나오기</li>
                <li>4번 출구 앞에서 저희 직원이 기다리고 있습니다</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">자가용 이용시</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>인천국제공항 제1터미널 주차장 이용</li>
                <li>주차장에서 제1터미널 1층 4번 출구로 이동</li>
                <li>4번 출구 앞에서 저희 직원이 기다리고 있습니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 문의하기 버튼 */}
      <div className="mt-12 text-center">
        <a
          href="tel:0212345678"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          전화 문의하기
        </a>
      </div>
    </div>
  );
} 