import {
  ArrowRight,
  CopyIcon,
  EditIcon,
  Lock,
  MoreVerticalIcon,
  Rss,
  TrashIcon
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card';
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '~/components/ui/dialog';
import { Separator } from '~/components/ui/separator';
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall
} from '~/components/ui/typography';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '~/components/ui/tooltip';
import { ScrollArea } from '~/components/ui/scroll-area';

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
      <CardHeader className='p-0 relative mb-12 space-y-0'>
        {isDraft && (
          <Badge className='top-1 right-1 absolute z-20'>Brouillon</Badge>
        )}
        {cover ? (
          <img
            alt={name}
            src={cover}
            className={cn(
              'object-cover h-52 w-full rounded-t-lg aspect-2/3 border-b',
              isDraft && 'grayscale'
            )}
          />
        ) : (
          <div className='h-52 w-full bg-gray-200 rounded-t-lg aspect-2/3 border-b' />
        )}
        <div className='absolute w-full flex items-center justify-center -bottom-9'>
          <Avatar className='h-20 w-20 border'>
            {logo ? <AvatarImage src={logo} /> : null}
            <AvatarFallback>
              <TypographyLarge>{name[0]}</TypographyLarge>
            </AvatarFallback>
          </Avatar>
          {isDraft ? (
            <Badge className='absolute -bottom-2'>Brouillon</Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className='grid gap-2'>
        <div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className='cursor-auto text-left'>
                <CardTitle className='text-lg line-clamp-1'>{name}</CardTitle>
              </TooltipTrigger>
              <TooltipContent className='max-w-40'>
                <TypographySmall>Nom</TypographySmall>
                <TypographyMuted>{name}</TypographyMuted>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className='cursor-auto text-left'>
                <CardDescription className='line-clamp-2'>
                  {description ??
                    "Aucune description n'a été renseignée pour cet agenda. Veuillez en ajouter une."}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent className='max-w-80'>
                <TypographySmall>Description</TypographySmall>
                <TypographyMuted>
                  {description ??
                    "Aucune description n'a été renseignée pour cet agenda. Veuillez en ajouter une."}
                </TypographyMuted>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex items-center justify-between px-2'>
          <div className='text-center'>
            <TypographyLarge>
              {eventsNumber === null ? '-' : eventsNumber}
            </TypographyLarge>
            <TypographySmall>Événements</TypographySmall>
          </div>
          <Separator
            orientation='vertical'
            className='inline-block h-12'
          />
          <div className='text-center'>
            <TypographyLarge>
              {attendanceRate === null ? '-' : `${attendanceRate.toFixed(0)}`}
            </TypographyLarge>
            <TypographySmall>Participants</TypographySmall>
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-4 flex items-center gap-1 border-t'>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              className: 'w-full',
              size: 'sm'
            })}>
            Éditer <EditIcon className='w-4 h-4 ml-2' />
          </DialogTrigger>
          <DialogContent className='max-w-[22rem] lg:max-w-lg'>
            <DialogHeader>
              <DialogTitle>Modifier {"l'agenda"}</DialogTitle>
              <DialogDescription>
                Finissez de configurer votre agenda avant de le publier.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className='max-h-[75dvh] lg:max-h-full'>
              <AgendaForm
                input={{
                  id,
                  name,
                  description,
                  logo,
                  cover,
                  eventsNumber,
                  attendanceRate,
                  isDraft
                }}
              />
            </ScrollArea>
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
            {isDraft ? (
              <DropdownMenuItem>
                <Rss className='w-4 h-4 mr-2' />
                Publier
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem>
              <CopyIcon className='w-4 h-4 mr-2' />
              Dupliquer
            </DropdownMenuItem>
            {!isDraft && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-destructive hover:text-destructive'>
                  <Lock className='w-4 h-4 mr-2' />
                  Désactiver
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
