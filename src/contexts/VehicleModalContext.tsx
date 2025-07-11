'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Vehicle } from '@/lib/vehicles';

interface VehicleModalContextType {
  selectedVehicle: Vehicle | null;
  isModalOpen: boolean;
  openModal: (vehicle: Vehicle) => void;
  closeModal: () => void;
}

const VehicleModalContext = createContext<VehicleModalContextType | undefined>(undefined);

export function VehicleModalProvider({ children }: { children: ReactNode }) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <VehicleModalContext.Provider value={{
      selectedVehicle,
      isModalOpen,
      openModal,
      closeModal
    }}>
      {children}
    </VehicleModalContext.Provider>
  );
}

export function useVehicleModal() {
  const context = useContext(VehicleModalContext);
  if (context === undefined) {
    throw new Error('useVehicleModal must be used within a VehicleModalProvider');
  }
  return context;
} 