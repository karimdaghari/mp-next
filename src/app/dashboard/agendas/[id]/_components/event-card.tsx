'use client'
import { format, isPast, isSameDay } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import {
  ArrowRight,
  CalendarClockIcon,
  CopyIcon,
  EditIcon,
  ExternalLink,
  Info,
  Lock,
  MapPin,
  MoreVerticalIcon,
  Rss,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { EventItem as Props } from '~/app/dashboard/_lib/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Separator } from '~/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import {
  TypographyH4,
  TypographyMuted,
  TypographySmall,
} from '~/components/ui/typography'
import { cn } from '~/lib/utils'

export function EventCard({
  id,
  name,
  description,
  cover,
  location,
  url,
  startDate,
  endDate,
  likes,
  subscribers,
  isDraft = false,
  agendaId,
  categories,
}: Props) {
  const [openDelete, setOpenDelete] = useState(false)
  let formattedDate = null

  const formatDate = (date: string | Date) =>
    format(new Date(date), "dd MMMM à H'h'", {
      locale: fr,
    })

  if (startDate && endDate) {
    if (isSameDay(new Date(startDate), new Date(endDate))) {
      formattedDate = formatDate(startDate)
    } else {
      formattedDate = `${formatDate(startDate)} - ${formatDate(endDate)}`
    }
  }

  const isPastEvent = startDate ? isPast(new Date(startDate)) : false

  return (
    <Card>
      <CardHeader className="relative p-0 space-y-0">
        {isDraft && (
          <Badge className="top-1.5 right-1 absolute z-10">Brouillon</Badge>
        )}
        {isPastEvent && (
          <Badge
            variant="destructive"
            className="top-1.5 right-1 absolute z-10"
          >
            Événement passé
          </Badge>
        )}
        {cover ? (
          <img
            alt={name}
            src={cover}
            className={cn(
              'object-cover h-52 w-full rounded-t-lg aspect-2/3',
              (isDraft || isPastEvent) && 'grayscale',
              isPastEvent && 'opacity-80',
            )}
          />
        ) : (
          <div className="h-52 w-full bg-gray-200 rounded-t-lg aspect-2/3" />
        )}
        <div className="p-4 space-y-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="cursor-auto text-left space-y-0">
                <TypographyMuted>Événement</TypographyMuted>
                <CardTitle className="line-clamp-1 text-xl">{name}</CardTitle>
              </TooltipTrigger>
              <TooltipContent align="start" className="max-w-80">
                <TypographySmall>Nom</TypographySmall>
                <TypographyMuted>{name}</TypographyMuted>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="cursor-auto text-left">
                <CardDescription className="line-clamp-2">
                  {description ??
                    "Aucune description n'a été renseignée pour cet événement. Veuillez en ajouter une."}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent align="start" className="max-w-72">
                <TypographySmall>Description</TypographySmall>
                <TypographyMuted>
                  {description ??
                    "Aucune description n'a été renseignée pour cet événement. Veuillez en ajouter une."}
                </TypographyMuted>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-4">
        <div className="space-y-1">
          <div className="flex items-center">
            <CalendarClockIcon className="w-4 h-4 mr-2" />
            <TypographyMuted>
              {formattedDate ?? 'Date(s) non définie(s)'}
            </TypographyMuted>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <TypographyMuted>{location ?? 'Lieu non défini'}</TypographyMuted>
          </div>
          {url ? (
            <TypographyMuted>
              <a
                href={url}
                className="inline-flex items-center hover:underline"
              >
                <Info className="w-4 h-4 mr-2" />
                Consulter le site web
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </TypographyMuted>
          ) : (
            <div className="flex items-center">
              <Info className="w-4 h-4 mr-2" />
              <TypographyMuted>Site web non défini</TypographyMuted>
            </div>
          )}
        </div>

        {categories.length > 0 ? (
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((c) => (
              <Badge key={c} variant="outline">
                {c}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="h-[22.5px]" />
        )}

        <div className="grid grid-cols-5 gap-1 my-2 justify-items-center">
          <div className="text-center">
            <TypographyH4>{isDraft ? '-' : likes}</TypographyH4>
            <TypographySmall>Likes</TypographySmall>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="text-center">
            <TypographyH4>{isDraft ? '-' : subscribers}</TypographyH4>
            <TypographySmall>Participants</TypographySmall>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="text-center">
            <TypographyH4>{isDraft ? '-' : subscribers}</TypographyH4>
            <TypographySmall>Partages</TypographySmall>
          </div>
        </div>
      </CardContent>
      <CardFooter
        className={cn(
          'p-4 flex items-center gap-1 border-t',
          isDraft && 'mt-0.5',
        )}
      >
        {!isDraft && (
          <Link
            className={buttonVariants({
              variant: 'secondary',
              className: 'w-full',
              size: 'sm',
            })}
            href={`/dashboard/agendas/${agendaId}/e/${id}`}
          >
            Consulter
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        )}
        {!isPastEvent && (
          <Link
            href={`/dashboard/agendas/${agendaId}/e/${id}/edit`}
            className={buttonVariants({
              size: 'sm',
              className: 'w-full',
            })}
          >
            Éditer <EditIcon className="w-4 h-4 ml-2" />
          </Link>
        )}
        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir désactiver cet événement ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Vous êtes sur le point de désactiver cet événement. Cette action
                est irréversible. Voulez-vous continuer ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction>Confirmer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
            })}
          >
            <MoreVerticalIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isDraft ? (
              <DropdownMenuItem>
                <Rss className="w-4 h-4 mr-2" />
                Publier
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem>
              <CopyIcon className="w-4 h-4 mr-2" />
              Dupliquer
            </DropdownMenuItem>
            {!isDraft && !isPastEvent && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive hover:text-destructive"
                  onSelect={() => setOpenDelete(true)}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Désactiver
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
