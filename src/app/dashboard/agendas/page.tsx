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
import { getAllCategories, getAllCategoriesTree } from '../_lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { ListTreeIcon, NetworkIcon } from 'lucide-react';
import { TypographyH4, TypographyMuted } from '~/components/ui/typography';
import { Tree } from './[id]/_components/tree';

export default function DashboardAgendas() {
  const categories = getAllCategories();
  const tree = getAllCategoriesTree();

  return (
    <>
      <DashboardHeader
        title='Mes agendas'
        description='Gérez vos agendas et vos événements'
      />
      <Tabs defaultValue='list'>
        <AgendaFilters
          viewSwitcher={
            <TabsList className='bg-accent'>
              <TabsTrigger value='list'>
                <ListTreeIcon className='w-4 h-4 mr-2' />
                Liste
              </TabsTrigger>
              <TabsTrigger value='tree'>
                <NetworkIcon className='w-4 h-4 mr-2' />
                Arborescence
              </TabsTrigger>
            </TabsList>
          }
        />
        <TabsContent
          value='list'
          className='grid gap-8 my-4'>
          {categories.map((category) => {
            const data = category.agendas;
            return (
              <div
                key={category.id}
                className='space-y-2'>
                <div>
                  <TypographyMuted className='text-xs'>
                    Catégorie
                  </TypographyMuted>
                  <TypographyH4>{category.name}</TypographyH4>
                </div>
                {data.length ? (
                  <div className='grid lg:grid-cols-3 gap-2 lg:pl-1'>
                    {data.map((item) => (
                      <AgendaCard
                        key={item.id}
                        {...item}
                      />
                    ))}
                  </div>
                ) : (
                  <TypographyMuted>
                    Aucun agenda {"n'a"} été créé pour cette catégorie.
                  </TypographyMuted>
                )}
              </div>
            );
          })}
        </TabsContent>
        <TabsContent
          value='tree'
          className='my-4'>
          <Tree data={tree} />
        </TabsContent>
      </Tabs>

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
