'use client';
import {
  ArrowUpRight,
  CalendarRange,
  GalleryVerticalEnd,
  Home,
  SearchIcon
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '~/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '~/components/ui/command';
import type { AgendaItem } from '../_lib/types';

interface Props {
  data: AgendaItem[];
}

export function QuickAccess({ data }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        size='sm'
        variant='outline'
        className='w-full flex items-center justify-between shadow'
        onClick={() => setOpen(true)}>
        <div className='flex items-center text-gray-500'>
          <SearchIcon className='h-4 w-4 lg:mr-2' />
          <span className='hidden lg:inline'>Centre de commandes...</span>
        </div>
        <kbd className='hidden pointer-events-none lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 text-muted-foreground.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}>
        <CommandInput placeholder='Rechercher un agenda, un événement, etc...' />
        <CommandList>
          <CommandEmpty>Aucun résultat.</CommandEmpty>
          <CommandGroup heading='Agendas & Events'>
            {data.map((agenda) => (
              <CommandGroup
                className='[&_[cmdk-group-heading]]:pl-0 [&_[cmdk-group-heading]]:text-sm'
                key={agenda.id}
                heading={
                  <div className='flex items-center justify-between w-full'>
                    <span className='flex items-center gap-2'>
                      <CalendarRange className='h-4 w-4' />
                      {agenda.name}
                    </span>
                    <Link
                      onClick={() => setOpen(false)}
                      href={`/dashboard/agendas/${agenda.id}`}
                      className={buttonVariants({
                        size: 'sm',
                        variant: 'outline',
                        className:
                          'py-1 text-muted-foreground h-fit w-fit px-2 text-xs'
                      })}>
                      <ArrowUpRight className='h-4 w-4 mr-1 text-muted-foreground' />
                      Consulter agenda
                    </Link>
                  </div>
                }>
                {agenda.events.map((e) => {
                  return (
                    <CommandItem
                      key={e.id}
                      asChild
                      className='ml-2 pl-2 border-l rounded-l-none'>
                      <Link
                        href={`/dashboard/agendas/${agenda.id}/e/${e.id}`}
                        onClick={() => setOpen(false)}>
                        {e.name}
                      </Link>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandGroup>
          <CommandSeparator className='mb-2' />
          <CommandGroup heading='Accès rapide'>
            <CommandItem asChild>
              <Link
                className='flex items-center'
                href='/dashboard'
                onClick={() => setOpen(false)}>
                <Home className='h-4 w-4 mr-2 text-muted-foreground' />
                <span>Dashboard</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link
                className='flex items-center'
                href='/dashboard/agendas'
                onClick={() => setOpen(false)}>
                <CalendarRange className='h-4 w-4 mr-2 text-muted-foreground' />
                <span>Mes agendas</span>
              </Link>
            </CommandItem>
            <CommandItem asChild>
              <Link
                className='flex items-center'
                href='/dashboard/history'
                onClick={() => setOpen(false)}>
                <GalleryVerticalEnd className='h-4 w-4 mr-2 text-muted-foreground' />
                <span>Historique</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
