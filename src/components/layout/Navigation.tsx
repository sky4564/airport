'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-700 tracking-tight">인천공항 렌트카</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200">홈</Link>
            <Link href="/about" className="text-gray-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200">회사소개</Link>
            <Link href="/pickup" className="text-gray-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200">공항픽업</Link>
            <Link href="/pricing" className="text-gray-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200">요금안내</Link>
            <Link href="/reservation" className="text-gray-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200">예약문의</Link>
            <Link href="/contact" className="text-gray-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-200">문의하기</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              <span className="sr-only">메뉴 열기</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-900 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>홈</Link>
            <Link href="/about" className="text-gray-900 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>회사소개</Link>
            <Link href="/pickup" className="text-gray-900 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>공항픽업</Link>
            <Link href="/pricing" className="text-gray-900 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>요금안내</Link>
            <Link href="/reservation" className="text-gray-900 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>예약문의</Link>
            <Link href="/contact" className="text-gray-900 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>문의하기</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 