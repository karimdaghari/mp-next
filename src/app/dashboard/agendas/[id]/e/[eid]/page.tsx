import { Heart, Send, Share2, Users } from 'lucide-react'
import Link from 'next/link'
import { StatCard } from '~/app/dashboard/_components/stat-card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { TypographyLarge, TypographyMuted } from '~/components/ui/typography'
import { EventPreview } from '../../_components/event-preview'
import { api } from '~/trpc/server'

export default async function Page({
  params: { id: agendaId, eid: eventId },
}: {
  params: {
    id: string
    eid: string
  }
}) {
  const { agenda, name, description, location, startDate, endDate, cover } =
    await api.events.get({
      id: +eventId,
    })

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/agendas">Mes agendas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/agendas/${agendaId}`}>{agenda.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-1 lg:mx-auto">
        <div className="grid lg:grid-cols-4 gap-1">
          <StatCard icon={Heart} title="Likes" value={6} />
          <StatCard icon={Users} title="Participants" value={6} />
          <StatCard title="Partages" value={221} icon={Share2} />
          <StatCard title="Envois" value={432} icon={Send} />
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div>
            <TypographyLarge>{name}</TypographyLarge>
            <TypographyMuted>{description}</TypographyMuted>
          </div>
          <div className="scale-90 hidden lg:block">
            <EventPreview
              coverImage={cover}
              name={name}
              description={description ?? undefined}
              location={location}
              agendaName={agenda.name}
              agendaLogo={agenda.logo}
              endDate={endDate}
              startDate={startDate}
            />
          </div>
          <TypographyMuted className="lg:hidden mt-4 lg:mt-0">
            Vous êtes sur une version mobile, pour afficher la prévisualisation
            de {"l'événement"}, veuillez utiliser un écran plus large.
          </TypographyMuted>
        </div>
      </div>
    </>
  )
}
