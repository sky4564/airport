'use client';

interface ChannelTalkButtonProps {
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: 'default' | 'compact' | 'banner';
  className?: string;
}

export default function ChannelTalkButton({
  title = "💬 실시간 상담 문의",
  description = "폼 작성이 어렵거나 빠른 상담이 필요하신가요? 채널톡으로 바로 문의해보세요!",
  buttonText = "💬 바로 문의하기",
  variant = 'default',
  className = ""
}: ChannelTalkButtonProps) {
  const handleChannelTalkClick = () => {
    if (typeof window !== 'undefined' && 'ChannelIO' in window) {
      (window as Window & { ChannelIO: (action: string) => void }).ChannelIO('show');
    } else {
      // 채널톡이 없는 경우 전화번호로 안내
      alert('실시간 상담: 032-427-5500\n또는 아래 폼을 작성해주세요.');
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleChannelTalkClick}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${className}`}
      >
        {buttonText}
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-blue-100 text-sm font-bold">{description}</p>
          </div>
          <button
            type="button"
            onClick={handleChannelTalkClick}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap w-full sm:w-auto"
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }

  // default variant
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-blue-200 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm font-extrabold">{description}</p>
        </div>
        <button
          type="button"
          onClick={handleChannelTalkClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
} 