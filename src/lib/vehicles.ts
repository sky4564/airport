export interface Vehicle {
  id: string;
  name: string;
  category: '승합차' | '대형' | 'SUV' | '준대형' | '중형' | '준중형' | '경차';
  price: string;
  image: string;
  features: string[];
}

export const VEHICLE_CATEGORIES = ['전체', '승합차', '대형', 'SUV', '준대형', '중형', '준중형', '경차'] as const;

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: '쏠라티',
    category: '승합차',
    price: '일 8만원부터',
    image: '/images/cars/solati_van.png',
    features: ['15인승', '대가족', '단체 여행']
  },
  {
    id: '2',
    name: '쏠라티 (화이트)',
    category: '승합차',
    price: '일 8만원부터',
    image: '/images/cars/solati2_van.png',
    features: ['15인승', '대가족', '단체 여행']
  },
  {
    id: '3',
    name: '스타리아',
    category: '승합차',
    price: '일 9만원부터',
    image: '/images/cars/staria_van.png',
    features: ['11인승', '프리미엄', '편안함']
  },
  {
    id: '4',
    name: '스타렉스',
    category: '승합차',
    price: '일 7만원부터',
    image: '/images/cars/starex_van.png',
    features: ['12인승', '실용성', '경제적']
  },
  {
    id: '5',
    name: '카니발 4세대',
    category: '승합차',
    price: '일 7만원부터',
    image: '/images/cars/carnival_gen4_van.png',
    features: ['11인승', '최신형', '편의사양']
  },
  {
    id: '6',
    name: '카니발 (블랙)',
    category: '승합차',
    price: '일 7만원부터',
    image: '/images/cars/carnival_black_van.png',
    features: ['11인승', '고급감', '단체 이용']
  },
  {
    id: '7',
    name: '카니발',
    category: '승합차',
    price: '일 7만원부터',
    image: '/images/cars/carnival_van.png',
    features: ['11인승', '가족형', '실용성']
  },
  {
    id: '8',
    name: '벤츠 E250',
    category: '대형',
    price: '일 15만원부터',
    image: '/images/cars/benz_e250_large.png',
    features: ['프리미엄', '럭셔리', '비즈니스']
  }
];

// 카테고리별 차량 필터링 헬퍼 함수
export const getVehiclesByCategory = (category: string): Vehicle[] => {
  if (category === '전체') {
    return VEHICLES;
  }
  return VEHICLES.filter(vehicle => vehicle.category === category);
};

// 특정 차량 찾기 헬퍼 함수
export const getVehicleById = (id: string): Vehicle | undefined => {
  return VEHICLES.find(vehicle => vehicle.id === id);
}; 