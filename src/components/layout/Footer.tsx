const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2 text-white">공항렌트24</h3>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Airport Rent 24</h4>
            <p className="text-gray-200 leading-relaxed mb-2">
              24시간 안전하고 편안한 공항 렌트카 서비스를 제공합니다.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing safe and comfortable 24-hour airport car rental service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2 text-white">연락처</h3>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Contact Info</h4>
            <ul className="space-y-3 text-gray-200 font-semibold leading-relaxed">
              <li>대표번호: 032-427-5500</li>
              <li>휴대전화: 010-8426-3821</li>
              <li>이메일: charent@charentcar.com</li>
              <li>주소: 인천광역시 중구 공항로 272</li>
              <li className="text-sm text-gray-300">Address: 272 Gonghang-ro, Jung-gu, Incheon, Korea</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2 text-white">서비스 지역</h3>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Service Area</h4>
            <ul className="space-y-2 text-gray-200 leading-relaxed">
              <li>• 인천국제공항 (ICN)</li>
              <li>• 김포국제공항 (GMP)</li>
              <li>• 인천 및 수도권</li>
              <li className="text-sm text-gray-300">• Incheon Metropolitan Area</li>
            </ul>
          </div>

          {/* 사업자 정보 컬럼 추가 */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-white">사업자 정보</h3>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Business Info</h4>
            <div className="space-y-2 text-gray-200 text-sm leading-relaxed">
              <p>상호: (주)차렌터카</p>
              <p>대표: 차승훈</p>
              <p>개인정보관리책임자: 차승훈</p>
              <p>전화: 032-427-5500</p>
              <p>이메일: charentcar@naver.com</p>
              <p className="text-xs">주소: 인천광역시 연수구<br />경원대로534번길 11(선학동)</p>
              <p className="text-xs">사업자등록번호: 8888101709</p>
              <p className="text-xs">통신판매: 제 2021-인천연수구-0492</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 font-medium">&copy; {currentYear} 공항렌트24. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 