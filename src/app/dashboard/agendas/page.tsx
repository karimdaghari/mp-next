import { DashboardHeader } from '~/components/dashboard-header';
import { AgendaCard } from './_components/agenda-card';
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
import { getAllAgendas } from '../_lib/data';

export default function DashboardAgendas() {
  const data = getAllAgendas();
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
