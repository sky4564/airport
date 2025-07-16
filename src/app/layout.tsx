import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { VehicleModalProvider } from '@/contexts/VehicleModalContext';
import { GlobalVehicleModal } from '@/components/ui';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://byungmin.me'),
  title: "공항렌트24 | 인천공항 렌터카 24시간 픽업 서비스 | Incheon Airport Car Rental",
  description: "공항렌트24에서 제공하는 24시간 인천공항 픽업 렌터카 서비스. 다양한 차종, 합리적 요금, 보험 포함으로 안전하고 편안한 여행을 시작하세요. 24-hour Incheon Airport car rental pickup service with various vehicles and competitive rates.",
  keywords: "공항렌트24, 인천공항 렌터카, 공항 픽업 서비스, 24시간 렌터카, 인천공항 차량 대여, 렌트카, 인천공항 렌트카, 공항렌터카, 차량대여, 렌터카 예약, Incheon Airport car rental, airport pickup service, 24 hour car rental, ICN airport car rental, Korea car rental, airport car hire, rental car Incheon, car rental pickup service",
  openGraph: {
    title: "공항렌트24 | 인천공항 렌터카 24시간 픽업 서비스 | Incheon Airport Car Rental",
    description: "24시간 공항 픽업 서비스와 다양한 차종을 제공하는 공항렌트24 | 24-hour airport pickup service with various vehicles at Incheon Airport",
    type: "website",
    locale: "ko_KR",
    url: "https://byungmin.me",
    siteName: "공항렌트24 | Airport Rent 24",
    images: [
      {
        url: "/images/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "공항렌트24 인천공항 렌터카 서비스 | Incheon Airport Car Rental Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "공항렌트24 | 인천공항 렌터카 24시간 픽업 서비스 | Incheon Airport Car Rental",
    description: "24시간 공항 픽업 서비스와 다양한 차종을 제공하는 공항렌트24 | 24-hour airport pickup service with various vehicles",
    images: ["/images/homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://byungmin.me",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  other: {
    "naver-site-verification": "1d254abc76002dff39643953fd1a731278ed2ecb",
    "google-site-verification": "8REgZkeqz7avfv1LHjaxohwUGShEgbh5ENGo5suoBGY",
    "google-site-verification-2": "s4vZjtHvGIFNQqx7eqkvxQmRr--0IHulZy5er4dHVqA",

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VehicleModalProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <GlobalVehicleModal />
        </VehicleModalProvider>
        {/* 채널톡 위젯: pluginKey에 본인 키를 입력하세요 */}
        <Script
          id="channel-talk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var w = window;
                if (w.ChannelIO) {
                  return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
                }
                var ch = function() {
                  ch.c(arguments);
                };
                ch.q = [];
                ch.c = function(args) {
                  ch.q.push(args);
                };
                w.ChannelIO = ch;
                function l() {
                  if (w.ChannelIOInitialized) {
                    return;
                  }
                  w.ChannelIOInitialized = true;
                  var s = document.createElement('script');
                  s.type = 'text/javascript';
                  s.async = true;
                  s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
                  var x = document.getElementsByTagName('script')[0];
                  if (x.parentNode) {
                    x.parentNode.insertBefore(s, x);
                  }
                }
                if (document.readyState === 'complete') {
                  l();
                } else if (window.attachEvent) {
                  window.attachEvent('onload', l);
                } else {
                  window.addEventListener('DOMContentLoaded', l, false);
                  window.addEventListener('load', l, false);
                }
              })();
              ChannelIO('boot', {
                "pluginKey": "39320c76-d53e-4c6e-b412-921ceca3bcbb"
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
