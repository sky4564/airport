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
  // 승합차
  {
    id: '1',
    name: '쏠라티',
    category: '승합차',
    price: '일 30만원',
    image: '/images/cars/solati_van.png',
    features: ['15인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '블랙박스']
  },
  {
    id: '2',
    name: '쏠라티 (화이트)',
    category: '승합차',
    price: '일 30만원',
    image: '/images/cars/solati2_van.png',
    features: ['15인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '블랙박스']
  },
  {
    id: '3',
    name: '스타리아',
    category: '승합차',
    price: '일 25만원',
    image: '/images/cars/staria_van.png',
    features: ['11인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '4',
    name: '스타렉스',
    category: '승합차',
    price: '일 20만원',
    image: '/images/cars/starex_van.png',
    features: ['12인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '5',
    name: '카니발 4세대',
    category: '승합차',
    price: '일 20만원',
    image: '/images/cars/carnival_gen4_van.png',
    features: ['11인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '6',
    name: '카니발 (블랙)',
    category: '승합차',
    price: '일 18만원',
    image: '/images/cars/carnival_black_van.png',
    features: ['11인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '7',
    name: '카니발',
    category: '승합차',
    price: '일 18만원',
    image: '/images/cars/carnival_van.png',
    features: ['11인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // 대형
  {
    id: '8',
    name: '벤츠 E250',
    category: '대형',
    price: '일 35만원',
    image: '/images/cars/benz_e250_large.png',
    features: ['프리미엄', '럭셔리', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '9',
    name: '벤츠 S350',
    category: '대형',
    price: '일 50만원',
    image: '/images/cars/benz_s350_large.png',
    features: ['최고급', '럭셔리', 'VIP', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '10',
    name: '벤츠 아방가르드',
    category: '대형',
    price: '일 35만원',
    image: '/images/cars/benz_avantgarde_large.png',
    features: ['프리미엄', '스포티', '럭셔리', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '11',
    name: '제네시스 G90',
    category: '대형',
    price: '일 40만원',
    image: '/images/cars/genesis_g90_large.png',
    features: ['국산 프리미엄', '럭셔리', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '12',
    name: '제네시스 G80',
    category: '대형',
    price: '일 30만원',
    image: '/images/cars/genesis_g80_large.png',
    features: ['국산 프리미엄', '세련된 디자인', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // SUV
  {
    id: '13',
    name: '스포티지 하이브리드',
    category: 'SUV',
    price: '일 15만원',
    image: '/images/cars/sportage_hybrid_suv.png',
    features: ['하이브리드', '연비 우수', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '14',
    name: 'QM6',
    category: 'SUV',
    price: '일 12만원',
    image: '/images/cars/qm6_suv.png',
    features: ['7인승', '넓은 공간', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '15',
    name: '쏘렌토',
    category: 'SUV',
    price: '일 14만원',
    image: '/images/cars/sorento_suv.png',
    features: ['7인승', '가족형', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '16',
    name: '산타페 MX',
    category: 'SUV',
    price: '일 16만원',
    image: '/images/cars/santafe_mx_suv.png',
    features: ['7인승', '넓은 공간', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '17',
    name: '산타페 TM',
    category: 'SUV',
    price: '일 16만원',
    image: '/images/cars/santafe_tm_suv.png',
    features: ['7인승', '최신형', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '18',
    name: '팰리세이드',
    category: 'SUV',
    price: '일 20만원',
    image: '/images/cars/palisade_suv.png',
    features: ['8인승', '프리미엄', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '19',
    name: '팰리세이드 2026',
    category: 'SUV',
    price: '일 20만원',
    image: '/images/cars/palisade_2026_suv.png',
    features: ['8인승', '최신형', '프리미엄', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '20',
    name: '모하비 더 마스터',
    category: 'SUV',
    price: '일 18만원',
    image: '/images/cars/mohave_master_suv.png',
    features: ['7인승', '고급감', '오프로드', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '21',
    name: 'GV80',
    category: 'SUV',
    price: '일 35만원',
    image: '/images/cars/gv80_suv.png',
    features: ['프리미엄', '럭셔리', '고급 SUV', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '22',
    name: '베뉴',
    category: 'SUV',
    price: '일 10만원',
    image: '/images/cars/venue_suv.png',
    features: ['소형 SUV', '경제적', '도심형', '열선시트', '후방카메라', '하이패스', '블랙박스']
  },

  // 준대형
  {
    id: '23',
    name: '그랜저 IG 르블랑',
    category: '준대형',
    price: '일 15만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['프리미엄', '넓은 실내', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '24',
    name: '그랜저 GN7',
    category: '준대형',
    price: '일 18만원',
    image: '/images/cars/grandeur_gn7_midlarge.png',
    features: ['최신형', '프리미엄', '넓은 실내', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // 중형
  {
    id: '25',
    name: 'K5 DL3',
    category: '중형',
    price: '일 12만원',
    image: '/images/cars/k5_dl3_fullsize.png',
    features: ['세련된 디자인', '연비', '열선시트', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '26',
    name: 'K5 DL3 2026',
    category: '중형',
    price: '일 14만원',
    image: '/images/cars/k5_dl3_2026_fullsize.png',
    features: ['최신형', '세련된 디자인', '첨단 기술', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '27',
    name: '소나타 DN8',
    category: '중형',
    price: '일 12만원',
    image: '/images/cars/sonata_dn8_fullsize.png',
    features: ['세련된 디자인', '연비', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '28',
    name: '소나타 The Edge 2026',
    category: '중형',
    price: '일 14만원',
    image: '/images/cars/sonata_edge_2026_fullsize.png',
    features: ['최신형', '스포티', '첨단 기술', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '29',
    name: 'SM6',
    category: '중형',
    price: '일 11만원',
    image: '/images/cars/sm6_fullsize.png',
    features: ['프렌치 세단', '독특한 디자인', '편안함', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // 준중형
  {
    id: '30',
    name: '아반떼 CN7',
    category: '준중형',
    price: '일 11만원',
    image: '/images/cars/avante_cn7_midsize.png',
    features: ['최신형', '연비', '안전성', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '31',
    name: '아반떼 AD',
    category: '준중형',
    price: '일 10만원',
    image: '/images/cars/avante_ad_midsize.png',
    features: ['검증된 모델', '연비', '안전성', '열선시트', '네비게이션', '후방카메라', '스마트키', '블랙박스']
  },
  {
    id: '32',
    name: 'K3',
    category: '준중형',
    price: '일 9만원',
    image: '/images/cars/k3_midsize.png',
    features: ['세련된 디자인', '연비', '젊은 감각', '열선시트', '후방카메라', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // 경차
  {
    id: '33',
    name: '레이',
    category: '경차',
    price: '일 8만원',
    image: '/images/cars/ray_compact.png',
    features: ['경제적', '주차 편리', '도심형', '열선시트', '후방카메라', '스마트키', '블랙박스']
  },
  {
    id: '34',
    name: '모닝',
    category: '경차',
    price: '일 8만원',
    image: '/images/cars/morning_compact.png',
    features: ['경제적', '주차 편리', '도심형', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '35',
    name: '모닝 (블랙)',
    category: '경차',
    price: '일 8만원',
    image: '/images/cars/morning_black_compact.png',
    features: ['경제적', '세련된 외관', '도심형', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '36',
    name: '스파크',
    category: '경차',
    price: '일 8만원',
    image: '/images/cars/spark_compact.png',
    features: ['경제적', '주차 편리', '도심형', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
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