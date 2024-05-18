import {
  ArrowRight,
  CopyIcon,
  EditIcon,
  MoreVerticalIcon,
  TrashIcon
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '~/components/ui/dialog';
import { Separator } from '~/components/ui/separator';
import { TypographyLarge, TypographySmall } from '~/components/ui/typography';
import { AgendaForm } from './agenda-form';
import { cn } from '~/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import type { AgendaItem as Props } from '../../_lib/types';

export function AgendaCard({
  id,
  name,
  description,
  logo,
  cover,
  eventsNumber,
  attendanceRate,
  isDraft = false
}: Props) {
  return (
    <Card className='duration-500 hover:shadow-xl transition-all ease-in-out'>
      <CardContent className='p-0 relative'>
        {isDraft && (
          <Badge className='top-1 right-1 absolute z-20'>Brouillon</Badge>
        )}
        {cover ? (
          <img
            alt={name}
            src={cover}
            className={cn(
              'object-cover h-52 w-full rounded-t-lg aspect-2/3',
              isDraft && 'grayscale'
            )}
          />
        ) : (
          <div className='h-52 w-full bg-gray-200 rounded-t-lg aspect-2/3' />
        )}
        <div className='absolute w-full flex items-center justify-center -bottom-9'>
          <Avatar className='h-20 w-20'>
            {logo ? <AvatarImage src={logo} /> : null}
            <AvatarFallback>
              <TypographyLarge>{name[0]}</TypographyLarge>
            </AvatarFallback>
          </Avatar>
          {isDraft ? (
            <Badge className='absolute -bottom-2'>Brouillon</Badge>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className='px-0 p-4 pt-12 grid gap-8 text-center'>
        <div>
          <TypographyLarge>{name}</TypographyLarge>
        </div>
        <div className='flex items-center justify-between px-2'>
          <div>
            <TypographyLarge>
              {eventsNumber === null ? '-' : eventsNumber}
            </TypographyLarge>
            <TypographySmall>Événements</TypographySmall>
          </div>
          <Separator
            orientation='vertical'
            className='inline-block h-12'
          />
          <div>
            <TypographyLarge>
              {attendanceRate === null ? '-' : `${attendanceRate.toFixed(0)}`}
            </TypographyLarge>
            <TypographySmall>Participants</TypographySmall>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <Dialog>
            <DialogTrigger
              className={buttonVariants({
                className: 'w-full',
                size: 'sm'
              })}>
              Éditer <EditIcon className='w-4 h-4 ml-2' />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier {"l'agenda"}</DialogTitle>
                <DialogDescription>
                  Finissez de configurer votre agenda avant de le publier.
                </DialogDescription>
              </DialogHeader>
              <AgendaForm />
            </DialogContent>
          </Dialog>
          {!isDraft && (
            <Link
              className={buttonVariants({
                variant: 'secondary',
                className: 'w-full',
                size: 'sm'
              })}
              href={`/dashboard/agendas/${id}`}>
              Consulter
              <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm'
              })}>
              <MoreVerticalIcon className='w-4 h-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CopyIcon className='w-4 h-4 mr-2' />
                Dupliquer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrashIcon className='w-4 h-4 mr-2' />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
