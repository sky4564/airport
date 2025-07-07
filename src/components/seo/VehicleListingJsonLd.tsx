import { VEHICLES } from '@/lib/vehicles'

export default function VehicleListingJsonLd() {
  // 메인 자동차 렌탈 서비스 JSON-LD
  const carRentalService = {
    "@context": "https://schema.org",
    "@type": "AutomotiveRentalService",
    "name": "차렌터카_인천공항점",
    "description": "인천공항에서 다양한 차종의 렌터카 서비스를 제공합니다. 경차부터 대형차, SUV, 승합차까지 합리적인 가격으로 안전하고 편안한 여행을 도와드립니다.",
    "url": "https://yourwebsite.com/vehicles",
    "logo": "https://yourwebsite.com/logo.png",
    "image": "https://yourwebsite.com/images/hero-bg.jpg",
    "telephone": "+82-10-1234-5678",
    "email": "info@airportrentcar.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "인천국제공항",
      "addressLocality": "중구",
      "addressRegion": "인천광역시",
      "postalCode": "22382",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.4691",
      "longitude": "126.4505"
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "₩70,000 - ₩500,000",
    "areaServed": {
      "@type": "Place",
      "name": "인천광역시, 서울특별시, 경기도"
    },
    "serviceType": "자동차 렌탈",
    "brand": {
      "@type": "Brand",
      "name": "차렌터카_인천공항점"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "324",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "차량 렌탈 서비스",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "경차",
          "description": "연비가 우수하고 도심 주행에 적합한 경제적인 차량"
        },
        {
          "@type": "OfferCatalog",
          "name": "준중형",
          "description": "적당한 크기와 연비를 갖춘 실용적인 차량"
        },
        {
          "@type": "OfferCatalog",
          "name": "중형",
          "description": "넓은 실내공간과 안정적인 주행성능을 제공하는 차량"
        },
        {
          "@type": "OfferCatalog",
          "name": "준대형",
          "description": "고급스러운 내장재와 편안한 승차감을 제공하는 프리미엄 차량"
        },
        {
          "@type": "OfferCatalog",
          "name": "대형",
          "description": "최고급 럭셔리 차량으로 VIP 서비스 제공"
        },
        {
          "@type": "OfferCatalog",
          "name": "SUV",
          "description": "넓은 공간과 높은 시야를 제공하는 다목적 차량"
        },
        {
          "@type": "OfferCatalog",
          "name": "승합차",
          "description": "대가족이나 단체 여행에 적합한 대형 승합차"
        }
      ]
    },
    "offers": VEHICLES.slice(0, 10).map(vehicle => ({
      "@type": "Offer",
      "name": `${vehicle.name} 렌탈`,
      "description": `${vehicle.category} ${vehicle.name} 차량 렌탈 서비스`,
      "price": vehicle.price.replace(/[^0-9]/g, ''),
      "priceCurrency": "KRW",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "validThrough": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      "itemOffered": {
        "@type": "Car",
        "name": vehicle.name,
        "brand": vehicle.name.split(' ')[0],
        "model": vehicle.name,
        "vehicleConfiguration": vehicle.category,
        "numberOfDoors": vehicle.category === '승합차' ? 4 : 4,
        "seatingCapacity": vehicle.features.find(f => f.includes('인승'))?.replace('인승', '') || "5",
        "fuelType": vehicle.features.includes('하이브리드') ? 'Hybrid' : 'Gasoline'
      }
    }))
  };

  // 조직 정보 JSON-LD
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "차렌터카_인천공항점",
    "alternateName": "차렌터카 인천공항점",
    "url": "https://yourwebsite.com",
    "logo": "https://yourwebsite.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-10-1234-5678",
      "contactType": "customer service",
      "availableLanguage": "Korean",
      "areaServed": "KR"
    },
    "sameAs": [
      "https://www.facebook.com/yourpage",
      "https://www.instagram.com/yourpage",
      "https://blog.naver.com/yourpage"
    ]
  };

  // 웹사이트 정보 JSON-LD
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "차렌터카_인천공항점",
    "url": "https://yourwebsite.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourwebsite.com/vehicles?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // 빵부스러기 네비게이션 JSON-LD
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": "https://yourwebsite.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "차량안내",
        "item": "https://yourwebsite.com/vehicles"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carRentalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
} 