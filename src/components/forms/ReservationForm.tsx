'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getVehicleById, VEHICLE_CATEGORIES, Vehicle } from '@/lib/vehicles';
import Image from 'next/image';

const reservationSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().min(10, '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요').optional().or(z.literal('')),
  pickupDate: z.string().min(1, '픽업 날짜를 선택해주세요'),
  pickupTime: z.string().min(1, '픽업 시간을 선택해주세요'),
  returnDate: z.string().min(1, '반납 날짜를 선택해주세요'),
  returnTime: z.string().min(1, '반납 시간을 선택해주세요'),
  carType: z.string().min(1, '차종을 선택해주세요'),
  message: z.string().optional(),
});



// 기사포함 렌터카 전용 스키마
const driverRentSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().min(10, '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요').optional().or(z.literal('')),
  pickupDate: z.string().min(1, '픽업 날짜를 선택해주세요'),
  pickupTime: z.string().min(1, '픽업 시간을 선택해주세요'),
  returnDate: z.string().min(1, '반납 날짜를 선택해주세요'),
  returnTime: z.string().min(1, '반납 시간을 선택해주세요'),
  carType: z.string().min(1, '차종을 선택해주세요'),
  pickupLocation: z.string().min(1, '픽업 장소를 입력해주세요'),
  destination: z.string().min(1, '목적지를 입력해주세요'),
  passengerCount: z.string().min(1, '탑승 인원을 선택해주세요'),
  message: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;
type DriverRentFormData = z.infer<typeof driverRentSchema>;



