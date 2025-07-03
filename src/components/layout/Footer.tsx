import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">인천공항 렌트카</h3>
            <p className="text-gray-300 leading-relaxed">
              안전하고 편안한 렌트카 서비스를 제공합니다.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">바로가기</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-blue-300 font-semibold transition-colors duration-200">홈</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-blue-300 font-semibold transition-colors duration-200">회사소개</Link></li>
              <li><Link href="/pickup" className="text-gray-300 hover:text-blue-300 font-semibold transition-colors duration-200">공항픽업</Link></li>
              <li><Link href="/pricing" className="text-gray-300 hover:text-blue-300 font-semibold transition-colors duration-200">요금안내</Link></li>
              <li><Link href="/reservation" className="text-gray-300 hover:text-blue-300 font-semibold transition-colors duration-200">예약문의</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-blue-300 font-semibold transition-colors duration-200">문의하기</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">연락처</h3>
            <ul className="space-y-3 text-gray-300 font-semibold leading-relaxed">
              <li>대표번호: 032-123-4567</li>
              <li>이메일: info@airportcar.co.kr</li>
              <li>주소: 인천광역시 중구 공항로 272</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 font-medium">&copy; {year ? year : ''} 인천공항 렌트카. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 