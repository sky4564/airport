import Image from 'next/image';

export const metadata = {
  title: '픽업 안내 | 인천공항 렌트카',
  description: '인천공항 터미널별 픽업 위치와 절차를 안내해 드립니다. 편리한 공항 픽업 서비스를 이용하세요.',
};

const terminals = [
  {
    id: 't1',
    name: '제1터미널',
    description: '제1터미널에서의 픽업 안내',
    location: '제1터미널 1층 4번 출구 앞',
    image: '/images/terminals/t1.jpg',
    steps: [
      '제1터미널 1층 4번 출구로 나옵니다.',
      '4번 출구 앞에서 저희 직원이 기다리고 있습니다.',
      '직원에게 예약 확인 후 차량으로 안내해 드립니다.',
    ],
  },
  {
    id: 't2',
    name: '제2터미널',
    description: '제2터미널에서의 픽업 안내',
    location: '제2터미널 1층 5번 출구 앞',
    image: '/images/terminals/t2.jpg',
    steps: [
      '제2터미널 1층 5번 출구로 나옵니다.',
      '5번 출구 앞에서 저희 직원이 기다리고 있습니다.',
      '직원에게 예약 확인 후 차량으로 안내해 드립니다.',
    ],
  },
];

export default function PickupPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">픽업 안내</h1>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        인천공항 터미널별 픽업 위치와 절차를 안내해 드립니다.
        편리한 공항 픽업 서비스로 여행을 시작하세요.
      </p>

      <div className="space-y-12">
        {terminals.map((terminal) => (
          <div key={terminal.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={terminal.image}
                alt={terminal.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{terminal.name}</h2>
              <p className="text-gray-600 mb-4">{terminal.description}</p>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">픽업 위치</h3>
                <p className="text-gray-600">{terminal.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">픽업 절차</h3>
                <ol className="space-y-2">
                  {terminal.steps.map((step, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">픽업 서비스 안내</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• 픽업 서비스는 24시간 운영됩니다.</li>
          <li>• 비행기 도착 시간에 맞춰 픽업 서비스를 제공합니다.</li>
          <li>• 픽업 장소에서 저희 직원이 명확한 안내판을 들고 기다리고 있습니다.</li>
          <li>• 예약 확인 후 차량으로 안내해 드립니다.</li>
          <li>• 픽업 장소를 찾기 어려우시면 전화로 문의해 주세요.</li>
        </ul>
      </div>
    </div>
  );
} 