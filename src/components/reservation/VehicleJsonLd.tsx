export default function VehicleJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "인천공항 렌트카 서비스",
    "description": "인천공항에서 다양한 차종의 렌트카 서비스를 제공합니다. 소형차부터 대형차까지 합리적인 요금으로 안전하고 편안한 여행을 도와드립니다.",
    "brand": {
      "@type": "Brand",
      "name": "인천공항 렌트카"
    },
    "category": "자동차 렌트 서비스",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "KRW",
      "price": "50000",
      "priceValidUntil": "2024-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": "인천공항 렌트카",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "인천",
          "addressRegion": "인천광역시",
          "addressCountry": "KR"
        },
        "telephone": "+82-32-123-4567"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156"
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
        "reviewBody": "인천공항에서 렌트해서 사용했는데 정말 깔끔하고 안전했습니다. 다음에도 이용할 예정입니다."
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
        "reviewBody": "차량 상태가 좋고 직원들이 친절했습니다. 가격도 합리적이었어요."
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "차량 종류",
        "value": "소형차, 중형차, 대형차, SUV, 밴"
      },
      {
        "@type": "PropertyValue",
        "name": "대여 기간",
        "value": "1일 ~ 30일"
      },
      {
        "@type": "PropertyValue",
        "name": "수령 장소",
        "value": "인천공항 제1터미널, 제2터미널"
      },
      {
        "@type": "PropertyValue",
        "name": "보험 포함",
        "value": "기본 보험 포함"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 