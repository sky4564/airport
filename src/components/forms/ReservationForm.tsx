'use client';

import { useSearchParams } from 'next/navigation';
import { getVehicleById } from '@/lib/vehicles';
import DriverRentForm from './DriverRentForm';
import DailyRentForm from './DailyRentForm';

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

