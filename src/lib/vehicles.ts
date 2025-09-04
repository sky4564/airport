export interface Vehicle {
  id: string;
  name: string;
  type?: string; // A, B, C 등으로 구분
  category: '승합차' | '대형' | 'SUV' | '준대형' | '중형' | '준중형' | '경차';
  price: string;
  image: string;
  features: string[];
  baseModel?: string; // 기본 모델명 (검색용)
}

export const VEHICLE_CATEGORIES = ['전체', '승합차', '대형', 'SUV', '준대형', '중형', '준중형', '경차'] as const;

export const VEHICLES: Vehicle[] = [
  // 승합차 (ID: 1-10)
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
    name: '쏠라티',
    category: '승합차',
    price: '일 30만원',
    image: '/images/cars/solati2_van.png',
    features: ['15인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '블랙박스']
  },
  {
    id: '3',
    name: '스타리아',
    category: '승합차',
    price: '일 17만원',
    image: '/images/cars/staria_van.png',
    features: ['11인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  {
    id: '5',
    name: '그랜드스타렉스',
    category: '승합차',
    price: '일 13만원',
    image: '/images/cars/starex_van.png',
    features: ['12인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '6',
    name: '그랜드스타렉스',
    category: '승합차',
    price: '일 13만원',
    image: '/images/cars/starex_van.png',
    features: ['12인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '7',
    name: '카니발',
    category: '승합차',
    price: '일 13만원',
    image: '/images/cars/carnival_van.png',
    features: ['7인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '8',
    name: '카니발',
    category: '승합차',
    price: '일 13만원',
    image: '/images/cars/carnival_van.png',
    features: ['7인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '9',
    name: '카니발',
    category: '승합차',
    price: '일 13만원',
    image: '/images/cars/carnival_van.png',
    features: ['7인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '10',
    name: '더뉴카니발',
    category: '승합차',
    price: '일 15만원',
    image: '/images/cars/carnival_gen4_van.png',
    features: ['7인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '68',
    name: '2026 카니발',
    category: '승합차',
    price: '일 17만원',
    image: '/images/cars/2026_carnival.png',
    features: ['7인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스', '디지털클러스터', '무선충전']
  },

  // 대형 (ID: 11-17)
  {
    id: '11',
    name: '벤츠 E250',
    type: 'A',
    baseModel: '벤츠 E250',
    category: '대형',
    price: '일 25만원',
    image: '/images/cars/benz_e250_large.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '12',
    name: '벤츠 E250',
    type: 'B',
    baseModel: '벤츠 E250',
    category: '대형',
    price: '일 25만원',
    image: '/images/cars/benz_e250_large.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '13',
    name: '벤츠 E250',
    type: 'B',
    baseModel: '벤츠 E250',
    category: '대형',
    price: '일 25만원',
    image: '/images/cars/benz_e250_large.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '14',
    name: '벤츠 E250',
    type: 'C',
    baseModel: '벤츠 E250',
    category: '대형',
    price: '일 25만원',
    image: '/images/cars/benz_e250_large.png',
    features: ['5인승', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '15',
    name: '벤츠 S350',
    category: '대형',
    price: '일 50만원',
    image: '/images/cars/benz_s350_large.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '16',
    name: '제네시스 G90',
    category: '대형',
    price: '일 25만원',
    image: '/images/cars/genesis_g90_large.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '17',
    name: '제네시스 G80',
    category: '대형',
    price: '일 20만원',
    image: '/images/cars/genesis_g80_large.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '70',
    name: '벤츠 E200',
    category: '대형',
    price: '일 25만원',
    image: '/images/cars/benz_e200_large.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // SUV (ID: 18-37)
  {
    id: '18',
    name: '스포티지 하이브리드',
    category: 'SUV',
    price: '일 15만원',
    image: '/images/cars/sportage_hybrid_suv.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '19',
    name: '스포티지',
    type: 'A',
    baseModel: '스포티지',
    category: 'SUV',
    price: '일 13만원',
    image: '/images/cars/sportage_hybrid_suv.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '20',
    name: '스포티지',
    type: 'B',
    baseModel: '스포티지',
    category: 'SUV',
    price: '일 13만원',
    image: '/images/cars/sportage_hybrid_suv.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '21',
    name: 'QM6',
    type: 'A',
    baseModel: 'QM6',
    category: 'SUV',
    price: '일 11만원',
    image: '/images/cars/qm6_suv.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '22',
    name: 'QM6',
    type: 'A',
    baseModel: 'QM6',
    category: 'SUV',
    price: '일 11만원',
    image: '/images/cars/qm6_suv.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '23',
    name: 'QM6',
    type: 'A',
    baseModel: 'QM6',
    category: 'SUV',
    price: '일 11만원',
    image: '/images/cars/qm6_suv.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '24',
    name: 'QM6',
    type: 'B',
    baseModel: 'QM6',
    category: 'SUV',
    price: '일 11만원',
    image: '/images/cars/qm6_suv.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '25',
    name: 'QM6',
    type: 'B',
    baseModel: 'QM6',
    category: 'SUV',
    price: '일 11만원',
    image: '/images/cars/qm6_suv.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '26',
    name: 'QM6',
    type: 'B',
    baseModel: 'QM6',
    category: 'SUV',
    price: '일 11만원',
    image: '/images/cars/qm6_suv.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '27',
    name: '쏘렌토',
    type: 'A',
    baseModel: '쏘렌토',
    category: 'SUV',
    price: '일 12만원',
    image: '/images/cars/sorento_suv.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '28',
    name: '쏘렌토',
    type: 'B',
    baseModel: '쏘렌토',
    category: 'SUV',
    price: '일 12만원',
    image: '/images/cars/sorento_suv.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '69',
    name: '2026 쏘렌토',
    category: 'SUV',
    price: '일 15만원',
    image: '/images/cars/2026_sorento.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스', '디지털클러스터', '무선충전']
  },
  {
    id: '29',
    name: '산타페',
    type: 'A',
    baseModel: '산타페',
    category: 'SUV',
    price: '일 15만원',
    image: '/images/cars/santafe_mx_suv.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '30',
    name: '산타페',
    type: 'B',
    baseModel: '산타페',
    category: 'SUV',
    price: '일 13만원',
    image: '/images/cars/santafe_tm_suv.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '31',
    name: '산타페',
    type: 'C',
    baseModel: '산타페',
    category: 'SUV',
    price: '일 13만원',
    image: '/images/cars/santafe_tm_suv.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '32',
    name: '산타페',
    type: 'D',
    baseModel: '산타페',
    category: 'SUV',
    price: '일 13만원',
    image: '/images/cars/santafe_tm_suv.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '33',
    name: '팰리세이드',
    type: 'B',
    baseModel: '팰리세이드',
    category: 'SUV',
    price: '일 17만원',
    image: '/images/cars/palisade_2026_suv.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '34',
    name: '모하비 더 마스터',
    category: 'SUV',
    price: '일 15만원',
    image: '/images/cars/mohave_master_suv.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '35',
    name: 'GV80',
    category: 'SUV',
    price: '일 25만원',
    image: '/images/cars/gv80_suv.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '36',
    name: '베뉴',
    category: 'SUV',
    price: '일 8만원',
    image: '/images/cars/venue_suv.png',
    features: ['5인승', '열선시트', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '37',
    name: '베뉴',
    category: 'SUV',
    price: '일 8만원',
    image: '/images/cars/venue_suv.png',
    features: ['5인승', '열선시트', '후방카메라', '하이패스', '블랙박스']
  },

  // 준대형 (ID: 38-48)
  {
    id: '38',
    name: '그랜저',
    type: 'A',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '39',
    name: '그랜저',
    type: 'B',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '40',
    name: '그랜저',
    type: 'B',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '41',
    name: '그랜저',
    type: 'B',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '42',
    name: '그랜저',
    type: 'C',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '43',
    name: '그랜저',
    type: 'C',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '44',
    name: '그랜저',
    type: 'B',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '45',
    name: '그랜저',
    type: 'C',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '46',
    name: '그랜저',
    type: 'B',
    baseModel: '그랜저',
    category: '준대형',
    price: '일 12만원',
    image: '/images/cars/grandeur_ig_leblanc_midlarge.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '47',
    name: '그랜저 GN7',
    type: 'A',
    baseModel: '그랜저 GN7',
    category: '준대형',
    price: '일 15만원',
    image: '/images/cars/grandeur_gn7_midlarge.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '48',
    name: '그랜저 GN7',
    type: 'B',
    baseModel: '그랜저 GN7',
    category: '준대형',
    price: '일 15만원',
    image: '/images/cars/grandeur_gn7_midlarge.png',
    features: ['5인승', '통풍시트', '선루프', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // 중형 (ID: 49-56)
  {
    id: '49',
    name: 'K5',
    category: '중형',
    price: '일 10만원',
    image: '/images/cars/k5_dl3_fullsize.png',
    features: ['5인승', '열선시트', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '50',
    name: 'K5',
    category: '중형',
    price: '일 10만원',
    image: '/images/cars/k5_dl3_fullsize.png',
    features: ['5인승', '열선시트', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '51',
    name: 'K5',
    category: '중형',
    price: '일 10만원',
    image: '/images/cars/k5_dl3_fullsize.png',
    features: ['5인승', '열선시트', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '52',
    name: 'K5 2026',
    category: '중형',
    price: '일 11만원',
    image: '/images/cars/k5_dl3_2026_fullsize.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '53',
    name: '쏘나타',
    category: '중형',
    price: '일 10만원',
    image: '/images/cars/sonata_dn8_fullsize.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '54',
    name: '쏘나타',
    category: '중형',
    price: '일 10만원',
    image: '/images/cars/sonata_dn8_fullsize.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '55',
    name: '쏘나타 디 엣지',
    category: '중형',
    price: '일 11만원',
    image: '/images/cars/sonata_edge_2026_fullsize.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '56',
    name: 'SM6',
    category: '중형',
    price: '일 9만원',
    image: '/images/cars/sm6_fullsize.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // 준중형 (ID: 57-61)
  {
    id: '57',
    name: '아반떼',
    category: '준중형',
    price: '일 8만원',
    image: '/images/cars/avante_ad_midsize.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '스마트키', '블랙박스']
  },
  {
    id: '58',
    name: '아반떼',
    category: '준중형',
    price: '일 8만원',
    image: '/images/cars/avante_ad_midsize.png',
    features: ['5인승', '열선시트', '네비게이션', '후방카메라', '스마트키', '블랙박스']
  },
  {
    id: '59',
    name: '아반떼 CN7',
    category: '준중형',
    price: '일 9만원',
    image: '/images/cars/avante_cn7_midsize.png',
    features: ['5인승', '통풍시트', '열선시트', '네비게이션', '후방카메라', '하이패스', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '60',
    name: 'K3',
    category: '준중형',
    price: '일 8만원',
    image: '/images/cars/k3_midsize.png',
    features: ['5인승', '열선시트', '후방카메라', '크루즈컨트롤', '스마트키', '블랙박스']
  },
  {
    id: '61',
    name: 'K3',
    category: '준중형',
    price: '일 8만원',
    image: '/images/cars/k3_midsize.png',
    features: ['5인승', '열선시트', '후방카메라', '크루즈컨트롤', '스마트키', '블랙박스']
  },

  // 경차 (ID: 62-67)
  {
    id: '62',
    name: '레이',
    category: '경차',
    price: '일 7만원',
    image: '/images/cars/ray_compact.png',
    features: ['4인승', '열선시트', '후방카메라', '스마트키', '블랙박스']
  },
  {
    id: '63',
    name: '모닝',
    category: '경차',
    price: '일 7만원',
    image: '/images/cars/morning_compact.png',
    features: ['4인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '64',
    name: '모닝',
    category: '경차',
    price: '일 7만원',
    image: '/images/cars/morning_compact.png',
    features: ['4인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '65',
    name: '모닝',
    category: '경차',
    price: '일 7만원',
    image: '/images/cars/morning_compact.png',
    features: ['4인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '66',
    name: '스파크',
    category: '경차',
    price: '일 7만원',
    image: '/images/cars/spark_compact.png',
    features: ['4인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
  },
  {
    id: '67',
    name: '스파크',
    category: '경차',
    price: '일 7만원',
    image: '/images/cars/spark_compact.png',
    features: ['4인승', '열선시트', '네비게이션', '후방카메라', '하이패스', '블랙박스']
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

// 검색용: 동일한 모델은 하나만 반환 (대표 차량)
export const getUniqueVehicles = (): Vehicle[] => {
  const uniqueVehicles: Vehicle[] = [];
  const modelNames = new Set<string>();

  VEHICLES.forEach(vehicle => {
    const modelKey = vehicle.baseModel || vehicle.name;
    if (!modelNames.has(modelKey)) {
      modelNames.add(modelKey);
      uniqueVehicles.push(vehicle);
    }
  });

  return uniqueVehicles;
};

// 동일 모델의 모든 타입 반환
export const getVehicleTypes = (baseModel: string): Vehicle[] => {
  return VEHICLES.filter(vehicle =>
    (vehicle.baseModel || vehicle.name) === baseModel
  );
};

// 차량 타입별 옵션 비교 유틸리티 함수들
export interface OptionComparison {
  addedOptions: string[];
  removedOptions: string[];
  commonOptions: string[];
}

// 두 차량의 옵션을 비교하여 추가/제거된 옵션 분석
export const compareVehicleOptions = (currentVehicle: Vehicle, targetVehicle: Vehicle): OptionComparison => {
  const currentFeatures = new Set(currentVehicle.features);
  const targetFeatures = new Set(targetVehicle.features);

  const addedOptions: string[] = [];
  const removedOptions: string[] = [];
  const commonOptions: string[] = [];

  // 추가된 옵션 찾기
  targetFeatures.forEach(feature => {
    if (!currentFeatures.has(feature)) {
      addedOptions.push(feature);
    } else {
      commonOptions.push(feature);
    }
  });

  // 제거된 옵션 찾기
  currentFeatures.forEach(feature => {
    if (!targetFeatures.has(feature)) {
      removedOptions.push(feature);
    }
  });

  return {
    addedOptions,
    removedOptions,
    commonOptions
  };
};

// 차량 타입들을 정렬하여 기본 타입(A)을 먼저 반환 (타입별로 하나씩만)
export const getSortedVehicleTypes = (baseModel: string): Vehicle[] => {
  const allTypes = getVehicleTypes(baseModel);
  const uniqueTypes: Vehicle[] = [];
  const seenTypes = new Set<string>();

  // 타입별로 첫 번째 차량만 선택
  allTypes.forEach(vehicle => {
    const typeKey = vehicle.type || 'base';
    if (!seenTypes.has(typeKey)) {
      seenTypes.add(typeKey);
      uniqueTypes.push(vehicle);
    }
  });

  // 타입 순서로 정렬 (타입 없음 → A → B → C)
  return uniqueTypes.sort((a, b) => {
    if (!a.type && !b.type) return 0;
    if (!a.type) return -1;
    if (!b.type) return 1;
    return a.type.localeCompare(b.type);
  });
};

// 기본 타입(A 또는 첫 번째 타입) 가져오기
export const getBaseVehicleType = (baseModel: string): Vehicle | null => {
  const types = getSortedVehicleTypes(baseModel);
  return types.length > 0 ? types[0] : null;
}; 