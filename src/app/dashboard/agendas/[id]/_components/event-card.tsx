import {
  ArrowRight,
  CalendarClockIcon,
  CopyIcon,
  EditIcon,
  ExternalLink,
  Globe,
  MapPin,
  MoreVerticalIcon,
  TrashIcon
} from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import { Card, CardContent, CardFooter } from '~/components/ui/card';
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographySmall
} from '~/components/ui/typography';
import { format, isSameDay } from 'date-fns';
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

export interface EventCardProps {
  id: number | string;
  name: string;
  description?: string | null;
  cover?: string | null;
  location?: string;
  url?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  categories: string[];
  likes: number;
  subscribers: number;
  isDraft?: boolean;
}

export function EventCard({
  id,
  name,
  description,
  cover,
  location,
  url,
  startDate,
  endDate,
  categories,
  likes,
  subscribers,
  isDraft = false
}: EventCardProps) {
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

  return (
    <Card>
      <CardContent className='p-0 relative'>
        {cover ? (
          <>
            {isDraft && (
              <Badge className='top-2 right-2 absolute z-20'>Brouillon</Badge>
            )}
            <img
              alt={name}
              src={cover}
              className={cn(
                'object-cover h-72 w-full rounded-t-lg',
                isDraft && 'grayscale'
              )}
            />
          </>
        ) : (
          <div className='h-72 w-full bg-gray-200 rounded-t-lg' />
        )}
      </CardContent>
      <CardFooter className='p-4 pt-2 grid gap-2'>
        <div className='grid gap-1'>
          <div className='flex items-center justify-center'>
            <TypographyH3>{name}</TypographyH3>
            {isDraft ? (
              <Badge
                variant='outline'
                className='ml-2'>
                Brouillon
              </Badge>
            ) : null}
          </div>
          <div>
            {formattedDate ? (
              <div className='flex items-center'>
                <CalendarClockIcon className='w-4 h-4 mr-2' />
                <TypographyMuted>{formattedDate}</TypographyMuted>
              </div>
            ) : null}
            {location ? (
              <div className='flex items-center'>
                <MapPin className='w-4 h-4 mr-2' />
                <TypographyMuted>{location}</TypographyMuted>
              </div>
            ) : null}
            {url ? (
              <TypographyMuted>
                <a
                  href={url}
                  className='inline-flex items-center hover:underline'>
                  <Globe className='w-4 h-4 mr-2' />
                  Consulter le site web
                  <ExternalLink className='w-4 h-4 ml-2' />
                </a>
              </TypographyMuted>
            ) : null}
          </div>
        </div>
        {description && <TypographyMuted>{description}</TypographyMuted>}
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
              href={`/dashboard/agendas/${id}/e/${id}`}>
              Consulter
              <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          )}
          <Link
            href={`/dashboard/agendas/${id}/e/${id}/edit`}
            className={buttonVariants({
              size: 'sm',
              className: 'w-full'
            })}>
            Éditer <EditIcon className='w-4 h-4 ml-2' />
          </Link>
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
