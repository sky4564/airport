'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getVehicleById, VEHICLE_CATEGORIES } from '@/lib/vehicles';
import Image from 'next/image';

const reservationSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().min(10, '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  pickupDate: z.string().min(1, '픽업 날짜를 선택해주세요'),
  pickupTime: z.string().min(1, '픽업 시간을 선택해주세요'),
  returnDate: z.string().min(1, '반납 날짜를 선택해주세요'),
  returnTime: z.string().min(1, '반납 시간을 선택해주세요'),
  carType: z.string().min(1, '차종을 선택해주세요'),
  message: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export default function ReservationForm({ simplified = false }: { simplified?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const timePickerRef = useRef<DatePicker>(null);
  const returnTimePickerRef = useRef<DatePicker>(null);
  const searchParams = useSearchParams();
  const selectedVehicleId = searchParams.get('vehicle');
  const selectedVehicle = selectedVehicleId ? getVehicleById(selectedVehicleId) : null;

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
      // 이메일 전송 API 호출
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('이메일 전송에 실패했습니다.');
      }

      const result = await response.json();
      console.log('이메일 전송 성공:', result);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('문의 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-3">문의가 접수되었습니다</h3>
        <p className="text-green-700 mb-4 text-base leading-relaxed">빠른 시일 내에 연락드리겠습니다.</p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-green-700 hover:text-green-900 underline font-medium"
        >
          새로운 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-${simplified ? '4' : '6'}`}>
      {/* 선택된 차량 정보 표시 */}
      {selectedVehicle && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">선택된 차량</h3>
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

      <div className={simplified ? 'grid grid-cols-1 gap-4' : ''}>
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
            placeholder="이름을 입력해주세요"
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
            placeholder="010-0000-0000"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {!simplified && (
        <div>
          <label htmlFor="email" className="block text-base font-bold text-gray-800 mb-2">
            이메일 *
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
          )}
        </div>
      )}

      <div className={simplified ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
        <div>
          <label htmlFor="pickupDate" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
            픽업 날짜 *
          </label>
          <Controller
            control={control}
            name="pickupDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  field.onChange(date?.toISOString().split('T')[0] || '');
                  if (date && timePickerRef.current) {
                    setTimeout(() => {
                      timePickerRef.current?.setFocus();
                    }, 100);
                  }
                }}
                dateFormat="yyyy/MM/dd"
                placeholderText="날짜를 선택해주세요"
                className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
                minDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
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
            control={control}
            name="pickupTime"
            render={({ field }) => (
              <DatePicker
                ref={timePickerRef}
                selected={field.value ? new Date(`2024-01-01T${field.value}`) : null}
                onChange={(date) => {
                  if (date) {
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    field.onChange(`${hours}:${minutes}`);
                  } else {
                    field.onChange('');
                  }
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                timeCaption="시간"
                dateFormat="HH:mm"
                placeholderText="시간을 선택해주세요"
                className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
              />
            )}
          />
          {errors.pickupTime && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.pickupTime.message}</p>
          )}
        </div>
      </div>

      <div className={simplified ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
        <div>
          <label htmlFor="returnDate" className={`block ${simplified ? 'text-sm' : 'text-base'} font-bold text-gray-800 mb-2`}>
            반납 날짜 *
          </label>
          <Controller
            control={control}
            name="returnDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  field.onChange(date?.toISOString().split('T')[0] || '');
                  if (date && returnTimePickerRef.current) {
                    setTimeout(() => {
                      returnTimePickerRef.current?.setFocus();
                    }, 100);
                  }
                }}
                dateFormat="yyyy/MM/dd"
                placeholderText="날짜를 선택해주세요"
                className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
                minDate={pickupDate ? new Date(pickupDate) : new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
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
            control={control}
            name="returnTime"
            render={({ field }) => (
              <DatePicker
                ref={returnTimePickerRef}
                selected={field.value ? new Date(`2024-01-01T${field.value}`) : null}
                onChange={(date) => {
                  if (date) {
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    field.onChange(`${hours}:${minutes}`);
                  } else {
                    field.onChange('');
                  }
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={10}
                timeCaption="시간"
                dateFormat="HH:mm"
                placeholderText="시간을 선택해주세요"
                className={`mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 ${simplified ? 'text-sm py-2 px-3' : 'text-base py-3 px-4'} bg-white`}
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

      {!simplified && (
        <div>
          <label htmlFor="message" className="block text-base font-bold text-gray-800 mb-2">
            추가 요청사항
          </label>
          <textarea
            id="message"
            rows={4}
            autoComplete="off"
            {...register('message')}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white resize-none"
            placeholder="추가 요청사항이 있으시면 입력해주세요"
          />
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors duration-200 ${simplified ? 'py-2 px-4 text-base' : 'py-3 px-4 text-lg'}`}
        >
          {isSubmitting ? '처리중...' : '문의하기'}
        </button>
      </div>
    </form>
  );
}