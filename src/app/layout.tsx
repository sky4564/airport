import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "블루윙카 | 인천공항 렌터카 전문 서비스",
  description: "블루윙카 인천공항점에서 제공하는 24시간 공항 픽업 렌터카 서비스. 다양한 차종, 합리적 요금, 보험 포함으로 안전하고 편안한 여행을 시작하세요.",
  keywords: "블루윙카, 인천공항 렌터카, 공항 픽업 서비스, 24시간 렌터카, 인천공항 차량 대여, 렌트카, 인천공항 렌트카, 공항렌터카, 차량대여, 렌터카 예약",
  openGraph: {
    title: "블루윙카 | 인천공항 렌터카 전문 서비스",
    description: "24시간 공항 픽업 서비스와 다양한 차종을 제공하는 블루윙카 인천공항점",
    type: "website",
    locale: "ko_KR",
    url: "https://byungmin.me",
    siteName: "블루윙카 인천공항점",
    images: [
      {
        url: "/images/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "블루윙카 인천공항 렌터카 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "블루윙카 | 인천공항 렌터카 전문 서비스",
    description: "24시간 공항 픽업 서비스와 다양한 차종을 제공하는 블루윙카 인천공항점",
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
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE", // 실제 구글 인증 코드로 교체
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
        {children}
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
