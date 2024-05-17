import { DashboardHeader } from '~/components/dashboard-header';
import { AgendaCard, type AgendaCardProps } from './_components/agenda-card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination';
import { AgendaFilters } from './_components/agenda-filters';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { AgendaForm } from './_components/agenda-form';

async function getData() {
  const data = [
    {
      id: '1',
      name: 'Ligue 1',
      description: 'Championnat de France de football',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Ligue1_logo.png',
      cover:
        'https://cdn.sportmob.com/resource/news/20210822_974201/cover.webp?cache=1629651257',
      attendanceRate: 80,
      eventsNumber: 100
    },
    {
      id: '2',
      name: 'Premier League',
      description: "Championnat d'Angleterre de football",
      attendanceRate: 70,
      eventsNumber: 200,
      logo: 'https://banner2.cleanpng.com/20180619/xjx/kisspng-201819-premier-league-201718-premier-league-premier-league-darts-5b29cac07bad32.8241975115294655365066.jpg',
      cover:
        'https://newsghana.com.gh/wp-content/uploads/2022/08/The-Showmax-Pro-Premier-League-Preview-Cover.jpg'
    },
    {
      id: '2',
      name: 'La Liga',
      description: 'Championnat espagnol de football',
      attendanceRate: null,
      eventsNumber: null,
      cover:
        'https://newsghana.com.gh/wp-content/uploads/2022/08/The-Showmax-Pro-Premier-League-Preview-Cover.jpg',
      isDraft: true
    }
  ] satisfies AgendaCardProps[];

  return data;
}

export default async function DashboardAgendas() {
  const data = await getData();
  return (
    <>
      <DashboardHeader
        title='Mes agendas'
        description='Gérez vos agendas et vos événements'
      />
      <AgendaFilters />
      <div className='grid gap-4 my-4'>
        <div className='grid grid-cols-4 gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className='flex flex-col h-full bg-transparent border-dashed'
                variant='outline'>
                <Plus />
                Créer un agenda
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un agenda</DialogTitle>
                <DialogDescription>
                  Créez un nouvel agenda pour organiser vos événements.
                </DialogDescription>
              </DialogHeader>
              <AgendaForm />
            </DialogContent>
          </Dialog>
          {data.map((item) => (
            <AgendaCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
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
    </>
  );
}
