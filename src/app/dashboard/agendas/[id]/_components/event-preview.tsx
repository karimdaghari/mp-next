import { format, isSameDay } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import {
  CalendarDaysIcon,
  ChevronRight,
  GlobeIcon,
  Heart,
  Info,
  MapPinned,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from '~/components/ui/typography'

interface Props {
  name: string
  description?: string | null
  location?: string | null
  agendaName: string
  agendaLogo: string | null | undefined
  startDate: string | null | undefined
  endDate: string | null | undefined
  coverImage: string | null | undefined
}

export function EventPreview(props: Props) {
  let date: string | undefined

  if (props.startDate && props.endDate) {
    if (isSameDay(props.startDate, props.endDate)) {
      date = `${format(props.startDate, "E d MMM 'de' HH:mm", {
        locale: fr,
      })} à ${format(props.endDate, 'HH:mm', {
        locale: fr,
      })}`
    } else {
      date = `${format(props.startDate, 'E d MMM à HH:mm', {
        locale: fr,
      })} - ${format(props.endDate, 'E d MMM à HH:mm', {
        locale: fr,
      })}`
    }
  } else if (props.startDate && !props.endDate) {
    date = `${format(props.startDate, 'E d MMM à HH:mm', {
      locale: fr,
    })} - ?`
  } else {
    date = 'Pas de date définie'
  }

  return (
    <div className="flex justify-center items-center">
      <div className="device device-iphone-14">
        <div className="device-frame">
          <div className="relative bg-background h-full rounded-t-[60px] rounded-b-[60px] pt-12">
            <div className="h-52 relative rounded-t-[6px]">
              {props.coverImage ? (
                <img
                  src={props.coverImage}
                  alt={`Affiche de l'événement ${props.name}`}
                  className="h-full w-full object-cover rounded-t-[6px]"
                />
              ) : (
                <div className="h-full bg-gray-400" />
              )}
              <div className="absolute bottom-2 right-2 flex items-center bg-white rounded-xl px-2 py-1">
                <Heart className="size-5 mr-1" />
                <span className="font-medium">42</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex text-purple-500">
                <GlobeIcon className="h-4 w-4 mr-1" />
                <TypographySmall className="font-semibold">
                  Événement public
                </TypographySmall>
              </div>

              <div className="border p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="size-9 rounded-full">
                    <AvatarFallback>{props.agendaName[0]}</AvatarFallback>
                    <AvatarImage
                      src={props.agendaLogo ?? undefined}
                      alt={`Logo de l'agenda ${props.agendaName}`}
                    />
                  </Avatar>
                  <p className="font-medium line-clamp-1">{props.agendaName}</p>
                </div>
                <Button
                  size="sm"
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 hover:cursor-default"
                >
                  Suivre
                </Button>
              </div>

              <Badge variant="secondary" className="w-fit font-normal">
                Infos utiles
              </Badge>

              <div className="space-y-3">
                <TypographyLarge className="line-clamp-1">
                  {props.name}
                </TypographyLarge>
                <div className="flex items-center">
                  <CalendarDaysIcon className="size-5 mr-1" />
                  <TypographySmall>{date}</TypographySmall>
                </div>
                <div className="flex items-center">
                  <MapPinned className="size-5 mr-1" />
                  <TypographySmall>
                    {props.location ?? 'Pas de lieu défini'}
                  </TypographySmall>
                </div>
                <div className="flex items-center">
                  <Info className="size-5 mr-1" />
                  <TypographySmall>En savoir plus</TypographySmall>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </div>
              </div>

              <div>
                <TypographyLarge>Participants</TypographyLarge>
                <TypographyMuted>6 likes • 2 commentaires</TypographyMuted>
              </div>

              <div className="space-y-1">
                <TypographyLarge>À propos</TypographyLarge>
                <p className="line-clamp-2">
                  {props.description ??
                    'Pas de description pour cet événement.'}
                </p>
              </div>

              <Button className="w-full hover:cursor-default">
                Participer
              </Button>
            </div>
          </div>
        </div>
        <div className="device-stripe" />
        <div className="device-header" />
        <div className="device-sensors" />
        <div className="device-btns" />
        <div className="device-power" />
      </div>
    </div>
  )
}
