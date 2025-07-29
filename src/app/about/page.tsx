export const metadata = {
  title: '연락처 - 공항렌트24',
  description: '공항렌트24 연락처와 위치 안내. 24시간 상담 가능합니다.',
  alternates: {
    canonical: 'https://airportrent24.kr/about'
  }
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">연락처/찾아오기</h1>
      <p className="text-white text-center mb-12 max-w-3xl mx-auto">
        언제든지 편리하게 연락주세요. 24시간 문의 가능합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 연락처 정보 */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-black">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">연락처 정보</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">전화번호</h3>
              <p className="text-gray-800">대표번호: 032-427-5500</p>
              <p className="text-gray-800">휴대전화: 010-8426-3821</p>
              <p className="text-sm text-gray-800">24시간 운영</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">이메일</h3>
              <p className="text-gray-800">charent@charentcar.com</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">운영시간</h3>
              <p className="text-gray-800">24시간 운영</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">주소</h3>
              <p className="text-gray-800">
                인천 중구 신도시남로141번길 7<br />
                605호
              </p>
            </div>
          </div>
        </div>

        {/* 오시는 길 */}
        <div className="bg-white rounded-lg shadow-lg p-6 text-black">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">오시는 길</h2>
          <div className="relative h-64 mb-6 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">지도를 보려면 클릭하세요</p>
              </div>
              <a
                href="https://www.google.com/maps/search/인천+중구+신도시남로141번길+7+605호"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="text-white font-bold">구글 지도 보기</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">대중교통 이용시</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>공항철도 인천공항역 하차</li>
                <li>제1터미널 1층 4번 출구로 나오기</li>
                <li>4번 출구 앞에서 저희 직원이 기다리고 있습니다</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-blue-600">자가용 이용시</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
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
          href="tel:032-427-5500"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          <span className="text-white font-bold">전화 문의하기</span>
        </a>
      </div>
    </div>
  );
} 