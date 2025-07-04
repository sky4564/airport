import Image from 'next/image';

type SocialButtonProps = {
  href: string;
  imgSrc: string;
  alt: string;
  label: string;
};

export default function SocialButton({ href, imgSrc, alt, label }: SocialButtonProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200"
    >
      <Image src={imgSrc} alt={alt} width={24} height={24} className="mr-2" />
      <span className="font-semibold text-gray-900">{label}</span>
    </a>
  );
} 