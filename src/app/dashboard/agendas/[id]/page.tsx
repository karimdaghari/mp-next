import { faker } from '@faker-js/faker';
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
import { type EventCardProps, EventCard } from './_components/event-card';
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

export async function getData() {
  const events = [
    ...Array.from({ length: 11 }).map(() => ({
      id: '1',
      name: 'Rennes v Lens',
      location: 'Rohazon park',
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      categories: ['Football', 'Sport'],
      cover:
        'https://www.lequipe.fr/_medias/img-photo-jpg/-/1500000001962022/0-828-552-75/c7bba',
      url: 'https://example.com',
      description: 'Description',
      likes: 100,
      subscribers: 1030
    }))
  ] satisfies EventCardProps[];

  const data = {
    name: 'Ligue 1',
    description: 'Championnat de France de football',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Ligue1_logo.png',
    cover:
      'https://cdn.sportmob.com/resource/news/20210822_974201/cover.webp?cache=1629651257',
    events
  };

  return data;
}

export default async function Page() {
  const { events, name, description, logo } = await getData();

  return (
    <Card>
      <CardHeader className='space-y-4 flex-col flex'>
        <div className='flex items-center'>
          <Avatar className='mr-2 h-12 w-12'>
            <AvatarImage
              src={logo}
              alt={name}
            />
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
            href={`/dashboard/agendas/1/e/new`}
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
  );
}
