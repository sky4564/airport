import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 - 공항렌트24',
  description: '요청하신 페이지가 존재하지 않습니다. 공항렌트24 홈페이지로 돌아가세요.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://airportrent24.kr/404'
  }
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>

          <div className="text-sm text-gray-500">
            <p>다른 페이지를 찾아보세요:</p>
            <div className="mt-2 space-x-4">
              <Link href="/vehicles" className="text-blue-600 hover:underline">
                차량 목록
              </Link>
              <Link href="/search" className="text-blue-600 hover:underline">
                차량 검색
              </Link>
              <Link href="/pickup" className="text-blue-600 hover:underline">
                픽업 서비스
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 