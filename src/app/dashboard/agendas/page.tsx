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
      <div className='grid lg:grid-cols-3 gap-2 my-4'>
        {data.map((item) => (
          <AgendaCard
            key={item.id}
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
          <PaginationItem className='lg:block hidden'>
            <PaginationLink href='#'>2</PaginationLink>
          </PaginationItem>
          <PaginationItem className='lg:block hidden'>
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
