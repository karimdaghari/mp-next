import {
  ArrowRight,
  CalendarClockIcon,
  CopyIcon,
  EditIcon,
  ExternalLink,
  Globe,
  Info,
  MapPin,
  MoreVerticalIcon,
  Rss,
  TrashIcon
} from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import {
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyMuted,
  TypographySmall
} from '~/components/ui/typography';
import { format, isPast, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import Link from 'next/link';
import { Separator } from '~/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';
import type { EventItem as Props } from '~/app/dashboard/_lib/types';

export function EventCard({
  id,
  name,
  cover,
  location,
  url,
  startDate,
  endDate,
  categories,
  likes,
  subscribers,
  isDraft = false,
  agendaId
}: Props) {
  let formattedDate = null;

  const formatDate = (date: string | Date) =>
    format(new Date(date), "dd MMMM à H'h'", {
      locale: fr
    });

  if (startDate && endDate) {
    if (isSameDay(new Date(startDate), new Date(endDate))) {
      formattedDate = formatDate(startDate);
    } else {
      formattedDate = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
  }

  const isPastEvent = startDate ? isPast(new Date(startDate)) : false;

  return (
    <Card>
      <CardContent className='p-0 relative h-52'>
        {isDraft && (
          <Badge className='top-1 right-1 absolute z-10'>Brouillon</Badge>
        )}
        {isPastEvent && (
          <div className='absolute z-10 h-full w-full flex flex-col justify-center items-center'>
            <TypographyLarge className='uppercase bg-accent text-sm px-3 py-2 rounded-lg'>
              événement terminé
            </TypographyLarge>
          </div>
        )}
        {cover ? (
          <img
            alt={name}
            src={cover}
            className={cn(
              'object-cover h-full w-full rounded-t-lg aspect-2/3',
              (isDraft || isPastEvent) && 'grayscale',
              isPastEvent && 'opacity-80'
            )}
          />
        ) : (
          <div className='h-full w-full bg-gray-200 rounded-t-lg aspect-2/3' />
        )}
      </CardContent>
      <CardFooter className='p-4 pt-2 grid gap-2'>
        <div className='grid gap-1'>
          {isDraft ? <Badge className='w-fit mx-auto'>Brouillon</Badge> : null}
          <TypographyLarge className='text-center'>{name}</TypographyLarge>
          <div>
            <div className='flex items-center'>
              <CalendarClockIcon className='w-4 h-4 mr-2' />
              <TypographyMuted>
                {formattedDate ?? 'Date(s) non définie(s)'}
              </TypographyMuted>
            </div>
            <div className='flex items-center'>
              <MapPin className='w-4 h-4 mr-2' />
              <TypographyMuted>{location ?? 'Lieu non défini'}</TypographyMuted>
            </div>
            {url ? (
              <TypographyMuted>
                <a
                  href={url}
                  className='inline-flex items-center hover:underline'>
                  <Info className='w-4 h-4 mr-2' />
                  Consulter le site web
                  <ExternalLink className='w-4 h-4 ml-2' />
                </a>
              </TypographyMuted>
            ) : (
              <div className='flex items-center'>
                <Info className='w-4 h-4 mr-2' />
                <TypographyMuted>Site web non défini</TypographyMuted>
              </div>
            )}
          </div>
        </div>
        {categories.length > 0 ? (
          <div className='flex items-center gap-1 flex-wrap'>
            {categories.map((c) => (
              <Badge
                key={c}
                variant='outline'>
                {c}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className='grid grid-cols-3 gap-1 my-2 justify-items-center'>
          <div className='text-center'>
            <TypographyH4>{isDraft ? '-' : likes}</TypographyH4>
            <TypographySmall>Likes</TypographySmall>
          </div>
          <Separator
            orientation='vertical'
            className='h-12'
          />
          <div className='text-center'>
            <TypographyH4>{isDraft ? '-' : subscribers}</TypographyH4>
            <TypographySmall>Participants</TypographySmall>
          </div>
        </div>

        <div className='flex items-center gap-1'>
          {!isDraft && (
            <Link
              className={buttonVariants({
                variant: 'secondary',
                className: 'w-full',
                size: 'sm'
              })}
              href={`/dashboard/agendas/${agendaId}/e/${id}`}>
              Consulter
              <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          )}
          {!isPastEvent && (
            <Link
              href={`/dashboard/agendas/${agendaId}/e/${id}/edit`}
              className={buttonVariants({
                size: 'sm',
                className: 'w-full'
              })}>
              Éditer <EditIcon className='w-4 h-4 ml-2' />
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
              {isDraft && (
                <DropdownMenuItem>
                  <Rss className='w-4 h-4 mr-2' />
                  Publier
                </DropdownMenuItem>
              )}
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
