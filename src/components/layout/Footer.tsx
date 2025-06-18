import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">인천공항 렌트카</h3>
            <p className="text-gray-300">
              안전하고 편안한 렌트카 서비스를 제공합니다.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white">
                  요금/차종
                </Link>
              </li>
              <li>
                <Link href="/pickup" className="text-gray-300 hover:text-white">
                  픽업 안내
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="text-gray-300 hover:text-white">
                  예약 문의
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-300">
              <li>전화: 02-1234-5678</li>
              <li>이메일: info@incheon-rentcar.com</li>
              <li>운영시간: 24시간</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} 인천공항 렌트카. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 