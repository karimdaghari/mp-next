import { TypographyLarge, TypographyMuted } from '~/components/ui/typography';
import { EventPreview } from '../../_components/event-preview';
import { StatCard } from '~/app/dashboard/_components/stat-card';
import { Heart, Users } from 'lucide-react';

export default function Page() {
  return (
    <div className='grid grid-cols-2 gap-1'>
      <div className='space-y-1'>
        <div className='grid grid-cols-2 gap-1'>
          <StatCard
            icon={Heart}
            title='Likes'
            value={6}
          />
          <StatCard
            icon={Users}
            title='Participants'
            value={6}
          />
        </div>
        <div className='bg-white border rounded-lg p-4'>event page</div>
      </div>
      <div className='bg-white border rounded-lg p-4'>
        <div>
          <TypographyLarge>Prévisualisation de {"l'événement"}</TypographyLarge>
          <TypographyMuted>
            Visualisez {"l'événement"} tel {"qu'il"} sera affiché
          </TypographyMuted>
        </div>
        <div className='scale-90'>
          <EventPreview />
        </div>
      </div>
    </div>
  );
}
