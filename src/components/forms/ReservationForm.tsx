'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const reservationSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),
  phone: z.string().min(10, '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  pickupDate: z.string().min(1, '픽업 날짜를 선택해주세요'),
  pickupTime: z.string().min(1, '픽업 시간을 선택해주세요'),
  carType: z.string().min(1, '차종을 선택해주세요'),
  message: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const carTypes = [
  { id: 'economy', name: '경제형' },
  { id: 'compact', name: '준중형' },
  { id: 'midsize', name: '중형' },
  { id: 'suv', name: 'SUV' },
  { id: 'luxury', name: '고급형' },
];

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

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
        <h3 className="text-xl font-semibold text-green-800 mb-2">문의가 접수되었습니다</h3>
        <p className="text-green-600 mb-4">빠른 시일 내에 연락드리겠습니다.</p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="text-green-600 hover:text-green-800 underline"
        >
          새로운 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          이름 *
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          전화번호 *
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          이메일 *
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
            픽업 날짜 *
          </label>
          <input
            type="date"
            id="pickupDate"
            {...register('pickupDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.pickupDate && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
            픽업 시간 *
          </label>
          <input
            type="time"
            id="pickupTime"
            {...register('pickupTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.pickupTime && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupTime.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="carType" className="block text-sm font-medium text-gray-700">
          차종 *
        </label>
        <select
          id="carType"
          {...register('carType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">차종을 선택해주세요</option>
          {carTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.carType && (
          <p className="mt-1 text-sm text-red-600">{errors.carType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          추가 요청사항
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '처리중...' : '문의하기'}
        </button>
      </div>
    </form>
  );
} 