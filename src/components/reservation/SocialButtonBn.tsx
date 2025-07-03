import SocialButton from '@/components/reservation/SocialButton';

const SOCIALS = [
  {
    href: 'https://www.instagram.com/cha_rent_car/',
    imgSrc: '/images/instagram.png',
    alt: '인스타그램',
    label: '인스타그램',
  },
  {
    href: 'http://pf.kakao.com/_XxgxjyK',
    imgSrc: '/images/kakao.png',
    alt: '카카오톡',
    label: '카카오톡',
  },
  {
    href: 'https://www.charentcar.com',
    imgSrc: '/images/homepage.jpg',
    alt: '공식홈페이지',
    label: '공식홈페이지',
  },
  {
    href: 'https://blog.naver.com/charentercar',
    imgSrc: '/images/naver.png',
    alt: '네이버톡톡',
    label: '네이버톡톡',
  },
];

export default function SocialButtonBn() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {SOCIALS.map((item) => (
        <SocialButton key={item.href} {...item} />
      ))}
    </div>
  );
} 