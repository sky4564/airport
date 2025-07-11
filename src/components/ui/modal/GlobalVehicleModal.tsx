'use client';

import { useVehicleModal } from '@/contexts/VehicleModalContext';
import { VehicleDetailModal } from './';

export default function GlobalVehicleModal() {
  const { selectedVehicle, isModalOpen, closeModal } = useVehicleModal();

  return (
    <VehicleDetailModal
      vehicle={selectedVehicle}
      isOpen={isModalOpen}
      onClose={closeModal}
    />
  );
} 