import ReservationForm from '@/components/forms/ReservationForm';

export const metadata = {
  title: '예약 문의 | 인천공항 렌트카',
  description: '인천공항 렌트카 예약 문의를 남겨주세요. 빠른 시일 내에 연락드리겠습니다.',
};

export default function ReservationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">예약 문의</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <p className="text-gray-600 mb-8 text-center">
            아래 양식을 작성해 주시면 빠른 시일 내에 연락드리겠습니다.
          </p>
          <ReservationForm />
        </div>
      </div>
    </div>
  );
} 