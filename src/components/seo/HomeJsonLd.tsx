export default function HomeJsonLd() {
  // 메인 비즈니스 정보 JSON-LD
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://airportrent24.kr/#business",
    "name": "공항렌트24",
    "alternateName": "공항렌트24 인천공항점",
    "description": "공항렌트24에서 24시간 공항 픽업 렌터카 서비스를 제공합니다. 다양한 차종과 합리적 요금으로 안전하고 편안한 여행을 시작하세요.",
    "url": "https://airportrent24.kr",
    "logo": "https://airportrent24.kr/favicon.png",
    "image": [
      "https://airportrent24.kr/images/hero-bg.jpg",
      "https://airportrent24.kr/images/airport-bg.jpg"
    ],
    "telephone": "+82-010-8426-3821",
    "email": "charent@charentcar.com",
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
    "openingHours": [
      "Mo-Su 00:00-24:00"
    ],
    "priceRange": "₩70,000 - ₩500,000",
    "areaServed": [
      {
        "@type": "Place",
        "name": "인천광역시"
      },
      {
        "@type": "Place",
        "name": "서울특별시"
      },
      {
        "@type": "Place",
        "name": "경기도"
      }
    ],
    "serviceType": "자동차 렌탈",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "렌터카 서비스",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "경차 렌탈",
            "description": "연비가 우수하고 도심 주행에 적합한 경제적인 차량 렌탈"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "중형차 렌탈",
            "description": "넓은 실내공간과 안정적인 주행성능을 제공하는 차량 렌탈"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SUV 렌탈",
            "description": "넓은 공간과 높은 시야를 제공하는 다목적 차량 렌탈"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "승합차 렌탈",
            "description": "대가족이나 단체 여행에 적합한 대형 승합차 렌탈"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "324",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "김여행"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "인천공항에서 렌트해서 사용했는데 정말 깔끔하고 안전했습니다. 다음에도 이용할 예정입니다.",
        "datePublished": "2024-01-15"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "박고객"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "reviewBody": "차량 상태가 좋고 직원들이 친절했습니다. 가격도 합리적이었어요.",
        "datePublished": "2024-01-10"
      }
    ]
  };

  // 조직 정보 JSON-LD
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "공항렌트24",
    "alternateName": "공항렌트24 인천공항점",
    "url": "https://airportrent24.kr",
    "logo": "https://airportrent24.kr/favicon.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+82-32-427-5500",
        "contactType": "customer service",
        "availableLanguage": "Korean",
        "areaServed": "KR"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+82-32-427-5500",
        "contactType": "reservations",
        "availableLanguage": "Korean",
        "areaServed": "KR"
      }
    ],
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
    "name": "공항렌트24",
    "url": "https://airportrent24.kr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://airportrent24.kr/vehicles?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ JSON-LD
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "인천공항에서 렌터카를 어떻게 예약하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "전화(032-427-5500)로 예약하시거나 온라인 예약 시스템을 이용하실 수 있습니다. 24시간 예약 상담이 가능합니다."
        }
      },
      {
        "@type": "Question",
        "name": "공항 픽업 서비스가 무료인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 인천공항 제1터미널과 제2터미널에서 무료 픽업 서비스를 제공합니다."
        }
      },
      {
        "@type": "Question",
        "name": "렌터카 요금은 얼마인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "차종에 따라 일 7만원부터 50만원까지 다양합니다. 경차는 일 7만원, 중형차는 일 9-11만원, 대형차는 일 20-50만원입니다."
        }
      },
      {
        "@type": "Question",
        "name": "어떤 차종이 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "경차, 준중형, 중형, 준대형, 대형, SUV, 승합차 등 총 7개 카테고리에 36대의 다양한 차량을 보유하고 있습니다."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
} 