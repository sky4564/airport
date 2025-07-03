import HeroMessageCard from '@/components/reservation/HeroMessageCard';
import HeroEventCard from '@/components/reservation/HeroEventCard';

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-6 justify-between h-full">
      <HeroMessageCard />
      <HeroEventCard />
    </div>
  );
} 