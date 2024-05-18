import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '~/components/ui/breadcrumb';
import { EventForm } from '../../_components/event-form';
import { getAgenda } from '~/app/dashboard/_lib/data';
import { redirect } from 'next/navigation';

export default function Page({
  searchParams: { from: id }
}: {
  searchParams: {
    from: string;
  };
}) {
  const data = getAgenda(id);

  if (!data) {
    redirect('/404');
  }

  const { name } = data;

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
              <Link href={`/dashboard/agendas/${id}`}>{name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Créer un nouvel événement</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <EventForm
        title='Créer un événement'
        description='Créez un nouvel événement en remplissant les champs ci-dessous.'
      />
    </>
  );
}
