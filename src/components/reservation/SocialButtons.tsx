import Image from 'next/image';

export default function SocialButtons() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
        <Image src="/images/instagram.svg" alt="인스타그램" width={24} height={24} className="mr-2" />
        <span className="font-semibold text-gray-800">인스타그램</span>
      </a>
      <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
        <Image src="/images/blog.svg" alt="블로그" width={24} height={24} className="mr-2" />
        <span className="font-semibold text-gray-800">블로그</span>
      </a>
      <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
        <Image src="/images/kakao.svg" alt="카카오채널" width={24} height={24} className="mr-2" />
        <span className="font-semibold text-gray-800">카카오채널</span>
      </a>
      <a href="#" className="flex items-center justify-center bg-white rounded-lg border p-3 hover:bg-gray-50 transition-colors duration-200">
        <Image src="/images/talk.svg" alt="톡톡" width={24} height={24} className="mr-2" />
        <span className="font-semibold text-gray-800">톡톡</span>
      </a>
    </div>
  );
} 