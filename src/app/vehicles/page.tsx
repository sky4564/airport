import { Metadata } from 'next'
import { VehicleShowcaseSection, CTASection } from '@/components/ui'
import VehicleListingJsonLd from '@/components/seo/VehicleListingJsonLd'

export const metadata: Metadata = {
  title: '차량안내 - 공항렌트24',
  description: '보유 차량을 확인하고 예약하세요. 경차부터 대형차, SUV, 승합차까지 합리적인 가격으로 제공합니다.',
  keywords: '차량안내, 렌터카 종류, 인천공항 렌트카',
  alternates: {
    canonical: 'https://airportrent24.kr/vehicles'
  }
}

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <VehicleListingJsonLd />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              차량안내
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              다양한 차종의 렌터카를 합리적인 가격으로 만나보세요
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">31종</div>
                <div className="text-sm text-blue-100">보유 차종</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">7종</div>
                <div className="text-sm text-blue-100">차량 분류</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">24시간</div>
                <div className="text-sm text-blue-100">예약 상담</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">공항픽업</div>
                <div className="text-sm text-blue-100">무료 서비스</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VehicleShowcaseSection />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 저희를 선택해야 할까요?
            </h2>
            <p className="text-lg text-gray-600">
              차렌터카_인천공항점만의 특별한 서비스를 경험해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">품질 보증</h3>
              <p className="text-gray-600">
                정기적인 점검과 관리로 안전하고 깨끗한 차량만을 제공합니다
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">합리적 가격</h3>
              <p className="text-gray-600">
                투명한 가격 정책으로 추가 비용 없이 예약 시 가격 그대로 제공합니다
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24시간 상담</h3>
              <p className="text-gray-600">
                언제든지 전화 상담 가능하며, 공항 픽업 서비스도 무료로 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="지금 바로 예약하세요"
        subtitle="원하는 차량을 선택하고 간편하게 예약하실 수 있습니다"
        variant="gradient"
      />
    </div>
  )
} 