// 기사포함 렌터카 컴포넌트
function DriverRentForm({ selectedVehicle }: { selectedVehicle: Vehicle | null; simplified?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const timePickerRef = useRef<DatePicker>(null);
  const returnTimePickerRef = useRef<DatePicker>(null);

  const PASSENGER_COUNTS = [
    { value: '1', label: '1명' },
    { value: '2', label: '2명' },
    { value: '3', label: '3명' },
    { value: '4', label: '4명' },
    { value: '5', label: '5명' },
    { value: '6', label: '6명' },
    { value: '7', label: '7명' },
    { value: '8', label: '8명' },
    { value: '9', label: '9명' },
    { value: '10+', label: '10명 이상' },
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<DriverRentFormData>({
    resolver: zodResolver(driverRentSchema),
  });

  useEffect(() => {
    if (selectedVehicle) {
      setValue('carType', selectedVehicle.category);
      setValue('message', `선택한 차량: ${selectedVehicle.name} (월간렌트카)\n\n추가 요청사항이 있으시면 위 내용 아래에 작성해주세요.`);
    }
  }, [selectedVehicle, setValue]);

  const onSubmit = async (data: DriverRentFormData) => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        reservationType: 'monthly',
        selectedVehicle: selectedVehicle ? {
          id: selectedVehicle.id,
          name: selectedVehicle.name,
          category: selectedVehicle.category,
          price: selectedVehicle.price
        } : null
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('월간렌트카 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">월간렌트카 신청이 완료되었습니다!</h2>
        <p className="text-gray-600 mb-6">담당자가 24시간 내에 연락드려 상세한 월간렌트카 조건을 안내해드리겠습니다.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-semibold">문의 전화: 010-1234-5678</p>
          <p className="text-blue-600 text-sm mt-1">급하신 경우 직접 전화 주세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">기사포함 렌터카 신청</h2>
        <p className="text-gray-600">더 편안하게 여행을 떠나보세요 !</p>
      </div>

      {/* 선택된 차량 정보 표시 */}
      {selectedVehicle && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">선택하신 차량</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-32 h-24 bg-white rounded-lg overflow-hidden">
              <Image
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                width={128}
                height={96}
                className="w-full h-full object-contain"
                style={{ padding: '4px' }}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-base mb-1">{selectedVehicle.name}</h4>
              <p className="text-blue-600 font-semibold text-sm mb-2">월간렌트카</p>
              <div className="flex flex-wrap gap-1">
                {selectedVehicle.features.slice(0, 3).map((feature: string, index: number) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 개인정보 입력 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-base font-bold text-gray-800 mb-2">이름 *</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
              placeholder="성함을 입력해주세요"
            />
            {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-base font-bold text-gray-800 mb-2">전화번호 *</label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
              placeholder="010-1234-5678"
            />
            {errors.phone && <p className="mt-2 text-sm text-red-600 font-medium">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-base font-bold text-gray-800 mb-2">이메일 (선택사항)</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
            placeholder="이메일을 입력해주세요 (선택사항)"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>}
        </div>

        {/* 픽업 및 반납 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pickupDate" className="block text-base font-bold text-gray-800 mb-2">픽업 날짜 *</label>
            <Controller
              name="pickupDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
                  placeholderText="픽업 날짜를 선택해주세요"
                />
              )}
            />
            {errors.pickupDate && <p className="mt-2 text-sm text-red-600 font-medium">{errors.pickupDate.message}</p>}
          </div>

          <div>
            <label htmlFor="pickupTime" className="block text-base font-bold text-gray-800 mb-2">픽업 시간 *</label>
            <Controller
              name="pickupTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  ref={timePickerRef}
                  selected={field.value ? new Date(`2000-01-01T${field.value}`) : null}
                  onChange={(time) => {
                    if (time) {
                      const hours = time.getHours().toString().padStart(2, '0');
                      const minutes = time.getMinutes().toString().padStart(2, '0');
                      field.onChange(`${hours}:${minutes}`);
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="시간"
                  dateFormat="HH:mm"
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
                  placeholderText="픽업 시간을 선택해주세요"
                />
              )}
            />
            {errors.pickupTime && <p className="mt-2 text-sm text-red-600 font-medium">{errors.pickupTime.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="returnDate" className="block text-base font-bold text-gray-800 mb-2">반납 날짜 *</label>
            <Controller
              name="returnDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
                  placeholderText="반납 날짜를 선택해주세요"
                />
              )}
            />
            {errors.returnDate && <p className="mt-2 text-sm text-red-600 font-medium">{errors.returnDate.message}</p>}
          </div>

          <div>
            <label htmlFor="returnTime" className="block text-base font-bold text-gray-800 mb-2">반납 시간 *</label>
            <Controller
              name="returnTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  ref={returnTimePickerRef}
                  selected={field.value ? new Date(`2000-01-01T${field.value}`) : null}
                  onChange={(time) => {
                    if (time) {
                      const hours = time.getHours().toString().padStart(2, '0');
                      const minutes = time.getMinutes().toString().padStart(2, '0');
                      field.onChange(`${hours}:${minutes}`);
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="시간"
                  dateFormat="HH:mm"
                  className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
                  placeholderText="반납 시간을 선택해주세요"
                />
              )}
            />
            {errors.returnTime && <p className="mt-2 text-sm text-red-600 font-medium">{errors.returnTime.message}</p>}
          </div>
        </div>

        {/* 픽업 장소 및 목적지 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pickupLocation" className="block text-base font-bold text-gray-800 mb-2">픽업 장소 *</label>
            <input
              type="text"
              id="pickupLocation"
              {...register('pickupLocation')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
              placeholder="예: 인천공항 제1터미널, 서울역 등"
            />
            {errors.pickupLocation && <p className="mt-2 text-sm text-red-600 font-medium">{errors.pickupLocation.message}</p>}
          </div>

          <div>
            <label htmlFor="destination" className="block text-base font-bold text-gray-800 mb-2">목적지 *</label>
            <input
              type="text"
              id="destination"
              {...register('destination')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
              placeholder="예: 강남역, 부산 해운대 등"
            />
            {errors.destination && <p className="mt-2 text-sm text-red-600 font-medium">{errors.destination.message}</p>}
          </div>
        </div>

        {/* 탑승 인원 및 차종 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="passengerCount" className="block text-base font-bold text-gray-800 mb-2">탑승 인원 *</label>
            <select
              id="passengerCount"
              {...register('passengerCount')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-gray-900 text-base py-3 px-4 bg-white"
            >
              <option value="">탑승 인원을 선택해주세요</option>
              {PASSENGER_COUNTS.map((count) => (
                <option key={count.value} value={count.value}>
                  {count.label}
                </option>
              ))}
            </select>
            {errors.passengerCount && <p className="mt-2 text-sm text-red-600 font-medium">{errors.passengerCount.message}</p>}
          </div>

          <div>
            <label htmlFor="carType" className="block text-base font-bold text-gray-800 mb-2">차종 *</label>
            <select
              id="carType"
              {...register('carType')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-gray-900 text-base py-3 px-4 bg-white"
            >
              <option value="">차종을 선택해주세요</option>
              {VEHICLE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.carType && !selectedVehicle && <p className="mt-2 text-sm text-red-600 font-medium">{errors.carType.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-base font-bold text-gray-800 mb-2">추가 요청사항</label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
            placeholder="기사포함 렌터카 관련 문의사항이나 특별한 요청사항이 있으시면 자세히 적어주세요."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors text-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? '처리중...' : '기사포함 렌터카 신청하기'}
        </button>
      </form>
    </div>
  );
}
// 일반 렌터카 예약 컴포넌트
function DailyRentForm({ selectedVehicle, simplified = false }: { selectedVehicle: Vehicle | null; simplified?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const timePickerRef = useRef<DatePicker>(null);
  const returnTimePickerRef = useRef<DatePicker>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  // URL에서 차량이 선택된 경우 해당 차량을 선택
  useEffect(() => {
    if (selectedVehicle) {
      setValue('carType', selectedVehicle.category);
      setValue('message', `선택한 차량: ${selectedVehicle.name} (${selectedVehicle.price})\n\n추가 요청사항이 있으시면 위 내용 아래에 작성해주세요.`);
    }
  }, [selectedVehicle, setValue]);

  const pickupDate = watch('pickupDate');

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        reservationType: 'daily',
        selectedVehicle: selectedVehicle ? {
          id: selectedVehicle.id,
          name: selectedVehicle.name,
          category: selectedVehicle.category,
          price: selectedVehicle.price
        } : null
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('예약 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">예약 신청이 완료되었습니다!</h2>
        <p className="text-gray-600 mb-6">담당자가 빠른 시간 내에 연락드려 예약을 확정해드리겠습니다.</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-semibold">문의 전화: 010-8426-3821</p>
          <p className="text-blue-600 text-sm mt-1">급하신 경우 직접 전화 주세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">렌터카 예약</h2>
        <p className="text-gray-600">아래 정보를 입력하시면 담당자가 연락드리겠습니다</p>
      </div>

      {/* 선택된 차량 정보 표시 */}
      {selectedVehicle && (
        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">선택하신 차량</h3>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-32 h-24 bg-white rounded-lg overflow-hidden">
              <Image
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                width={128}
                height={96}
                className="w-full h-full object-contain"
                style={{ padding: '4px' }}
              />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-base mb-1">{selectedVehicle.name}</h4>
              <p className="text-blue-600 font-semibold text-sm mb-2">{selectedVehicle.price}</p>
              <div className="flex flex-wrap gap-1">
                {selectedVehicle.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 기본 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
              이름 *
            </label>
            <input
              type="text"
              id="name"
              autoComplete="name"
              {...register('name')}
              className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
              placeholder="홍길동"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
              전화번호 *
            </label>
            <input
              type="tel"
              id="phone"
              autoComplete="tel"
              {...register('phone')}
              className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
              placeholder="010-1234-5678"
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {!simplified && (
          <div>
            <label htmlFor="email" className="block text-base font-bold text-gray-800 mb-2">
              이메일 <span className="text-gray-500 font-normal">(선택사항)</span>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
              placeholder="example@email.com (선택사항)"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pickupDate" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
              픽업 날짜 *
            </label>
            <Controller
              name="pickupDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
                  placeholderText="픽업 날짜를 선택하세요"
                />
              )}
            />
            {errors.pickupDate && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.pickupDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="pickupTime" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
              픽업 시간 *
            </label>
            <Controller
              name="pickupTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  ref={timePickerRef}
                  selected={field.value ? new Date(`1970-01-01T${field.value}:00`) : null}
                  onChange={(time) => {
                    if (time) {
                      const timeString = time.toTimeString().slice(0, 5);
                      field.onChange(timeString);
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="시간"
                  dateFormat="HH:mm"
                  className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
                  placeholderText="픽업 시간을 선택하세요"
                />
              )}
            />
            {errors.pickupTime && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.pickupTime.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="returnDate" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
              반납 날짜 *
            </label>
            <Controller
              name="returnDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                  dateFormat="yyyy-MM-dd"
                  minDate={pickupDate ? new Date(pickupDate) : new Date()}
                  className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
                  placeholderText="반납 날짜를 선택하세요"
                />
              )}
            />
            {errors.returnDate && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.returnDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="returnTime" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
              반납 시간 *
            </label>
            <Controller
              name="returnTime"
              control={control}
              render={({ field }) => (
                <DatePicker
                  ref={returnTimePickerRef}
                  selected={field.value ? new Date(`1970-01-01T${field.value}:00`) : null}
                  onChange={(time) => {
                    if (time) {
                      const timeString = time.toTimeString().slice(0, 5);
                      field.onChange(timeString);
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="시간"
                  dateFormat="HH:mm"
                  className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
                  placeholderText="반납 시간을 선택하세요"
                />
              )}
            />
            {errors.returnTime && (
              <p className="mt-2 text-sm text-red-600 font-medium">{errors.returnTime.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="carType" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
            {selectedVehicle ? '선택된 차량' : '희망 차종 *'}
          </label>
          {selectedVehicle ? (
            <div className="mt-1 block w-full rounded-md border border-blue-400 bg-blue-50 p-3">
              <div className="text-blue-800 font-semibold">{selectedVehicle.name} ({selectedVehicle.category})</div>
              <div className="text-blue-600 text-sm">{selectedVehicle.price}</div>
            </div>
          ) : (
            <select
              id="carType"
              autoComplete="off"
              {...register('carType')}
              className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
            >
              <option value="" className="text-gray-500">차종을 선택해주세요</option>
              {VEHICLE_CATEGORIES.filter(cat => cat !== '전체').map((category) => (
                <option key={category} value={category} className="text-gray-900">
                  {category}
                </option>
              ))}
            </select>
          )}
          {errors.carType && !selectedVehicle && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.carType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
            추가 요청사항 (선택사항)
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
            placeholder="특별한 요청사항이 있으시면 자세히 적어주세요."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors ${simplified ? 'text-sm' : 'text-lg'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? '처리중...' : '예약 신청하기'}
        </button>
      </form>
    </div>
  );
}

export default function ReservationForm({ simplified = false }: { simplified?: boolean }) {
  const searchParams = useSearchParams();
  const selectedVehicleId = searchParams.get('vehicle');
  const reservationType = searchParams.get('type');
  const selectedVehicle = selectedVehicleId ? getVehicleById(selectedVehicleId) || null : null;

  const isDriverRent = reservationType === 'driver';


  // 기사포함 렌터카인 경우 별도 컴포넌트 렌더링
  if (isDriverRent) {
    return <DriverRentForm selectedVehicle={selectedVehicle} simplified={simplified} />;
  }


  // 일반 렌터카 예약 컴포넌트 렌더링
  return <DailyRentForm selectedVehicle={selectedVehicle} simplified={simplified} />;
}

