'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TabSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('airport');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'driver') {
      setActiveTab('driver');
    } else {
      setActiveTab('airport');
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const currentParams = new URLSearchParams(searchParams.toString());

    if (tab === 'driver') {
      currentParams.set('type', 'driver');
    } else {
      currentParams.delete('type');
    }

    router.push(`/reservation?${currentParams.toString()}`);
  };

  return (
    <div className="flex mb-6">
      <button
        onClick={() => handleTabChange('airport')}
        className={`flex-1 text-center py-3 rounded-t-lg font-bold text-base transition-colors ${activeTab === 'airport'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
      >
        공항렌터카
      </button>
      <button
        onClick={() => handleTabChange('driver')}
        className={`flex-1 text-center py-3 rounded-t-lg font-bold text-base transition-colors ${activeTab === 'driver'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
      >
        기사포함 렌터카
      </button>
    </div>
  );
} 