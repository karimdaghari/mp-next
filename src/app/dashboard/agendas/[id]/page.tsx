import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { buttonVariants } from '~/components/ui/button';
import { CalendarPlus, PlusIcon, Ticket, UserCheck2 } from 'lucide-react';
import { EventCard } from './_components/event-card';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { AgendaForm } from '../_components/agenda-form';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext
} from '~/components/ui/pagination';
import { EventsFilters } from './_components/events-filters';
import { StatCard } from '../../_components/stat-card';
import { getAgenda } from '../../_lib/data';
import { redirect } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '~/components/ui/breadcrumb';

export default async function Page({
  params: { id }
}: {
  params: {
    id: string;
  };
}) {
  const data = getAgenda(id);

  if (!data) {
    redirect('/404');
  }

  const { events, name, description, logo } = data;

  return (
    <div className='space-y-4'>
      <Breadcrumb>
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
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader className='space-y-4 flex-col flex'>
          <div className='flex items-center'>
            <Avatar className='mr-2 h-12 w-12'>
              {logo ? (
                <AvatarImage
                  src={logo}
                  alt={name}
                />
              ) : null}
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className='flex items-center'>
                <CardTitle>{name}</CardTitle>
                <Dialog>
                  <DialogTrigger
                    className={buttonVariants({
                      variant: 'secondary',
                      size: 'sm',
                      className: 'ml-2'
                    })}>
                    Éditer
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier {"l'agenda"}</DialogTitle>
                    </DialogHeader>
                    <AgendaForm />
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <StatCard
              title='Événements'
              value={events.length}
              icon={Ticket}
            />
            <StatCard
              title='Followers'
              value={+(events.length * 10.5).toFixed(0)}
              icon={UserCheck2}
            />
            <StatCard
              title='Abonnements'
              value={events.length * 20}
              icon={CalendarPlus}
            />
          </div>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <EventsFilters />
          <div className='grid grid-cols-4 gap-2'>
            <Link
              href={`/dashboard/agendas/${id}/e/new?from=${encodeURIComponent(
                id
              )}
                `}
              className={buttonVariants({
                className:
                  'h-full w-full flex flex-col justify-center items-center bg-transparent border-dotted',
                variant: 'outline'
              })}>
              <PlusIcon className='h-8 w-8 mb-1' />
              Créer un nouvel événement
            </Link>
            {events.map((item) => (
              <EventCard
                key={Math.random()}
                {...item}
              />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href='#'
                  isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
}
