import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: '요금/차종 | 인천공항 렌트카',
  description: '인천공항 렌트카의 다양한 차종과 요금을 확인하세요. 경제형부터 고급형까지 다양한 차량을 보유하고 있습니다.',
};

const carTypes = [
  {
    id: 'economy',
    name: '경제형',
    description: '연비가 좋고 경제적인 차량',
    price: '50,000원/일',
    features: ['5인승', '자동변속기', '에어컨', '블루투스'],
    image: '/images/cars/economy.jpg',
  },
  {
    id: 'compact',
    name: '준중형',
    description: '편안한 승차감과 적절한 크기',
    price: '70,000원/일',
    features: ['5인승', '자동변속기', '에어컨', '블루투스', '후방센서'],
    image: '/images/cars/compact.jpg',
  },
  {
    id: 'midsize',
    name: '중형',
    description: '넓은 실내 공간과 안락한 승차감',
    price: '90,000원/일',
    features: ['5인승', '자동변속기', '에어컨', '블루투스', '후방센서', '스마트키'],
    image: '/images/cars/midsize.jpg',
  },
  {
    id: 'suv',
    name: 'SUV',
    description: '넓은 적재공간과 강력한 주행성능',
    price: '120,000원/일',
    features: ['7인승', '자동변속기', '에어컨', '블루투스', '후방센서', '스마트키', '파노라마 선루프'],
    image: '/images/cars/suv.jpg',
  },
  {
    id: 'luxury',
    name: '고급형',
    description: '최상의 편안함과 안전성',
    price: '150,000원/일',
    features: ['5인승', '자동변속기', '에어컨', '블루투스', '후방센서', '스마트키', '파노라마 선루프', '전동시트'],
    image: '/images/cars/luxury.jpg',
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">요금/차종</h1>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        다양한 차종과 합리적인 요금으로 고객님의 여행을 더욱 편안하게 만들어 드립니다.
        모든 차량은 정기 점검을 통해 최상의 상태를 유지하고 있습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {carTypes.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-4">{car.description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{car.price}</p>
              <ul className="space-y-2 mb-6">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/reservation"
                className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                예약 문의하기
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">요금 안내</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• 기본 요금은 24시간 기준입니다.</li>
          <li>• 장기 렌트의 경우 별도 문의해 주세요.</li>
          <li>• 보험료는 요금에 포함되어 있습니다.</li>
          <li>• 주유비는 별도입니다.</li>
          <li>• 요금은 시기에 따라 변동될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
} 