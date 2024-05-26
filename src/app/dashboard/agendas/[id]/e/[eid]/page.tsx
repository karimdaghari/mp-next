import { TypographyLarge, TypographyMuted } from '~/components/ui/typography';
import { EventPreview } from '../../_components/event-preview';
import { StatCard } from '~/app/dashboard/_components/stat-card';
import { Heart, Users } from 'lucide-react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '~/components/ui/breadcrumb';
import { getEvent } from '~/app/dashboard/_lib/data';
import { redirect } from 'next/navigation';

export default function Page({
  params: { id, eid }
}: {
  params: {
    id: string;
    eid: string;
  };
}) {
  const event = getEvent(Number(eid));

  if (!event) {
    redirect('/404');
  }

  const { agenda, name, description } = event;

  return (
    <>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard/agendas'>Mes agendas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/agendas/${id}`}>{agenda.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid gap-1 max-w-2xl mx-auto'>
        <div className='space-y-1'>
          <div className='grid lg:grid-cols-2 gap-1'>
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
          <div className='bg-white border rounded-lg p-4'>
            <div>
              <TypographyLarge>{name}</TypographyLarge>
              <TypographyMuted>{description}</TypographyMuted>
            </div>
            <div className='scale-90'>
              <EventPreview />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
