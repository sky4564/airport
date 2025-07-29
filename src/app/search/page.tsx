import { Metadata } from 'next'
import CarSearchSection from '@/components/search/CarSearchSection'

export const metadata: Metadata = {
  title: '차량 검색 - 공항렌트24',
  description: '승차인원과 예산에 맞는 렌터카를 검색하세요. 경차부터 대형차까지 다양한 차종을 비교할 수 있습니다.',
  keywords: '차량 검색, 렌터카 비교, 인천공항 렌트카',
  alternates: {
    canonical: 'https://airportrent24.kr/search'
  }
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CarSearchSection />
    </div>
  )
} 