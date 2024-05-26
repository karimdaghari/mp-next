'use client';
import {
  Edit,
  EditIcon,
  History,
  HistoryIcon,
  MoreVertical
} from 'lucide-react';
import { buttonVariants } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '~/components/ui/sheet';
import { AgendaForm } from '../_components/agenda-form';
import {
  HistoryList,
  type Props as HistoryListProps
} from '../_components/history-list';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useState } from 'react';
import type { AgendaItem } from '../../_lib/types';
import { TypographyMuted } from '~/components/ui/typography';

interface Props {
  name: string;
  history: AgendaItem['history'];
}

export function AgendaOptions({ history, name }: Props) {
  const [showHistory, setShowHistory] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <Sheet
        open={showHistory}
        onOpenChange={setShowHistory}>
        <Dialog
          open={showEdit}
          onOpenChange={setShowEdit}>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: 'secondary',
                size: 'icon',
                className: 'ml-2 h-7 w-7'
              })}>
              <MoreVertical className='w-4 h-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuItem onSelect={() => setShowEdit(true)}>
                <EditIcon className='w-4 h-4 mr-2' />
                Modifier {"l'agenda"}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setShowHistory(true);
                }}>
                <HistoryIcon className='w-4 h-4 mr-2' />
                Historique de {"l'agenda"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className='max-w-xs sm:max-w-sm lg:max-w-xl'>
            <DialogHeader>
              <DialogTitle>Modifier {"l'agenda"}</DialogTitle>
            </DialogHeader>
            <ScrollArea className='max-h-[75dvh] lg:max-h-[80dvh] xl:max-h-full'>
              <AgendaForm />
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <SheetContent>
          <SheetHeader className='mb-8'>
            <div>
              <SheetTitle className='flex items-center'>
                <HistoryIcon className='w-4 h-4 mr-1' />
                Historique de {"l'agenda"}
              </SheetTitle>
              <SheetDescription>{name}</SheetDescription>
            </div>
          </SheetHeader>
          <ScrollArea className='h-[calc(100dvh-8rem)]'>
            {history && history?.length > 0 ? (
              <HistoryList data={history} />
            ) : (
              <TypographyMuted>
                Aucune modification {"n'a"} été effectuée sur cet agenda.
              </TypographyMuted>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
