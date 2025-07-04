'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const carTypes = [
  { id: 'economy', name: '경차' },
  { id: 'compact', name: '준중형' },
  { id: 'midsize', name: '중형' },
  { id: 'suv', name: 'SUV' },
  { id: 'luxury', name: '고급형' },
];

export default function ReservationForm() {
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
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const pickupDate = watch('pickupDate');

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement email sending logic here
      console.log('Form submitted:', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-base font-bold text-gray-800 mb-2">
          이름 *
        </label>
        <input
          type="text"
          id="name"
          autoComplete="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
          placeholder="이름을 입력해주세요"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-base font-bold text-gray-800 mb-2">
          전화번호 *
        </label>
        <input
          type="tel"
          id="phone"
          autoComplete="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
          placeholder="010-0000-0000"
        />
        {errors.phone && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.phone.message}</p>
        )}
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pickupDate" className="block text-base font-bold text-gray-800 mb-2">
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
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
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
          <label htmlFor="pickupTime" className="block text-base font-bold text-gray-800 mb-2">
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
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
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
          <label htmlFor="returnDate" className="block text-base font-bold text-gray-800 mb-2">
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
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
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
          <label htmlFor="returnTime" className="block text-base font-bold text-gray-800 mb-2">
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
                className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 placeholder-gray-400 text-gray-900 text-base py-3 px-4 bg-white"
              />
            )}
          />
          {errors.returnTime && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.returnTime.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="carType" className="block text-base font-bold text-gray-800 mb-2">
          차종 *
        </label>
        <select
          id="carType"
          autoComplete="off"
          {...register('carType')}
          className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-gray-900 text-base py-3 px-4 bg-white"
        >
          <option value="" className="text-gray-500">차종을 선택해주세요</option>
          {carTypes.map((type) => (
            <option key={type.id} value={type.id} className="text-gray-900">
              {type.name}
            </option>
          ))}
        </select>
        {errors.carType && (
          <p className="mt-2 text-sm text-red-600 font-medium">{errors.carType.message}</p>
        )}
      </div>

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

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg transition-colors duration-200"
        >
          {isSubmitting ? '처리중...' : '문의하기'}
        </button>
      </div>
    </form>
  );
}