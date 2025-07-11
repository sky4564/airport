import { Metadata } from 'next'
import CarSearchSection from '@/components/search/CarSearchSection'

export const metadata: Metadata = {
  title: '차량 찾아보기 - 차렌터카_인천공항점',
  description: '원하는 조건으로 차량을 검색하고 비교해보세요. 승차인원, 가격대, 차종별로 필터링하여 최적의 차량을 찾으실 수 있습니다.',
  keywords: '차렌터카, 차량 검색, 차량 비교, 인천공항 렌트카, 차량 필터링'
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CarSearchSection />
    </div>
  )
} 