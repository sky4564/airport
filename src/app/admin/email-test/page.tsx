'use client'

import { useState } from 'react'

export default function EmailTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const sendTestEmail = async () => {
    setIsLoading(true)
    setResult(null)

    const testData = {
      name: '홍길동',
      phone: '010-1234-5678',
      email: 'test@example.com',
      pickupDate: '2024-02-15',
      pickupTime: '09:00',
      returnDate: '2024-02-18',
      returnTime: '18:00',
      carType: '아반떼 CN7 (중형)',
      message: '공항 1터미널에서 픽업 부탁드립니다.\n좀 더 빠른 시간에 연락 부탁드려요.'
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: '테스트 이메일이 성공적으로 전송되었습니다!' })
      } else {
        setResult({ success: false, message: `이메일 전송 실패: ${data.error}` })
      }
    } catch (error) {
      setResult({ success: false, message: `오류 발생: ${error instanceof Error ? error.message : '알 수 없는 오류'}` })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            이메일 테스트 페이지
          </h1>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-600 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  테스트용 페이지
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>이 페이지는 개발/테스트 목적으로만 사용됩니다.</p>
                  <p>실제 운영 환경에서는 접근을 제한해야 합니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">테스트 데이터</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">이름:</span> 홍길동</p>
              <p><span className="font-medium">전화번호:</span> 010-1234-5678</p>
              <p><span className="font-medium">이메일:</span> test@example.com</p>
              <p><span className="font-medium">픽업:</span> 2024-02-15 09:00</p>
              <p><span className="font-medium">반납:</span> 2024-02-18 18:00</p>
              <p><span className="font-medium">차종:</span> 아반떼 CN7 (중형)</p>
              <p><span className="font-medium">추가 요청:</span> 공항 1터미널에서 픽업 부탁드립니다...</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={sendTestEmail}
              disabled={isLoading}
              className={`
                px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200
                ${isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                } 
                text-white shadow-lg hover:shadow-xl
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  이메일 전송 중...
                </div>
              ) : (
                '📧 테스트 이메일 보내기'
              )}
            </button>
          </div>

          {result && (
            <div className={`
              mt-8 p-4 rounded-lg border-l-4 
              ${result.success
                ? 'bg-green-50 border-green-400 text-green-700'
                : 'bg-red-50 border-red-400 text-red-700'
              }
            `}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-xl">
                    {result.success ? '✅' : '❌'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">{result.message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <a
                href="/reservation"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← 예약 페이지로 돌아가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 